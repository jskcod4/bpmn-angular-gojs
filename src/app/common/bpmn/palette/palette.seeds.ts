import { subProcessGroupTemplateForPalette } from '../templates/palette/subprocess-group-template.palette';
import { swimLanesGroupTemplateForPalette } from '../templates/palette/swin-lanes-group.template.palette';
import { annotationNodeTemplateForPalette } from '../templates/palette/annotation-node-template.palette';
import { activityNodeTemplateForPalette } from '../templates/palette/activity-node-template.palette';
import { gatewayNodeTemplateForPalette } from '../templates/palette/gateway-node-template.palette';
import { eventNodeTemplateForPalette } from '../templates/palette/event-node-template.palette';
import { dataObjectNodeForTemplate } from '../templates/palette/data-object-template.palette';
import { dataStoreNodeForTemplate } from '../templates/palette/data-store-template.palette';
import { headerNodeTemplateForPalette } from '../templates/palette/header-template.palette';
import { poolTemplateForPalette } from '../templates/palette/pool-template.palette';
import { groupNodeForTemplate } from '../templates/palette/group-template.palette';

import { GatewayType, EventDimension, StartEventType, ActivityType, DataObjectType, ActivityInstance } from '../common/bpmn.enum';
import { keyCompare } from '../common/bpmn.functions';
import { PaletteSeed } from './palette.interface';
import { PaletteCategory } from './palette.enum';

