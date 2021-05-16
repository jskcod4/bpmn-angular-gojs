import { CircleMenu } from "./circleMenu";
import { BpmnConfig } from "../common/bpmn.interface";

export interface AccionesPrincipales {
  actividad: boolean;
  puertaEnlace: boolean;
  eventoIntermedio: boolean;
  anotacion: boolean;
  opcionDeConexion: boolean;
  opcionDeConversion: boolean;
  propiedades: boolean;
  opcionDeEliminar: boolean;
  eventoFinal: boolean;
  opcionAgregarEventoBorde: boolean;
  anadirRachaAbajo: boolean;
  anadirRachaArriba: boolean;
  dividirEnDosCarriles: boolean;
  dividirEnTresCarriles: boolean;
  division: boolean;
}

export interface SimbolosMenuCircular {
  category: string;
  accionesPrincipales: AccionesPrincipales;
}

export interface CircleMenuDataArray {
  key?: number | string;
  category: string;
  text?: string;
  item?: string;
  eventDimension?: number;
  eventType?: number;
  taskType?: number;
  gatewayType?: number;
  isAdHoc?: boolean;
  isText?: boolean;
  size?: string;
  sizeIcon?: string;
  sizeInner?: string;
  _data?: any;
  data?: any;
  isGroup?: boolean;
  isParallel?: boolean;
  isLoop?: boolean;
  isSequencial?: boolean;
  tooltip?: string;
  sizeType?: string;
  font?: string;
  sizeC1?: string;
  sizeC2?: string;
  isCall?: boolean;
  isSubProcess?: boolean;
  subprocessType?: number;
}

export interface CircleMenuSeed {
  templates: CircleMenuButtonTemplate[];
  dataArray: CircleMenuDataArray[];
}

export interface CircleMenuButtonTemplate {
  key: string;
  function: (
    go: any,
    $: any,
    circleMenu?: CircleMenu,
    Type?: string,
    config?: BpmnConfig
  ) => any;
}
