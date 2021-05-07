import { tooltiptemplate } from '../tooltip.template';
import { BpmnEventType } from '../../common/bpmn.enum';
import { BpmnEventBus } from 'src/app/common/data/bpmn.class';
import { nodeEventDimensionStrokeColorConverter, nodeEventTypeConverter, nodeEventDimensionSymbolFillConverter, nodeEventDimensionSymbolStrokeConverter } from '../../common/bpmn.functions';
import { getBlockText } from '../../palette/palette.utils';
import { BpmnConfig } from '../../common/bpmn.interface';

export function eventNodeTemplateForPalette(go: any, $: any, bpmnEventBus: BpmnEventBus, config: BpmnConfig) {
  return $(
    go.Node, 'Vertical',
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
    new go.Binding('desiredSize', 'isMainPalette', (value: boolean = false) => {
      if (value) {
        return new go.Size(90, 70)
      }
      return new go.Size(75, 70)
    }),
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('layerName', 'isSelected', s => {
      return s ? 'Foreground' : '';
    }).ofObject(),
    {
      resizable: false,
      resizeObjectName: 'SHAPE'
    },
    $(go.Panel, 'Spot',
      $(go.Shape, 'Circle',
        {
          strokeWidth: 1,
          name: 'SHAPE',
          desiredSize: new go.Size(config.EventNodeSize, config.EventNodeSize),
          portId: '',
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer',
          fromSpot: go.Spot.RightSide,
          toSpot: go.Spot.LeftSide
        },
        new go.Binding('fill', 'eventDimension', s => {
          let bgColor: string | go.Brush = config.EventBackgroundColor;
          switch (s) {
            case 1:
              bgColor = config.EventBackgroundColor;
              break;
            case 2:
              bgColor = config.EventIntermediateBackgroundColor;
              break;
            case 3:
              bgColor = config.EventEndBackgroundColor;
              break;
            default:
              bgColor = config.EventBackgroundColor;
              break;
          }
          return bgColor;
        }),
        new go.Binding('strokeWidth', 'eventDimension', s => {
          let strokeWidth: number =  1;
          switch (s) {
            case 3:
              strokeWidth = 4;
              break;
            default:
              strokeWidth = 1;
              break;
          }
          return strokeWidth;
        }),
        new go.Binding('stroke', 'eventDimension', s => {
          let strokeColor: go.Brush | string = config.EventBackgroundColor;
          switch (s) {
            case 1:
              strokeColor = config.EventDimensionStrokeColor;
              break;
            case 2:
              strokeColor = config.EventIntermediateDarkColor;
              break;
            case 3:
              strokeColor = config.EventDimensionStrokeEndColor;
              break;
            default:
              strokeColor = config.EventBackgroundColor;
              break;
          }
          return strokeColor;
        }),
        new go.Binding('strokeDashArray', 'eventDimension', s => {
          return (s === 6) ? [4, 2] : null;
        }),
        new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)
      ),
      $(go.Shape, 'Circle',
        {
          alignment: go.Spot.Center,
          desiredSize: new go.Size(config.EventNodeInnerSize, config.EventNodeInnerSize),
          fill: null
        },
        new go.Binding('stroke', 'eventDimension', nodeEventDimensionStrokeColorConverter),
        new go.Binding('strokeDashArray', 'eventDimension', s => {
          return (s === 3 || s === 6) ? [4, 2] : null;
        }),
        new go.Binding('visible', 'eventDimension', s => {
          let isVisible: boolean = false;
          switch (s) {
            case 2:
              isVisible = true;
              break;
            default:
              isVisible = false;
              break;
          }
          return isVisible;
        })
      ),
      $(go.Shape, 'NotAllowed',
        {
          alignment: go.Spot.Center,
          desiredSize: new go.Size(config.EventNodeSymbolSize, config.EventNodeSymbolSize)
        },
        new go.Binding('figure', 'eventType', nodeEventTypeConverter),
        new go.Binding('fill', 'eventDimension', nodeEventDimensionSymbolFillConverter),
        new go.Binding('stroke', 'eventDimension', nodeEventDimensionSymbolStrokeConverter)
      )
    ),
    $(go.TextBlock,
      {
        ...getBlockText(go),
        overflow: go.TextBlock.OverflowEllipsis,
        maxLines: 1
      },
      new go.Binding('text').makeTwoWay(),
      new go.Binding('font', 'isMainPalette', (value: boolean) => {
        if (value) {
          return '12px sans-serif';
        }
        return '12px sans-serif';
      })
    )
  );

}
