import { editText } from '../common/bpmn.functions';
import { BpmnConfig } from '../common/bpmn.interface';

export function privateProcessNodeTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Node, 'Auto',
    { layerName: 'Background', resizable: true, resizeObjectName: 'LANE' },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    privateProcessSymbolTemplate(go, $, config)
  );

}

export function privateProcessSymbolTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Auto',
    $(go.Shape, 'Rectangle',
      { fill: null }),
    $(go.Panel, 'Table',
      {
        desiredSize: new go.Size(config.ActivityNodeWidth * 6, config.ActivityNodeHeight),
        background: config.DataFill, name: 'LANE', minSize: new go.Size(config.ActivityNodeWidth, config.ActivityNodeHeight * 0.667)
      },
      new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
      $(go.TextBlock,
        {
          row: 0, column: 0,
          angle: 270, margin: 5,
          editable: true, textAlign: 'center',
          doubleClick: editText
        },
        new go.Binding('text').makeTwoWay()
      ),
      $(go.RowColumnDefinition, {
        column: 1,
        separatorStrokeWidth: 1,
        separatorStroke: 'black'
      }),
      $(go.Shape, 'Rectangle',
        {
          row: 0, column: 1,
          stroke: null, fill: 'transparent',
          portId: '', fromLinkable: true, toLinkable: true,
          fromSpot: go.Spot.TopBottomSides, toSpot: go.Spot.TopBottomSides,
          cursor: 'pointer', stretch: go.GraphObject.Fill
        }
      )
    )
  )
}
