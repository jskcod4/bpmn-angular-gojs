import { nodeEventTypeConverter, nodeEventDimensionStrokeColorConverter, nodeEventDimensionSymbolFillConverter, nodeEventDimensionSymbolStrokeConverter, stayInGroup, nodeSelectionAdornmentTemplate } from '../common/bpmn.functions';
import { BpmnConfig } from '../common/bpmn.interface';
import { tooltiptemplate } from './tooltip.template';

export function boundaryEventItemTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Node, 'Vertical',
    {
      fromLinkable: true, toLinkable: false, cursor: 'pointer', fromSpot: go.Spot.AllSides,
      fromMaxLinks: 1, toMaxLinks: 0,
      toolTip: tooltiptemplate(go, $),
      dragComputation: stayInGroup,
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$)
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, 'Spot',
      $(go.Shape, 'Circle',
        {
          strokeWidth: 1,
          desiredSize: new go.Size(config.EventNodeSize, config.EventNodeSize),
          fill: config.EventIntermediateBackgroundColor,
          stroke: config.EventIntermediateDarkColor
        },
        new go.Binding('strokeDashArray', 'eventDimension', s => {
          return (s === 6) ? [4, 2] : null;
        }),
      ),
      $(go.Shape, 'Circle',
        {
          alignment: go.Spot.Center,
          desiredSize: new go.Size(config.EventNodeInnerSize, config.EventNodeInnerSize),
          fill: null,
        },
        new go.Binding('stroke', 'eventDimension', nodeEventDimensionStrokeColorConverter),
        new go.Binding('strokeDashArray', 'eventDimension', s => {
          return (s === 3 || s === 6) ? [4, 2] : null;
        })
      ),
      $(go.Shape, 'NotAllowed',
          {
          alignment: go.Spot.Center,
          desiredSize: new go.Size(config.EventNodeSymbolSize, config.EventNodeSymbolSize)
        },
        new go.Binding('figure', 'eventType', nodeEventTypeConverter),
        new go.Binding('fill', 'eventDimension', nodeEventDimensionSymbolFillConverter),
        new go.Binding('stroke', 'eventDimension', nodeEventDimensionSymbolStrokeConverter),
      ),
      $(go.Shape, "Circle",{
        fromLinkable: false, toLinkable: false, cursor: 'auto', fill: "transparent", stroke: null, desiredSize: new go.Size((config.EventNodeSize / 2), (config.EventNodeSize / 2))
      }),
    )
  );
}
