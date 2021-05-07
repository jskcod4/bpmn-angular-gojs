import { getBlockText } from '../../palette/palette.utils';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { BpmnConfig } from '../../common/bpmn.interface';
import { tooltiptemplate } from '../tooltip.template';

export function annotationNodeTemplateForPalette(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Node, 'Auto',
    {
      background: config.BackgroundDark,
      locationSpot: go.Spot.Center,
      toolTip: tooltiptemplate(go, $),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Shape, 'Annotation',
      {
        portId: '',
        fromLinkable: true,
        cursor: 'pointer',
        fromSpot: go.Spot.Left,
        strokeWidth: 3,
        stroke: config.AnnotationFill,
        parameter1: 15
      }),
    $(go.TextBlock,
      {
        ...getBlockText(go),
        margin: 10
      },
      new go.Binding('text').makeTwoWay()
    )
  );
}
