import * as go from "gojs";
import { BpmnScript } from "../";
import { circleMenuTemplate } from "./circleMenuTemplate";
import { activityTemplete } from "./conversionTemplates/activityTemplete";

import {
  SimbolosMenuCircular,
  CircleMenuDataArray,
  CircleMenuSeed,
} from "./circleMenu.interface";

import { SimbolosSeedMenuCircular } from "./circleMenu.seeds";
import { gatewayTemplete } from "./conversionTemplates/gatewayTemplate";
import { PaletteCategory } from "../palette/palette.enum";
import { BpmnEventType } from "../common/bpmn.enum";
import { eventStartTemplete } from "./conversionTemplates/eventStartTemplate";
import { eventIntermediateTemplete } from "./conversionTemplates/eventIntermediateTemplate";
import { eventEndTemplete } from "./conversionTemplates/eventEndTemplate";
import { subprocessTemplete } from "./conversionTemplates/subprocessTemplete";
import { BpmnConfig } from "../common/bpmn.interface";

import {
  relayoutDiagram,
  positionEventBorder,
  verificarPosicion,
  validConnectionLinksBetweenGroup,
} from "../common/bpmn.functions";

import { eventBorderTemplete } from "./conversionTemplates/eventBorderTemplate";
import { PaletteNodeDataArray } from "../palette/palette.interface";
import { BpmnEventBus } from "../../data/bpmn.class";

export class CircleMenu {
  $: any;
  go: any;
  bpmn: BpmnScript;
  myDiagram: any;
  nodeCircleMenu: go.Adornment;
  conversionTemplate: go.Adornment;
  simbolos: SimbolosMenuCircular[];
  taskDataSeed: any[];
  gatewayDataSeed: any[];
  eventStartDataSeed: any[];
  eventIntermediateDataSeed: any[];
  eventEndDataSeed: any[];
  subprocessDataSeed: any[];
  taskDataButton: any[];
  gatewayDataButton: any[];
  eventStartDataButton: any[];
  eventIntermediateDataButton: any[];
  eventEndDataButton: any[];
  eventBorderDataButton: any[];
  subprocessDataButton: any[];
  mainCircleMenu: any[];
  topSymbols: any[];
  rightSymbols: any[];
  bottomSymbols: any[];
  config: BpmnConfig;
  eventBus: BpmnEventBus;

  get buttonStyleMenuCircular() {
    return {
      "ButtonBorder.fill": "#ffffff00",
      "ButtonBorder.stroke": "#ffffff00",
      _buttonFillOver: "#ffffff00",
      _buttonStrokeOver: "#ffffff00",
      _buttonFillPressed: "#ffffff00",
      _buttonStrokePressed: "#ffffff00",
    };
  }

  constructor(
    go: any,
    $: any,
    diagram: go.Diagram,
    config: BpmnConfig,
    bpmnScript?: BpmnScript,
    eventBus?: BpmnEventBus
  ) {
    this.$ = $;
    this.go = go;
    this.myDiagram = diagram;
    this.config = config;
    this.simbolos = SimbolosSeedMenuCircular;
    if (bpmnScript) {
      this.bpmn = bpmnScript;
    }
    if (eventBus) {
      this.eventBus = eventBus;
    }
  }

  init = (): void => {
    if (this.config.diagramIsReadOnly) {
      return;
    }
    this.myDiagram.addDiagramListener("ChangedSelection", (diagramEvent) => {
      if (diagramEvent.diagram.selection.first())
        console.log(
          "cambio seleccion",
          diagramEvent.diagram.selection.first().data
        );
      const element = diagramEvent.diagram.selection.first();
      let val = true;
      if (element != null) {
        if (element.data.isPalettaNew) {
          val = verificarPosicion(element, this.myDiagram);
        }
        if (val) {
          if (this.eventBus) {
            this.eventBus.emit(BpmnEventType.changeSelection, {});
          }
          if (this.nodeCircleMenu) {
            if (this.nodeCircleMenu.adornedObject)
              this.nodeCircleMenu.adornedPart.removeAdornment("menuCircular");
          }
          this.nodeCircleMenu = circleMenuTemplate(
            this.go,
            this.$,
            this,
            this.config
          );
          const category = element.category;
          if (
            category == "activity" ||
            category == "Pool" ||
            category == "Lane" ||
            category == "event" ||
            category == "subprocess" ||
            category == "gateway" ||
            category == "dataobject" ||
            category == "datastore" ||
            category == "privateProcess" ||
            category == "annotation" ||
            category == "boundary"
          ) {
            const node = element.part;
            this.nodeCircleMenu.adornedObject = node;
            node.addAdornment("menuCircular", this.nodeCircleMenu);
            node.selectionAdornmentTemplate.setProperties({ opacity: 0 });
          }
          if (category == "Pool") relayoutDiagram(this.myDiagram);
        }
      } else {
        if (this.nodeCircleMenu.adornedObject)
          this.nodeCircleMenu.adornedPart.removeAdornment("menuCircular");
      }
    });
    this.myDiagram.toolManager.hoverDelay = 500;
  };

