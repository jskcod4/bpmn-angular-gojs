import * as go from 'gojs';

import { BpmnContextMenu, BpmnContextIconType } from '../../components/context-menu/common/context.menu.interface';
import { BpmnContextMenuType } from './bpmn-menu.context';
import { PaletteCategory } from '../palette/palette.enum';
import { EventDimension, ActivityInstance } from '../common/bpmn.enum';
import { setDefaultProperties } from './menu-context.functions';

export function getContextMenu(): go.HTMLInfo {
  let $ = go.GraphObject.make;
  const cxElement = <HTMLDivElement>document.querySelectorAll('bpmn-context-menu')[0];

  const myContextMenu = $(go.HTMLInfo, {
    show: (obj: go.GraphObject, diagram: go.Diagram, tool: go.Tool) => {
      setDefaultProperties(obj, diagram, tool, cxElement);
    },
    hide: (diagram: go.Diagram, tool: go.Tool) => {
      const element = document.getElementsByTagName('bpmn-context-menu');
      element.item(0).setAttribute('to-left', 'FALSE');
      element.item(0).setAttribute('to-top', 'FALSE');
      element.item(0).setAttribute('hidden', 'TRUE');
    },
    mainElement: cxElement
  });

  cxElement.addEventListener('contextClick', e => {
    console.log(1);
  });

  cxElement.addEventListener('contextmenu', e => {
    e.preventDefault();
    return false;
  }, false);

  return myContextMenu;
}

const generalCategories: PaletteCategory[] = [
  PaletteCategory.event,
  PaletteCategory.gateway,
  PaletteCategory.activity,
  PaletteCategory.subprocess,
  PaletteCategory.pool,
  PaletteCategory.annotation,
  PaletteCategory.group,
  PaletteCategory.dataWarehousing,
  PaletteCategory.dataObject
];

const convertToEventStart: BpmnContextMenu[] = [
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.start,
    label: 'contextMenu.convertTo.events.start.simpleStart',
    order: 50,
    type: BpmnContextMenuType.toSimpleStart,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.start,
    label: 'contextMenu.convertTo.events.start.messageStart',
    order: 50,
    type: BpmnContextMenuType.toMessageStart,
    icon: 'mail_outline.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.start,
    label: 'contextMenu.convertTo.events.start.timerStart',
    order: 50,
    type: BpmnContextMenuType.toTimerStart,
    icon: 'timer.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.start,
    label: 'contextMenu.convertTo.events.start.conditionalStart',
    order: 50,
    type: BpmnContextMenuType.toConditionalStart,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.start,
    label: 'contextMenu.convertTo.events.start.signalStart',
    order: 50,
    type: BpmnContextMenuType.toSignalStart,
    icon: 'change_history.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.start,
    label: 'contextMenu.convertTo.events.start.multipleStart',
    order: 50,
    type: BpmnContextMenuType.toMultipleStart,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.start,
    label: 'contextMenu.convertTo.events.start.parallelStart',
    order: 50,
    type: BpmnContextMenuType.toParallelStart,
    icon: 'add.svg',
    iconType: BpmnContextIconType.svg
  },
];

const convertToEventIntermediate: BpmnContextMenu[] = [
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.simpleEvent',
    order: 50,
    type: BpmnContextMenuType.toSimpleEvent,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.messageEvent',
    order: 50,
    type: BpmnContextMenuType.toMessageEvent,
    icon: 'mail_outline.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.timerEvent',
    order: 50,
    type: BpmnContextMenuType.toTimerEvent,
    icon: 'timer.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.conditionalEvent',
    order: 50,
    type: BpmnContextMenuType.toConditionalEvent,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.signalEvent',
    order: 50,
    type: BpmnContextMenuType.toSignalEvent,
    icon: 'change_history.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.climbEvent',
    order: 50,
    type: BpmnContextMenuType.toClimbEvent,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.compensationEvent',
    order: 50,
    type: BpmnContextMenuType.toCompensationEvent,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.multipleEvent',
    order: 50,
    type: BpmnContextMenuType.toMultipleEvent,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.parallelEvent',
    order: 50,
    type: BpmnContextMenuType.toParallelEvent,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.intermediate,
    label: 'contextMenu.convertTo.events.intermediate.linkEvent',
    order: 50,
    type: BpmnContextMenuType.toLinkEvent,
    icon: 'arrow_forward.svg',
    iconType: BpmnContextIconType.svg
  },
];

