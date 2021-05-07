import { tooltiptemplate } from './tooltip.template';
import { nodeGatewaySymbolTypeConverter, avoidNodeOverlap, nodeSelectionAdornmentTemplate, editText } from '../common/bpmn.functions';
import { GatewayType } from '../common/bpmn.enum';
import { BpmnConfig } from '../common/bpmn.interface';
import { BpmnScriptConfig } from '../bpmn.config';
import { getContextMenu } from '../menu-context';
import { textBlockTemplate } from '../palette/palette.utils';

export function gatewayNodeTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Node, 'Spot',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      toolTip: tooltiptemplate(go, $),
      dragComputation: avoidNodeOverlap,
      contextMenu: getContextMenu(),
      doubleClick: editText,
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('layerName', 'isSelected', s => {
      return s ? 'Foreground' : '';
    }).ofObject(),
    {
      resizable: false,
      resizeObjectName: 'SHAPE'
    },
    gatewaySymbolTemplate(go, $, config),
    textBlockTemplate(go,$,false,true),
  );
}

export function gatewaySymbolTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Spot',
    $(go.Panel, 'Spot',
      $(go.Shape, 'Diamond',
      {
        strokeWidth: 1,
        fill: config.GatewayNodeFill,
        stroke: config.GatewayNodeStroke,
        name: 'SHAPE',
        desiredSize: new go.Size(config.GatewayNodeSize / 2, config.GatewayNodeSize / 2),
        portId: '',
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
        fromSpot: go.Spot.NotLeftSide,
        toSpot: go.Spot.NotRightSide
      },
      new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)),
      $(go.Shape, 'NotAllowed',
        {
          alignment: go.Spot.Center,
          stroke: config.GatewayNodeSymbolStroke
        },
        new go.Binding('figure', 'gatewayType', nodeGatewaySymbolTypeConverter),
        new go.Binding('fill', 'gatewayType', s => {
          if (+s === GatewayType.inclusive || +s === GatewayType.eventBasedGateway || +s == GatewayType.eventBasedStart) {
            return config.GatewayNodeFill;
          }
          return config.GatewayNodeSymbolFill
        }),
        new go.Binding('strokeWidth', 'gatewayType', s => {
          if (
            +s === GatewayType.complex || +s === GatewayType.parallel ||
            +s === GatewayType.inclusive || +s === GatewayType.eventBasedGateway ||
            +s === GatewayType.eventBasedStart || +s === GatewayType.parallelEvent) {
            return 2;
          } else {
            return 0;
          }
        }),
        new go.Binding('desiredSize', 'gatewayType', s => {
          const size = new go.Size(config.GatewayNodeSymbolSize / 2, config.GatewayNodeSymbolSize / 2);
          if (+s === GatewayType.parallel) {
            size.width = size.width / 4 * 3;
            size.height = size.height / 4 * 3;
          }
          if (+s === GatewayType.exclusive) {
            size.width = size.width / 4 * 3;
            size.height = size.height / 4 * 3;
          }
          if (+s > 4) {
            size.width = size.width / 1.6;
            size.height = size.height / 1.6;
          }
          return size;
        }),
        new go.Binding('visible', '', s => {
          return +s.gatewayType !== GatewayType.general && typeof s.isText == 'undefined';
        })
      ),
      $(go.Shape, 'NotAllowed',
        {
          alignment: go.Spot.Center,
          stroke: BpmnScriptConfig.GatewayNodeSymbolStroke
        },
        new go.Binding('figure', 'gatewayType', nodeGatewaySymbolTypeConverter),
        new go.Binding('fill', 'gatewayType', s => {
          if (+s === GatewayType.inclusive || +s === GatewayType.eventBasedGateway || +s == GatewayType.eventBasedStart) {
            return BpmnScriptConfig.GatewayNodeFill;
          }
          return BpmnScriptConfig.GatewayNodeSymbolFill
        }),
        new go.Binding('strokeWidth', 'gatewayType', s => {
          if (
            +s === GatewayType.complex || +s === GatewayType.parallel ||
            +s === GatewayType.inclusive || +s === GatewayType.eventBasedGateway ||
            +s === GatewayType.eventBasedStart || +s === GatewayType.parallelEvent) {
            return 2;
          } else {
            return 0;
          }
        }),
        new go.Binding('desiredSize', 'sizeIcon', go.Size.parse).makeTwoWay(go.Size.stringify),
        new go.Binding('visible', '', s => {
          return typeof s.isText !== 'undefined' && s.gatewayType !== GatewayType.general;
        })
      ),
      $(go.Shape, 'Circle',
        {
          strokeWidth: 1,
          stroke: config.GatewayNodeSymbolStroke,
          fill: null,
          desiredSize: new go.Size(config.EventNodeSize / 1.6, config.EventNodeSize / 1.6)
        },
        new go.Binding('visible', 'gatewayType', s => {
          return +s >= 5;
        }),
        new go.Binding('desiredSize', 'sizeC1', go.Size.parse).makeTwoWay(go.Size.stringify)
      ),
      $(go.Shape, 'Circle',
        {
          alignment: go.Spot.Center,
          stroke: config.GatewayNodeSymbolStroke,
          desiredSize: new go.Size(config.EventNodeInnerSize / 1.8 , config.EventNodeInnerSize / 1.8),
          fill: null
        },
        new go.Binding('strokeWidth', 'gatewayType', s => {
          if (+s === GatewayType.eventBasedGateway) {
            return 1;
          }
          return 0;
        }),
        new go.Binding('visible', 'gatewayType', s => {
          if (+s === GatewayType.eventBasedGateway) {
            return true;
          }
          return false;
        }),
        new go.Binding('desiredSize', 'sizeC2', go.Size.parse).makeTwoWay(go.Size.stringify)
      ),
      $(go.Shape, "Diamond",{
        fromLinkable: false, toLinkable: false, cursor: 'auto', fill: "transparent", stroke: null, desiredSize: new go.Size((config.GatewayNodeSize / 4), (config.GatewayNodeSize / 4))
      }),
    )
  )
}
