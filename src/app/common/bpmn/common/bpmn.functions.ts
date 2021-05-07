import * as go from 'gojs';
const $ = go.GraphObject.make;

import { BpmnScriptConfig } from '../bpmn.config';
import { bpmnMenuContext, BpmnContextMenuType } from '../menu-context/bpmn-menu.context';
import { GatewayType, EventDimension, ActivityInstance, ActivityType, StartEventType } from './bpmn.enum';
import { PaletteCategory } from '../palette/palette.enum';

export function nodeEventTypeConverter(s: number) {
  const tasks = [
    'NotAllowed',
    'Empty',
    'BpmnTaskMessage',
    'BpmnEventTimer',
    'BpmnEventEscalation',
    'BpmnEventConditional',
    'Arrow',
    'BpmnEventError',
    'ThinX',
    'BpmnActivityCompensation',
    'Triangle',
    'Pentagon',
    'ThinCross',
    'ThinX',
    'Arrow',
    'Circle',
    'BpmnTaskMessage'
  ];
  if (s < tasks.length) return tasks[s];
  return 'NotAllowed';
}

export function nodeActivityTaskTypeColorConverter(s: number) {
  return (s === 5) ? 'dimgray' : 'white';
}

export function nodeActivityTaskTypeConverter(s: number) {
  const tasks = [
    'Empty',
    'BpmnTaskMessage',
    'BpmnTaskUser',
    'BpmnTaskManual',
    'BpmnTaskScript',
    'BpmnTaskMessage',
    'BpmnTaskService',
    'InternalStorage',
    'Empty'
  ];
  if (s < tasks.length) return tasks[s];
  return 'NotAllowed';
}

export function makeMarkerPanel(sub: boolean, scale: number) {
  return $(go.Panel, 'Horizontal',
    { alignment: go.Spot.MiddleBottom, alignmentFocus: go.Spot.MiddleBottom },
    $(go.Shape, 'BpmnActivityLoop',
      {
        width: 12 / scale,
        height: 12 / scale,
        margin: 2,
        visible: false,
        strokeWidth: BpmnScriptConfig.ActivityMarkerStrokeWidth
      },
      new go.Binding('visible', 'instance', (value: ActivityInstance) => {
        if (value === ActivityInstance.isLoop) {
          return true;
        }
        return false;
      })),
    $(go.Shape, 'BpmnActivityParallel',
      {
        width: 12 / scale,
        height: 12 / scale,
        margin: 2,
        visible: false,
        strokeWidth: BpmnScriptConfig.ActivityMarkerStrokeWidth
      },
      new go.Binding('visible', 'instance', (value: ActivityInstance) => {
        if (value === ActivityInstance.isParallel) {
          return true;
        }
        return false;
      })),
    $(go.Shape, 'BpmnActivitySequential',
      {
        width: 12 / scale,
        height: 12 / scale,
        margin: 2,
        visible: false,
        strokeWidth: BpmnScriptConfig.ActivityMarkerStrokeWidth
      },
      new go.Binding('visible', 'instance', (value: ActivityInstance) => {
        if (value === ActivityInstance.isSequencial) {
          return true;
        }
        return false;
      })),
    $(go.Shape, 'BpmnActivityAdHoc',
      {
        width: 12 / scale,
        height: 12 / scale,
        margin: 2,
        visible: false,
        strokeWidth: BpmnScriptConfig.ActivityMarkerStrokeWidth
      },
      new go.Binding('visible', 'isAdHoc')),
    $(go.Shape, 'BpmnActivityCompensation',
      {
        width: 12 / scale,
        height: 12 / scale,
        margin: 2,
        visible: false,
        strokeWidth: BpmnScriptConfig.ActivityMarkerStrokeWidth,
        fill: null
      },
      new go.Binding('visible', 'isCompensation')),
    makeSubButton(sub)
  );
}

export function makeSubButton(sub: boolean) {
  if (sub) {
    return [$('SubGraphExpanderButton'),
    { margin: 2, visible: false },
    new go.Binding('visible', 'isSubProcess')];
  }
  return [];
}

export function nodeEventDimensionStrokeColorConverter(s: number) {
  if (s === 2) return BpmnScriptConfig.EventIntermediateDarkColor;
  if (s === 8) return BpmnScriptConfig.EventDimensionStrokeEndColor;
  return BpmnScriptConfig.EventDimensionStrokeColor;
}

export function nodeEventDimensionSymbolFillConverter(s: any) {
  if (s.eventDimension === EventDimension.end || (s.eventDimension === EventDimension.intermediate && s.eventType == StartEventType.sendMessage)) {
    return BpmnScriptConfig.BackgroundDark;
  }
  return BpmnScriptConfig.EventBackgroundIconColor;
}

export function nodeEventDimensionSymbolStrokeConverter(s: number) {
  let strokeColor: string = '';
  switch (s) {
    case EventDimension.start:
      strokeColor = BpmnScriptConfig.EventDimensionStrokeColor;
      break;
    default:
      break;
  }
  return strokeColor;
}

