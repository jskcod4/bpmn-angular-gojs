import {
  Injectable,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  Inject,
  ApplicationRef,
} from "@angular/core";

import { DOCUMENT } from "@angular/common";
import { Observable } from "rxjs";
import * as go from "gojs";

import { BpmnEventBus } from "../data/bpmn.class";

import {
  BpmnSource,
  BpmnData,
  BpmnDataFileStorage,
} from "../bpmn/common/bpmn.interface";

import { PropertyMenuComponent } from "../components/property-menu/property-menu.component";
import { BpmnEventType } from "../bpmn/common/bpmn.enum";
import { PaletteCategory } from "../bpmn/palette/palette.enum";
import { BpmnAttachmentStorage } from "../components/property-menu/common";

@Injectable({
  providedIn: "root",
})
export class BpmnGlobal extends BpmnAttachmentStorage {
  /**
   * communication channel between
   * static files and angular components
   */
  eventBus = new BpmnEventBus();
  /**
   * open toolbar element (palette)
   */
  hoverElementOpen: BpmnSource;
  /**
   * global instance from diagram
   */
  diagramInstance: go.Diagram;
  /**
   * global instance from overview
   */
  overviewInstance: go.Overview;
  /**
   * reference property menu
   */
  propertyMenuRef: ComponentRef<PropertyMenuComponent>;
  /**
   * global data to diagram
   */
  diagramData: BpmnData = {
    category: PaletteCategory.diagram,
    text: "",
    key: 999,
    loc: "",
  };
  /**
   * onlyRead mode
   */
  onlyRead = false;

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    super();
    this.eventBus.subscribe(BpmnEventType.selectElement, () => {});
  }

  public createMenu(): void {
    if (this.isPropertyMenuCreated()) {
      return;
    }
    const factory = this.resolver.resolveComponentFactory(
      PropertyMenuComponent
    );
    this.propertyMenuRef = factory.create(this.injector);
    this.applicationRef.attachView(this.propertyMenuRef.hostView);
    this.document.body
      .querySelectorAll("app-root")[0]
      .appendChild(this.propertyMenuRef.location.nativeElement);
  }

  public openMenu(): Observable<boolean> {
    return new Observable((observable) => {
      this.propertyMenuRef.instance.opened = true;
      this.propertyMenuRef.instance.open.subscribe((data) => {
        observable.next(data);
      });
    });
  }

  public closeMenu(): Observable<boolean> {
    return new Observable((observable) => {
      this.propertyMenuRef.instance.opened = false;
      this.propertyMenuRef.instance.close.subscribe((data) => {
        observable.next(data);
      });
    });
  }

  private isPropertyMenuCreated(): boolean {
    return !!this.propertyMenuRef;
  }

  public storageAttachmentFiles(
    bpmnDataFileStorage: BpmnDataFileStorage
  ): void {
    super.storageAttachmentFiles(bpmnDataFileStorage);
  }

  public getAttachmentFileData(): BpmnDataFileStorage[] {
    return super.getAttachmentFileData();
  }

  public getAttachmentFiles(key: number): BpmnDataFileStorage {
    return super.getAttachmentFiles(key);
  }

  public getGeneralFiles(category: PaletteCategory): BpmnDataFileStorage {
    return super.getGeneralFiles(category);
  }
}
