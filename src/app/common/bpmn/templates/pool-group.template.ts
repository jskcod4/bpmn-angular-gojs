import { groupStyle, editText, nodeSelectionAdornmentTemplate } from '../common/bpmn.functions';
import { PoolLayout } from '../common/bpmn.classes';
import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';
import { tooltiptemplate } from './tooltip.template';

export function poolGroupTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Group, 'Auto', groupStyle(),
    {
      computesBoundsIncludingLinks: false,
      toolTip: tooltiptemplate(go, $),
      contextMenu: getContextMenu(),
      layout: $(PoolLayout, {
        spacing: new go.Size(0, 0)
      }),
      doubleClick: editText,
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$)
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    poolGroupSymbolTemplate(go, $, config)
  );
}

export function poolGroupSymbolTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Auto',
    $(go.Shape,
      {
        fill: 'white'
      },
      new go.Binding('fill', 'color')
    ),
    $(go.Panel, 'Table',
      {
        defaultColumnSeparatorStroke: 'black'
      },
      $(go.Panel, 'Horizontal',
        {
          column: 0,
          angle: 270
        },
        $(go.TextBlock,
          {
            editable: true,
            margin: new go.Margin(5, 0, 5, 0),
            doubleClick: editText
          },
          new go.Binding('text').makeTwoWay()
        )
      ),
      $(go.Placeholder,
        {
          background: 'darkgray',
          column: 1
        }
      )
    )
  )
}
