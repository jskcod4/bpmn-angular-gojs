import { BpmnScriptConfig } from '../../bpmn.config';
import { makeMarkerPanel } from '../../common/bpmn.functions';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { getBlockText } from '../../palette/palette.utils';
import { BpmnConfig } from '../../common/bpmn.interface';
import { tooltiptemplate } from '../tooltip.template';

export function subProcessGroupTemplateForHoverPalette(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Node, 'Vertical',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      selectionAdorned: false,
      toolTip: tooltiptemplate(go, $),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, 'Spot',
      {
        name: 'PANEL',
        desiredSize: new go.Size(BpmnScriptConfig.ActivityNodeWidth / BpmnScriptConfig.palscale, BpmnScriptConfig.ActivityNodeHeight / BpmnScriptConfig.palscale)
      },
      $(go.Shape, 'RoundedRectangle',
        {
          name: 'SHAPE',
          fill: BpmnScriptConfig.ActivityNodeFill,
          stroke: BpmnScriptConfig.ActivityNodeStroke,
          parameter1: 10 / BpmnScriptConfig.palscale
        },
        new go.Binding('strokeWidth', 'isCall', s => {
          return s ? BpmnScriptConfig.ActivityNodeStrokeWidthIsCall : BpmnScriptConfig.ActivityNodeStrokeWidth;
        })
      ),
      $(go.Shape, 'RoundedRectangle',
        {
          margin: 3,
          stretch: go.GraphObject.Fill,
          stroke: BpmnScriptConfig.ActivityNodeStroke,
          parameter1: 8 / BpmnScriptConfig.palscale,
          fill: 'red',
          visible: false
        },
        new go.Binding('visible', 'isTransaction')
      ),
      makeMarkerPanel(true, BpmnScriptConfig.palscale)
    ),
    $(go.TextBlock,
      getBlockText(go),
      new go.Binding('text')
    )
  );

}
