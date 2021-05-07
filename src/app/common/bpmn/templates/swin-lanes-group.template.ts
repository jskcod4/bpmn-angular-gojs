import { groupStyle, updateCrossLaneLinks, editText, relayoutDiagram, nodeSelectionAdornmentTemplate, validConnectionLinksBetweenGroup } from '../common/bpmn.functions';
import { BpmnConfig } from '../common/bpmn.interface';
import { getContextMenu } from '../menu-context';
import { tooltiptemplate } from './tooltip.template';

export function swimLanesGroupTemplate(go: any, $: any, diagram: any, config: BpmnConfig) {
  const swimLanesGroupTemplate = $(go.Group, 'Spot', groupStyle(),
    {
      name: 'Lane',
      contextMenu: getContextMenu(),
      minLocation: new go.Point(NaN, -Infinity),
      maxLocation: new go.Point(NaN, Infinity),
      selectionObjectName: 'SHAPE',
      toolTip: tooltiptemplate(go, $),
      selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate(go,$),
      resizable: true, resizeObjectName: 'SHAPE',
      layout: $(go.LayeredDigraphLayout,
        {
          isInitial: false,
          isOngoing: false,
          direction: 0,
          columnSpacing: 10,
          layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
        }
      ),
      computesBoundsAfterDrag: true,
      computesBoundsIncludingLinks: false,
      computesBoundsIncludingLocation: true,
      handlesDragDropForMembers: true,
      mouseDrop: (e: go.InputEvent, grp: any) => {
        if(e.diagram.selection.first() && !e.diagram.selection.first().data.isEventBorder) {
          if (!e.diagram.selection.any((n) => (n instanceof go.Group && n.category !== 'subprocess' && n.category !== 'activity') || n.category === 'privateProcess')) {
            if (!(grp instanceof go.Group) || grp.diagram === null) return;
            const ok = grp.addMembers(grp.diagram.selection, true);
            if (ok) {
              updateCrossLaneLinks(grp);
              relayoutDiagram(diagram);
              validConnectionLinksBetweenGroup(e.diagram.selection.first());
            } else {
              grp.diagram.currentTool.doCancel();
            }
          }
        }else{
          e.diagram.currentTool.doCancel();
        }
      },
      subGraphExpandedChanged: (grp: go.Group) => {
        if (grp.diagram === null) return;
        if (grp.diagram.undoManager.isUndoingRedoing) return;
        const shp = grp.resizeObject;
        if (grp.isSubGraphExpanded) {
          shp.height = (grp as any)['_savedBreadth'];
        } else {
          (grp as any)['_savedBreadth'] = shp.height;
          shp.height = NaN;
        }
        updateCrossLaneLinks(grp);
        relayoutDiagram(diagram);
      }
    },
    swimLanesGroupSymbolTemplate(go,$)
  );

  swimLanesGroupTemplate.resizeAdornmentTemplate =
    $(go.Adornment, 'Spot',
      $(go.Placeholder),
      $(go.Shape,
        {
          alignment: go.Spot.Right,
          desiredSize: new go.Size(7, 50),
          fill: 'lightblue', stroke: 'dodgerblue',
          cursor: 'col-resize'
        },
        new go.Binding('visible', '', ad => {
          if (ad.adornedPart === null) {
            return false
          };
          return ad.adornedPart.isSubGraphExpanded;
        }).ofObject()
      ),
      $(go.Shape,
        {
          alignment: go.Spot.Bottom,
          desiredSize: new go.Size(50, 7),
          fill: 'lightblue',
          stroke: 'dodgerblue',
          cursor: 'row-resize'
        },
        new go.Binding('visible', '', ad => {
          if (ad.adornedPart === null) {
            return false
          };
          return ad.adornedPart.isSubGraphExpanded;
        }).ofObject()
      )
    );

  return swimLanesGroupTemplate;
}

export function swimLanesGroupSymbolTemplate(go: any, $: any) {
  return $(go.Panel, 'Spot',
    $(go.Shape, 'Rectangle',
      {
        name: 'SHAPE',
        fill: 'white',
        stroke: null
      },
      new go.Binding('fill', 'color'),
      new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)
    ),
    $(go.Panel, 'Horizontal',
      {
        name: 'HEADER',
        angle: 270,
        alignment: go.Spot.LeftCenter, alignmentFocus: go.Spot.LeftCenter
      },
      $(go.TextBlock,
        {
          editable: true,
          margin: new go.Margin(2, 0, 0, 8),
          doubleClick: editText
        },
        new go.Binding('visible', 'isSubGraphExpanded').ofObject(),
        new go.Binding('text', 'text').makeTwoWay()
      ),
      $('SubGraphExpanderButton', {
          margin: 4,
          angle: -270
        }
      )
    ),
    $(go.Placeholder,
      {
        padding: 30,
        alignment: go.Spot.TopLeft,
        alignmentFocus: go.Spot.TopLeft
      }
    ),
    $(go.Panel, 'Horizontal', {
      alignment: go.Spot.TopLeft,
      alignmentFocus:
      go.Spot.TopLeft
    },
      $(go.TextBlock,
        {
          name: 'LABEL',
          editable: true, visible: false,
          angle: 0, margin: new go.Margin(6, 0, 0, 20),
          doubleClick: editText
        },
        new go.Binding('visible', 'isSubGraphExpanded', e => {
          return !e;
        }).ofObject(),
        new go.Binding('text', 'text').makeTwoWay()
      )
    )
  )
}
