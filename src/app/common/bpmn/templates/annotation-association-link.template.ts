import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';

export function annotationAssociationLinkTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Link,
    {
      reshapable: true,
      resegmentable: true,
      relinkableFrom: true,
      relinkableTo: true,
      toSpot: go.Spot.AllSides,
      toEndSegmentLength: 30,
      fromEndSegmentLength: 40,
      contextMenu: getContextMenu(),
    },
    new go.Binding('routing', 'routing'),
    new go.Binding('points').makeTwoWay(),
    new go.Binding("fromSpot", "fromSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify),
    new go.Binding("toSpot", "toSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify),
    $(go.Shape, { stroke: 'black', strokeWidth: 1, strokeDashArray: [1, 3] },
    new go.Binding("stroke", "isHighlighted", (h) => { return h ? "lightgrey" : "black"; }).ofObject(),
    new go.Binding("strokeWidth", "isHighlighted", (h) => { return h ? 2 : 1; }).ofObject()),
    $(go.Shape, { toArrow: 'OpenTriangle', scale: 1, stroke: 'black' },
    new go.Binding("stroke", "isHighlighted", (h) => { return h ? "lightgrey" : "black"; }).ofObject())
  );
}
