import { BpmnSelectItem } from '../../../select/select.component';
import { PaletteCategory } from 'src/app/common/bpmn/palette/palette.enum';

export enum PropertyMenuAnimation {
  propertyIn = 'propertyIn',
  propertyOut = 'propertyOut'
}

export interface PropertyRef {
  key: string;
  label: string;
  type: PropertyRefType;
  options: BpmnSelectItem[];
  category?: PaletteCategory;
  customName?: string;
  code?: number;
}

export enum PropertyRefType {
  select = 'SELECT',
  input = 'INPUT',
  textArea = 'TEXTAREA',
  file = 'FILE'
}

export enum MenuType {
  property = 'PROPERTY',
  attachment = 'ATTACHMENT'
}

export enum MenuCategory {
  general = 'GENERAL'
}