const convertToEventEnd: BpmnContextMenu[] = [
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.end,
    label: 'contextMenu.convertTo.events.end.simpleEnd',
    order: 50,
    type: BpmnContextMenuType.toSimpleEnd,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.end,
    label: 'contextMenu.convertTo.events.end.messageEnd',
    order: 50,
    type: BpmnContextMenuType.toMessageEnd,
    icon: 'mail_outline.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.end,
    label: 'contextMenu.convertTo.events.end.signalEnd',
    order: 50,
    type: BpmnContextMenuType.toSignalEnd,
    icon: 'change_history.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.end,
    label: 'contextMenu.convertTo.events.end.errorEnd',
    order: 50,
    type: BpmnContextMenuType.toErrorEnd,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.end,
    label: 'contextMenu.convertTo.events.end.end',
    order: 50,
    type: BpmnContextMenuType.toEnd,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.end,
    label: 'contextMenu.convertTo.events.end.compensationEnd',
    order: 50,
    type: BpmnContextMenuType.toCompensationEnd,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.end,
    label: 'contextMenu.convertTo.events.end.cancellationEnd',
    order: 50,
    type: BpmnContextMenuType.toCancelEnd,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.event,
    subCategory: EventDimension.end,
    label: 'contextMenu.convertTo.events.end.multipleEnd',
    order: 50,
    type: BpmnContextMenuType.toMultipleEnd,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  }
];

const convertToGateway: BpmnContextMenu[] = [
  {
    category: PaletteCategory.gateway,
    label: 'contextMenu.convertTo.gateway.exclusiveGateway',
    order: 50,
    type: BpmnContextMenuType.toExclusiveGateway,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.gateway,
    label: 'contextMenu.convertTo.gateway.parallelGateway',
    order: 50,
    type: BpmnContextMenuType.toParallelGateway,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.gateway,
    label: 'contextMenu.convertTo.gateway.inclusivePortal',
    order: 50,
    type: BpmnContextMenuType.toInclusiveGateway,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.gateway,
    label: 'contextMenu.convertTo.gateway.basedEventGateway',
    order: 50,
    type: BpmnContextMenuType.toBasedEventGateway,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.gateway,
    label: 'contextMenu.convertTo.gateway.basedEventExclusiveGateway',
    order: 50,
    type: BpmnContextMenuType.toBasedEventExclusiveGateway,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.gateway,
    label: 'contextMenu.convertTo.gateway.basedEventParallelGatweway',
    order: 50,
    type: BpmnContextMenuType.toBasedEventParallelGateway,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.gateway,
    label: 'contextMenu.convertTo.gateway.complexGateway',
    order: 50,
    type: BpmnContextMenuType.toComplexGateway,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  }
];

const convertToTask: BpmnContextMenu[] = [
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.simpleTask',
    order: 50,
    type: BpmnContextMenuType.toSimpleTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.serviceTask',
    order: 50,
    type: BpmnContextMenuType.toServiceTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.messageSendTask',
    order: 50,
    type: BpmnContextMenuType.toMessageSendTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.messageReceivedTask',
    order: 50,
    type: BpmnContextMenuType.toMessageReceivedTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.userTask',
    order: 50,
    type: BpmnContextMenuType.toUserTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.manualTask',
    order: 50,
    type: BpmnContextMenuType.toManualTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.businessTask',
    order: 50,
    type: BpmnContextMenuType.toBusinessTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.scriptTask',
    order: 50,
    type: BpmnContextMenuType.toScriptTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.subprocessTask',
    order: 50,
    type: BpmnContextMenuType.toSubprocessTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.convertTo.task.userTask',
    order: 50,
    type: BpmnContextMenuType.toUserTask,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  }
];