export function nodeGatewaySymbolTypeConverter(s: number) {
  const tasks = [
    'NotAllowed',
    'PlusLine',      // 1 - parallel
    'Circle',         // 2 - inclusive
    'AsteriskLine',   // 3 - complex
    'ThinX',          // 4 - exclusive  (exclusive can also be no symbol, just bind to visible=false for no symbol)
    'Pentagon',       // 5 - double cicle event based gateway
    'Pentagon',       // 6 - exclusive event gateway to start a process (single circle)
    'PlusLine',      // 7 - parallel event gateway to start a process (single circle),
    'ThinX'         // 8 -  event based exclusive
  ];
  if (+s < tasks.length) {
    return tasks[s];
  };
  return 'NotAllowed'; // error
}

export function nodeGatewaySymbolSizeConverter(s: number) {
  const size = new go.Size(BpmnScriptConfig.GatewayNodeSymbolSize, BpmnScriptConfig.GatewayNodeSymbolSize);
  if (s === GatewayType.parallel) {
    size.width = size.width / 4 * 3;
    size.height = size.height / 4 * 3;
  }
  if (s === GatewayType.exclusive) {
    size.width = size.width / 4 * 3;
    size.height = size.height / 4 * 3;
  }
  if (s > 4) {
    size.width = size.width / 1.6;
    size.height = size.height / 1.6;
  }
  return size;
}

