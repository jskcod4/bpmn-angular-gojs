// import * as go from 'gojs';

// const $ = go.GraphObject.make;

export enum BpmnMenuType {
  menuButton = "ContextMenuButton",
}

export declare type Data = {
  [name: string]: any;
};

export interface BpmnMenuContext {
  type: BpmnMenuType;
  label: string;
  properties?: Data;
}

export const bpmnMenuContext: BpmnMenuContext[] = [
  {
    type: BpmnMenuType.menuButton,
    label: "Copiar",
    properties: {
      margin: 3,
    },
  },
  {
    type: BpmnMenuType.menuButton,
    label: "Cortar",
    properties: {
      margin: 3,
    },
  },
  {
    type: BpmnMenuType.menuButton,
    label: "Eliminar",
    properties: {
      margin: 3,
    },
  },
  {
    type: BpmnMenuType.menuButton,
    label: "Enviar",
    properties: {
      margin: 3,
    },
  },
  {
    type: BpmnMenuType.menuButton,
    label: "Adjuntar",
    properties: {
      margin: 3,
    },
  },
];
