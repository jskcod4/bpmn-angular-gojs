import { getActivityNodeMenu } from '../../common/bpmn.functions';
import { getBlockText } from '../../palette/palette.utils';
import { BpmnConfig } from '../../common/bpmn.interface';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { tooltiptemplate } from '../tooltip.template';

export function groupNodeForTemplate(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Node, 'Spot',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      resizable: true,
      resizeObjectName: 'PANEL',
      selectionAdorned: false,
      toolTip: tooltiptemplate(go, $),
      contextMenu: getActivityNodeMenu(go, $),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('layerName', 'isSelected', s => {
      return s ? 'Foreground' : '';
    }).ofObject(),
    $(go.Panel, 'Auto',
      {
        name: 'PANEL',
        desiredSize: new go.Size(60, 45)
      },
      new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
      $(go.Panel, 'Spot',
        $(go.Shape, 'RoundedRectangle',
          {
            name: 'SHAPE',
            fill: config.BackgroundDark,
            parameter1: 5,
            parameter2: 5,
            fromLinkable: false,
            toLinkable: false,
            cursor: 'pointer',
            strokeWidth: 1,
            strokeDashArray: [9, 1, 9],
            stroke: config.ActivityNodeStroke,
            strokeDashOffset: 10,
            strokeJoin : 'round',
            strokeCap: 'round'
          }
        )
      ),
      $(go.TextBlock,
        getBlockText(go),
        new go.Binding('text').makeTwoWay()
      )
    )
  );
}