const convertToSubprocess: BpmnContextMenu[] = [
  {
    category: PaletteCategory.subprocess,
    label: 'contextMenu.convertTo.subprocess.integratedSubprocess',
    order: 50,
    type: BpmnContextMenuType.toIntegratedSubprocess,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.subprocess,
    label: 'contextMenu.convertTo.subprocess.adHocSubprocess',
    order: 50,
    type: BpmnContextMenuType.toAdhocSubprocess,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.subprocess,
    label: 'contextMenu.convertTo.subprocess.transactionSubprocess',
    order: 50,
    type: BpmnContextMenuType.toTransactionSubprocess,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.subprocess,
    label: 'contextMenu.convertTo.subprocess.taskSubprocess',
    order: 50,
    type: BpmnContextMenuType.toTaskSubprocess,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.subprocess,
    label: 'contextMenu.convertTo.subprocess.eventSubprocess',
    order: 50,
    type: BpmnContextMenuType.toEventSubprocess,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.subprocess,
    label: 'contextMenu.convertTo.subprocess.eventSubprocess',
    order: 50,
    type: BpmnContextMenuType.toEventSubprocess,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.subprocess,
    label: 'contextMenu.convertTo.subprocess.blucleSubprocess.mainText',
    order: 50,
    type: BpmnContextMenuType.toEventSubprocess,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg,
    childrens: [
      {
        category: PaletteCategory.subprocess,
        label: 'contextMenu.convertTo.subprocess.blucleSubprocess.multipleInstances',
        order: 50,
        type: BpmnContextMenuType.toBucleSubprocessMultiple,
        icon: 'crop.svg',
        iconType: BpmnContextIconType.svg,
      },
      {
        category: PaletteCategory.subprocess,
        label: 'contextMenu.convertTo.subprocess.blucleSubprocess.loop',
        order: 50,
        type: BpmnContextMenuType.toBucleSubprocessLoop,
        icon: 'crop.svg',
        iconType: BpmnContextIconType.svg,
      },
      {
        category: PaletteCategory.subprocess,
        label: 'contextMenu.convertTo.subprocess.blucleSubprocess.simpleSubprocess',
        order: 50,
        type: BpmnContextMenuType.toBucleSimpleSubprocess,
        icon: 'crop.svg',
        iconType: BpmnContextIconType.svg,
      }
    ]
  }
];

const convertToLink: BpmnContextMenu[] = [
  {
    category: PaletteCategory.link,
    label: 'contextMenu.convertTo.link.regularSequenceConnector',
    order: 50,
    type: BpmnContextMenuType.toRegularSequenceConnector,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.link,
    label: 'contextMenu.convertTo.link.standardSequenceConnector',
    order: 50,
    type: BpmnContextMenuType.toStandardSequenceConnector,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  },
  {
    category: PaletteCategory.link,
    label: 'contextMenu.convertTo.link.conditionalSequenceConnector',
    order: 50,
    type: BpmnContextMenuType.toConditionalSequenceConnector,
    icon: 'crop.svg',
    iconType: BpmnContextIconType.svg
  }
];

const laneOptions: BpmnContextMenu[] = [
  {
    label: 'contextMenu.pool.laneUp',
    order: 1,
    type: BpmnContextMenuType.upLanes,
    icon: 'arrow_upward.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.lane
    ]
  },
  {
    label: 'contextMenu.pool.laneNext',
    order: 1,
    type: BpmnContextMenuType.nextLanes,
    icon: 'arrow_downward.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.lane
    ]
  }
];

