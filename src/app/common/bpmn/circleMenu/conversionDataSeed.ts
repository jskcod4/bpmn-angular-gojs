import { PaletteCategory } from '../palette/palette.enum';
import { StartEventType, EventDimension, GatewayType } from '../common/bpmn.enum';
import { CircleMenu } from './circleMenu';
import { BpmnScriptConfig } from '../bpmn.config';
import { CircleMenuDataArray } from './circleMenu.interface';

export const TaskDataButton: CircleMenuDataArray[] = [
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.main', isText: false, isGroup: true, taskType: 0, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "task", type: 0 } },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.message', text: 'palette.task.message', isGroup: true, taskType: 1, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "task", type: 1 } },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.user', text: 'palette.task.user', isGroup: true, taskType: 2, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "task", type: 2 } },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.manual', text: 'palette.task.manual', isGroup: true, taskType: 3, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "task", type: 3 } },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.script', text: 'palette.task.script', isGroup: true, taskType: 4, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "task", type: 4 } },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.sendMessage', text: 'palette.task.sendMessage', isGroup: true, taskType: 5, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "task", type: 5 } },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.service', text: 'palette.task.service', isGroup: true, taskType: 6, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "task", type: 6 } },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.businessRule', text: 'palette.task.businessRule', isGroup: true, taskType: 7, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "task", type: 7 } }
];

export const TaskDataSeed: CircleMenuDataArray[] = [
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.main', text: 'palette.task.main', taskType: 0 },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.message', text: 'palette.task.message', taskType: 1 },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.user', text: 'palette.task.user', taskType: 2 },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.manual', text: 'palette.task.manual', taskType: 3 },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.script', text: 'palette.task.script', taskType: 4 },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.sendMessage', text: 'palette.task.sendMessage', taskType: 5 },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.service', text: 'palette.task.service', taskType: 6 },
  { category: PaletteCategory.activity, tooltip: 'tooltip.task.businessRule', text: 'palette.task.businessRule', taskType: 7 }
];

export const GatewayDataButton: CircleMenuDataArray[] = [
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.parallel', gatewayType: GatewayType.parallel, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeIcon: BpmnScriptConfig.ActivityNodoConversionIconSize, data: { category: "gateway", type: 1 } },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.inclusive', gatewayType: GatewayType.inclusive, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeIcon: BpmnScriptConfig.ActivityNodoConversionIconSize, sizeC1: BpmnScriptConfig.GatewayIconCircle1, data: { category: "gateway", type: 2 } },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.complex', gatewayType: GatewayType.complex, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeIcon: BpmnScriptConfig.ActivityNodoConversionIconSize, data: { category: "gateway", type: 3 } },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.exclusive', gatewayType: GatewayType.exclusive, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeIcon: BpmnScriptConfig.ActivityNodoConversionIconSize, data: { category: "gateway", type: 4 } },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.eventBasedGateway', gatewayType: GatewayType.eventBasedGateway, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeIcon: BpmnScriptConfig.ActivityNodoConversionIconSize, sizeC1: BpmnScriptConfig.GatewayIconCircle1, sizeC2: BpmnScriptConfig.GatewayIconCircle2, data: { category: "gateway", type: 5 } },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.eventBasedStart', gatewayType: GatewayType.eventBasedStart, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeIcon: BpmnScriptConfig.ActivityNodoConversionIconSize, sizeC1: BpmnScriptConfig.GatewayIconCircle1, data: { category: "gateway", type: 6 } },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.parallelEvent', gatewayType: GatewayType.parallelEvent, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeIcon: BpmnScriptConfig.ActivityNodoConversionIconSize, sizeC1: BpmnScriptConfig.GatewayIconCircle1, data: { category: "gateway", type: 7 } }
];

export const GatewayDataSeed: CircleMenuDataArray[] = [
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.parallel', text: '', gatewayType: GatewayType.parallel },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.inclusive', text: '', gatewayType: GatewayType.inclusive },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.complex', text: '', gatewayType: GatewayType.complex },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.exclusive', text: '', gatewayType: GatewayType.exclusive },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.eventBasedGateway', text: '', gatewayType: GatewayType.eventBasedGateway },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.eventBasedStart', text: '', gatewayType: GatewayType.eventBasedStart },
  { category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.parallelEvent', text: '', gatewayType: GatewayType.parallelEvent }
];

