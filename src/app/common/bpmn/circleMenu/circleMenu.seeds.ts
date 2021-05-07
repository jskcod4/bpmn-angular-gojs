import { SimbolosMenuCircular, CircleMenuSeed } from './circleMenu.interface';
import { CircleMenu } from './circleMenu';
import { PaletteCategory } from '../palette/palette.enum';
import { activityButtonTemplate } from './circleMenuTemplate/symbolsTemplate/activityButtonTemplate';
import { gatewayButtonTemplate } from './circleMenuTemplate/symbolsTemplate/gatewayButtonTemplate';
import { GatewayType, StartEventType, EventDimension } from '../common/bpmn.enum';
import { eventButtonTemplate } from './circleMenuTemplate/symbolsTemplate/eventButtonTemplate';
import { laneUpButtonTemplate } from './circleMenuTemplate/symbolsTemplate/laneUpButtonTemplate';
import { laneDownButtonTemplate } from './circleMenuTemplate/symbolsTemplate/laneDownButtonTemplate';
import { div2ButtonTemplate } from './circleMenuTemplate/symbolsTemplate/div2ButtonTemplate';
import { div3ButtonTemplate } from './circleMenuTemplate/symbolsTemplate/div3ButtonTemplate';
import { annotationButtonTemplate } from './circleMenuTemplate/symbolsTemplate/annotationButtonTemplate';
import { conexionButtonTemplate } from './circleMenuTemplate/symbolsTemplate/conexionButtonTemplate';
import { deleteButtonTemplate } from './circleMenuTemplate/symbolsTemplate/deleteButtonTemplate';
import { propertiesButtonTemplate } from './circleMenuTemplate/symbolsTemplate/propertiesButtonTemplate';
import { conversionButtonTemplate } from './circleMenuTemplate/symbolsTemplate/conversionButtonTemplate';
import { eventoBordeButtonTemplate } from './circleMenuTemplate/symbolsTemplate/eventoBordeButtonTemplate';

export const topSymbols: CircleMenuSeed = {
  templates: [
    {
      key: PaletteCategory.activity,
      function: activityButtonTemplate
    },
    {
      key: PaletteCategory.gateway,
      function: gatewayButtonTemplate
    },
    {
      key: PaletteCategory.event,
      function: eventButtonTemplate
    }
  ],
  dataArray: [
    { category: PaletteCategory.activity, tooltip: 'tooltip.task.main', isParallel: false, isLoop: false, isSequencial: false, text: '', isGroup: true, isAdHoc: false, taskType: 0, isText: false, size: '30 20', _data: { category: "actividad" } },
    { category: PaletteCategory.gateway, text: '', tooltip: 'tooltip.gateway.main', gatewayType: GatewayType.general, isText: false, size: '20 20', _data: { category: "puertaEnlace" } },
    { category: PaletteCategory.event, text: '', tooltip: 'tooltip.event.intermediate', eventType: StartEventType.general, eventDimension: EventDimension.intermediate, isText: false, size: '20 20', sizeInner: '17 17', _data: { category: "eventoIntermedio" } }
  ]
}

export const rightSymbols: CircleMenuSeed = {
  templates: [
    {
      key: 'laneUp',
      function: laneUpButtonTemplate
    },
    {
      key: 'laneDown',
      function: laneDownButtonTemplate
    },
    {
      key: 'div2',
      function: div2ButtonTemplate
    },
    {
      key: 'div3',
      function: div3ButtonTemplate
    },
    {
      key: PaletteCategory.annotation,
      function: annotationButtonTemplate
    },
    {
      key: 'conexion',
      function: conexionButtonTemplate
    },
    {
      key: PaletteCategory.event,
      function: eventButtonTemplate
    },
  ],
  dataArray: [
    { category: 'laneUp', text: '', tooltip: 'tooltip.lane.up', _data: { category: "anadirRachaArriba", position: "top" } },
    { category: 'laneDown', text: '', tooltip: 'tooltip.lane.down', _data: { category: "anadirRachaAbajo", position: "bottom" } },
    { category: 'div2', text: '', tooltip: 'tooltip.pool.div2', _data: { category: "dividirEnDosCarriles", quantity: 2 } },
    { category: 'div3', text: '', tooltip: 'tooltip.pool.div3', _data: { category: "dividirEnTresCarriles", quantity: 3 } },
    { category: PaletteCategory.annotation, text: '', tooltip: 'tooltip.note.main', isText: false, size: '20 20', _data: { category: "anotacion" } },
    { category: 'conexion', text: '', tooltip: 'tooltip.conector.main', _data: { category: "opcionDeConexion" } },
    { category: PaletteCategory.event, text: '', tooltip: 'tooltip.event.end', isText: false, size: '20 20', eventType: StartEventType.general, eventDimension: EventDimension.end, _data: { category: "eventoFinal"} },
  ]
}

export const bottomSymbols: CircleMenuSeed = {
  templates: [
    {
      key: 'delete',
      function: deleteButtonTemplate
    },
    {
      key: 'properties',
      function: propertiesButtonTemplate
    },
    {
      key: 'conversion',
      function: conversionButtonTemplate
    },
    {
      key: 'eventoBorde',
      function: eventoBordeButtonTemplate
    },
  ],
  dataArray: [
    { category: 'delete', text: '', tooltip: 'tooltip.delete.main', _data: { category: "opcionDeEliminar" } },
    { category: 'properties', text: '', tooltip: 'tooltip.properties.main', _data: { category: "propiedades" } },
    { category: 'conversion', text: '', tooltip: 'tooltip.conversion.main', size: '17 17', _data: { category: "opcionDeConversion" } },
    { category: 'eventoBorde', tooltip: 'tooltip.event.border', size: '20 20', _data: { category: "opcionAgregarEventoBorde" } },
  ]
}

