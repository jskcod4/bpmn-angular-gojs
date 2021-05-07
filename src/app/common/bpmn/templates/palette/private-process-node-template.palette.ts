import { BpmnScriptConfig } from '../../bpmn.config';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { BpmnConfig } from '../../common/bpmn.interface';

export function privateProcessNodeTemplateForPalette(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Node, 'Vertical',
    { locationSpot: go.Spot.Center },
    $(go.Shape, 'Process',
      {
        fill: BpmnScriptConfig.DataFill,
        desiredSize: new go.Size(BpmnScriptConfig.GatewayNodeSize / 2, BpmnScriptConfig.GatewayNodeSize / 4)
      }
    ),
    $(go.TextBlock,
      {
        margin: 5,
        editable: true,
        stroke: BpmnScriptConfig.LabelTextColor
      },
      new go.Binding('text')
    )
  );
}
