import { getBlockText } from '../../palette/palette.utils';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { BpmnConfig } from '../../common/bpmn.interface';
import { tooltiptemplate } from '../tooltip.template';

export function poolTemplateForPalette(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Group, 'Vertical',
    {
      locationSpot: go.Spot.Center,
      computesBoundsIncludingLinks: false,
      isSubGraphExpanded: false,
      toolTip: tooltiptemplate(go, $)
    },
    $(go.Shape, 'Process',
      {
        fill: config.BackgroundDark,
        desiredSize: new go.Size(config.GatewayNodeSize / 2, config.GatewayNodeSize / 4),
        stroke: config.PoolStroke
      }
    ),
    $(go.Shape, 'Process',
      {
        fill: config.BackgroundDark,
        desiredSize: new go.Size(config.GatewayNodeSize / 2, config.GatewayNodeSize / 4),
        stroke: config.PoolStroke
      }
    ),
    $(go.TextBlock,
      getBlockText(go),
      new go.Binding('text')
    )
  );
}
