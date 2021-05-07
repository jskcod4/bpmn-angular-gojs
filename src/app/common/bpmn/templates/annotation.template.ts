import { getBlockText } from '../palette/palette.utils';
import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';
import { avoidNodeOverlap, nodeSelectionAdornmentTemplate } from '../common/bpmn.functions';
import { tooltiptemplate } from './tooltip.template';

export function annotationNodeTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Node, 'Auto',
    {
      background: null,
      locationSpot: go.Spot.Center,
      dragComputation: avoidNodeOverlap,
      toolTip: tooltiptemplate(go, $),
      contextMenu: getContextMenu(),
      resizable: true,
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$)
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    annotationSymbolTemplate(go, $, config),
    $(go.TextBlock,
      {
        ...getBlockText(go, false),
        margin: 10
      },
      new go.Binding('text').makeTwoWay()
    )
  );
}

export function annotationSymbolTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Auto',
    $(go.Shape, 'Annotation',
      {
        portId: '',
        fromLinkable: true,
        cursor: 'pointer',
        fromSpot: go.Spot.Left,
        strokeWidth: 3,
        stroke: config.BackgroundDark,
        parameter1: 15
      },
      new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)
    )
  )
}
