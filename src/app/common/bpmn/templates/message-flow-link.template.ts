import { PoolLink } from '../assets/classes';
import { editText } from '../common/bpmn.functions';
import { BpmnConfig } from '../common/bpmn.interface';

export function messageFlowLinkTemplate(go: any, $: any, config: BpmnConfig) {
  return $(PoolLink,
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
      doubleClick: editText
    },
    new go.Binding('points').makeTwoWay(),
    new go.Binding("fromSpot", "fromSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify),
    new go.Binding("toSpot", "toSpot", go.Spot.parse).makeTwoWay(go.Spot.stringify),
    $(go.Shape, {
        stroke: 'black',
        strokeWidth: 1,
        strokeDashArray: [6, 2]
      },
      new go.Binding("stroke", "isHighlighted", (h) => { return h ? "lightgrey" : "black"; }).ofObject(),
      new go.Binding("strokeWidth", "isHighlighted", (h) => { return h ? 2 : 1; }).ofObject()
    ),
    $(go.Shape, {
        toArrow: 'Triangle',
        scale: 1,
        fill: 'white',
        stroke: 'black'
      },
      new go.Binding("stroke", "isHighlighted", (h) => { return h ? "lightgrey" : "black"; }).ofObject()
    ),
    $(go.Shape, {
      fromArrow: 'Circle',
      scale: 1,
      visible: true,
      stroke: 'black',
      fill: 'white'
      },
      new go.Binding("stroke", "isHighlighted", (h) => { return h ? "lightgrey" : "black"; }).ofObject()
    ),
    $(go.TextBlock, {
        editable: true,
        segmentOffset: new go.Point(-10, -10),
        text: ''
      },
      new go.Binding('text', 'text').makeTwoWay()
    )
  );
}
