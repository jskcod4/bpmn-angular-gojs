import { BpmnConfig } from '../common/bpmn.interface';

export function dataAssociationLinkTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Link,
    {
      routing: go.Link.AvoidsNodes,
      curve: go.Link.JumpGap,
      corner: 10,
      reshapable: true,
      resegmentable: true,
      relinkableFrom: true,
      relinkableTo: true,
      toEndSegmentLength: 30,
      fromEndSegmentLength: 30,
    },
    new go.Binding('points').makeTwoWay(),
    new go.Binding("fromSpot", "fromSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify),
    new go.Binding("toSpot", "toSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify),
    $(go.Shape, {
      stroke: 'black',
      strokeWidth: 1,
      strokeDashArray: [1, 3]
    },
    new go.Binding("stroke", "isHighlighted", (h) => { return h ? "lightgrey" : "black"; }).ofObject(),
    new go.Binding("strokeWidth", "isHighlighted", (h) => { return h ? 2 : 1; }).ofObject()),
    $(go.Shape, {
      toArrow: 'OpenTriangle',
      scale: 1,
      fill: null,
      stroke: 'blue'
    },
    new go.Binding("stroke", "isHighlighted", (h) => { return h ? "lightgrey" : "blue"; }).ofObject())
  );
}
