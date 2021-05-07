export enum TaskTypeConverter {
  notAllowed = 'NotAllowed',
  empty = 'Empty',
  bpmnTaskMessage = 'BpmnTaskMessage',
  bpmnEventTimer = 'BpmnEventTimer',
  bpmnEventEscalation = 'BpmnEventEscalation',
  bpmnEventConditional = 'BpmnEventConditional',
  arrow = 'Arrow',
  bpmnEventError = 'BpmnEventError',
  thinx = 'ThinX',
  bpmnActivityCompensation = 'BpmnActivityCompensation',
  triangle = 'Triangle',
  pentagon = 'Pentagon',
  thickCross = 'ThickCross',
  circle = 'Circle'
}

export enum BpmnEventType {
  /**
   * event test
   */
  test = 'TEST',
  /**
   * on mouse hover inside palette main element
   */
  paletteMouseHover = 'PALETTE_HOVER_ELEMENT',
  /**
   * on mouse leave in palette main element
   */
  paletteMouseLeave = 'PALETTE_MOUSE_LEAVE_ELEMENT',
  /**
   * on click palette
   */
  paletteClicked = 'PALETTE_CLICKED',
  /**
   * diagram click
   */
  diagramClick  = 'DIAGRAM_CLICK',
  /**
   * overview click
   */
  overviewClick = 'OVERVIEW_CLICK',
  /**
   * on select context menu item
   */
  selectContextMenuItem = 'SELECT_CONTEXT_MENU_ITEM',
  /**
   * on select any element from diagram
   */
  selectElement = 'SELECT_ELEMENT',
  /**
   * on property click
   */
  selectProperty = 'SELECT_PROPERTY',
  /**
   * on select attachment
   */
  selectAttachment = 'SELECT_ATTACHMENT',
  /**
   * on change selection
   */
  changeSelection = 'ON_CHANGE_SELECTION',
  /**
   * on click menu property
   */
  menuPropertyClick = 'MENU_PROPERTY_CLICK',
  /**
   * on select clicked
   */
  selectClicked = 'SELECT_CLICKED',
  /***
   * icon bpmn menu property click
   */
  clickMenuIconProperty = 'CLICK_MENU_ICON_PROPERTY',
  /**
   * only read mode
   */
  onlyReadMode = 'ONLY_READ_MODE'

}

export enum GatewayType {
  general = 0,
  parallel = 1,
  inclusive = 2,
  complex = 3,
  exclusive = 4,
  eventBasedGateway = 5,
  eventBasedStart = 6,
  eventBasedExclusive = 8,
  parallelEvent = 7
}

export enum StartEventType {
  general = 1,
  message = 2,
  timer = 3,
  escalation = 4,
  condition = 5,
  error = 7,
  compensation = 9,
  signal = 10,
  multiple = 11,
  parallel = 12,
  cancel = 13,
  link = 14,
  termination = 15,
  sendMessage = 16
}

export enum EventDimension {
  start = 1,
  intermediate = 2,
  end = 3
}

export enum ActivityType {
  general = 0,
  message = 1,
  user = 2,
  manual = 3,
  script = 4,
  sendMessage = 5,
  service = 6,
  businessRule = 7,
  callActivity = 8
}

export enum ActivityInstance {
  general = 'isGeneral',
  isParallel = 'isParallel',
  isLoop = 'isLoop',
  isSequencial = 'isSequencial'
}

export enum DataObjectType {
  dataObject = 1,
  dataInput = 2,
  dataOutput = 3
}

export enum SubProcessType {
  general = 1
}

export enum LanePosition {
  up = 'UP',
  down = 'DOWN'
}