export const EventStartDataButton: CircleMenuDataArray[] = [
  { category: PaletteCategory.event, tooltip: 'tooltip.event.start', text: '', eventType: StartEventType.general, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.general } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.message', text: '', eventType: StartEventType.message, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.message } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.timer', text: '', eventType: StartEventType.timer, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.timer } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.escalation', text: '', eventType: StartEventType.escalation, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.escalation } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.condition', text: '', eventType: StartEventType.condition, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.condition } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.error', text: '', eventType: StartEventType.error, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.error } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.compesation', text: '', eventType: StartEventType.compensation, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.compensation } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.signal', text: '', eventType: StartEventType.signal, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.signal } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.multiple', text: '', eventType: StartEventType.multiple, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.multiple } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.parallel', text: '', eventType: StartEventType.parallel, eventDimension: EventDimension.start, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "event", type: StartEventType.parallel } }
];

export const EventStartDataSeed: CircleMenuDataArray[] = [
  { category: PaletteCategory.event, tooltip: 'tooltip.event.start', text: '', eventType: StartEventType.general, eventDimension: EventDimension.start },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.message', text: '', eventType: StartEventType.message, eventDimension: EventDimension.start },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.timer', text: '', eventType: StartEventType.timer, eventDimension: EventDimension.start },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.escalation', text: '', eventType: StartEventType.escalation, eventDimension: EventDimension.start },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.condition', text: '', eventType: StartEventType.condition, eventDimension: EventDimension.start },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.error', text: '', eventType: StartEventType.error, eventDimension: EventDimension.start },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.compesation', text: '', eventType: StartEventType.compensation, eventDimension: EventDimension.start },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.signal', text: '', eventType: StartEventType.signal, eventDimension: EventDimension.start },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.multiple', text: '', eventType: StartEventType.multiple, eventDimension: EventDimension.start },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.parallel', text: '', eventType: StartEventType.parallel, eventDimension: EventDimension.start }
];

export const EventIntermediateDataButton: CircleMenuDataArray[] = [
  { category: PaletteCategory.event, tooltip: 'tooltip.event.intermediate', eventType: StartEventType.general, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.general } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.message', eventType: StartEventType.message, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.message } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.timer', eventType: StartEventType.timer, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.timer } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.escalation', eventType: StartEventType.escalation, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.escalation } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.condition', eventType: StartEventType.condition, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.condition } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.error', eventType: StartEventType.error, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.error } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.compesation', eventType: StartEventType.compensation, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.compensation } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.signal', eventType: StartEventType.signal, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.signal } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.multiple', eventType: StartEventType.multiple, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.multiple } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.parallel', eventType: StartEventType.parallel, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.parallel } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.cancel', eventType: StartEventType.cancel, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.cancel } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.link', eventType: StartEventType.link, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventIntermediate", type: StartEventType.link } }
];

export const EventIntermediateDataSeed: CircleMenuDataArray[] = [
  { category: PaletteCategory.event, tooltip: 'tooltip.event.intermediate', text: '', eventType: StartEventType.general, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.message', text: '', eventType: StartEventType.message, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.timer', text: '', eventType: StartEventType.timer, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.escalation', text: '', eventType: StartEventType.escalation, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.condition', text: '', eventType: StartEventType.condition, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.error', text: '', eventType: StartEventType.error, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.compesation', text: '', eventType: StartEventType.compensation, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.signal', text: '', eventType: StartEventType.signal, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.multiple', text: '', eventType: StartEventType.multiple, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.parallel', text: '', eventType: StartEventType.parallel, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.cancel', text: '', eventType: StartEventType.cancel, eventDimension: EventDimension.intermediate },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.link', text: '', eventType: StartEventType.link, eventDimension: EventDimension.intermediate }
];

export const EventEndDataButton: CircleMenuDataArray[] = [
  { category: PaletteCategory.event, tooltip: 'tooltip.event.end', eventType: StartEventType.general, eventDimension: EventDimension.end, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventEndDataSeed", type: StartEventType.general } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.message', eventType: StartEventType.message, eventDimension: EventDimension.end, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventEndDataSeed", type: StartEventType.message } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.escalation', eventType: StartEventType.escalation, eventDimension: EventDimension.end, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventEndDataSeed", type: StartEventType.escalation } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.error', eventType: StartEventType.error, eventDimension: EventDimension.end, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventEndDataSeed", type: StartEventType.error } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.compesation', eventType: StartEventType.compensation, eventDimension: EventDimension.end, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventEndDataSeed", type: StartEventType.compensation } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.signal', eventType: StartEventType.signal, eventDimension: EventDimension.end, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventEndDataSeed", type: StartEventType.signal } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.multiple', eventType: StartEventType.multiple, eventDimension: EventDimension.end, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventEndDataSeed", type: StartEventType.multiple } },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.termination', eventType: StartEventType.termination, eventDimension: EventDimension.end, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon, data: { category: "eventEndDataSeed", type: StartEventType.termination } }
];

