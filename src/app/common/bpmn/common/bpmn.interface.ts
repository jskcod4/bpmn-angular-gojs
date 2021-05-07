import { PaletteCategory } from '../palette/palette.enum';
import { EventDimension, StartEventType, GatewayType, ActivityType, ActivityInstance } from './bpmn.enum';

export interface BpmnSource {
  element: {
    data: BpmnData,
    vb: any
  }
}

export interface BpmnData {
  category: PaletteCategory,
  loc: string,
  key: number
  eventDimension?: EventDimension,
  gatewayType?: GatewayType,
  taskType?: ActivityType,
  notHoverChange?: boolean,
  group?: number,
  eventType?: StartEventType,
  text?: string,
  description?: string,
  instance?: ActivityInstance,
  actor?: string,
  approver?: string,
  consulted?: string,
  informed?: string,
  file?: File
}

export interface BpmnConfig {
  diagramIsReadOnly: boolean,
  MINLENGTH: number,
  MINBREADTH: number,
  LabelTextColor: string,
  BackgroundDark: string,
  GradientYellow: string,
  GradientLightGreen: string,
  GradientLightGray: string,
  ActivityNodeFill: string,
  ActivityNodeStroke: string,
  ActivityMarkerStrokeWidth: number,
  ActivityNodeWidth: number,
  ActivityNodeHeight: number,
  ActivityNodeStrokeWidth: number,
  ActivityNodeStrokeWidthIsCall: number,

  SubprocessNodeFill: string,
  SubprocessNodeStroke: string,
  SubprocessNodeSize: string,

  EventNodeSize: number,
  EventNodeInnerSize: number,
  EventNodeSymbolSize: number,
  EventEndOuterFillColor: string,
  EventBackgroundColor: string,
  EventIntermediateBackgroundColor: string,
  EventIntermediateDarkColor: string,
  EventEndBackgroundColor: string,
  EventBackgroundIconColor: string,
  EventSymbolLightFill: string,
  EventSymbolDarkFill: string,
  EventDimensionStrokeColor: string,
  EventDimensionStrokeEndColor: string,
  EventNodeStrokeWidthIsEnd: 3,

  GatewayNodeSize: number,
  GatewayNodeSymbolSize: number,
  GatewayNodeFill: string,
  GatewayNodeStroke: string,
  GatewayNodeSymbolStroke: string,
  GatewayNodeSymbolFill: string,
  GatewayNodeSymbolStrokeWidth: number,
  GatewayNodeConversionIconWidth: number,
  GatewayNodeConversionIconHeight: number,

  DataFill: string,
  DataStroke: string,
  PoolStroke: string,
  AnnotationFill: string,
  palscale: number,

  NodeConversionFill: string,
  NodeConversionStroke: string,
  NodeConversionStrokeWidth: number,
  NodoConversionSize: string,
  NodoConversionWidth: number,
  NodoConversionHeight: number,
  NodeConversionFont: string,
  ActivityNodoConversionSize: string,
  ActivityNodoConversionIconSize: string,
  ActivityNodoConversionWidth: number,
  ActivityNodoConversionHeight: number,
  ActivityNodeConversionTopWidth: number,
  ActivityNodeConversionTopHeight: number,
  LaneNodoConversionWidth: number,
  LaneNodoConversionHeight: number,
  SwinTwoNodoConversionWidth: number,
  SwinTwoNodoConversionHeight: number,
  SwinTreeNodoConversionWidth: number,
  SwinTreeNodoConversionHeight: number,
  LaneArrowStroke: string,
  LaneFill: string,
  EventBorderCircleStroke: string,
  EventBorderLineStroke: string,
  EventCircleConversion: string,
  EventCircleConversionIcon: string,
  GatewayIconCircle1: string,
  GatewayIconCircle2: string,

  ShapeConexion: string,
  ShapeArrowUP: string,
  ShapeArrowDown: string,
  ShapeEventoBorder1: string,
  ShapeEventoBorder2: string,

  LinksSymbolConnectedFill: string,
  LinksSymbolConnectedStroke: string,
  LinksCornerFill: string,
  LinksCornerStroke: string,
  LinksDelayStaticDragOver: number,
  LinkPositionConnectedFigure: string,
  LinkPositionConnectedFill: string,
  LinkPoitionConnectedStroke: string,
  LinkPoitionConnectedSize: number,
  LinkPoitionConnectedToSegmentIndex: number,
  LinkPoitionConnectedToSegmentFraction: number,
  LinkPoitionConnectedFromSegmentIndex: number,
  LinkPoitionConnectedFromSegmentFraction: number,

  NodeSelectionStroke: string,
  SmallPortConnection: string
}

export interface BpmnDataFileStorage {
  data: BpmnData;
  files: File[];
}
