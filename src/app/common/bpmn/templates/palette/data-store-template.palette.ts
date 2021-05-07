import { getBlockText } from '../../palette/palette.utils';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { BpmnConfig } from '../../common/bpmn.interface';
import { tooltiptemplate } from '../tooltip.template';

export function dataStoreNodeForTemplate(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Node, 'Vertical',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      toolTip: tooltiptemplate(go, $),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
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
    $(go.TextBlock,
      getBlockText(go),
      new go.Binding('text').makeTwoWay()
    )
  );
}
