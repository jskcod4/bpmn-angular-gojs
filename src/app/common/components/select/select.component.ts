import {
  Component,
  OnInit,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  Inject,
  Renderer2,
} from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { DOCUMENT } from "@angular/common";

import { BpmnGlobal } from "../../services/bpmn.global";
import { BpmnEventType } from "../../bpmn/common/bpmn.enum";

export interface BpmnSelectItem {
  label: string;
  value: string;
  active: boolean;
}

@Component({
  selector: "bpmn-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent implements OnInit {
  @HostBinding("class.bpmn-select-wrapper") hostClass = true;

  @Input() formControl: AbstractControl;
  @Input() placeholder = "";
  @Input() options: BpmnSelectItem[] = [];
  @Input() activate: number;
  @Input() menuListActivate = false;
  @Input() name = "";

  @Output() change = new EventEmitter<BpmnSelectItem[]>();

  constructor(
    private globalService: BpmnGlobal,
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2
  ) {}

  get getActiveElement(): string {
    const options = this.options;
    const element = options.filter((item) => item.active).shift();
    if (element) {
      return element.label;
    }
    if (this.placeholder) {
      return this.placeholder;
    }
    return "";
  }

  ngOnInit() {
    this.watchOutsideClick();
    this.globalService.eventBus.subscribe(
      BpmnEventType.selectClicked,
      (id: string) => {
        if (id !== this.name) {
          this.menuListActivate = false;
        }
      }
    );
  }

  closeSelectedList() {
    if (this.menuListActivate) {
      this.menuListActivate = false;
    }
  }

  onSelectClick() {
    const selectList = this.document.querySelectorAll(".bpmn-select-list");
    selectList.forEach((select) => {
      this.render.addClass(select, "bpmn-select-list--hidden");
    });
    this.menuListActivate = !this.menuListActivate;
    if (this.menuListActivate) {
      this.globalService.eventBus.emit(BpmnEventType.selectClicked, this.name);
    }
  }

  onSelectItem(index: number) {
    if (this.activate === index) {
      this.menuListActivate = false;
      return;
    }
    this.menuListActivate = false;
    this.options.map((option) => (option.active = false));
    this.placeholder = this.options[index].label;
    this.options[index].active = true;
    this.activate = index;
    if (this.formControl) {
      this.formControl.patchValue(this.options[index].value);
    }
    this.change.emit(this.options);
  }

  private watchOutsideClick() {
    this.globalService.eventBus.subscribe(BpmnEventType.paletteClicked, () =>
      this.closeSelectedList()
    );
    this.globalService.eventBus.subscribe(BpmnEventType.menuPropertyClick, () =>
      this.closeSelectedList()
    );
    this.globalService.eventBus.subscribe(BpmnEventType.overviewClick, () =>
      this.closeSelectedList()
    );
  }
}
