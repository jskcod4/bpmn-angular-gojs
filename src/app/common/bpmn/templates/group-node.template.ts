import { editText, nodeSelectionAdornmentTemplate } from '../common/bpmn.functions';
import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';
import { tooltiptemplate } from './tooltip.template';

export function groupNodeTemplate(go: any, $: any, config: BpmnConfig ) {
  return $(go.Node, 'Spot',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      resizable: true,
      resizeObjectName: 'PANEL',
      selectionAdorned: false,
      toolTip: tooltiptemplate(go, $),
      contextMenu: getContextMenu(),
      doubleClick: editText,
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$)
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('layerName', 'isSelected', s => {
      return s ? 'Foreground' : '';
    }).ofObject(),
    groupSymbolTemplate(go, $, config)
  );
}

export function groupSymbolTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Auto',
    {
      name: 'PANEL',
      minSize: new go.Size(config.ActivityNodeWidth, config.ActivityNodeHeight),
      desiredSize: new go.Size(config.ActivityNodeWidth, config.ActivityNodeHeight)
    },
    new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
    $(go.Panel, 'Spot',
      $(go.Shape, 'RoundedRectangle',
        {
          name: 'SHAPE',
          fill: null,
          parameter1: 5,
          parameter2: 5,
          fromLinkable: false,
          toLinkable: false,
          cursor: 'pointer',
          strokeWidth: 2,
          strokeDashArray: [9, 1, 9],
          stroke: config.ActivityNodeStroke,
          strokeDashOffset: 10,
          strokeJoin : 'round',
          strokeCap: 'round'
        }
      )
    ),
    $(go.TextBlock,
      {
        alignment: go.Spot.TopLeft,
        margin: 10,
        editable: true,
        stroke: config.BackgroundDark,
        doubleClick: editText
      },
      new go.Binding('text').makeTwoWay()
    )
  )
}