export const EventEndDataSeed: CircleMenuDataArray[] = [
  { category: PaletteCategory.event, tooltip: 'tooltip.event.end', text: '', eventType: StartEventType.general, eventDimension: EventDimension.end },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.message', text: '', eventType: StartEventType.message, eventDimension: EventDimension.end },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.escalation', text: '', eventType: StartEventType.escalation, eventDimension: EventDimension.end },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.error', text: '', eventType: StartEventType.error, eventDimension: EventDimension.end },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.compesation', text: '', eventType: StartEventType.compensation, eventDimension: EventDimension.end },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.signal', text: '', eventType: StartEventType.signal, eventDimension: EventDimension.end },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.multiple', text: '', eventType: StartEventType.multiple, eventDimension: EventDimension.end },
  { category: PaletteCategory.event, tooltip: 'tooltip.event.termination', text: '', eventType: StartEventType.termination, eventDimension: EventDimension.end }
];

export const EventBorderDataButton: CircleMenuDataArray[] = [
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.message', eventType: StartEventType.message, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.timer', eventType: StartEventType.timer, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.escalation', eventType: StartEventType.escalation, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.condition', eventType: StartEventType.condition, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.error', eventType: StartEventType.error, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.compesation', eventType: StartEventType.compensation, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.signal', eventType: StartEventType.signal, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.multiple', eventType: StartEventType.multiple, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.parallel', eventType: StartEventType.parallel, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.cancel', eventType: StartEventType.cancel, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon },
  { category: PaletteCategory.boundary, tooltip: 'tooltip.event.link', eventType: StartEventType.link, eventDimension: EventDimension.intermediate, isText: false, size: BpmnScriptConfig.NodoConversionSize, sizeInner: BpmnScriptConfig.EventCircleConversion, sizeIcon: BpmnScriptConfig.EventCircleConversionIcon }
];

export const SubprocessDataButton: CircleMenuDataArray[] = [
  { category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.main', text: 'palette.subProcess.main', isCall: false, isGroup: true, isSubProcess: true, isAdHoc: false, taskType: 0, subprocessType: 1, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "subprocess", type: 1 } },
  { category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.adhocSub', text: 'palette.subProcess.adhocSub', isCall: false, isGroup: true, isSubProcess: true, isAdHoc: true, taskType: 0, subprocessType: 2, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "subprocess", type: 2 } },
  { category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.eventSubprocess', text: 'palette.subProcess.eventSubprocess', isCall: false, isGroup: true, isSubProcess: true, isAdHoc: false, taskType: 0, subprocessType: 3, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "subprocess", type: 3 } },
  { category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.callActivity', text: 'palette.subProcess.callActivity', isCall: true, isGroup: false, isSubProcess: false, isAdHoc: false, taskType: 8, subprocessType: 4, size: BpmnScriptConfig.ActivityNodoConversionSize, sizeType: BpmnScriptConfig.ActivityNodoConversionIconSize, font: '6pt arial', data: { category: "subprocess", type: 4 } }
];

export const SubprocessDataSeed: CircleMenuDataArray[] = [
  { category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.main', text: 'palette.subProcess.main', isCall: false, isGroup: true, isSubProcess: true, isAdHoc: false, taskType: 0, subprocessType: 1 },
  { category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.adhocSub', text: 'palette.subProcess.adhocSub', isCall: false, isGroup: true, isSubProcess: true, isAdHoc: true, taskType: 0, subprocessType: 2 },
  { category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.eventSubprocess', text: 'palette.subProcess.eventSubprocess', isCall: false, isGroup: true, isSubProcess: true, isAdHoc: false, taskType: 0, subprocessType: 3 },
  { category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.callActivity', text: 'palette.subProcess.callActivity', isCall: true, isGroup: false, isSubProcess: false, isAdHoc: false, taskType: 8, subprocessType: 4 }
];

export function conversionAction(circleMenu: CircleMenu) {
  return {
    click: circleMenu.convertirSimbol
  }
}

export function conversionBoundaryAction(circleMenu: CircleMenu) {
  return {
    click: circleMenu.convertirBoundarySimbol
  }
}

export function eventBorderAction(circleMenu: CircleMenu) {
  return {
    click: circleMenu.addEventBorder
  }
}
