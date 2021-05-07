import { editText, nodeSelectionAdornmentTemplate } from '../common/bpmn.functions';
import { getBlockText } from '../palette/palette.utils';
import { BpmnConfig } from '../common/bpmn.interface';
import { tooltiptemplate } from './tooltip.template';

export function headerNodeTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Node, 'Vertical',
    { toolTip: tooltiptemplate(go, $), selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$) },
    $(go.TextBlock,
      {
        ...getBlockText(go, false),
        alignment: go.Spot.Center,
        textAlign: 'center',
        margin: 5,
        editable: true,
        doubleClick: editText,
        stroke: 'black',
        font: '36px sans-serif'
      },
      new go.Binding('text').makeTwoWay()
    )
  );
}
