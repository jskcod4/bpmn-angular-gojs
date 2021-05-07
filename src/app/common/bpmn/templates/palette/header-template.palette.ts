import { getBlockText } from '../../palette/palette.utils';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { BpmnConfig } from '../../common/bpmn.interface';
import { tooltiptemplate } from '../tooltip.template';

export function headerNodeTemplateForPalette(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Node, 'Vertical',
    {
      stretch: go.GraphObject.Fill,
      locationSpot: go.Spot.Center,
      toolTip: tooltiptemplate(go, $),
    },
    $(go.TextBlock,
      {
        ...getBlockText(go, true),
        height: 50,
        verticalAlignment: go.Spot.Center,
      },
      new go.Binding('text').makeTwoWay()
    )
  );
}
