import { BpmnEventBus } from '../../data/bpmn.class';
import { BpmnConfig } from '../common/bpmn.interface';
import { ActivityInstance } from '../common/bpmn.enum';

export interface PaletteNodeDataArray {
  key: number | string,
  category: string,
  text: string,
  item?: string,
  eventDimension?: number,
  eventType?: number,
  taskType?: number,
  loc?: string,
  isGroup?: boolean,
  group?: number,
  isSubProcess?: boolean,
  gatewayType?: number,
  dataObjectType?: number,
  name?: string,
  color?: string,
  isLoop?: boolean,
  isCall?: boolean,
  isAdHoc?: boolean,
  isTransaction?: boolean,
  isParallel?: boolean,
  isSequential?: boolean,
  subProcessType?: number,
  notHoverChange?: boolean,
  mainTemplate?: boolean,
  subprocessType?: number,
  size?: string,
  instance?: ActivityInstance
  tooltip?: string,
  isMainPalette?: boolean,
  isPalettaNew?: boolean
}

export interface PaletteModel {
  copiesArrays: boolean,
  copiesArrayObjects: boolean,
  nodeDataArray: PaletteNodeDataArray[]
}

export interface PaletteSeed {
  idDivElement: string,
  options?: any,
  templates: PaletteTemplate[],
  groupTemplate: PaletteTemplate[],
  layout: any,
  model?: PaletteModel
}

export interface PaletteTemplate {
  key: string,
  function: (go: any, $: any, bpmnEventBus?: BpmnEventBus, config?: BpmnConfig) => any,
}
