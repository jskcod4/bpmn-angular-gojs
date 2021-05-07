import { makeMarkerPanel } from '../../common/bpmn.functions';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { BpmnEventType } from '../../common/bpmn.enum';
import { getBlockText } from '../../palette/palette.utils';
import { BpmnConfig } from '../../common/bpmn.interface';
import { tooltiptemplate } from '../tooltip.template';

export function subProcessGroupTemplateForPalette(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Group, 'Vertical',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      isSubGraphExpanded: false,
      selectionAdorned: false,
      toolTip: tooltiptemplate(go, $),
      desiredSize: new go.Size(75, 65),
      mouseHover: (diagram, element) => {
        if (bpmnEventBus) {
          bpmnEventBus.emit(BpmnEventType.paletteMouseHover, {
            diagram,
            element
          });
        }
      },
      mouseLeave: (diagram, element) => {
        if (bpmnEventBus) {
          bpmnEventBus.emit(BpmnEventType.paletteMouseLeave, {
            diagram,
            element
          });
        }
      }
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, 'Spot',
      {
        name: 'PANEL',
        desiredSize: new go.Size(config.ActivityNodeWidth / config.palscale,
        config.ActivityNodeHeight / config.palscale)
      },
      $(go.Shape, 'RoundedRectangle',
        {
          name: 'SHAPE',
          fill: config.ActivityNodeFill, stroke: config.ActivityNodeStroke,
          parameter1: 10 / config.palscale
        },
        new go.Binding('strokeWidth', 'isCall', s => {
          return s ? config.ActivityNodeStrokeWidthIsCall : config.ActivityNodeStrokeWidth;
        })
      ),
      $(go.Shape, 'RoundedRectangle',
        {
          margin: 3,
          stretch: go.GraphObject.Fill,
          stroke: config.ActivityNodeStroke,
          parameter1: 8 / config.palscale, fill: null, visible: false
        },
        new go.Binding('visible', 'isTransaction')
      ),
      makeMarkerPanel(true, config.palscale)
    ),
    $(go.TextBlock,
      getBlockText(go),
      new go.Binding('text')
    )
  );

}