export function mainPalette(go: any, $: any): PaletteSeed {
  return {
    idDivElement: 'main-palette',
    templates: [
      {
        key: PaletteCategory.event,
        function: eventNodeTemplateForPalette
      }, {
        key: PaletteCategory.gateway,
        function: gatewayNodeTemplateForPalette
      }, {
        key: PaletteCategory.annotation,
        function: annotationNodeTemplateForPalette
      }, {
        key: PaletteCategory.dataObject,
        function: dataObjectNodeForTemplate
      }, {
        key: PaletteCategory.dataWarehousing,
        function: dataStoreNodeForTemplate
      },{
        key: PaletteCategory.group,
        function: groupNodeForTemplate
      }, {
        key: PaletteCategory.header,
        function: headerNodeTemplateForPalette
      }
    ],
    groupTemplate: [
      {
        key: PaletteCategory.activity,
        function: activityNodeTemplateForPalette
      }, {
        key: PaletteCategory.subprocess,
        function: subProcessGroupTemplateForPalette
      }, {
        key: PaletteCategory.pool,
        function: poolTemplateForPalette
      }, {
        key: PaletteCategory.lane,
        function: swimLanesGroupTemplateForPalette
      }
    ],
    layout: $(go.GridLayout,
      {
        cellSize: new go.Size(1, 1),
        spacing: new go.Size(0, 7),
        comparer: keyCompare
      }
    ),
    model: {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [

        { key: 50, category: PaletteCategory.pool, tooltip: 'tooltip.pool.main', isPalettaNew: true, text: 'palette.pool.main', isGroup: true },
        { key: '-805', category: PaletteCategory.lane, tooltip: 'tooltip.lane.main', isPalettaNew: true, text: '', isGroup: true, group: 50, color: 'white', size: '200 150' },

        { key: 101, category: PaletteCategory.event, tooltip: 'tooltip.event.start', isPalettaNew: true, text: 'palette.event.start', eventType: StartEventType.general, eventDimension: EventDimension.start, item: 'start', isMainPalette: true },
        { key: 201, category: PaletteCategory.event, tooltip: 'tooltip.event.intermediate', isPalettaNew: true, text: 'palette.event.intermediate', eventType: StartEventType.general, eventDimension: EventDimension.intermediate, item: 'intermediate', isMainPalette: true },
        { key: 301, category: PaletteCategory.event, tooltip: 'tooltip.event.end', isPalettaNew: true, text: 'palette.event.end', eventType: StartEventType.general, eventDimension: EventDimension.end, item: 'end', isMainPalette: true },

        { key: 401, category: PaletteCategory.gateway, tooltip: 'tooltip.gateway.main', isPalettaNew: true, text: 'palette.gateway.main', gatewayType: GatewayType.general },

        { key: 501, category: PaletteCategory.activity, tooltip: 'tooltip.task.main', isPalettaNew: true, text: 'palette.task.main', item: 'generic task', isGroup: true, taskType: 0 },

        { key: 601, category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.main', isPalettaNew: true, text: 'palette.subProcess.main', isGroup: true, isSubProcess: true, taskType: 0 },
        { key: -802, category: PaletteCategory.event, group: 601, tooltip: 'tooltip.event.start', isPalettaNew: true, text: 'palette.event.start', eventType: StartEventType.general, eventDimension: EventDimension.start, item: 'start' },
        { key: -803, category: PaletteCategory.event, group: 601, tooltip: 'tooltip.event.end', isPalettaNew: true, text: 'palette.event.end', eventType: StartEventType.general, eventDimension: EventDimension.end, item: 'end', name: 'end' },

        { key: 701, category: PaletteCategory.dataObject, tooltip: 'tooltip.dataObject.main', isPalettaNew: true, text: 'palette.dataObject.main' },

        { key: 801, category: PaletteCategory.dataWarehousing, notHoverChange: true, tooltip: 'tooltip.dataWarehousing.main', isPalettaNew: true, text: 'palette.dataWarehousing.main' },

        { key: 901, category: PaletteCategory.group, tooltip: 'tooltip.group.main', isPalettaNew: true, text: 'palette.group.main', item: 'generic task', taskType: 0 },
        { key: 1001 , category: PaletteCategory.annotation, tooltip: 'tooltip.note.main', isPalettaNew: true, text: 'palette.note.main' },

        { key: 1101 , category: PaletteCategory.header, tooltip: 'tooltip.header.main', isPalettaNew: true, text: 'palette.header.main', mainTemplate: true },
      ]
    }
  }
}

export function gatewayPalette(go: any, $: any): PaletteSeed {
  return {
    idDivElement: 'hover-palette',
    templates: [
      {
        key: PaletteCategory.gateway,
        function: gatewayNodeTemplateForPalette
      }
    ],
    groupTemplate: [],
    layout: $(go.GridLayout,
      {
        cellSize: new go.Size(70, 70),
        spacing: new go.Size(20, 5),
        alignment: go.GridLayout.Position
      }
    ),
    model: {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 201, category: PaletteCategory.gateway, isPalettaNew: true, tooltip: 'palette.gateway.main', text: 'palette.gateway.main', gatewayType: GatewayType.general },
        { key: 201, category: PaletteCategory.gateway, isPalettaNew: true, tooltip: 'palette.gateway.parallel', text: 'palette.gateway.parallel', gatewayType: GatewayType.parallel },
        { key: 202, category: PaletteCategory.gateway, isPalettaNew: true, tooltip: 'palette.gateway.inclusive', text: 'palette.gateway.inclusive', gatewayType: GatewayType.inclusive },
        { key: 203, category: PaletteCategory.gateway, isPalettaNew: true, tooltip: 'palette.gateway.complex', text: 'palette.gateway.complex', gatewayType: GatewayType.complex },
        { key: 204, category: PaletteCategory.gateway, isPalettaNew: true, tooltip: 'palette.gateway.exclusive', text: 'palette.gateway.exclusive', gatewayType: GatewayType.exclusive },
        { key: 205, category: PaletteCategory.gateway, isPalettaNew: true, tooltip: 'palette.gateway.eventBasedGateway', text: 'palette.gateway.eventBasedGateway', gatewayType: GatewayType.eventBasedGateway },
        { key: 206, category: PaletteCategory.gateway, isPalettaNew: true, tooltip: 'palette.gateway.eventBasedExclusive', text: 'palette.gateway.eventBasedExclusive', gatewayType: GatewayType.eventBasedExclusive },
        { key: 207, category: PaletteCategory.gateway, isPalettaNew: true, tooltip: 'palette.gateway.eventBasedParallel', text: 'palette.gateway.eventBasedParallel', gatewayType: GatewayType.parallelEvent }
      ]
    }
  }
}

