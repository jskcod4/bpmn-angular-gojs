import { BpmnEventType } from "../bpmn/common/bpmn.enum";

export class BpmnEventBus {
  events: any = [];

  constructor() {
    this.events = {};
  }

  emit(eventName: BpmnEventType, data: any) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }

  subscribe(eventName: BpmnEventType, fn: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (eventFn) => fn !== eventFn
      );
    };
  }

  unSubscribe(eventName: BpmnEventType) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
  }
}
