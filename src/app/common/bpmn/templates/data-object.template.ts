import { DataObjectType } from '../common/bpmn.enum';
import { textBlockTemplate } from '../palette/palette.utils';
import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';
import { avoidNodeOverlap, nodeSelectionAdornmentTemplate, editText } from '../common/bpmn.functions';
import { tooltiptemplate } from './tooltip.template';

export function dataObjectNodeTemplate(go: any, $: any, config: BpmnConfig) {
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
    dataObjectSymbolTemplate(go, $, config),
    textBlockTemplate(go,$,false,true),
  );
}

export function dataObjectSymbolTemplate(go: any, $: any, config: BpmnConfig) {
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
  )
}
