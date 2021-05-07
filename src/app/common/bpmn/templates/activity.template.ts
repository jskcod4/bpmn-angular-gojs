import { tooltiptemplate } from './tooltip.template';
import { nodeActivityTaskTypeColorConverter, nodeActivityTaskTypeConverter, makeMarkerPanel, avoidNodeOverlap, positionEventBorder, nodeSelectionAdornmentTemplate, editText } from '../common/bpmn.functions';
import { ActivityType } from '../common/bpmn.enum';
import { getBlockText } from '../palette/palette.utils';
import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';
import { PaletteCategory } from '../palette/palette.enum';

export function activityNodeTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Group, 'Spot',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      toolTip: tooltiptemplate(go, $),
      memberValidation: (group: go.Group, part: go.Part) => {
        return !(part instanceof go.Group) || (part.category == PaletteCategory.boundary);
      },
      mouseDrop: (e, x) => {
        const element = e.diagram.selection.first();
        if(element && element.data.category == 'boundary'){
          element.part.move(positionEventBorder(element));
        }
      },
      dragComputation: avoidNodeOverlap,
      contextMenu: getContextMenu(),
      doubleClick: editText,
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    activitySymbolTemplate(go, $, config)
  );
}

export function activitySymbolTemplate(go: any, $: any, config: BpmnConfig) {
  return $(go.Panel, 'Auto',
    {
      name: 'PANEL',
      desiredSize: new go.Size(config.ActivityNodeWidth, config.ActivityNodeHeight),
    },
    new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
    $(go.Panel, 'Spot',
      $(go.Shape, 'RoundedRectangle',
        {
          name: 'SHAPE',
          fill: config.ActivityNodeFill,
          stroke: config.ActivityNodeStroke,
          parameter1: 10,
          portId: '',
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer',
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides
        },
        new go.Binding('fill', 'color'),
        new go.Binding('strokeWidth', 'isCall', s => {
            return s ? config.ActivityNodeStrokeWidthIsCall : config.ActivityNodeStrokeWidth;
        }),
        new go.Binding('strokeWidth', 'taskType', s => {
          if (s === ActivityType.callActivity) {
            return 4
          }
          return 2;
        })
      ),
      $(go.Shape, "RoundedRectangle",{
        fill: "transparent", stroke: null, desiredSize: new go.Size((config.ActivityNodeWidth / 2), (config.ActivityNodeHeight / 2))
      },new go.Binding('desiredSize', 'size', s => {
        if(s) {
          const tam = s.split(' ');
          return new go.Size((tam[0] / 2),(tam[1] / 2));
        }
      }).makeTwoWay(go.Size.stringify)),
      $(go.Shape, 'BpmnTaskScript',
        {
          alignment: new go.Spot(0, 0, 5, 5), alignmentFocus: go.Spot.TopLeft,
          desiredSize: new go.Size(22, 22),
        },
        new go.Binding('fill', 'taskType', nodeActivityTaskTypeColorConverter),
        new go.Binding('figure', 'taskType', nodeActivityTaskTypeConverter),
        new go.Binding('desiredSize', 'sizeType', go.Size.parse).makeTwoWay(go.Size.stringify),
      ),
      makeMarkerPanel(false, 1)
    ),
    $(go.TextBlock,
      getBlockText(go, false, false),
      new go.Binding('text').makeTwoWay(),
      new go.Binding('visible', 'isText'),
      new go.Binding('font', 'font'),
    )
  )
}