export function startEventPalette(go: any, $: any): PaletteSeed {
  return {
    idDivElement: 'hover-palette',
    templates: [
      {
        key: PaletteCategory.event,
        function: eventNodeTemplateForPalette
      }
    ],
    groupTemplate: [],
    layout: $(go.GridLayout,
      {
        cellSize: new go.Size(75, 75),
        spacing: new go.Size(20, 5),
        alignment: go.GridLayout.Position
      }
    ),
    model: {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 101, category: PaletteCategory.event, tooltip: 'tooltip.event.start', isPalettaNew: true, text: 'palette.event.start', eventType: StartEventType.general, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: 102, category: PaletteCategory.event, tooltip: 'tooltip.event.message', isPalettaNew: true, text: 'palette.event.message', eventType: StartEventType.message, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: 103, category: PaletteCategory.event, tooltip: 'tooltip.event.timer', isPalettaNew: true, text: 'palette.event.timer', eventType: StartEventType.timer, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: 104, category: PaletteCategory.event, tooltip: 'tooltip.event.escalation', isPalettaNew: true, text: 'palette.event.escalation', eventType: StartEventType.escalation, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: 105, category: PaletteCategory.event, tooltip: 'tooltip.event.condition', isPalettaNew: true, text: 'palette.event.condition', eventType: StartEventType.condition, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: 107, category: PaletteCategory.event, tooltip: 'tooltip.event.error', isPalettaNew: true, text: 'palette.event.error', eventType: StartEventType.error, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: 109, category: PaletteCategory.event, tooltip: 'tooltip.event.compesation', isPalettaNew: true, text: 'palette.event.compesation', eventType: StartEventType.compensation, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: 110, category: PaletteCategory.event, tooltip: 'tooltip.event.signal', isPalettaNew: true, text: 'palette.event.signal', eventType: StartEventType.signal, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: 111, category: PaletteCategory.event, tooltip: 'tooltip.event.multiple', isPalettaNew: true, text: 'palette.event.multiple', eventType: StartEventType.multiple, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: 112, category: PaletteCategory.event, tooltip: 'tooltip.event.parallel', isPalettaNew: true, text: 'palette.event.parallel', eventType: StartEventType.parallel, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
      ]
    }
  }
}

export function intermediateEventPalette(go: any, $: any): PaletteSeed {
  return {
    idDivElement: 'hover-palette',
    templates: [
      {
        key: PaletteCategory.event,
        function: eventNodeTemplateForPalette
      }
    ],
    groupTemplate: [],
    layout: $(
      go.GridLayout,
      {
        cellSize: new go.Size(75, 75),
        spacing: new go.Size(20, 5),
        alignment: go.GridLayout.Position
      }
    ),
    model: {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 101, category: PaletteCategory.event, tooltip: 'tooltip.event.intermediate', isPalettaNew: true, text: 'palette.event.intermediate', eventType: StartEventType.general, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 102, category: PaletteCategory.event, tooltip: 'tooltip.event.message', isPalettaNew: true, text: 'palette.event.message', eventType: StartEventType.message, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 103, category: PaletteCategory.event, tooltip: 'tooltip.event.timer', isPalettaNew: true, text: 'palette.event.timer', eventType: StartEventType.timer, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 104, category: PaletteCategory.event, tooltip: 'tooltip.event.escalation', isPalettaNew: true, text: 'palette.event.escalation', eventType: StartEventType.escalation, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 105, category: PaletteCategory.event, tooltip: 'tooltip.event.condition', isPalettaNew: true, text: 'palette.event.condition', eventType: StartEventType.condition, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 107, category: PaletteCategory.event, tooltip: 'tooltip.event.error', isPalettaNew: true, text: 'palette.event.error', eventType: StartEventType.error, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 109, category: PaletteCategory.event, tooltip: 'tooltip.event.compesation', isPalettaNew: true, text: 'palette.event.compesation', eventType: StartEventType.compensation, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 110, category: PaletteCategory.event, tooltip: 'tooltip.event.signal', isPalettaNew: true, text: 'palette.event.signal', eventType: StartEventType.signal, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 111, category: PaletteCategory.event, tooltip: 'tooltip.event.multiple', isPalettaNew: true, text: 'palette.event.multiple', eventType: StartEventType.multiple, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 112, category: PaletteCategory.event, tooltip: 'tooltip.event.parallel', isPalettaNew: true, text: 'palette.event.parallel', eventType: StartEventType.parallel, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 113, category: PaletteCategory.event, tooltip: 'tooltip.event.cancel', isPalettaNew: true, text: 'palette.event.cancel', eventType: StartEventType.cancel, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false },
        { key: 114, category: PaletteCategory.event, tooltip: 'tooltip.event.link', isPalettaNew: true, text: 'palette.event.link', eventType: StartEventType.link, eventDimension: EventDimension.intermediate, item: 'start', isMainPalette: false }
      ]
    }
  }
}

