import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";

import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import { Subscription } from "rxjs";

import { BpmnGlobal } from "../../services/bpmn.global";
import { BpmnEventType } from "../../bpmn/common/bpmn.enum";

import {
  BpmnData,
  BpmnDataFileStorage,
} from "../../bpmn/common/bpmn.interface";

import {
  MenuType,
  PropertyMenuAnimation,
  PropertyMenuHandle,
  PropertyRef,
  PropertyRefType,
} from "./common";

import { BpmnSelectItem } from "../select/select.component";
import { groupBy } from "../../functions";
import { PaletteCategory } from "../../bpmn/palette/palette.enum";
import { Part } from "gojs";

@Component({
  selector: "bpmn-property-menu",
  templateUrl: "./property-menu.component.html",
  styleUrls: ["./property-menu.component.scss"],
})
export class PropertyMenuComponent
  extends PropertyMenuHandle
  implements OnInit, OnDestroy
{
  @HostBinding("class.bpmn-property-menu")
  hostClass = true;

  @HostBinding("class.bpmn-property-menu--open")
  openMenu = false;

  @Input()
  set opened(value: boolean) {
    this.openMenu = value;
  }

  @Output()
  beforeOpen = new EventEmitter<boolean>();

  @Output()
  open = new EventEmitter<boolean>();

  @Output()
  beforeClose = new EventEmitter<boolean>();

  @Output()
  close = new EventEmitter<boolean>();

  statusMenu = false;
  subOpen: Subscription;
  subValueChange: Subscription;

  formGroup = new FormGroup({});
  labelRef = new Set<PropertyRef>();
  loading = true;
  type: MenuType = MenuType.property;
  elements: any[][];
  private bpmDataFileStorage: BpmnDataFileStorage = null;

  constructor(public globalService: BpmnGlobal, private fb: FormBuilder) {
    super(globalService);
  }

  get showIcon(): boolean {
    return !this.openMenu;
  }

  get getTitleType(): string {
    let title = "";
    switch (this.type) {
      case MenuType.property:
        title = "propertyMenu.componentName";
        break;
      case MenuType.attachment:
        title = "propertyMenu.componentAttachment";
        break;
      default:
        break;
    }
    return title;
  }

  ngOnInit() {
    this.subOpen = this.open.subscribe((data) => {});
    this.globalService.eventBus.subscribe(BpmnEventType.diagramClick, () =>
      this.setupGeneralActiveMenu()
    );
    this.globalService.eventBus.subscribe(BpmnEventType.selectElement, () =>
      this.setupLastActiveMenu()
    );
    this.globalService.eventBus.subscribe(BpmnEventType.changeSelection, () =>
      this.setupLastActiveMenu()
    );
    this.globalService.eventBus.subscribe(BpmnEventType.selectProperty, () =>
      this.setupPropertyMenu()
    );
    this.globalService.eventBus.subscribe(BpmnEventType.selectAttachment, () =>
      this.setupAttachmentMenu()
    );
    this.globalService.eventBus.subscribe(
      BpmnEventType.clickMenuIconProperty,
      () => this.onBackIconClick()
    );
  }

  ngOnDestroy() {
    if (this.subOpen) {
      this.subOpen.unsubscribe();
    }
    if (this.subValueChange) {
      this.subValueChange.unsubscribe();
    }
  }

  @HostListener("click", ["$event"])
  onClick(evt: MouseEvent) {
    const element = event.target as HTMLElement;
    if (!element.classList.length) {
      return;
    }
    if (element.classList.contains("bpmn-select-item")) {
      return;
    }
    this.globalService.eventBus.emit(BpmnEventType.menuPropertyClick, evt);
  }

  @HostListener("animationstart", ["$event"])
  onAnimationStart(evt: AnimationEvent) {
    if (evt.animationName === PropertyMenuAnimation.propertyIn) {
      this.beforeOpen.emit(true);
    }
    if (evt.animationName === PropertyMenuAnimation.propertyOut) {
      this.beforeClose.emit(true);
    }
  }

  @HostListener("animationend", ["$event"])
  onAnimationEnd(evt: AnimationEvent) {
    if (evt.animationName === PropertyMenuAnimation.propertyIn) {
      this.statusMenu = true;
      this.open.emit(true);
    }
    if (evt.animationName === PropertyMenuAnimation.propertyOut) {
      this.statusMenu = false;
      this.close.emit(true);
      this.resetMemoryLocalData();
    }
  }

  onBackBtn(): void {
    this.openMenu = false;
  }

  onBackIconClick(): void {
    this.openMenu = !this.openMenu;
    if (this.openMenu) {
      this.setupLastActiveMenu();
    }
  }

  onSelectChange(selectItems: BpmnSelectItem[], control: PropertyRef) {
    this.formGroup.get(control.key).patchValue(selectItems);
  }

  onUploadFiles(files: File[], control: any) {
    if (control.category === PaletteCategory.diagram) {
      this.globalService.storageGeneralAttachmentFiles(files);
    } else {
      const { data } = this.getActiveSelection();
      const newAttachmentFile: BpmnDataFileStorage = {
        files,
        data,
      };
      this.globalService.storageAttachmentFiles(newAttachmentFile);
    }
  }

  public getActiveSelection(): Part {
    return this.globalService.diagramInstance.selection.first();
  }

  public hasActiveSelection(): boolean {
    return !!this.getActiveSelection();
  }

  private resetMemoryLocalData(): void {
    this.formGroup.reset();
    this.labelRef.clear();
    this.elements = [];
  }

  private setPropertyMenuData(): void {
    const selection = this.getActiveSelection() || this.getDiagramData();
    let data = selection.data as BpmnData;
    data = this.appendMissingValues(data);

    this.formGroup = this.getForm(data);

    for (const key in this.formGroup.controls) {
      this.labelRef.add({
        key,
        type: this.getType(key),
        label: this.getLabel(key),
        options: this.formGroup.get(key).value as BpmnSelectItem[],
        category: null,
      });
    }

    this.elements = groupBy(Array.from(this.labelRef), "category");
  }

  private setAttachmentData(): void {
    const selection = this.getActiveSelection() || this.getDiagramData();
    let data = selection.data as BpmnData;
    this.bpmDataFileStorage = this.globalService.getAttachmentFiles(data.key);
    data = this.appendMissingValues(data);

    this.formGroup = this.getFormAttachment(data);
    this.labelRef.add({
      key: "file",
      type: this.getType("file"),
      label: null,
      options: [],
      category: PaletteCategory.diagram,
    });

    if (data.category !== PaletteCategory.diagram) {
      for (const key in this.formGroup.controls) {
        this.labelRef.add({
          key,
          type: this.getType(key),
          label: null,
          options: [],
          category: data.category,
          customName: data.text || "",
          code: data.key,
        });
      }
    }
    this.elements = groupBy(Array.from(this.labelRef), "category");
  }

  private getFormAttachment(data: BpmnData): FormGroup {
    const myForm = this.fb.group({});
    myForm.addControl("file", new FormControl(data.file));
    return myForm;
  }

  private getForm(data: BpmnData): FormGroup {
    const myForm = this.fb.group({});
    for (const key in data) {
      if (this.isFieldEditable(key)) {
        const keying = this.getValueByKey(data, key);
        switch (this.getType(key)) {
          case PropertyRefType.select:
            const myArray = this.getSelectData(data, key);
            myForm.addControl(key, myArray);
            break;
          default:
            myForm.addControl(key, new FormControl(data[keying]));
            break;
        }
      }
    }
    return myForm;
  }

  private updatePropertyMenuData(newData: any): void {
    try {
      if (this.updateDiagramData()) {
        Object.assign(
          this.globalService.diagramData,
          this.wrapperSave(this.globalService.diagramData, newData)
        );
        return;
      }
      this.globalService.diagramInstance.startTransaction("udpateValue");
      const { data } = this.globalService.diagramInstance.selection.first();
      this.globalService.diagramInstance.model.assignAllDataProperties(
        data,
        this.wrapperSave(data, newData)
      );
      this.globalService.diagramInstance.commitTransaction("udpateValue");
    } catch (e) {
      this.globalService.diagramInstance.rollbackTransaction();
    }
  }

  private setupGeneralActiveMenu(): void {
    if (!this.hasActiveSelection()) {
      this.setupLastActiveMenu();
    }
  }

  private setupLastActiveMenu(): void {
    if (this.isAttachmentSelected()) {
      this.setupAttachmentMenu();
    } else if (this.isPropertySelected()) {
      this.setupPropertyMenu();
    }
  }

  private setupPropertyMenu(): void {
    this.type = MenuType.property;
    this.resetMemoryLocalData();
    this.setPropertyMenuData();
    this.subValueChange = this.formGroup.valueChanges.subscribe((data) => {
      this.updatePropertyMenuData(data);
    });
    this.loading = false;
  }

  private setupAttachmentMenu(): void {
    this.type = MenuType.attachment;
    this.resetMemoryLocalData();
    this.setAttachmentData();
    this.loading = false;
  }

  public isAttachmentSelected(): boolean {
    return this.type === MenuType.attachment;
  }

  public isPropertySelected(): boolean {
    return this.type === MenuType.property;
  }

  public getFileElement(control: any): File[] {
    try {
      const { code, category } = control;
      if (category === PaletteCategory.diagram) {
        const { files } = this.globalService.getGeneralFiles(category);
        return files;
      }
      if (code) {
        const { files } = this.globalService.getAttachmentFiles(code);
        return files;
      }
    } catch (e) {
      return [];
    }
  }
}
