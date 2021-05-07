export enum BpmnContextMenuType {
  menuButton = 'ContextMenuButton',
  properties = 'PROPERTIES',
  attach = 'ATTACH',
  cut = 'CUT',
  rendo = 'RENDO',
  undo = 'UNDO',
  editText = 'EDIT_TEXT',
  copy = 'COPY',
  delete = 'DELETE',
  comment = 'COMMENT',
  paste = 'PASTE',
  align = 'ALIGN',
  distribute = 'DISTRIBUTE',

  toSimpleStart = 'CONVERT_TO_SIMPLE_START',
  toMessageStart = 'CONVERT_TO_MESSAGE_START',
  toTimerStart = 'CONVERT_TO_TIMER_START',
  toConditionalStart = 'CONVERT_TO_CONDITIONAL_START',
  toSignalStart = 'CONVERT_TO_SIGNAL_START',
  toMultipleStart = 'CONVERT_TO_MULTIPLE_START',
  toParallelStart = 'CONVERT_TO_PARALLEL_START',

  toSimpleEvent = 'CONVERT_TO_SIMPLE_EVENT',
  toMessageEvent = 'CONVERT_TO_MESSAGE_EVENT',
  toTimerEvent = 'CONVERT_TO_TIMER_EVENT',
  toConditionalEvent = 'CONVERT_TO_CONDITIONAL_EVENT',
  toSignalEvent = 'CONVERT_TO_SIGNAL_EVENT',
  toClimbEvent = 'CONVERT_TO_CLIMB_EVENT',
  toCompensationEvent = 'CONVERT_TO_COMPENSATION_EVENT',
  toMultipleEvent = 'CONVERT_TO_MULTIPLE_EVENT',
  toParallelEvent = 'CONVERT_TO_PARALLEL_EVENT',
  toLinkEvent = 'CONVERT_LINK_EVENT',

  toSimpleEnd = 'CONVERT_TO_SIMPLE_END',
  toMessageEnd = 'CONVERT_TO_MESSAGE_END',
  toAlignEnd = 'CONVERT_TO_ALIGN_END',
  toSignalEnd = 'CONVERT_TO_SIGNAL_END',
  toErrorEnd = 'CONVERT_TO_ERROR_END',
  toEnd = 'CONVERT_TO_END',
  toCompensationEnd = 'CONVERT_TO_COMPENSATION',
  toCancelEnd = 'CONVERT_TO_CANCEL_END',
  toMultipleEnd = 'CONVERT_TO_MULTIPLE_END',

  toExclusiveGateway = 'CONVERT_TO_EXCLUSIVE_GATEWAY',
  toParallelGateway = 'CONVERT_TO_PARALLEL_GATEWAY',
  toInclusiveGateway = 'CONVERT_TO_INCLUSIVE_GATEWAY',
  toBasedEventGateway = 'CONVERT_TO_BASED_EVENT_GATEWAY',
  toBasedEventExclusiveGateway = 'CONVERT_TO_BASED_EVENT_EXCLUSIVE_GATEWAY',
  toBasedEventParallelGateway = 'CONVERT_TO_BASED_EVENT_PARALLEL_GATEWAY',
  toComplexGateway = 'CONVERT_TO_COMPLEX_GATEWAY',

  toSimpleTask = 'CONVERT_TO_SIMPLE_TASK',
  toServiceTask = 'CONVERT_TO_SERVICE_TASK',
  toMessageSendTask = 'CONVERT_TO_MESSAGE_SEND_TASK',
  toMessageReceivedTask = 'CONVERT_TO_MESSAGE_RECEIVED_TASK',
  toUserTask = 'CONVERT_TO_USER_TASK',
  toManualTask = 'CONVERT_TO_MANUAL_TASK',
  toBusinessTask = 'CONVERT_TO_BUSINESS_TASK',
  toScriptTask = 'CONVERT_TO_SCRIPT_TASK',
  toSubprocessTask = 'CONVERT_TO_SUBPROCESS_TASK',

  toIntegratedSubprocess = 'CONVERT_TO_INTEGRATED_SUBPROCESS',
  toAdhocSubprocess = 'CONVERT_TO_ADHOC_SUBPROCESS',
  toTransactionSubprocess = 'CONVERT_TO_TRANSACTION_SUBPROCESS',
  toTaskSubprocess = 'CONVERT_TO_TASK_SUBPROCESS',
  toEventSubprocess = 'CONVERT_TO_EVENT_SUBPROCESS',

  toBucleSubprocessMultiple = 'CONVERT_TO_BUCLE_SUBPROCESS_MULTIPLE',
  toBucleSubprocessLoop = 'CONVERT_TO_BUCLE_SUBPROCESS_LOOP',
  toBucleSimpleSubprocess = 'CONVERT_TO_BUCLE_SIMPLE_SUBPROCESS',

  toRegularSequenceConnector = 'REGULAR_SEQUENCE_CONNECTOR',
  toStandardSequenceConnector = 'STANDARD_SEQUENCE_CONNECTOR',
  toConditionalSequenceConnector = 'CONDITIONAL_SEQUENCE_CONNECTOR',

  multipleInstancesTask = 'MULTIPLE_INSTANCES',
  loopIntancesTask = 'LOOP_INSTANCES',
  simpleTask = 'SIMPLE_INSTANCE',

  repeatTaskMany = 'REPEAT_MANY',
  repeatConditional = 'REPEAT_CONDITIONAL',
  repeatSimple = 'REPEAT_SIMPLE',

  edgeEventCompensation = 'EDGE_EVENT_COMPENSATION',
  edgeEventConditional = 'EDGE_EVENT_CONDITIONAL',
  edgeEventError = 'EDGE_EVENT_ERROR',
  edgeEventClimb = 'EDGE_EVENT_CLIMB',
  edgeEventMessage = 'EDGE_EVENT_MESSAGE',
  edgeEventMultiple = 'EDGE_EVENT_MULTIPLE',
  edgeEventParallel = 'EDGE_EVENT_PARALLEL',
  edgeEventSignal = 'EDGE_EVENT_SIGNAL',
  edgeEventTimer = 'EDGE_EVENT_TIMER',

  splitTwoLanes = 'SPLIT_TWO_LINES',
  splitThreeLanes = 'SPLIT_THREE_LINES',
  upLanes = 'UP_LANES',
  nextLanes = 'NEXT_LANES',
  annotation = 'ANNOTATION',

  alignHorizontal = 'ALIGN_HORIZONTAL',
  alignVertical = 'ALIGN_VERTICAL',

  distributeHorizontal = 'DISTRIBUTE_HORIZONTAL',
  distributeVertical = 'DISTRIBUTE_VERTICAL'
}

export declare type Data = {
  [name: string]: any;
};

export interface BpmnMenuContext {
  type: BpmnContextMenuType,
  label: string,
  properties?: Data
}

export const bpmnMenuContext: BpmnMenuContext[] = [
  {
    type: BpmnContextMenuType.menuButton,
    label: 'Copiar',
    properties:  {
      margin: 3
    }
  }, {
    type: BpmnContextMenuType.menuButton,
    label: 'Cortar',
    properties:  {
      margin: 3
    }
  }, {
    type: BpmnContextMenuType.menuButton,
    label: 'Eliminar',
    properties:  {
      margin: 3
    }
  }, {
    type: BpmnContextMenuType.menuButton,
    label: 'Enviar',
    properties:  {
      margin: 3
    }
  }, {
    type: BpmnContextMenuType.menuButton,
    label: 'Adjuntar',
    properties:  {
      margin: 3
    }
  }
];