export function groupStyle() {  // common settings for both Lane and Pool Groups
  return [
    {
      layerName: 'Background',  // all pools and lanes are always behind all nodes and links
      background: 'transparent',  // can grab anywhere in bounds
      movable: true, // allows users to re-order by dragging
      copyable: false,  // can't copy lanes or pools
      avoidable: false  // don't impede AvoidsNodes routed Links
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
  ];
}

// this is a Part.dragComputation function for limiting where a Node may be dragged
export function stayInGroup(part, pt, gridpt) {
  // don't constrain top-level nodes
  var grp = part.containingGroup;
  if (grp === null) return pt;
  // try to stay within the background Shape of the Group
  var back = grp.resizeObject;
  if (back === null) return pt;
  // allow dragging a Node out of a Group if the Shift key is down
  var p1 = back.getDocumentPoint(go.Spot.TopLeft);
  var p2 = back.getDocumentPoint(go.Spot.BottomRight);
  var b = part.actualBounds;
  // now limit the location appropriately
  var x = Math.max(p1.x - (b.width / 2) + 1, Math.min(pt.x, p2.x - (b.width / 2) - 1));
  var y = Math.max(p1.y - (b.height / 2) + 1, Math.min(pt.y, p2.y - (b.height / 2) - 1));
  return new go.Point(x, y);
}

export function positionEventBorder(part) {
  // don't constrain top-level nodes
  var grp = part.containingGroup;
  if (grp === null) return new go.Point(0, 0);
  // try to stay within the background Shape of the Group
  var back = grp.resizeObject;
  if (back === null) return new go.Point(0, 0);
  // allow dragging a Node out of a Group if the Shift key is down
  var p1 = back.getDocumentPoint(go.Spot.TopLeft);
  var p2 = back.getDocumentPoint(go.Spot.BottomRight);
  var b = part.actualBounds;
  var loc = part.location;
  // Extremos
  var xl = p1.x - (b.width / 2) + 1;
  var xr = p2.x - (b.width / 2) - 1;
  var yt = p1.y - (b.height / 2) + 1;
  var yb = p2.y - (b.height / 2) - 1;
  // diferencia entre los extremos
  var rxl = Math.abs(xl - loc.x);
  var rxr = Math.abs(xr - loc.x);
  var ryt = Math.abs(yt - loc.y);
  var ryb = Math.abs(yb - loc.y);
  // determinar que extremo en X es el mas cercano
  var minx = Math.min(rxl, rxr);
  var x = 0;
  if (minx == rxl) {
    x = xl;
  } else {
    x = xr;
  }
  // determinar que extremo en Y es el mas cercano
  var miny = Math.min(ryt, ryb);
  var y = 0;
  if (miny == ryt) {
    y = yt;
  } else {
    y = yb;
  }
  // asignar resultado
  var min = Math.min(minx, miny);
  if (minx == min) {
    return new go.Point(x, loc.y);
  } else {
    return new go.Point(loc.x, y);
  }
}

export function updateCrossLaneLinks(group: any) {
  group.findExternalLinksConnected().each((l) => {
    l.visible = (l.fromNode !== null && l.fromNode.isVisible() && l.toNode !== null && l.toNode.isVisible());
  });
}

export function relayoutDiagram(diagram: go.Diagram) {
  diagram.layout.invalidateLayout();
  diagram.findTopLevelGroups().each(function (g) { if (g.category === 'Pool' && g.layout !== null) g.layout.invalidateLayout(); });
  diagram.layoutDiagram();
}

export function getActivityNodeMenu(go: any, $: any) {
  const activityNodeMenu = $('ContextMenu');
  bpmnMenuContext.forEach(element => {
    const item: go.Panel = $(
      BpmnContextMenuType.menuButton,
      $(go.TextBlock, element.label, element.properties ? element.properties : {}),
      {
        click: (e: go.InputEvent, obj: go.GraphObject) => {
          console.log(`element ${element.label} has been clicked`, e, obj);
        }
      }
    );
    activityNodeMenu.add(item);
  });

  return activityNodeMenu;
}

export function nodePalGatewaySymbolSizeConverter(s: number) {
  const size = nodeGatewaySymbolSizeConverter(s);
  size.width = size.width / 2;
  size.height = size.height / 2;
  return size;
}

export function keyCompare(a: go.Part, b: go.Part) {
  const at = a.data.key;
  const bt = b.data.key;
  if (at < bt) return -1;
  if (at > bt) return 1;
  return 0;
}

export function setActivityType(obj: go.Group, myDiagram: go.Diagram, instance: ActivityInstance) {
  const transaction: string = `set${obj.key}${obj.category}`;
  myDiagram.startTransaction(transaction);
  clearActivityType(obj, myDiagram);
  const model = myDiagram.model;
  model.assignAllDataProperties(obj.data, { instance });
  myDiagram.commitTransaction(transaction);
}

export function clearActivityType(obj: go.Group, myDiagram: go.Diagram) {
  const transaction: string = `set${obj.key}${obj.category}2`;
  myDiagram.startTransaction(transaction);
  const model = myDiagram.model;
  model.assignAllDataProperties(obj.data, { instance: ActivityInstance.general });
  myDiagram.commitTransaction(transaction);
}

export function setSequenceLinkRegularFlow(obj: go.Link, myDiagram: go.Diagram) {
  myDiagram.startTransaction('setSequenceLinkRegularFlow');
  const model = myDiagram.model;
  model.setDataProperty(obj.data, 'isDefault', null);
  if (obj.fromNode !== null) {
    obj.fromNode.findLinksOutOf().each(function (link) {
      if (link !== obj && link.data.isDefault) {
        model.setDataProperty(link.data, 'isDefault', null);
      }
    });
  }
  myDiagram.commitTransaction('setSequenceLinkRegularFlow');
}

export function setSequenceLinkDefaultFlow(obj: go.Link, myDiagram: go.Diagram) {
  myDiagram.startTransaction('setSequenceLinkDefaultFlow');
  const model = myDiagram.model;
  model.setDataProperty(obj.data, 'isDefault', true);
  if (obj.fromNode !== null) {
    obj.fromNode.findLinksOutOf().each(function (link) {
      if (link !== obj && link.data.isDefault) {
        model.setDataProperty(link.data, 'isDefault', null);
      }
    });
  }
  myDiagram.commitTransaction('setSequenceLinkDefaultFlow');
}

export function setSequenceLinkConditionalFlow(obj: go.Link, myDiagram: go.Diagram) {
  myDiagram.startTransaction('setSequenceLinkConditionalFlow');
  const model = myDiagram.model;
  model.setDataProperty(obj.data, 'isDefault', false);
  myDiagram.commitTransaction('setSequenceLinkConditionalFlow');
}

export function editText(e: go.InputEvent, obj: go.GraphObject) {
  e.diagram.commandHandler.editTextBlock();
}

export function readjustLinks(diagram: any) {
  const links = diagram.model.linkDataArray;
  links.forEach(async (element) => {
    const link = await diagram.findLinkForData(element);
    await link.invalidateRoute();
  });
}

export function verificarPosicion(node: any, diagram: any, reposicion: boolean = false): boolean {
  if(!isUnoccupied(node.actualBounds,node).verif){
    if(reposicion){
      node.location = new go.Point(node.location.x,(node.location.y + (node.actualBounds.height + 50)));
      setTimeout(() => {
        relayoutDiagram(diagram);
        readjustLinks(diagram);
        verificarPosicion(node,diagram,true);
      }, 25);
    }else{
      if(node.data._data && node.data._data.new){
        diagram.commandHandler.deleteSelection();
        readjustLinks(diagram);
        return false;
      }else if(node.data.isPalettaNew){
        diagram.currentTool.doCancel();
        diagram.toolManager.draggingTool.clearGuidelines();
        readjustLinks(diagram);
        return false;
      }else{
        if(node.category != PaletteCategory.pool && node.category != PaletteCategory.group && node.category != PaletteCategory.lane && node.category != PaletteCategory.header && node.category != PaletteCategory.boundary){
          diagram.currentTool.doCancel();
        }
        readjustLinks(diagram);
        return false;
      }
    }
  }else{
    if(node.data._data){
      delete node.data._data;
    }
    if(node.data.isPalettaNew){
      delete node.data.isPalettaNew;
    }
    readjustLinks(diagram);
    return true;
  }
}

// a Part.dragComputation function that prevents a Part from being dragged to overlap another Part
export function avoidNodeOverlap(node: any, gridpt: any) {
  if (node.diagram instanceof go.Palette) return gridpt;
  const diagram = node.diagram;
  if (diagram.selection.count > 1) return gridpt;
  let otherLane = 0;
  // this assumes each node is fully rectangular
  var bnds = node.actualBounds;
  var loc = node.location;
  // active highlight in links
  linkHighlight(node);
  // use PT instead of GRIDPT if you want to ignore any grid snapping behavior
  // see if the area at the proposed location is unoccupied
  var r = new go.Rect(gridpt.x - (loc.x - bnds.x), gridpt.y - (loc.y - bnds.y), bnds.width, bnds.height);
  // maybe inflate R if you want some space between the node and any other nodes
  r.inflate(-0.5, -0.5);  // by default, deflate to avoid edge overlaps with "exact" fits
  const permiso = isUnoccupied(r, node);
  if(!permiso.verif){
    if((permiso.node.fa.value.category != node.category || node.data._data == null)){
      if(permiso.node.fa.value.category == PaletteCategory.pool || permiso.node.fa.value.category == PaletteCategory.lane){
        diagram.currentCursor = "grabbing";
      }else{
        diagram.currentCursor = "no-drop";
      }
    }else{
      diagram.currentCursor = "grabbing";
      const link = permiso.node.fa.value.findLinksBetween(diagram.findNodeForKey(node.data._data.key));
      const linkDrag = node.findLinksBetween(diagram.findNodeForKey(node.data._data.key));
      if(link.count == 0 && node.data._data.key != permiso.node.fa.value.data.key && node.category != PaletteCategory.annotation){
        var newlink = { from: node.data._data.key, to: permiso.node.fa.value.data.key };
        const validConnecting = checkConnection(node,permiso.node.fa.value);
        if(validConnecting){
          linkDrag.pb.j[0].setProperties({opacity: 0});
          diagram.model.addLinkData(newlink);
          node.setProperties({opacity: 0});
        }else{
          diagram.currentCursor = "no-drop";
        }
      }else{
        diagram.currentCursor = "no-drop";
      }
    }
  }else{
    const verLink = isUnoccupied(r, node, true);
    const linksN = node.findLinksConnected();
    if(verLink.node != null && verLink.node.fa.value instanceof go.Link && verLink.node.fa.value.data.to != node.data.key){
      clearTimeout(timer);
      staticDragOver(diagram);
    }else{
      clearTimeout(timer);
    }
    if(node.data._data){
      const links = diagram.findNodeForKey(node.data._data.key).findLinksOutOf().pb.j;
      if(links.length && links[links.length-1] && links[links.length-1].data.to != node.data.key && node.category != PaletteCategory.annotation){
        node.setProperties({opacity: 1});
        diagram.model.removeLinkData(links[links.length-1].data);
        links[links.length-1].setProperties({opacity: 1});
      }
    }
    const verLane = isUnoccupied(r, node, false, false, true);
    // console.log('lane',verLane.node.fa.value.category,node.category,node.data.group)
    if(verLane.node && verLane.node.fa.value.category == PaletteCategory.lane){
      otherLane = verLane.node.fa.value.data.key;
    }
    if(linksN.count > 0) {
      let type = '';
      let nodeL = null;
      linksN.pb.j.forEach( link => {
        // console.log('links')
        if(link.data.from != node.data.key){
          nodeL = link.fromNode;
          type = 'in';
        }else{
          nodeL = link.toNode;
          type = 'out';
        }
        // console.log('link',link.data,node.data,nodeL.data,type,connectionOtherNodesDiffKey(nodeL,node.data.key))
        if((node.category == PaletteCategory.gateway && nodeL && type == 'in') 
          || (type == 'in' && nodeL.category == PaletteCategory.gateway)
          || (type == 'in' && nodeL.category == PaletteCategory.activity)){
            // console.log('link hide 1')
            linkHideShow(nodeL,node,link,otherLane);
        }
        if(type == 'out' && nodeL.category == PaletteCategory.gateway){
          // console.log('link hide 2')
          linkHideShow(node,nodeL,link,otherLane);
        }
        if((nodeL.category == PaletteCategory.event && nodeL.data.eventDimension == EventDimension.intermediate) || (node.category == PaletteCategory.event && node.data.eventDimension == EventDimension.intermediate)){
          // console.log('link hide 3')
          if (type == 'in') {
            linkHideShow(nodeL,node,link,otherLane);
          } else {
            linkHideShow(node,nodeL,link,otherLane);
          }
        }
        // console.log('res',type == 'in' && nodeL.category == PaletteCategory.event && nodeL.data.eventDimension == EventDimension.start && connectionOtherNodesDiffKey(nodeL,node.data.key) > 0)
        if(type == 'in' && nodeL.category == PaletteCategory.event && nodeL.data.eventDimension == EventDimension.start && connectionOtherNodesDiffKey(nodeL,node.data.key) > 0){
          // console.log('link hide 4')
          linkHideShow(nodeL,node,link,otherLane);
        }
      })
    }

    diagram.currentCursor = "grabbing";
  }
  return gridpt;
}

export function linkHideShow(from,to,link,otherLane: number = 0){
  const validConnecting = checkConnection(from,to,'','',link,otherLane,true);
  console.log('is link hide',validConnecting)
  if(!validConnecting){
    link.setProperties({opacity: 0});
  }else{
    link.setProperties({opacity: 1});
  }
}

export function fromNode(node: go.Node): any{
  const link: any = node.findLinksInto();
  let Fnode: any = null;
  let linkC: any = null;
  if(link.count == 1){
    link.pb.j.forEach( item => {
      if(item.data.from != node.key){
        Fnode = item.fromNode;
        linkC = item;
      }
    })
  }
  return {"node":Fnode,"link":linkC,"linkT":link};
}
export function toNode(node: go.Node): any{
  const link: any = node.findLinksOutOf();
  let Tnode: any = null;
  let linkC: any = null;
  if(link.count == 1){
    link.pb.j.forEach( item => {
      if(item.data.to != node.key){
        Tnode = item.toNode;
        linkC = item;
      }
    })
  }
  return {"node":Tnode,"link":linkC,"linkT":link};
}

// R is a Rect in document coordinates
// NODE is the Node being moved -- ignore when looking for Parts intersecting the Rect
export function isUnoccupied(r: go.Rect, node: go.Node, isDragOver: boolean = false, Paste: boolean = false, Lane: boolean = false) {
  var diagram = node.diagram;
  var data = {
    node: null,
    verif: true
  };
  // nested function used by Layer.findObjectsIn, below
  // only consider Parts, and ignore the given Node, and Group members, Pool, Lane, Group, boundary
  function navig(obj) {
    var part = obj.part;
    if(isDragOver){
      if (part instanceof go.Link) return part;
      return null
    }else if(Paste){
      if (part.category === PaletteCategory.lane) return part;
      return null;
    }else{
      if (part === node) return null;
      if (part instanceof go.Link) return null;
      if(part.category === PaletteCategory.pool) return null;
      if(!Lane && part.category === PaletteCategory.lane) return null;
      if(Lane && part.category === PaletteCategory.lane) return part;
      if(part.category === PaletteCategory.group) return null;
      if(part.category === PaletteCategory.boundary) return null;
      return part;
    }
  }

  // only consider non-temporary Layers
  if(diagram){
    var lit: any = diagram.layers;
  }else{
    var lit: any = false;
  }
  while (lit && lit.next()) {
    var lay = lit.value;
    if (lay.isTemporary) continue;
    var nodes: any = lay.findObjectsIn(r, navig, null, true);
    if (nodes.count > 0){
      if(nodes.fa.value instanceof go.Link && nodes.fa.value.category == PaletteCategory.lane){
        data.verif = true;
      }else{
        data.verif = false;
      }
      data.node = nodes;
      return data;
    }
  }
  return data;
}

let timer: any;

export function staticDragOver(diagram: any) {
  timer = setTimeout(() => {
    readjustLinks(diagram);
  }, BpmnScriptConfig.LinksDelayStaticDragOver);
}

// VALIDAD SI EXISTE UNA PISCINA EN EL DIAGRAMA
export function isPool(diagram: go.Diagram): boolean {
  const nodeData = diagram.model.nodeDataArray;
  const pool = nodeData.filter(item => item.category == PaletteCategory.pool)
  if(pool.length > 0) return true;
  return false;
}

// resalta las lineas al moverse los simbolos
export function linkHighlight(node: go.Node | any) {
  // highlight all Links and Nodes coming out of a given Node
  var diagram = node.diagram;
  diagram.startTransaction("highlight");
  // remove any previous highlighting
  diagram.clearHighlighteds();
  const links = node.findLinksInto().pb.j;
  // for each Link coming out of the Node, set Link.isHighlighted
  links.forEach((l) => { l.isHighlighted = true; });
  diagram.commitTransaction("highlight");
}

export function nodeSelectionAdornmentTemplate(go: any, $: any) {
  return $(go.Adornment, "Auto",
    $(go.Shape, { fill: null, stroke: BpmnScriptConfig.NodeSelectionStroke, strokeWidth: 1.5, strokeDashArray: [4, 2], opacity: 1 }),
    $(go.Placeholder)
  );
}

export function validConnectionLinksBetweenGroup(sel: any) {
  const diagram = sel.diagram;
  const links = sel.findLinksConnected();
  if(links.count > 0){
    const from = fromNode(sel);
    if(sel.category == PaletteCategory.gateway){
      const linksSel: any = sel.findLinksConnected();
      if(linksSel.count > 0) {
        let nodeL = null;
        let linkData = [];
        linksSel.pb.j.forEach( link => {
          if(link.data.from != sel.data.key){
            nodeL = link.fromNode;
          }else{
            nodeL = link.toNode;
          }
          const validGroup = nodeL.findCommonContainingGroup(sel);
          if(validGroup == null){
            linkData.push(link.data);
          }
        })
        if(linkData.length > 0){
          linkData.forEach( (item,key) => {
            diagram.model.removeLinkData(item);
            if((key+1) == linksSel.count){
              diagram.toolManager.draggingTool.clearGuidelines();
              return;
            }
          })
        }
      }
    }
    
    links.pb.j.forEach((element,key) => {
      // console.log('links between')
      let el = null;
      let type = '';
      if(element.data.from != sel.data.key){
        el = diagram.findNodeForKey(element.data.from);
        type = 'in';
      }else{
        el = diagram.findNodeForKey(element.data.to);
        type = 'out';
      }
      if(sel.findCommonContainingGroup(el) === null){
        element.category = PaletteCategory.msg;
        if(sel.category == PaletteCategory.activity){
          if(type == 'in'){
            diagram.model.assignAllDataProperties(sel.data,{ taskType: ActivityType.message });
          }else{
            diagram.model.assignAllDataProperties(sel.data,{ taskType: ActivityType.sendMessage });
          }
        }
        if(el.category == PaletteCategory.activity){
          if(type == 'in'){
            diagram.model.assignAllDataProperties(el.data,{ taskType: ActivityType.sendMessage });
          }else{
            diagram.model.assignAllDataProperties(el.data,{ taskType: ActivityType.message });
          }
        }
        if(sel.category == PaletteCategory.event && sel.data.eventDimension == EventDimension.intermediate){
          const valid = checkConnection(el,sel,'msg','',element);
          if(!valid) {
            removeLink(element.data,diagram);
          }else if(sel.data.eventType == StartEventType.general && ((key+1) == links.count)) {
            if(type == 'in'){
              diagram.model.assignAllDataProperties(sel.data,{ eventType: StartEventType.message });
            }else{
              diagram.model.assignAllDataProperties(sel.data,{ eventType: StartEventType.sendMessage });
            }
          }
        }
        if(el.category == PaletteCategory.event && el.data.eventDimension == EventDimension.intermediate){
          const valid = checkConnection(el,sel,'msg','',element);
          if(!valid) {
            removeLink(element.data,diagram);
          } else {
            if(type == 'in'){
              diagram.model.assignAllDataProperties(el.data,{ eventType: StartEventType.sendMessage });
            }else{
              diagram.model.assignAllDataProperties(el.data,{ eventType: StartEventType.message });
            }
          }
        }
        if(el.category == PaletteCategory.gateway){
          validConnectionLinksBetweenGroup(el);
          if(sel.category == PaletteCategory.activity && (sel.data.taskType == ActivityType.message || sel.data.taskType == ActivityType.sendMessage) && connectionOtherNodesDiffKey(sel,el.data.key) == 0){
            diagram.model.assignAllDataProperties(sel.data,{ taskType: ActivityType.general });
          }else if(sel.category == PaletteCategory.event && sel.data.eventDimension == EventDimension.intermediate && (sel.data.eventType == StartEventType.message || sel.data.eventType == StartEventType.sendMessage) && connectionOtherNodesDiffKey(sel,el.data.key) == 0){
            diagram.model.assignAllDataProperties(sel.data,{ eventType: StartEventType.general });
          }
        }
      }else{
        // console.log('misma piscina',sel,el,sel.category == PaletteCategory.activity)
        if(el.category == PaletteCategory.annotation || sel.category == PaletteCategory.annotation){
          element.category = PaletteCategory.annotation;
        }else if(el.category == PaletteCategory.dataObject || el.category == PaletteCategory.dataWarehousing || sel.category == PaletteCategory.dataObject || sel.category == PaletteCategory.dataWarehousing){
          element.category = PaletteCategory.data;
        }else{
          element.category = '';
        }
        if(el.category == PaletteCategory.event && el.data.eventDimension == EventDimension.start && type == 'in' && connectionOtherNodesDiffKey(el,sel.data.key) > 0){
          removeLink(element.data,diagram);
        }
        if(sel.category == PaletteCategory.activity) {
          // console.log('is actividad 0',type)
          let valid = null;
          if(type == 'in'){
            valid = checkConnection(el,sel,'','',element);
          }else{
            valid = checkConnection(sel,el,'','',element);
          }
          // console.log('actividad valid',valid)
          if(!valid) {
            // console.log('remove links')
            removeLink(element.data,diagram);
          }
        }
      }
    })

    if(from.node && from.node.category == PaletteCategory.activity){
      // console.log('is activity')
      const verLane = isUnoccupied(sel.actualBounds, sel, false, false, true);
      if(from.node && verLane.node){
        const validConnecting = checkConnection(from.node,sel,'','',from.link);
        if(!validConnecting && validConnecting != null){
          removeLink(from.link.data,diagram);
          return;
        }
      }
    }
    
  }else{
    if(sel.category == PaletteCategory.event && sel.data.eventDimension == EventDimension.start){
      const nodes = diagram.model.nodeDataArray;
      nodes.forEach( item => {
        if(item.category == PaletteCategory.event && item.eventDimension == EventDimension.start && item.key != sel.data.key){
          const node = diagram.findNodeForKey(item.key);
          const validConnecting = sel.findCommonContainingGroup(node);
          if(validConnecting != null){
            diagram.commandHandler.deleteSelection();
            diagram.toolManager.draggingTool.clearGuidelines();
            return;
          }
        }
      })
    }
  }
}

// Validacion de conexiones permitidas
export function checkConnection(fromnode: go.Node, tonode: go.Node, linkCategory: string = '', linkType: string = 'link', linkC: go.Link = null, otherLane: number = 0, onDrag: boolean = false) {

  console.log('var: ',fromnode.category,tonode.category,linkCategory,linkType,linkC,'otherlane: '+otherLane)

  const diagram = fromnode.diagram;
  const samePool = fromnode.findCommonContainingGroup(tonode); // verificar si los elementos TO y FROM estan en el mismo grupo/piscina
  // si existe otherLane validar si pertenece a el mismo grupo/piscina
  let samePoolTo: any = 0;
  let samePoolFrom: any = 0;
  if(otherLane != 0) { 
    samePoolFrom = isSamePoolNodeAndKey(fromnode,otherLane); 
    samePoolTo = isSamePoolNodeAndKey(tonode,otherLane); 
  }
  const linksOutFrom: any = fromnode.findLinksOutOf(); // cantidad de conectores de salida del elemento FROM
  const linksInFrom: any = fromnode.findLinksInto(); // cantidad de conectores de entrada del elemento FROM
  const linksOutTo: any = tonode.findLinksOutOf(); // cantidad de conectores de salida del elemento TO
  const linksInTo: any = tonode.findLinksInto(); // cantidad de conectores de entrada del elemento TO
  // cantidad de conectores de los simbolos sin contar los conectores de categoria "msg"
  const linksOutFromLN = linksOutFrom.pb.j.filter(item => item.category != 'msg' && item.data.from == fromnode.data.key); // cantidad de conectores de salida del elemento FROM
  const linksInFromLN = linksInFrom.pb.j.filter(item => item.category != 'msg' && item.data.to == fromnode.data.key); // cantidad de conectores de entrada del elemento FROM
  const linksOutToLN = linksOutTo.pb.j.filter(item => item.category != 'msg' && item.data.from == tonode.data.key); // cantidad de conectores de salida del elemento TO
  const linksInToLN = linksInTo.pb.j.filter(item => item.category != 'msg' && item.data.to == tonode.data.key); // cantidad de conectores de entrada del elemento TO
  
  // console.log('same pool: ',samePool != null,
  // 'out from: '+linksOutFrom.count,
  //   'in from: '+linksInFrom.count,
  //   'out to: '+linksOutTo.count,
  //   'in to: '+linksInTo.count,
  //   'L out from: ',linksOutFromLN.length,
  //   'L in from: ',linksInFromLN.length,
  //   'L out to: ',linksOutToLN.length,
  //   'L in To: ',linksInToLN.length,
  //   )

  let res = null;
  let check = false;

  // validando si el simbolo TO es un evento de inicio
  if(tonode.category == PaletteCategory.event 
    && tonode.data.eventDimension == EventDimension.start 
    && samePool != null){
    // console.log('TO evento inicio')
    return false;
  }

  // validando si el simbolo FROM es un evento de inicio y si ya tiene una conexion extablecida
  if(fromnode.category == PaletteCategory.event 
    && fromnode.data.eventDimension == EventDimension.start
    && linkCategory != 'msg'
    && samePool != null
    && linksOutFromLN.length > 0) {
      if(linkType == 'link') {
          // console.log('From event start')
          return false;
        }else if(linkType == 'relink'
          && linksOutFromLN.length == 1) {
            // console.log('from event start relink')
            return true;
          }
    }

  // validando si el simbolo FROM es un evento final, no se pueda conectar a otro simbolo del mismo proceso
  if(linkCategory != 'msg' 
    && fromnode.category == PaletteCategory.event 
    && fromnode.data.eventDimension == EventDimension.end 
    && samePool != null){
    // console.log('evento final FROM')
    return false;
  }

  // un simbolo evento intermedio no se pueda conectar a otro simbolo de otra piscina, excepto si es de tipo mensaje
  if(fromnode.category == PaletteCategory.event 
    && fromnode.data.eventDimension == EventDimension.intermediate 
    && (!(samePool != null) || !(samePoolFrom != null))){
      // console.log('evento intermedio FROM')
      if(tonode.category == PaletteCategory.activity
        || (tonode.category == PaletteCategory.event 
        && tonode.data.eventDimension == EventDimension.intermediate)){
        res= true;
      }else{
        res = false;
      }
      return res;
  }
  if(tonode.category == PaletteCategory.event 
    && tonode.data.eventDimension == EventDimension.intermediate 
    && (!(samePool != null) || !(samePoolTo != null))){
      // console.log('evento intermedio TO')
      if(fromnode.category == PaletteCategory.activity 
        || (fromnode.category == PaletteCategory.event 
        && fromnode.data.eventDimension == EventDimension.intermediate)){
        res= true;
      }else{
        res = false;
      }
      return res;
  }

  // validando si el simbolo FROM es un simbolo de tarea y tenga una conexion en un carril de la piscina
  if(fromnode.category == PaletteCategory.activity
    && linkCategory != 'msg'
    && samePool != null) {
    // console.log('evento inicio otra conexion')
    
    // al crear un nuevo conector valida que el simbolo de tarea ya tenga un conector en un carril de la piscina
    if(linksOutFromLN.length > 0) {
      // console.log('tareas validacion conexiones extras')
      let same_lane = null;
      let groupLane = 0;
      linksOutFrom.pb.j.forEach( link => {
        if(same_lane == null && link.category != 'msg' && link.data.from == fromnode.data.key){
          const node = diagram.findNodeForKey(link.data.to);
          // const linkActual = diagram.selection.first();
          // console.log('node link',fromnode,node,fromnode.containingGroup != node.containingGroup)
          // if(linkActual instanceof go.Link){
          //   if(fromnode.containingGroup != node.containingGroup && linkActual.data != link.data){
          //     same_lane = false;
          //   }else same_lane = true;
          // }else{
            groupLane = node.containingGroup.data.key;
            if(fromnode.containingGroup != node.containingGroup){
              same_lane = false;
            }else same_lane = true;
          // }
        }
      })

      // valida que al crear un simbolo del menu circular si el simbolo de tarea ya tiene otros conectores en otros carriles
      if(linkC != null){
        console.log('link conexion', otherLane, groupLane)
        const number = linksOutFrom.pb.j.filter(item => (item.data.from == fromnode.data.key && item.data != linkC.data));
        // console.log('linkC',linkC,number.length,links.pb.j)
        if(number.length > 0){

          // console.log('linkC',number[0].data.from == fromnode.data.key,groupLane == otherLane,number[0].toNode.containingGroup.data.key == tonode.containingGroup.data.key)
          
          if(number[0].data.from == fromnode.data.key 
            && (otherLane != 0 && groupLane == otherLane 
                || otherLane == 0 && number[0].toNode.containingGroup.data.key == tonode.containingGroup.data.key) && !onDrag){
            res = true;
          }else if(number[0].data.from == fromnode.data.key && onDrag){
            res = true;
          }else {
            res = false;
          }
          // console.log('res',res)
          return res;
        }
      }

      // Validad que se mueva la misma conexcion del simbolo y no una nueva
      if(linkType == 'relink'){
        const linkActual = diagram.selection.first();
        if((same_lane && fromnode.containingGroup == tonode.containingGroup) || (!same_lane && fromnode.containingGroup != tonode.containingGroup)) {
          // console.log('tarea relink same lane')
          return true;
        }else if(linksOutFromLN.length == 1 && linkActual.category != 'msg'){
          // console.log('tarea relink distinct lane length 1')
          return true;
        }else{
          // console.log('tarea relink false')
          return false;
        }
      }
    
      if(fromnode.containingGroup == tonode.containingGroup && same_lane) {
        // console.log('tareas same lanes')
        return true;
      }else if(fromnode.containingGroup != tonode.containingGroup && !same_lane) {
        // console.log('tareas distinct lanes',same_lane)
        return true;
      }else {
        // console.log('tareas no cumple',same_lane)
        return false;
      }
    }else return true;
  }

  // valida que las puertas de enlace no esten conectadas entre diferentes grupos/piscinas
  if(tonode.category == PaletteCategory.gateway || fromnode.category == PaletteCategory.gateway){
    if(samePool == null || samePoolTo == null || samePoolFrom == null){
      // console.log('gateway false')
      return false;
    }else{
      // console.log('gateway true')
      return true;
    }
  }
  return true;
}

// verifica si el nodo tiene otras conexiones a parte de la actual
export function connectionOtherNodesDiffKey(node: go.Node, key: number | string){
  const links: any = node.findLinksConnected();
  if(links.count > 0){
    const count = links.pb.j.filter( item => (item.data.from != key && item.data.to != key));
    return count.length;
  }else{
    return 0;
  }
}

// verificar si el node y el key pertenecen al mismo grupo/piscina
export function isSamePoolNodeAndKey(node: go.Node, key: number) {
  const diagram = node.diagram;
  const otherNode = diagram.findNodeForKey(key);
  return node.findCommonContainingGroup(otherNode);
}

// eliminar una conexion existente
export function removeLink(link: go.Link, diagram: any) {
  diagram.startTransaction('removeLink'); 
  diagram.model.removeLinkData(link);
  diagram.toolManager.draggingTool.clearGuidelines();
  diagram.commitTransaction('removeLink'); 
}

export function selectionChildren(node: go.Node | any, arraySel = []) {
  const diagram: go.Diagram = node.diagram;
  const links = node.findLinksOutOf();
  if(links.count > 0) {
    let arraySelection = [];
    if(arraySel.length > 0) {
      arraySelection = arraySel;
    }else{
      arraySelection.push(node);
    }
    links.pb.j.forEach(item => {
      if(item.data.from == node.data.key) {
        const nodeChild = diagram.findNodeForKey(item.data.to);
        arraySelection.push(nodeChild);
        nodeChild.selectionAdornmentTemplate.setProperties({ opacity: 1 });
        selectionChildren(nodeChild,arraySelection);
      }
    })
    diagram.selectCollection(arraySelection);
  }
}