  asignTranslateSeed = (
    dataArray: CircleMenuDataArray[] | CircleMenuSeed[],
    type: string,
    position: string
  ) => {
    switch (type) {
      case PaletteCategory.activity:
        this.taskDataSeed = dataArray;
        break;
      case PaletteCategory.gateway:
        this.gatewayDataSeed = dataArray;
        break;
      case "eventStart":
        this.eventStartDataSeed = dataArray;
        break;
      case "eventIntermediate":
        this.eventIntermediateDataSeed = dataArray;
        break;
      case "eventEnd":
        this.eventEndDataSeed = dataArray;
        break;
      case PaletteCategory.subprocess:
        this.subprocessDataSeed = dataArray;
        break;
      case "mainCircleMenu":
        this.mainCircleMenu = dataArray;
        break;
      case "conversion":
        switch (position) {
          case PaletteCategory.activity:
            this.taskDataButton = dataArray;
            break;
          case PaletteCategory.gateway:
            this.gatewayDataButton = dataArray;
            break;
          case "eventStart":
            this.eventStartDataButton = dataArray;
            break;
          case "eventIntermediate":
            this.eventIntermediateDataButton = dataArray;
            break;
          case "eventEnd":
            this.eventEndDataButton = dataArray;
            break;
          case PaletteCategory.subprocess:
            this.subprocessDataButton = dataArray;
            break;
          case "eventBorder":
            this.eventBorderDataButton = dataArray;
            break;
        }
        break;
      case "opctionsCircleMenu":
        if (position == "top") {
          this.topSymbols = dataArray;
        }
        if (position == "right") {
          this.rightSymbols = dataArray;
        }
        if (position == "bottom") {
          this.bottomSymbols = dataArray;
        }
        break;
    }
  };

  setAdornmentCircleMenu = (data: any, simbol: any): any => {
    let category = simbol.category;
    if (category == "event") {
      category = this.isEvent(simbol.eventDimension);
    }
    const select = this.simbolos.filter((item) => item.category == category);
    if (select.length > 0) {
      return data.filter((item) => {
        if (
          category == "Pool" &&
          (item.category == "div2" ||
            item.category == "div3" ||
            item.category == "div")
        ) {
          const nodeData = this.myDiagram.model.nodeDataArray;
          const lanes = nodeData.filter((x) => x.group == simbol.key);
          let cont = 0;
          lanes.forEach((el) => {
            cont += nodeData.filter((x) => x.group == el.key).length;
          });
          if (cont > 0) {
            return false;
          } else {
            return select[0].accionesPrincipales[item._data.category];
          }
        } else {
          return select[0].accionesPrincipales[item._data.category];
        }
      });
    }
    return [];
  };

  setConversionSimbol = (e: any, button: any, $: any): void => {
    let category = button.part.data.category;
    var node = button.part;
    if (category == "event") {
      category = this.isEvent(button.part.data.eventDimension);
    }
    switch (category) {
      case "activity":
        this.assignAdormentConversion(
          activityTemplete(this.go, $, this, this.config),
          node
        );
        break;
      case "event":
        this.assignAdormentConversion(
          eventStartTemplete(this.go, $, this, this.config),
          node
        );
        break;
      case "eventIntermediate":
        this.assignAdormentConversion(
          eventIntermediateTemplete(this.go, $, this, this.config),
          node
        );
        break;
      case "boundary":
        this.assignAdormentConversion(
          eventIntermediateTemplete(this.go, $, this, this.config, "boundary"),
          node
        );
        break;
      case "eventEnd":
        this.assignAdormentConversion(
          eventEndTemplete(this.go, $, this, this.config),
          node
        );
        break;
      case "gateway":
        this.assignAdormentConversion(
          gatewayTemplete(this.go, $, this, this.config),
          node
        );
        break;
      case "subprocess":
        this.assignAdormentConversion(
          subprocessTemplete(this.go, $, this, this.config),
          node
        );
        break;
      case "eventBorder":
        this.assignAdormentConversion(
          eventBorderTemplete(this.go, $, this, this.config),
          node
        );
        break;
    }
  };