export function circleMenuAction(circleMenu: CircleMenu) {
  return {
    actionMove: circleMenu.dragNewNode,
    click: circleMenu.clickNewNode,
  }
}

export function buttonGateway( circleMenu: CircleMenu) {
  return {
    actionMove: circleMenu.dragNewNode,
    click: circleMenu.clickNewNode,
  }
}

export const MainCircleMenu = [
  {
    type: 'actividad',
    data: { category: PaletteCategory.activity, text: '', isGroup: true, taskType: 0, tooltip: 'tooltip.task.main' }
  },
  {
    type: 'puertaEnlace',
    data: { category: PaletteCategory.gateway, text: '', gatewayType: GatewayType.parallel, tooltip: 'tooltip.gateway.parallel' }
  },
  {
    type: 'eventoIntermedio',
    data: { category: PaletteCategory.event, text: '', eventType: StartEventType.general, eventDimension: EventDimension.intermediate, item: 'start', tooltip: 'tooltip.event.intermediate' }
  },
  {
    type: 'anotacion',
    data: { category: PaletteCategory.annotation, text: 'palette.note.main', tooltip: 'tooltip.note.main' }
  },
  {
    type: 'eventoFinal',
    data: { category: PaletteCategory.event, text: '', eventType: StartEventType.general, eventDimension: EventDimension.end, item: 'start', tooltip: 'tooltip.event.end' }
  }
]

export const SimbolosSeedMenuCircular: SimbolosMenuCircular[] = [
  {
    category: 'activity',
    accionesPrincipales: {
      actividad: true,
      puertaEnlace: true,
      eventoIntermedio: true,
      anotacion: true,
      opcionDeConexion: true,
      opcionDeConversion: true,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: true,
      opcionAgregarEventoBorde: true,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'event',
    accionesPrincipales: {
      actividad: true,
      puertaEnlace: true,
      eventoIntermedio: true,
      anotacion: true,
      opcionDeConexion: true,
      opcionDeConversion: true,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: false,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'boundary',
    accionesPrincipales: {
      actividad: true,
      puertaEnlace: true,
      eventoIntermedio: true,
      anotacion: true,
      opcionDeConexion: true,
      opcionDeConversion: true,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: true,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'eventIntermediate',
    accionesPrincipales: {
      actividad: true,
      puertaEnlace: true,
      eventoIntermedio: true,
      anotacion: true,
      opcionDeConexion: true,
      opcionDeConversion: true,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: true,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'eventEnd',
    accionesPrincipales: {
      actividad: false,
      puertaEnlace: false,
      eventoIntermedio: false,
      anotacion: true,
      opcionDeConexion: false,
      opcionDeConversion: true,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: false,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'gateway',
    accionesPrincipales: {
      actividad: true,
      puertaEnlace: true,
      eventoIntermedio: true,
      anotacion: true,
      opcionDeConexion: true,
      opcionDeConversion: true,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: true,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'subprocess',
    accionesPrincipales: {
      actividad: true,
      puertaEnlace: true,
      eventoIntermedio: true,
      anotacion: true,
      opcionDeConexion: true,
      opcionDeConversion: true,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: true,
      opcionAgregarEventoBorde: true,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'annotation',
    accionesPrincipales: {
      actividad: false,
      puertaEnlace: false,
      eventoIntermedio: false,
      anotacion: false,
      opcionDeConexion: false,
      opcionDeConversion: false,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: false,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'dataobject',
    accionesPrincipales: {
      actividad: false,
      puertaEnlace: false,
      eventoIntermedio: false,
      anotacion: true,
      opcionDeConexion: true,
      opcionDeConversion: false,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: false,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'datastore',
    accionesPrincipales: {
      actividad: false,
      puertaEnlace: false,
      eventoIntermedio: false,
      anotacion: true,
      opcionDeConexion: true,
      opcionDeConversion: false,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: false,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'group',
    accionesPrincipales: {
      actividad: false,
      puertaEnlace: false,
      eventoIntermedio: false,
      anotacion: false,
      opcionDeConexion: false,
      opcionDeConversion: false,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: false,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: false,
      anadirRachaArriba: false,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  },
  {
    category: 'Pool',
    accionesPrincipales: {
      actividad: false,
      puertaEnlace: false,
      eventoIntermedio: false,
      anotacion: false,
      opcionDeConexion: false,
      opcionDeConversion: false,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: false,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: true,
      anadirRachaArriba: true,
      dividirEnDosCarriles: true,
      dividirEnTresCarriles: true,
      division: true
    }
  },
  {
    category: 'Lane',
    accionesPrincipales: {
      actividad: false,
      puertaEnlace: false,
      eventoIntermedio: false,
      anotacion: false,
      opcionDeConexion: false,
      opcionDeConversion: false,
      propiedades: true,
      opcionDeEliminar: true,
      eventoFinal: false,
      opcionAgregarEventoBorde: false,
      anadirRachaAbajo: true,
      anadirRachaArriba: true,
      dividirEnDosCarriles: false,
      dividirEnTresCarriles: false,
      division: false
    }
  }
];
