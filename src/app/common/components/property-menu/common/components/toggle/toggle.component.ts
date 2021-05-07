import { Component, OnInit, HostBinding, Input, HostListener } from '@angular/core';
import { ToggleAnimation } from './common';

@Component({
  selector: 'bpmn-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  @HostBinding('class.bpmn-property-toggle') hostClass: boolean = true;
  @HostBinding('class.bpmn-property-toggle--active') hostActive: boolean = false;

  @Input() set open(value: boolean) {
    this.hostActive = value;
  }

  @Input() title: string = '';

  showBody: boolean = true;

  constructor() { }

  get getIconArrow(): string {
    if (this.open) {
      return 'keyboard_arrow_down.svg';
    }
    return 'keyboard_arrow_up.svg';
  }

  ngOnInit() {}

  @HostListener('animationend', ['$event'])
  animationEnd(evt: AnimationEvent) {
    if (evt.animationName === ToggleAnimation.out) {}
  }

  onHeaderClick(evt: MouseEvent) {
    this.hostActive = !this.hostActive;
  }

}