  setEventBorderSimbol = (button: any): void => {
    var node = button.part;
    this.assignAdormentConversion(
      eventBorderTemplete(this.go, this.$, this, this.config),
      node
    );
  };

  addEventBorder = (e: any, button: any): void => {
    const newnodo = this.createNodeEventBorder(button.data);
    setTimeout(() => {
      newnodo.location = positionEventBorder(newnodo);
    }, 0);
  };

  addEventBorderByNode(paletteNode: PaletteNodeDataArray): void {
    const newnodo = this.createNodeEventBorder(paletteNode);
    setTimeout(() => {
      newnodo.location = positionEventBorder(newnodo);
    }, 0);
  }

  isEvent(type: number) {
    if (type == 1) {
      return "event";
    } else if (type == 3) {
      return "eventEnd";
    } else if (type == 2) {
      return "eventIntermediate";
    }
  }

  assignAdormentConversion(template: go.Adornment, node: go.Node) {
    this.conversionTemplate = template;
    this.conversionTemplate.adornedObject = node;
    node.addAdornment("contentConversion", this.conversionTemplate);
  }

  convertirSimbol = (e: any, button: any): void => {
    const dataNew = this.typeConversionSimbol(button.data.data);
    var data = e.diagram.model.findNodeDataForKey(
      e.diagram.selection.first().data.key
    );
    if (data !== null) e.diagram.model.assignAllDataProperties(data, dataNew);
  };

  convertirBoundarySimbol = (e: any, button: any): void => {
    button.data.data.category = "boundary";
    const dataNew = this.typeConversionSimbol(button.data.data);
    var data = e.diagram.model.findNodeDataForKey(
      e.diagram.selection.first().data.key
    );
    if (data !== null) e.diagram.model.assignAllDataProperties(data, dataNew);
  };

  openPropiedades = (e: any, button: any): void => {
    this.eventBus.emit(BpmnEventType.selectElement, {});
  };

  eliminarSimbolo = (e: any, button: any): void => {
    setTimeout(() => relayoutDiagram(this.myDiagram), 0);
    e.diagram.commandHandler.deleteSelection();
  };

  addLane = (e: any, button: any, size?: any): void => {
    let element = e.diagram.selection.first();
    let lane = {
      category: PaletteCategory.lane,
      text: "Process",
      isGroup: true,
      group: 0,
      size: element.data.size,
    };
    if (element.data.category == "Pool") {
      lane.group = element.data.key;
      const dataArray = e.diagram.model.nodeDataArray;
      const group = dataArray.filter((item) => item.group == element.data.key);
      if (group.length > 0) size = group[0].size;
    } else if (element.data.category == "Lane") {
      lane.group = element.data.group;
    }
    if (size && typeof size != "undefined") {
      const newSize = size.split(" ");
      lane.size = newSize[0] + " 0";
    } else if (element.data.size) {
      const newSize = element.data.size.split(" ");
      lane.size = newSize[0] + " 0";
    }
    var model = e.diagram.model;
    model.addNodeData(lane);
    var newnode = e.diagram.findNodeForData(lane);
    if (button.data._data.position == "top") {
      newnode.location = new this.go.Point(
        element.location.x,
        element.location.y - 1
      );
    } else if (
      button.data._data.position == "bottom" &&
      element.data.category == "Lane"
    ) {
      newnode.location = new this.go.Point(
        element.location.x,
        element.location.y + 1
      );
    }
    relayoutDiagram(this.myDiagram);
    e.diagram.select(newnode);
  };

  swinDivLanes = (e: any, button: any): void => {
    const selection = e.diagram.selection.first().data;
    const dataArray = e.diagram.model.nodeDataArray;
    const group = dataArray.filter((item) => item.group == selection.key);
    if (group.length < button.data._data.quantity) {
      for (
        let index = 0;
        index < button.data._data.quantity - group.length;
        index++
      ) {
        if (group.length > 0) {
          this.addLane(e, button, group[0].size);
        } else {
          this.addLane(e, button);
        }
      }
    }
  };

  drawLink = (e: any, button: any): void => {
    var node = button.part.adornedPart;
    var tool = e.diagram.toolManager.linkingTool;
    tool.startObject = node.port;
    e.diagram.currentTool = tool;
    tool.doActivate();
  };