const poolOptions: BpmnContextMenu[] = [
  {
    label: 'contextMenu.pool.splitInTwoo',
    order: 1,
    type: BpmnContextMenuType.splitTwoLanes,
    icon: 'pool-two.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.pool
    ]
  },
  {
    label: 'contextMenu.pool.splinInThree',
    order: 1,
    type: BpmnContextMenuType.splitThreeLanes,
    icon: 'pool-three.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.pool
    ]
  },
  {
    label: 'contextMenu.pool.laneUp',
    order: 1,
    type: BpmnContextMenuType.upLanes,
    icon: 'arrow_upward.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.pool
    ]
  },
  {
    label: 'contextMenu.pool.laneNext',
    order: 1,
    type: BpmnContextMenuType.nextLanes,
    icon: 'arrow_downward.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.pool
    ]
  },
  {
    label: 'contextMenu.annotation',
    order: 1,
    type: BpmnContextMenuType.annotation,
    icon: 'note.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.pool
    ]
  }
];

export const instanceActivities: BpmnContextMenu[] = [
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.intanceTask.multipleInstances',
    order: 55,
    type: BpmnContextMenuType.multipleInstancesTask,
    value: ActivityInstance.isParallel,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.intanceTask.loop',
    order: 55,
    type: BpmnContextMenuType.loopIntancesTask,
    value: ActivityInstance.isLoop,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.intanceTask.simpleTask',
    value: ActivityInstance.general,
    order: 55,
    type: BpmnContextMenuType.simpleTask,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity
    ]
  }
];

const repeatActivities: BpmnContextMenu[] = [
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.repeatTask.many',
    order: 55,
    type: BpmnContextMenuType.repeatTaskMany,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.repeatTask.conditional',
    order: 55,
    type: BpmnContextMenuType.repeatConditional,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.repeatTask.simple',
    order: 55,
    type: BpmnContextMenuType.repeatSimple,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  }
];

const edgetEvents: BpmnContextMenu[] = [
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.edgeEvent.compensation',
    order: 55,
    type: BpmnContextMenuType.edgeEventCompensation,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.edgeEvent.conditional',
    order: 55,
    type: BpmnContextMenuType.edgeEventConditional,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.edgeEvent.error',
    order: 55,
    type: BpmnContextMenuType.edgeEventError,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.edgeEvent.climb',
    order: 55,
    type: BpmnContextMenuType.edgeEventClimb,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.edgeEvent.message',
    order: 55,
    type: BpmnContextMenuType.edgeEventMessage,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.edgeEvent.multiple',
    order: 55,
    type: BpmnContextMenuType.edgeEventMultiple,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.edgeEvent.parallel',
    order: 55,
    type: BpmnContextMenuType.edgeEventParallel,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity,
      PaletteCategory.subprocess
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.edgeEvent.signal',
    order: 55,
    type: BpmnContextMenuType.edgeEventSignal,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity
    ]
  },
  {
    category: PaletteCategory.activity,
    label: 'contextMenu.edgeEvent.timer',
    order: 55,
    type: BpmnContextMenuType.edgeEventTimer,
    icon: 'redo.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      PaletteCategory.activity
    ]
  }
];

const alignOptions: BpmnContextMenu[] = [
  {
    label: 'contextMenu.alignment.horizontal',
    order: 1,
    type: BpmnContextMenuType.alignHorizontal,
    icon: 'pool-two.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      ...generalCategories
    ]
  },
  {
    label: 'contextMenu.alignment.vertical',
    order: 1,
    type: BpmnContextMenuType.alignVertical,
    icon: 'pool-two.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      ...generalCategories
    ]
  }
];

const ditributeOptions: BpmnContextMenu[] = [
  {
    label: 'contextMenu.distribution.horizontal',
    order: 1,
    type: BpmnContextMenuType.distributeHorizontal,
    icon: 'pool-two.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      ...generalCategories
    ]
  },
  {
    label: 'contextMenu.distribution.vertical',
    order: 1,
    type: BpmnContextMenuType.distributeVertical,
    icon: 'pool-two.svg',
    iconType: BpmnContextIconType.svg,
    includeFor: [
      ...generalCategories
    ]
  }
];

