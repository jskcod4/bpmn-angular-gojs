import {
  Component,
  OnInit,
  HostBinding,
  Input,
  HostListener,
  OnDestroy,
} from "@angular/core";

import { MatSliderChange } from "@angular/material/slider";
import { FormBuilder, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

import { BpmnGlobal } from "../../services/bpmn.global";
import { BpmnEventType } from "../../bpmn/common/bpmn.enum";

@Component({
  selector: "bpmn-zoom",
  templateUrl: "./zoom.component.html",
  styleUrls: ["./zoom.component.scss"],
})
export class ZoomComponent implements OnInit, OnDestroy {
  @HostBinding("class.wrapper-zoom")
  wrapperDiv = true;

  @HostBinding("class.wrapper-zoom--bottom-right")
  positionBottomRight = true;

  @HostBinding("class.wrapper-zoom--collapsed")
  isCollapsed = true;

  @HostBinding("class.wrapper-zoom--left-in")
  leftIn = false;

  @HostBinding("class.wrapper-zoom--left-out")
  leftOut = false;

  @Input()
  open = true;

  @Input()
  zoomMax = 2;

  @Input()
  zoomMin = 0.3;

  @Input()
  zoomStep = 0.01;

  @Input()
  value = 1;

  @Input()
  useElement: "material" | "nouslider" = "nouslider";

  @Input()
  set isMinimized(value: boolean) {
    if (value) {
      this.open = !value;
    }
    this.isCollapsed = value;
  }

  bindingValue = 1;
  sliderControl: FormControl;
  timerNouSlider;
  subBeforeMenuOpen: Subscription;
  subBeforeMenuClose: Subscription;

  get useMaterial() {
    return this.useElement === "material";
  }

  constructor(private bpmnGlobal: BpmnGlobal, private fb: FormBuilder) {
    this.sliderControl = this.fb.control(this.value);
  }

  ngOnInit() {
    this.bindingValue = this.value;
    this.subBeforeMenuOpen =
      this.bpmnGlobal.propertyMenuRef.instance.beforeOpen.subscribe(() => {
        this.leftIn = true;
        this.leftOut = false;
      });
    this.subBeforeMenuClose =
      this.bpmnGlobal.propertyMenuRef.instance.beforeClose.subscribe(() => {
        this.leftOut = true;
        this.leftIn = false;
      });
  }

  ngOnDestroy() {
    if (this.subBeforeMenuOpen) {
      this.subBeforeMenuOpen.unsubscribe();
    }
    if (this.subBeforeMenuClose) {
      this.subBeforeMenuClose.unsubscribe();
    }
  }

  @HostListener("click", ["$event"])
  onClick(e: MouseEvent) {
    this.bpmnGlobal.eventBus.emit(BpmnEventType.overviewClick, () => {});
  }

  onArrowDown(): void {
    this.isCollapsed = true;
    this.open = false;
    this.setZoom(this.bindingValue + this.zoomStep / 4);
  }

  onArrowUp(): void {
    this.isCollapsed = false;
    this.open = true;
    this.setZoom(this.bindingValue - this.zoomStep / 4);
  }

  onSliderInput(evt: MatSliderChange) {
    const { value } = evt;
    this.setZoom(value);
  }

  displayWithThumb(value: number) {
    return `${+value * 100}%`;
  }

  onUpdateSlider(zoom: number) {
    this.setZoom(zoom);
  }

  onRestartZoom() {
    this.setZoom(this.value);
  }

  private setZoom(newZoom: number): void {
    this.bpmnGlobal.overviewInstance.scale = newZoom;
    this.bpmnGlobal.diagramInstance.scale = newZoom;
    if (this.useElement === "material") {
      this.bindingValue = newZoom;
    } else {
      if (this.timerNouSlider) {
        clearTimeout(this.timerNouSlider);
      }
      this.timerNouSlider = setTimeout(() => {
        this.bindingValue = newZoom;
      }, 200);
    }
  }
}
