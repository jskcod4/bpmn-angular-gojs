import { makeMarkerPanel, editText, positionEventBorder, avoidNodeOverlap, nodeSelectionAdornmentTemplate } from '../common/bpmn.functions';
import { BpmnConfig } from '../common/bpmn.interface';
import { PaletteCategory } from '../palette/palette.enum';
import { getContextMenu } from '../menu-context';
import { tooltiptemplate } from './tooltip.template';

export function subProcessGroupTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Group, 'Spot',
    {
      locationSpot: go.Spot.Center,
      locationObjectName: 'PH',
      isSubGraphExpanded: false,
      toolTip: tooltiptemplate(go, $),
      doubleClick: editText,
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$),
      dragComputation: avoidNodeOverlap,
      memberValidation: (group: go.Group, part: go.Part) => {
        return !(part instanceof go.Group) || (part.category !== PaletteCategory.pool && part.category !== PaletteCategory.lane);
      },
      mouseDrop: (e: go.InputEvent, grp: any) => {
        if(!grp.diagram.selection.first().data.isEventBorder || (grp.diagram.selection.first().data.isEventBorder && grp.diagram.selection.first().data.group == grp.data.key)) {
          if (!(grp instanceof go.Group) || grp.diagram === null) return;
          const ok = grp.addMembers(grp.diagram.selection, true);
          if (!ok) grp.diagram.currentTool.doCancel();
          const element = e.diagram.selection.first();
          if(element.data.category == 'boundary'){
            element.part.move(positionEventBorder(element));
          }
        }else{
          grp.diagram.currentTool.doCancel();
        }
      },
      contextMenu: getContextMenu(),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, 'Auto',
      $(go.Shape, 'RoundedRectangle',
        {
          name: 'PH',
          fill: config.SubprocessNodeFill,
          stroke: config.ActivityNodeStroke,
          minSize: new go.Size(config.ActivityNodeWidth, config.ActivityNodeHeight),
          portId: '',
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer',
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides
        },
        new go.Binding('strokeWidth', 'isCall', s => {
          return s ? config.ActivityNodeStrokeWidthIsCall : config.ActivityNodeStrokeWidth;
        })
      ),
      $(go.Shape, "RoundedRectangle",{
        fill: "transparent", stroke: null, desiredSize: new go.Size((config.ActivityNodeWidth / 2), (config.ActivityNodeHeight / 2))
      }),
      $(go.Panel, 'Vertical',
        {
          defaultAlignment: go.Spot.Left
        },
        $(go.TextBlock,
          {
            margin: 3,
            editable: true,
            doubleClick: editText
          },
          new go.Binding('text', 'text').makeTwoWay(),
          new go.Binding('alignment', 'isSubGraphExpanded', s => {
            return s ? go.Spot.TopLeft : go.Spot.Center;
          })
        ),
        $(go.Placeholder,
          {
            padding: new go.Margin(5, 5)
          }
        ),
        makeMarkerPanel(true, 1)
      )
    ),
  );
}

export function subProcessGroupSymbolTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Auto',
    $(go.Shape, 'RoundedRectangle',
      {
        name: 'PH',
        fill: config.SubprocessNodeFill,
        stroke: config.ActivityNodeStroke,
        portId: '',
        fromLinkable: true,
        toLinkable: true,
        cursor: 'pointer',
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        desiredSize: new go.Size(config.ActivityNodeWidth, config.ActivityNodeHeight)
      },
      new go.Binding('strokeWidth', 'isCall', s => {
        return s ? config.ActivityNodeStrokeWidthIsCall : config.ActivityNodeStrokeWidth;
      }),
      new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
    ),
    $(go.Panel,'Vertical',
      $(go.TextBlock,
        {
          margin: 3,
          editable: true,
          doubleClick: editText,
          alignment: go.Spot.Center
        },
        new go.Binding('text', 'text').makeTwoWay(),
        new go.Binding('visible', 'isText'),
        new go.Binding('font', 'font'),
      ),
      makeMarkerPanel(true, 1)
    )
  )
}
