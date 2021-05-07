import { editText } from '../common/bpmn.functions';
import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';

export function sequenceLinkTemplate(go: any, $: any, diagram: go.Diagram, config: BpmnConfig) {
  return $(go.Link,
    {
      contextMenu: getContextMenu(),
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
      strokeWidth: 1
    },
    new go.Binding("stroke", "isHighlighted", (h) => { return h ? "lightgrey" : "black"; }).ofObject(),
    new go.Binding("strokeWidth", "isHighlighted", (h) => { return h ? 2 : 1; }).ofObject()
    ),
    $(go.Shape, {
      toArrow: 'Triangle',
      scale: 1.2,
      fill: 'black',
      stroke: null
    },
    new go.Binding("fill", "isHighlighted", (h) => { return h ? "lightgrey" : "black"; }).ofObject()),
    $(go.Shape, {
        fromArrow: '',
        scale: 1.5,
        stroke: 'black',
        fill: 'white'
      },
      new go.Binding('fromArrow', 'isDefault', s => {
        if (s === null) return '';
        return s ? 'BackSlash' : 'StretchedDiamond';
      }),
      new go.Binding('segmentOffset', 'isDefault', s => {
        return s ? new go.Point(5, 0) : new go.Point(0, 0);
      })
    ),
    $(go.TextBlock, {
        name: 'Label',
        editable: true,
        text: '',
        segmentOffset: new go.Point(-10, -10),
        visible: true
      },
      new go.Binding('text', 'text').makeTwoWay(),
      new go.Binding('visible', 'visible').makeTwoWay()
    )
  );

}
