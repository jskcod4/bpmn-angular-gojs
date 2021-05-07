import { tooltiptemplate } from './tooltip.template';
import { nodeEventDimensionStrokeColorConverter, nodeEventTypeConverter, nodeEventDimensionSymbolFillConverter, nodeEventDimensionSymbolStrokeConverter, avoidNodeOverlap, nodeSelectionAdornmentTemplate, editText } from '../common/bpmn.functions';
import { textBlockTemplate } from '../palette/palette.utils';
import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';

export function eventNodeTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Node, 'Spot',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      toolTip: tooltiptemplate(go, $),
      dragComputation: avoidNodeOverlap,
      contextMenu: getContextMenu(),
      doubleClick: editText,
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('layerName', 'isSelected', s => {
      return s ? 'Foreground' : '';
    }).ofObject(),
    {
      resizable: false,
      resizeObjectName: 'SHAPE'
    },
    eventSymbolTemplate(go, $, config),
    textBlockTemplate(go,$,false,true),
  );

}

export function eventSymbolTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Spot',
      $(go.Shape, 'Circle',
        {
          strokeWidth: 1,
          name: 'SHAPE',
          desiredSize: new go.Size(config.EventNodeSize, config.EventNodeSize),
          portId: '',
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer',
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides
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
        new go.Binding('desiredSize', 'sizeInner', go.Size.parse).makeTwoWay(go.Size.stringify),
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
          }),
          ),
          $(go.Shape, 'NotAllowed',
          {
          alignment: go.Spot.Center,
          desiredSize: new go.Size(config.EventNodeSymbolSize, config.EventNodeSymbolSize)
        },
        new go.Binding('figure', 'eventType', nodeEventTypeConverter),
        new go.Binding('fill', '', nodeEventDimensionSymbolFillConverter),
        new go.Binding('stroke', 'eventDimension', nodeEventDimensionSymbolStrokeConverter),
        new go.Binding('desiredSize', 'sizeIcon', go.Size.parse).makeTwoWay(go.Size.stringify)
      ),
      $(go.Shape, "Circle",{
        fromLinkable: false, toLinkable: false, cursor: 'auto', fill: "transparent", stroke: null, desiredSize: new go.Size((config.EventNodeSize / 2), (config.EventNodeSize / 2))
      }),
    );
}
