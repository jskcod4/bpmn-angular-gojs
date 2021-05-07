import { DataObjectType } from '../common/bpmn.enum';
import { avoidNodeOverlap, nodeSelectionAdornmentTemplate, editText } from '../common/bpmn.functions';
import { BpmnConfig } from '../common/bpmn.interface';
import { tooltiptemplate } from './tooltip.template';
import { textBlockTemplate } from '../palette/palette.utils';

export function dataWarehousingNodeTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Node, 'Spot',
    {
      locationObjectName: 'SHAPE',
      toolTip: tooltiptemplate(go, $),
      dragComputation: avoidNodeOverlap,
      locationSpot: go.Spot.Center,
      doubleClick: editText,
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    dataWarehousingSymbolTemplate(go, $, config),
    textBlockTemplate(go,$,false,true),
  );
}

export function dataWarehousingSymbolTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Spot',
    $(go.Shape, 'File',
      {
        name: 'SHAPE',
        portId: '',
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
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
    $(go.Shape, "Rectangle",{
      fromLinkable: false, toLinkable: false, cursor: 'auto', fill: "transparent", stroke: null, desiredSize: new go.Size(((config.EventNodeSize * 0.8) / 2), (config.EventNodeSize / 2))
    }),
  );
}