export function endEventPalette(go: any, $: any): PaletteSeed {
  return {
    idDivElement: 'hover-palette',
    templates: [
      {
        key: PaletteCategory.event,
        function: eventNodeTemplateForPalette
      }
    ],
    groupTemplate: [],
    layout: $(go.GridLayout,
      {
        cellSize: new go.Size(75, 75),
        spacing: new go.Size(20, 5),
        alignment: go.GridLayout.Position
      }
    ),
    model: {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 101, category: PaletteCategory.event, tooltip: 'tooltip.event.end', isPalettaNew: true, text: 'palette.event.end', eventType: StartEventType.general, eventDimension: EventDimension.end, item: 'start', isMainPalette: false },
        { key: 102, category: PaletteCategory.event, tooltip: 'tooltip.event.message', isPalettaNew: true, text: 'palette.event.message', eventType: StartEventType.message, eventDimension: EventDimension.end, item: 'start', isMainPalette: false },
        { key: 104, category: PaletteCategory.event, tooltip: 'tooltip.event.escalation', isPalettaNew: true, text: 'palette.event.escalation', eventType: StartEventType.escalation, eventDimension: EventDimension.end, item: 'start', isMainPalette: false },
        { key: 107, category: PaletteCategory.event, tooltip: 'tooltip.event.error', isPalettaNew: true, text: 'palette.event.error', eventType: StartEventType.error, eventDimension: EventDimension.end, item: 'start', isMainPalette: false },
        { key: 109, category: PaletteCategory.event, tooltip: 'tooltip.event.compesation', isPalettaNew: true, text: 'palette.event.compesation', eventType: StartEventType.compensation, eventDimension: EventDimension.end, item: 'start', isMainPalette: false },
        { key: 110, category: PaletteCategory.event, tooltip: 'tooltip.event.signal', isPalettaNew: true, text: 'palette.event.signal', eventType: StartEventType.signal, eventDimension: EventDimension.end, item: 'start', isMainPalette: false },
        { key: 111, category: PaletteCategory.event, tooltip: 'tooltip.event.multiple', isPalettaNew: true, text: 'palette.event.multiple', eventType: StartEventType.multiple, eventDimension: EventDimension.end, item: 'start', isMainPalette: false },
        { key: 112, category: PaletteCategory.event, tooltip: 'tooltip.event.termination', isPalettaNew: true, text: 'palette.event.termination', eventType: StartEventType.termination, eventDimension: EventDimension.end, item: 'start', isMainPalette: false },
      ]
    }
  }
}

export function activityPalette(go: any, $: any): PaletteSeed {
  return {
    idDivElement: 'hover-palette',
    templates: [],
    groupTemplate: [
      {
        key: PaletteCategory.activity,
        function: activityNodeTemplateForPalette
      }
    ],
    layout: $(go.GridLayout,
      {
        cellSize: new go.Size(70, 65),
        spacing: new go.Size(20, 7),
        alignment: go.GridLayout.Position
      }
    ),
    model: {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 101, category: PaletteCategory.activity, isPalettaNew: true, text: 'palette.task.main', item: 'generic task', isGroup: true, taskType: ActivityType.general, isMainPalette: false },
        { key: 102, category: PaletteCategory.activity, isPalettaNew: true, text: 'palette.task.message', item: 'generic task', isGroup: true, taskType: ActivityType.message, isMainPalette: false },
        { key: 103, category: PaletteCategory.activity, isPalettaNew: true, text: 'palette.task.user', item: 'generic task', isGroup: true, taskType: ActivityType.user, isMainPalette: false },
        { key: 104, category: PaletteCategory.activity, isPalettaNew: true, text: 'palette.task.manual', item: 'generic task', isGroup: true, taskType: ActivityType.manual, isMainPalette: false },
        { key: 105, category: PaletteCategory.activity, isPalettaNew: true, text: 'palette.task.script', item: 'generic task', isGroup: true, taskType: ActivityType.script, isMainPalette: false },
        { key: 106, category: PaletteCategory.activity, isPalettaNew: true, text: 'palette.task.sendMessage', item: 'generic task', isGroup: true, taskType: ActivityType.sendMessage, isMainPalette: false },
        { key: 107, category: PaletteCategory.activity, isPalettaNew: true, text: 'palette.task.service', item: 'generic task', isGroup: true, taskType: ActivityType.service, isMainPalette: false },
        { key: 108, category: PaletteCategory.activity, isPalettaNew: true, text: 'palette.task.businessRule', item: 'generic task', isGroup: true, taskType: ActivityType.businessRule, isMainPalette: false }
      ]
    }
  }
}

