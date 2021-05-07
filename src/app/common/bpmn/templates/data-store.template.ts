import { textBlockTemplate } from '../palette/palette.utils';
import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';
import { avoidNodeOverlap, nodeSelectionAdornmentTemplate, editText } from '../common/bpmn.functions';
import { tooltiptemplate } from './tooltip.template';

export function dataStoreNodeTemplate(go: any, $: any, config: BpmnConfig) {
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
    dataStoreSymbolTemplare(go, $, config),
    textBlockTemplate(go,$,false,true),
  );
}
export function dataStoreSymbolTemplare(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Spot',
    $(go.Shape, 'Database',
      {
        name: 'SHAPE',
        portId: '',
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
        fill: config.BackgroundDark,
        desiredSize: new go.Size(config.EventNodeSize, config.EventNodeSize),
        stroke: config.LabelTextColor
      }
    ),
    $(go.Shape, "Rectangle",{
      fromLinkable: false, toLinkable: false, cursor: 'auto', fill: "transparent", stroke: null, desiredSize: new go.Size((config.EventNodeSize / 2), (config.EventNodeSize / 2))
    }),
  );
}