export function getDiagramMenu(): BpmnContextMenu[] {
  return [
    ...laneOptions,
    ...poolOptions,
    {
      label: 'contextMenu.properties',
      order: 30,
      type: BpmnContextMenuType.properties,
      icon: 'build.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        PaletteCategory.diagram
      ]
    },
    {
      label: 'contextMenu.editText',
      order: 20,
      type: BpmnContextMenuType.editText,
      icon: 'create.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        ...generalCategories,
        PaletteCategory.lane,
        PaletteCategory.link
      ]
    },
    {
      label: 'contextMenu.attach',
      order: 25,
      type: BpmnContextMenuType.attach,
      icon: 'attach_file.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        ...generalCategories,
        PaletteCategory.diagram
      ]
    },
    {
      label: 'contextMenu.copy',
      order: 1,
      type: BpmnContextMenuType.copy,
      icon: 'file_copy.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        ...generalCategories
      ]
    },
    {
      label: 'contextMenu.cut',
      order: 40,
      type: BpmnContextMenuType.cut,
      icon: 'crop.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        ...generalCategories,
        PaletteCategory.diagram
      ]
    },
    {
      label: 'contextMenu.delete',
      order: 1,
      type: BpmnContextMenuType.delete,
      icon: 'clear.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        ...generalCategories,
        PaletteCategory.lane,
        PaletteCategory.link
      ]
    },
    {
      label: 'contextMenu.align',
      order: 1,
      type: BpmnContextMenuType.align,
      icon: 'clear.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        ...generalCategories
      ],
      childrens: [
        ...alignOptions
      ]
    },
    {
      label: 'contextMenu.distribute',
      order: 1,
      type: BpmnContextMenuType.distribute,
      icon: 'clear.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        ...generalCategories
      ],
      childrens: [
        ...ditributeOptions
      ]
    },
    {
      label: 'contextMenu.properties',
      order: 30,
      type: BpmnContextMenuType.properties,
      icon: 'build.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        ...generalCategories,
        PaletteCategory.lane
      ]
    },
    {
      label: 'contextMenu.undo',
      order: 45,
      type: BpmnContextMenuType.undo,
      icon: 'undo.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        PaletteCategory.diagram
      ]
    },
    {
      label: 'contextMenu.redo',
      order: 50,
      type: BpmnContextMenuType.rendo,
      icon: 'redo.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        PaletteCategory.diagram
      ]
    },
    {
      label: 'contextMenu.convertTo.mainText',
      order: 50,
      type: null,
      icon: 'swap_horiz.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        PaletteCategory.event,
        PaletteCategory.gateway,
        PaletteCategory.activity,
        PaletteCategory.subprocess,
        PaletteCategory.lane,
        PaletteCategory.link
      ],
      childrens: [
        ...convertToEventStart,
        ...convertToEventIntermediate,
        ...convertToEventEnd,
        ...convertToGateway,
        ...convertToTask,
        ...convertToSubprocess,
        ...convertToLink
      ]
    },
    {
      label: 'contextMenu.intanceTask.mainText',
      order: 55,
      type: null,
      icon: 'redo.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        PaletteCategory.activity
      ],
      childrens: [
        ...instanceActivities
      ]
    },
    {
      label: 'contextMenu.repeatTask.mainText',
      order: 55,
      type: null,
      icon: 'repeat.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        PaletteCategory.activity,
        PaletteCategory.subprocess
      ],
      childrens: [
        ...repeatActivities
      ]
    },
    {
      label: 'contextMenu.edgeEvent.mainText',
      order: 55,
      type: null,
      icon: 'link.svg',
      iconType: BpmnContextIconType.svg,
      includeFor: [
        PaletteCategory.activity,
        PaletteCategory.subprocess
      ],
      childrens: [
        ...edgetEvents
      ]
    }
  ];
}