  dragNewNode = (e: any, button: any): void => {
    var tool = e.diagram.toolManager.draggingTool;
    let actual = e.diagram.selection.first();
    if (tool.isBeyondDragSize()) {
      let data = Object.assign({}, this.typeSimbol(button.data._data.category));
      if (!data) return;
      e.diagram.startTransaction("button drag");
      var newnode = this.createNodeAndLink(data, button.part.adornedPart);
      newnode.location = e.diagram.lastInput.documentPoint;
      tool.currentPart = newnode;
      e.diagram.currentTool = tool;
      tool.doActivate();
      e.diagram.commitTransaction("button drag");
    }
  };

  clickNewNode = (e: any, button: any): void => {
    let data = Object.assign({}, this.typeSimbol(button.data._data.category));
    let actual = e.diagram.selection.first();
    if (!data) return;
    e.diagram.startTransaction("Create Node and Link");
    let fromnode = button.part.adornedPart;
    let width = fromnode.location.x + (actual.actualBounds.width + 50);
    let height = fromnode.location.y;
    let newnode = this.createNodeAndLink(data, fromnode);
    if (data.category == "annotation") {
      width = fromnode.location.x + actual.actualBounds.width;
      height = fromnode.location.y - 110;
    }
    if (actual.data.category == "subprocess" && data.category != "annotation") {
      width = fromnode.location.x + (actual.actualBounds.width + 100);
    }
    newnode.location = new this.go.Point(width, height);
    if (newnode.data.group) relayoutDiagram(this.myDiagram);
    if (newnode.data._data) verificarPosicion(newnode, e.diagram, true);
    validConnectionLinksBetweenGroup(newnode);
    e.diagram.commitTransaction("Create Node and Link");
  };

  createNodeAndLink = (data: any, fromnode: any) => {
    var diagram = fromnode.diagram;
    var model = diagram.model;
    const actual = diagram.selection.first().data;
    data._data = {
      key: actual.key,
      new: true,
    };
    if (actual.group && !actual.isEventBorder) data.group = actual.group;
    if (actual.isEventBorder) {
      const task = diagram.model.findNodeDataForKey(actual.group);
      data.group = task.group;
    }
    model.addNodeData(data);
    var newnode = diagram.findNodeForData(data);
    if (data.category == "annotation") {
      var newlink = { from: newnode.key, to: fromnode.data.key };
    } else {
      var newlink = { from: fromnode.data.key, to: newnode.key };
    }
    model.addLinkData(newlink);
    diagram.select(newnode);
    // TRANSFORMA LA LINEA DE CONEXION NORMAL AL DE TIPO ANOTACION
    if (data.category == "annotation") {
      let variable =
        this.myDiagram.selection.first().linksConnected.pb._dataArray[0];
      variable.category = "annotation";
    }
    return newnode;
  };

  createNodeEventBorder = (data: any) => {
    var diagram = this.myDiagram;
    var model = diagram.model;
    const actual = diagram.selection.first();
    let newData = {
      category: PaletteCategory.boundary,
      eventType: data.eventType,
      eventDimension: data.eventDimension,
      isText: false,
      group: actual.data.key,
      isEventBorder: true,
      loc: actual.data.loc,
    };
    model.addNodeData(newData);
    var newnode = diagram.findNodeForData(newData);
    diagram.select(newnode);
    return newnode;
  };

  typeConversionSimbol = (simbol: any) => {
    let data = null;
    switch (simbol.category) {
      case "task":
        data = this.taskDataSeed.filter((item) => item.taskType == simbol.type);
        break;
      case "gateway":
        data = this.gatewayDataSeed.filter(
          (item) => item.gatewayType == simbol.type
        );
        break;
      case "event":
        data = this.eventStartDataSeed.filter(
          (item) => item.eventType == simbol.type
        );
        break;
      case "eventIntermediate":
        data = this.eventIntermediateDataSeed.filter(
          (item) => item.eventType == simbol.type
        );
        break;
      case "eventEndDataSeed":
        data = this.eventEndDataSeed.filter(
          (item) => item.eventType == simbol.type
        );
        break;
      case "subprocess":
        data = this.subprocessDataSeed.filter(
          (item) => item.subprocessType == simbol.type
        );
        break;
      case "boundary":
        data = this.eventIntermediateDataSeed.filter(
          (item) => item.eventType == simbol.type
        );
        data[0].category = "boundary";
        break;
    }
    delete data[0].text;
    return data[0];
  };

  typeSimbol = (category: string) => {
    let data = null;
    data = this.mainCircleMenu.filter((item) => item.type == category);
    return data[0].data;
  };
}