export function subProcessPalette(go: any, $: any): PaletteSeed {
  return {
    idDivElement: 'hover-palette',
    templates: [
      {
        key: PaletteCategory.event,
        function: eventNodeTemplateForPalette
      }
    ],
    groupTemplate: [
      {
        key: PaletteCategory.activity,
        function: activityNodeTemplateForPalette
      }, {
        key: PaletteCategory.subprocess,
        function: subProcessGroupTemplateForPalette
      }, {
        key: PaletteCategory.pool,
        function: poolTemplateForPalette
      }, {
        key: PaletteCategory.lane,
        function: swimLanesGroupTemplateForPalette
      }
    ],
    layout: $(go.GridLayout,
      {
        cellSize: new go.Size(75, 65),
        spacing: new go.Size(15, 7),
        alignment: go.GridLayout.Position
      }
    ),
    model: {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 1, category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.main', isPalettaNew: true, text: 'palette.subProcess.main', isGroup: true, isSubProcess: true, taskType: 1, isMainPalette: false },
        { key: -802, category: PaletteCategory.event, group: 1, isPalettaNew: true, text: 'palette.start', eventType: StartEventType.general, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: -803, category: PaletteCategory.event, group: 1, isPalettaNew: true, text: 'palette.end', eventType: StartEventType.general, eventDimension: EventDimension.end, item: 'end', name: 'end', isMainPalette: false },
        { key: 5, category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.adhocSub', isPalettaNew: true, text: 'palette.subProcess.adhocSub', isGroup: true, isSubProcess: true, isAdHoc: true, taskType: 0, loc: '0 0', isMainPalette: false },
        { key: -812, category: PaletteCategory.activity, group: 5, tooltip: 'tooltip.subProcess.main', isPalettaNew: true, text: 'palette.subProcess.main', item: 'generic task', taskType: ActivityType.general, isMainPalette: false },
        { key: -813, category: PaletteCategory.activity, group: 5, tooltip: 'tooltip.subProcess.main', isPalettaNew: true, text: 'palette.subProcess.main', item: 'generic task', taskType: ActivityType.general, isMainPalette: false },
        { key: 10, category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.eventSubprocess', isPalettaNew: true, text: 'palette.subProcess.eventSubprocess', isGroup: true, isSubProcess: true, taskType: 1, isMainPalette: false },
        { key: -802, category: PaletteCategory.event, group: 10, tooltip: 'tooltip.event.message', isPalettaNew: true, text: 'palette.event.message', eventType: StartEventType.message, eventDimension: EventDimension.start, item: 'start', isMainPalette: false },
        { key: -803, category: PaletteCategory.event, group: 10, tooltip: 'tooltip.event.end', isPalettaNew: true, text: 'palette.event.end', eventType: StartEventType.general, eventDimension: EventDimension.end, item: 'end', name: 'end', isMainPalette: false },
        { key: 15, category: PaletteCategory.subprocess, tooltip: 'tooltip.subProcess.callActivity', isPalettaNew: true, text: 'palette.subProcess.callActivity', isCall: true, isGroup: true, isSubProcess: false, notHoverChange: true, item: 'generic task', taskType: ActivityType.callActivity, isMainPalette: false }
      ]
    }
  }
}

export function dataObjectPalette(go: any, $: any): PaletteSeed {
  return {
    idDivElement: 'hover-palette',
    templates: [
      {
        key: PaletteCategory.dataObject,
        function: dataObjectNodeForTemplate
      }, {
        key: PaletteCategory.dataWarehousing,
        function: dataStoreNodeForTemplate
      }
    ],
    groupTemplate: [],
    layout: $(go.GridLayout,
      {
        cellSize: new go.Size(1, 1),
        spacing: new go.Size(0, 5),
        comparer: keyCompare
      }
    ),
    model: {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 301, category: PaletteCategory.dataObject, tooltip: 'tooltip.dataObject.main', isPalettaNew: true, text: 'palette.dataObject.main', dataObjectType: DataObjectType.dataObject },
        { key: 302, category: PaletteCategory.dataObject, tooltip: 'tooltip.dataObject.dataInput', isPalettaNew: true, text: 'palette.dataObject.dataInput', dataObjectType: DataObjectType.dataInput },
        { key: 303, category: PaletteCategory.dataObject, tooltip: 'tooltip.dataObject.dataOutput', isPalettaNew: true, text: 'palette.dataObject.dataOutput', dataObjectType: DataObjectType.dataOutput, notHoverChange: true }
      ]
    }
  }
}

export function dataWarehousingPalette(go: any, $: any): PaletteSeed {
  return {
    idDivElement: 'hover-palette',
    templates: [
      {
        key: PaletteCategory.dataObject,
        function: dataObjectNodeForTemplate
      }, {
        key: PaletteCategory.dataWarehousing,
        function: dataStoreNodeForTemplate
      }
    ],
    groupTemplate: [],
    layout: $(go.GridLayout,
      {
        cellSize: new go.Size(1, 1),
        spacing: new go.Size(0, 5),
        comparer: keyCompare
      }
    ),
    model: {
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: [
        { key: 304, category: PaletteCategory.dataWarehousing, notHoverChange: true, tooltip: 'tooltip.dataStorage.main', isPalettaNew: true, text: 'palette.dataStorage' }
      ]
    }
  }
}
