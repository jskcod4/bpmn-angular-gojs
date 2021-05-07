import { PaletteCategory } from 'src/app/common/bpmn/palette/palette.enum';

export interface BpmnContextMenu {
  type: string,
  label: string,
  order: number,
  icon?: string,
  value?: string,
  iconType?: BpmnContextIconType,
  category?: PaletteCategory,
  subCategory?: any,
  includeFor?: PaletteCategory[],
  childrens?: BpmnContextMenu[]
}

export enum BpmnContextIconType {
  svg = 'svg'
}
