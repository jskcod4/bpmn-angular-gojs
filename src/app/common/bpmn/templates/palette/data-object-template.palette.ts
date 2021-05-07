import { BpmnEventType, DataObjectType } from '../../common/bpmn.enum';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { getBlockText } from '../../palette/palette.utils';
import { BpmnConfig } from '../../common/bpmn.interface';
import { tooltiptemplate } from '../tooltip.template';

export function dataObjectNodeForTemplate(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(go.Node, 'Vertical',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      toolTip: tooltiptemplate(go, $),
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
    $(go.Shape, 'File',
      {
        name: 'SHAPE',
        portId: '',
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
        fill: config.LabelTextColor,
        stroke: config.DataStroke,
        desiredSize: new go.Size(config.EventNodeSize * 0.8, config.EventNodeSize)
      },
      new go.Binding('fill', 'dataObjectType', s => {
        let bgDataObj = config.LabelTextColor;
        switch (s) {
          case DataObjectType.dataOutput:
            bgDataObj = config.BackgroundDark;
            break;
          default:
            break;
        }
        return bgDataObj;
      }),
    ),
    $(go.TextBlock,
      getBlockText(go),
      new go.Binding('text').makeTwoWay()
    )
  );
}
