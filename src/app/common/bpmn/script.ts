import * as go from "gojs";
import { DrawCommandHandler } from "./assets/drawcommandhandler";
import {
  BPMNLinkingTool,
  BPMNRelinkingTool,
  BPMNPanningTool,
} from "./assets/classes";
import { BpmnScriptConfig } from "./bpmn.config";
import { activityNodeTemplate } from "./templates/activity.template";
import { eventNodeTemplate } from "./templates/event-node.template";
import { gatewayNodeTemplate } from "./templates/gateway-node.template";
import { annotationNodeTemplate } from "./templates/annotation.template";
import { dataObjectNodeTemplate } from "./templates/data-object.template";
import { dataStoreNodeTemplate } from "./templates/data-store.template";
import { privateProcessNodeTemplate } from "./templates/private-proccess.template";
import { subProcessGroupTemplate } from "./templates/subprocess-group.template";
import { swimLanesGroupTemplate } from "./templates/swin-lanes-group.template";
import { BpmnOverview } from "./overview";
import { BpmnPalette } from "./palette/palette";
import { sequenceLinkTemplate } from "./templates/sequence-link.template";
import { dataAssociationLinkTemplate } from "./templates/data-association-lin.template";
import { annotationAssociationLinkTemplate } from "./templates/annotation-association-link.template";
import { messageFlowLinkTemplate } from "./templates/message-flow-link.template";
import { poolGroupTemplate } from "./templates/pool-group.template";
import { PaletteSeed } from "./palette/palette.interface";
import { BpmnEventBus } from "../data/bpmn.class";
import { GuidedDraggingTool } from "./assets/GuidedDraggingTool";
import { groupNodeTemplate } from "./templates/group-node.template";
import {
  BpmnEventType,
  StartEventType,
  GatewayType,
  ActivityType,
  LanePosition,
  ActivityInstance,
} from "./common/bpmn.enum";
import { CircleMenu } from "./circleMenu/circleMenu";
import { headerNodeTemplate } from "./templates/header.template";
import {
  relayoutDiagram,
  setSequenceLinkDefaultFlow,
  setSequenceLinkConditionalFlow,
  setSequenceLinkRegularFlow,
  verificarPosicion,
  isPool,
  setActivityType,
  clearActivityType,
  isUnoccupied,
  validConnectionLinksBetweenGroup,
  selectionChildren,
} from "./common/bpmn.functions";
import "./assets/figures";
import { PaletteCategory } from "./palette/palette.enum";
import { BpmnConfig } from "./common/bpmn.interface";
import { boundaryEventItemTemplate } from "./templates/boundary.template";
import { BpmnContextMenuType, getContextMenu } from "./menu-context";
import { BpmnContextMenu } from "../components/context-menu/common/context.menu.interface";
import {
  startEventPalette,
  intermediateEventPalette,
  endEventPalette,
  mainPalette,
} from "./palette/palette.seeds";
import { CircleMenuDataArray } from "./circleMenu/circleMenu.interface";
import { OrthogonalLinkReshapingTool } from "./assets/OrthogonalLinkReshapingTool";
import { LinkShiftingTool } from "./assets/LinkShiftingTool";

export class BpmnScript {
  myDiagram: go.Diagram;
  myOverview: go.Overview;
  fileName = "(Unsaved File)";
  $ = go.GraphObject.make;
  eventBus: BpmnEventBus;
  bpmnConfig: BpmnConfig = BpmnScriptConfig;
  circleMenu: CircleMenu;

  constructor(eventBus?: BpmnEventBus, config?: BpmnConfig) {
    if (eventBus) {
      this.eventBus = eventBus;
    }
    if (config) {
      this.bpmnConfig = config;
    }
  }

  public init(idDivDiagram: string = "myDiagramDiv") {
    go.Shape.defineFigureGenerator("Empty", (shape, w, h) => {
      return new go.Geometry();
    });

    const annotationStr = "M 150,0L 0,0L 0,600L 150,600 M 800,0";
    const annotationGeo = go.Geometry.parse(annotationStr);

    annotationGeo.normalize();

    go.Shape.defineFigureGenerator("Annotation", (shape, w, h) => {
      const geo = annotationGeo.copy();
      const bounds = geo.bounds;
      const scale = Math.min(w / bounds.width, h / bounds.height);
      geo.scale(scale, scale);
      return geo;
    });

    const gearStr =
      "F M 391,5L 419,14L 444.5,30.5L 451,120.5L 485.5,126L 522,141L 595,83L 618.5,92L 644,106.5" +
      "L 660.5,132L 670,158L 616,220L 640.5,265.5L 658.122,317.809L 753.122,322.809L 770.122,348.309L 774.622,374.309" +
      "L 769.5,402L 756.622,420.309L 659.122,428.809L 640.5,475L 616.5,519.5L 670,573.5L 663,600L 646,626.5" +
      "L 622,639L 595,645.5L 531.5,597.5L 493.192,613.462L 450,627.5L 444.5,718.5L 421.5,733L 393,740.5L 361.5,733.5" +
      "L 336.5,719L 330,627.5L 277.5,611.5L 227.5,584.167L 156.5,646L 124.5,641L 102,626.5L 82,602.5L 78.5,572.5" +
      "L 148.167,500.833L 133.5,466.833L 122,432.5L 26.5,421L 11,400.5L 5,373.5L 12,347.5L 26.5,324L 123.5,317.5" +
      "L 136.833,274.167L 154,241L 75.5,152.5L 85.5,128.5L 103,105.5L 128.5,88.5001L 154.872,82.4758L 237,155" +
      "L 280.5,132L 330,121L 336,30L 361,15L 391,5 Z M 398.201,232L 510.201,275L 556.201,385L 505.201,491L 399.201,537" +
      "L 284.201,489L 242.201,385L 282.201,273L 398.201,232 Z";

    const gearGeo = go.Geometry.parse(gearStr);

    gearGeo.normalize();

    go.Shape.defineFigureGenerator("BpmnTaskService", (shape, w, h) => {
      const geo = gearGeo.copy();
      const bounds = geo.bounds;
      const scale = Math.min(w / bounds.width, h / bounds.height);
      geo.scale(scale, scale);
      geo.spot1 = new go.Spot(0, 0.6, 10, 0);
      geo.spot2 = new go.Spot(1, 1);
      return geo;
    });

    const handGeo = go.Geometry.parse(
      "F1M18.13,10.06 C18.18,10.07 18.22,10.07 18.26,10.08 18.91," +
        "10.20 21.20,10.12 21.28,12.93 21.36,15.75 21.42,32.40 21.42,32.40 21.42," +
        "32.40 21.12,34.10 23.08,33.06 23.08,33.06 22.89,24.76 23.80,24.17 24.72," +
        "23.59 26.69,23.81 27.19,24.40 27.69,24.98 28.03,24.97 28.03,33.34 28.03," +
        "33.34 29.32,34.54 29.93,33.12 30.47,31.84 29.71,27.11 30.86,26.56 31.80," +
        "26.12 34.53,26.12 34.72,28.29 34.94,30.82 34.22,36.12 35.64,35.79 35.64," +
        "35.79 36.64,36.08 36.72,34.54 36.80,33.00 37.17,30.15 38.42,29.90 39.67," +
        "29.65 41.22,30.20 41.30,32.29 41.39,34.37 42.30,46.69 38.86,55.40 35.75," +
        "63.29 36.42,62.62 33.47,63.12 30.76,63.58 26.69,63.12 26.69,63.12 26.69," +
        "63.12 17.72,64.45 15.64,57.62 13.55,50.79 10.80,40.95 7.30,38.95 3.80," +
        "36.95 4.24,36.37 4.28,35.35 4.32,34.33 7.60,31.25 12.97,35.75 12.97," +
        "35.75 16.10,39.79 16.10,42.00 16.10,42.00 15.69,14.30 15.80,12.79 15.96," +
        "10.75 17.42,10.04 18.13,10.06z "
    );

    handGeo.rotate(90, 0, 0);

    handGeo.normalize();

    go.Shape.defineFigureGenerator("BpmnTaskManual", (shape, w, h) => {
      const geo = handGeo.copy();
      const bounds = geo.bounds;
      const scale = Math.min(w / bounds.width, h / bounds.height);
      geo.scale(scale, scale);
      geo.spot1 = new go.Spot(0, 0.6, 10, 0);
      geo.spot2 = new go.Spot(1, 1);
      return geo;
    });

    this.myDiagram = this.$(go.Diagram, idDivDiagram, {
      commandHandler: new DrawCommandHandler(),
      allowZoom: true,
      hoverDelay: 0,
      click: (e) => {
        if (this.eventBus) {
          this.eventBus.emit(BpmnEventType.diagramClick, e);
        }
      },
      mouseDrop: () => {
        const element = this.myDiagram.selection.first();
        if (
          !isPool(this.myDiagram) ||
          element.data.category == PaletteCategory.pool ||
          element.data.category == PaletteCategory.header ||
          element.data.category == PaletteCategory.group ||
          element.data.category == PaletteCategory.annotation
        ) {
          const ok = this.myDiagram.commandHandler.addTopLevelParts(
            this.myDiagram.selection,
            true
          );
          if (!ok) {
            this.myDiagram.currentTool.doCancel();
          }
        } else if (
          element.data.group === null ||
          element.data.group === undefined ||
          !element.data.group
        ) {
          this.myDiagram.commandHandler.deleteSelection();
          this.clearGuideDragging(this.myDiagram);
        } else if (element.data._data && element.data._data.new) {
          this.myDiagram.currentTool.doCancel();
          this.myDiagram.commandHandler.deleteSelection();
        } else {
          this.myDiagram.currentTool.doCancel();
        }
      },
      mouseDragOver: () => {
        const element = this.myDiagram.selection.first();
        if (
          isPool(this.myDiagram) &&
          element &&
          element.data.category != PaletteCategory.pool &&
          element.data.category != PaletteCategory.header &&
          element.data.category != PaletteCategory.group &&
          element.data.category != PaletteCategory.annotation
        ) {
          this.myDiagram.currentCursor = "no-drop";
        } else if (!element) {
          this.myDiagram.currentCursor = "no-drop";
        }
      },
      linkingTool: new BPMNLinkingTool(),
      relinkingTool: new BPMNRelinkingTool(),
      draggingTool: new GuidedDraggingTool(),
      panningTool: new BPMNPanningTool(),
      linkReshapingTool: new OrthogonalLinkReshapingTool(),
      SelectionMoved: () => relayoutDiagram(this.myDiagram),
      SelectionCopied: () => relayoutDiagram(this.myDiagram),
      "commandHandler.arrowKeyBehavior": "move",
      "undoManager.isEnabled": true,
      "animationManager.isEnabled": false,
      "draggingTool.horizontalGuidelineColor": "blue",
      "draggingTool.verticalGuidelineColor": "blue",
      "draggingTool.centerGuidelineColor": "green",
      "draggingTool.guidelineSnapDistance": 15,
      "draggingTool.guidelineWidth": 2,
      "linkingTool.portGravity": 20,
      "relinkingTool.portGravity": 20,
      "relinkingTool.fromHandleArchetype": this.$(go.Shape, "Diamond", {
        segmentIndex: 0,
        cursor: "pointer",
        desiredSize: new go.Size(8, 8),
        fill: this.bpmnConfig.LinksSymbolConnectedFill,
        stroke: this.bpmnConfig.LinksSymbolConnectedStroke,
      }),
      "relinkingTool.toHandleArchetype": this.$(go.Shape, "Diamond", {
        segmentIndex: -1,
        cursor: "pointer",
        desiredSize: new go.Size(8, 8),
        fill: this.bpmnConfig.LinksSymbolConnectedFill,
        stroke: this.bpmnConfig.LinksSymbolConnectedStroke,
      }),
      "linkReshapingTool.handleArchetype": this.$(go.Shape, "Diamond", {
        desiredSize: new go.Size(7, 7),
        fill: this.bpmnConfig.LinksCornerFill,
        stroke: this.bpmnConfig.LinksCornerStroke,
      }),
    });

    const nodeTemplateMap = new go.Map<string, go.Node>();
    nodeTemplateMap.add(
      PaletteCategory.boundary,
      boundaryEventItemTemplate(go, this.$, this.bpmnConfig)
    );
    nodeTemplateMap.add(
      PaletteCategory.event,
      eventNodeTemplate(go, this.$, this.bpmnConfig)
    );
    nodeTemplateMap.add(
      PaletteCategory.gateway,
      gatewayNodeTemplate(go, this.$, this.bpmnConfig)
    );
    nodeTemplateMap.add(
      PaletteCategory.annotation,
      annotationNodeTemplate(go, this.$, this.bpmnConfig)
    );
    nodeTemplateMap.add(
      PaletteCategory.dataObject,
      dataObjectNodeTemplate(go, this.$, this.bpmnConfig)
    );
    nodeTemplateMap.add(
      PaletteCategory.dataWarehousing,
      dataStoreNodeTemplate(go, this.$, this.bpmnConfig)
    );
    nodeTemplateMap.add(
      PaletteCategory.group,
      groupNodeTemplate(go, this.$, this.bpmnConfig)
    );
    nodeTemplateMap.add(
      PaletteCategory.header,
      headerNodeTemplate(go, this.$, this.bpmnConfig)
    );
    nodeTemplateMap.add(
      PaletteCategory.privateProcess,
      privateProcessNodeTemplate(go, this.$, this.bpmnConfig)
    );

    const groupTemplateMap = new go.Map<string, go.Group>();
    groupTemplateMap.add(
      PaletteCategory.activity,
      activityNodeTemplate(go, this.$, this.bpmnConfig)
    );
    groupTemplateMap.add(
      PaletteCategory.subprocess,
      subProcessGroupTemplate(go, this.$, this.bpmnConfig)
    );
    groupTemplateMap.add(
      PaletteCategory.lane,
      swimLanesGroupTemplate(go, this.$, this.myDiagram, this.bpmnConfig)
    );
    groupTemplateMap.add(
      PaletteCategory.pool,
      poolGroupTemplate(go, this.$, this.bpmnConfig)
    );

    // link template
    const linkTemplateMap = new go.Map<string, go.Link>();
    linkTemplateMap.add(
      PaletteCategory.msg,
      messageFlowLinkTemplate(go, this.$, this.bpmnConfig)
    );
    linkTemplateMap.add(
      PaletteCategory.annotation,
      annotationAssociationLinkTemplate(go, this.$, this.bpmnConfig)
    );
    linkTemplateMap.add(
      PaletteCategory.data,
      dataAssociationLinkTemplate(go, this.$, this.bpmnConfig)
    );
    linkTemplateMap.add(
      "",
      sequenceLinkTemplate(go, this.$, this.myDiagram, this.bpmnConfig)
    );

    this.myDiagram.nodeTemplateMap = nodeTemplateMap;
    this.myDiagram.linkTemplateMap = linkTemplateMap;
    this.myDiagram.groupTemplateMap = groupTemplateMap;

    this.loadDiagramContextMenu();

    this.myDiagram.addDiagramListener("LinkDrawn", (e) => {
      const sel: any = this.myDiagram.selection.first();
      validConnectionLinksBetweenGroup(sel.toNode);
      if (e.subject.fromNode.category === PaletteCategory.annotation) {
        e.subject.category = PaletteCategory.annotation;
      } else if (
        e.subject.fromNode.category === PaletteCategory.dataObject ||
        e.subject.toNode.category === PaletteCategory.dataObject
      ) {
        e.subject.category = PaletteCategory.data;
      } else if (
        e.subject.fromNode.category === PaletteCategory.dataWarehousing ||
        e.subject.toNode.category === PaletteCategory.dataWarehousing
      ) {
        e.subject.category = PaletteCategory.data;
      }
    });

    this.myDiagram.addDiagramListener("SelectionMoved", (e) => {
      const el = e.subject.ja.fa.key;
      verificarPosicion(el, e.diagram);
      e.diagram.commit((d) => {
        d.clearHighlighteds();
      }, "no highlighteds");
    });

    this.myOverview = BpmnOverview.getOverview(go, this.$, this.myDiagram);
    (this.myOverview.box.elt(0) as go.Shape).stroke = "dodgerblue";
    this.circleMenu = new CircleMenu(
      go,
      this.$,
      this.myDiagram,
      this.bpmnConfig,
      null,
      this.eventBus
    );
    this.circleMenu.init();

    this.listenEvents();

    this.myDiagram.toolManager.mouseDownTools.add(new LinkShiftingTool());

    // DIAGRAMA INICIAL
    this.initModel();

    // QUITAR EL TOUCH CONTEXT MENU
    this.myDiagram.toolManager.contextMenuTool.defaultTouchContextMenu = null;

    // MOVER ELEMENTO SELECCIONADO 5PX POR DEFECTO, AL PRESIONAR SHIFT MOVER 10PX
    this.myDiagram.commandHandler.doKeyDown = () => {
      const e = this.myDiagram.lastInput;
      const selection = this.myDiagram.selection;
      const cmd = this.myDiagram.commandHandler;
      let q = 5;
      if (e.control) {
        const key = e.key.toLowerCase();
        switch (key) {
          case "m":
            this.eventBus.emit(BpmnEventType.clickMenuIconProperty, {});
            break;
          default:
            break;
        }
      }
      if (e.shift) q = 10;
      selection.each((sel) => {
        if (e.key === "Down") {
          sel.location = new go.Point(sel.location.x, sel.location.y + q);
        } else if (e.key === "Up") {
          sel.location = new go.Point(sel.location.x, sel.location.y - q);
        } else if (e.key === "Right") {
          sel.location = new go.Point(sel.location.x + q, sel.location.y);
        } else if (e.key === "Left") {
          sel.location = new go.Point(sel.location.x - q, sel.location.y);
        } else {
          go.CommandHandler.prototype.doKeyDown.call(cmd);
        }
      });
      if (e.alt && e.key == "A" && selection.first() instanceof go.Node) {
        selectionChildren(selection.first());
      }
      if (selection.count == 0) go.CommandHandler.prototype.doKeyDown.call(cmd);
    };

    // asigna las configuraciones iniciales
    this.handleConfig();

    this.myDiagram.commandHandler.pasteSelection = () => {
      const cmd = this.myDiagram.commandHandler;
      go.CommandHandler.prototype.pasteSelection.call(cmd);
      const selections = this.myDiagram.selection;
      selections.each((sel: any) => {
        const val = isUnoccupied(sel.actualBounds, sel, false, true);
        if (
          !val.verif &&
          val.node.fa.value != null &&
          val.node.fa.value.category == PaletteCategory.lane
        ) {
          val.node.fa.value.addMembers(selections, true);
        }
      });
    };
  }

  clearGuideDragging(diagram: any) {
    diagram.toolManager.draggingTool.clearGuidelines();
  }

  public setCircleMenuSeed(
    dataArray: CircleMenuDataArray[],
    type: string,
    position: string = ""
  ) {
    this.circleMenu.asignTranslateSeed(dataArray, type, position);
  }

  public setPalette(palette: PaletteSeed) {
    const paletteNew = new BpmnPalette(
      go,
      this.$,
      this.eventBus ? this.eventBus : null,
      this.bpmnConfig
    );
    let myPalette: go.Palette = paletteNew.setPalette(palette);
    return myPalette;
  }

  public detroyPalette(palette: go.Palette): void {
    palette.div = null;
  }

  public getGoInstance() {
    return go;
  }

  private handleConfig(): void {
    if (this.bpmnConfig.diagramIsReadOnly) {
      if (this.myDiagram) {
        this.myDiagram.isReadOnly = true;
        this.myDiagram.allowMove = true;
        this.myDiagram.allowSelect = false;
      }
    }
  }

  private loadDiagramContextMenu() {
    if (!this.myDiagram) {
      return;
    }
    this.myDiagram.contextMenu = getContextMenu();
  }

  private listenEvents() {
    this.eventBus.subscribe(
      BpmnEventType.selectContextMenuItem,
      (data: BpmnContextMenu) => {
        this.eventBus.emit(BpmnEventType.changeSelection, {});
        switch (data.type) {
          case BpmnContextMenuType.undo:
            this.undo();
            break;
          case BpmnContextMenuType.rendo:
            this.redo();
            break;
          case BpmnContextMenuType.cut:
            this.cutSelection();
            break;
          case BpmnContextMenuType.copy:
            this.copySelection();
            break;
          case BpmnContextMenuType.delete:
            this.deleteSelection();
            break;
          case BpmnContextMenuType.editText:
            this.myDiagram.commandHandler.editTextBlock();
            return;
            break;
          case BpmnContextMenuType.properties:
            this.eventBus.emit(BpmnEventType.selectProperty, {});
            break;
          case BpmnContextMenuType.attach:
            this.eventBus.emit(BpmnEventType.selectAttachment, {});
            break;
          case BpmnContextMenuType.paste:
            try {
              this.pasteSelection();
            } catch (e) {}
            break;

          case BpmnContextMenuType.toMessageStart:
            this.convertEventTo(StartEventType.message);
            break;
          case BpmnContextMenuType.toMultipleStart:
            this.convertEventTo(StartEventType.multiple);
            break;
          case BpmnContextMenuType.toSimpleStart:
            this.convertEventTo(StartEventType.general);
            break;
          case BpmnContextMenuType.toTimerStart:
            this.convertEventTo(StartEventType.timer);
            break;
          case BpmnContextMenuType.toConditionalStart:
            this.convertEventTo(StartEventType.condition);
            break;
          case BpmnContextMenuType.toSignalStart:
            this.convertEventTo(StartEventType.signal);
            break;
          case BpmnContextMenuType.toParallelStart:
            this.convertEventTo(StartEventType.parallel);
            break;

          case BpmnContextMenuType.toMessageEvent:
            this.convertEventTo(StartEventType.message);
            break;
          case BpmnContextMenuType.toMultipleEvent:
            this.convertEventTo(StartEventType.multiple);
            break;
          case BpmnContextMenuType.toSimpleEvent:
            this.convertEventTo(StartEventType.general);
            break;
          case BpmnContextMenuType.toTimerEvent:
            this.convertEventTo(StartEventType.timer);
            break;
          case BpmnContextMenuType.toConditionalEvent:
            this.convertEventTo(StartEventType.condition);
            break;
          case BpmnContextMenuType.toSignalEvent:
            this.convertEventTo(StartEventType.signal);
            break;
          case BpmnContextMenuType.toParallelEvent:
            this.convertEventTo(StartEventType.parallel);
            break;
          case BpmnContextMenuType.toClimbEvent:
            this.convertEventTo(StartEventType.escalation);
            break;
          case BpmnContextMenuType.toCompensationEvent:
            this.convertEventTo(StartEventType.compensation);
            break;
          case BpmnContextMenuType.toMultipleEvent:
            this.convertEventTo(StartEventType.multiple);
            break;
          case BpmnContextMenuType.toLinkEvent:
            this.convertEventTo(StartEventType.link);
            break;

          case BpmnContextMenuType.toMessageEnd:
            this.convertEventTo(StartEventType.message);
            break;
          case BpmnContextMenuType.toMultipleEnd:
            this.convertEventTo(StartEventType.multiple);
            break;
          case BpmnContextMenuType.toSimpleEnd:
            this.convertEventTo(StartEventType.general);
            break;
          case BpmnContextMenuType.toSignalEnd:
            this.convertEventTo(StartEventType.signal);
            break;
          case BpmnContextMenuType.toCompensationEnd:
            this.convertEventTo(StartEventType.compensation);
            break;
          case BpmnContextMenuType.toMultipleEnd:
            this.convertEventTo(StartEventType.multiple);
            break;
          case BpmnContextMenuType.toErrorEnd:
            this.convertEventTo(StartEventType.error);
            break;
          case BpmnContextMenuType.toCancelEnd:
            this.convertEventTo(StartEventType.cancel);
            break;
          case BpmnContextMenuType.toEnd:
            this.convertEventTo(StartEventType.termination);
            break;

          case BpmnContextMenuType.toComplexGateway:
            this.convertGatewayTo(GatewayType.complex);
            break;
          case BpmnContextMenuType.toComplexGateway:
            this.convertGatewayTo(GatewayType.parallel);
            break;
          case BpmnContextMenuType.toExclusiveGateway:
            this.convertGatewayTo(GatewayType.exclusive);
            break;
          case BpmnContextMenuType.toInclusiveGateway:
            this.convertGatewayTo(GatewayType.inclusive);
            break;
          case BpmnContextMenuType.toBasedEventExclusiveGateway:
            this.convertGatewayTo(GatewayType.eventBasedExclusive);
            break;
          case BpmnContextMenuType.toBasedEventGateway:
            this.convertGatewayTo(GatewayType.eventBasedGateway);
            break;
          case BpmnContextMenuType.toBasedEventParallelGateway:
            this.convertGatewayTo(GatewayType.parallelEvent);
            break;
          case BpmnContextMenuType.toParallelGateway:
            this.convertGatewayTo(GatewayType.parallel);
            break;

          case BpmnContextMenuType.toSimpleTask:
            this.convertTaskTo(ActivityType.general);
            break;
          case BpmnContextMenuType.toServiceTask:
            this.convertTaskTo(ActivityType.service);
            break;
          case BpmnContextMenuType.toMessageSendTask:
            this.convertTaskTo(ActivityType.sendMessage);
            break;
          case BpmnContextMenuType.toMessageReceivedTask:
            //
            break;
          case BpmnContextMenuType.toUserTask:
            this.convertTaskTo(ActivityType.user);
            break;
          case BpmnContextMenuType.toManualTask:
            this.convertTaskTo(ActivityType.manual);
            break;
          case BpmnContextMenuType.toBusinessTask:
            this.convertTaskTo(ActivityType.businessRule);
            break;
          case BpmnContextMenuType.toScriptTask:
            this.convertTaskTo(ActivityType.script);
            break;
          case BpmnContextMenuType.toSubprocessTask:
            this.convertToSubprocess();
            break;

          case BpmnContextMenuType.edgeEventTimer:
            this.addEdgeEvent(StartEventType.timer);
            break;
          case BpmnContextMenuType.edgeEventMessage:
            this.addEdgeEvent(StartEventType.message);
            break;
          case BpmnContextMenuType.edgeEventParallel:
            this.addEdgeEvent(StartEventType.parallel);
            break;
          case BpmnContextMenuType.edgeEventSignal:
            this.addEdgeEvent(StartEventType.signal);
            break;
          case BpmnContextMenuType.edgeEventClimb:
            this.addEdgeEvent(StartEventType.escalation);
            break;
          case BpmnContextMenuType.edgeEventCompensation:
            this.addEdgeEvent(StartEventType.compensation);
            break;
          case BpmnContextMenuType.edgeEventError:
            this.addEdgeEvent(StartEventType.error);
            break;
          case BpmnContextMenuType.edgeEventConditional:
            this.addEdgeEvent(StartEventType.condition);
            break;
          case BpmnContextMenuType.edgeEventMultiple:
            this.addEdgeEvent(StartEventType.multiple);
            break;

          case BpmnContextMenuType.upLanes:
            this.addLane(LanePosition.up);
            break;
          case BpmnContextMenuType.nextLanes:
            this.addLane(LanePosition.down);
            break;
          case BpmnContextMenuType.annotation:
            this.addAnnotation();
            break;
          case BpmnContextMenuType.splitTwoLanes:
            this.splitPool(2);
            break;
          case BpmnContextMenuType.splitThreeLanes:
            this.splitPool(3);
            break;

          case BpmnContextMenuType.alignHorizontal:
            this.alignCenterY();
            break;
          case BpmnContextMenuType.alignVertical:
            this.alignCenterX();
            break;
          case BpmnContextMenuType.distributeHorizontal:
            this.alignRows();
            break;
          case BpmnContextMenuType.distributeVertical:
            this.alignColumns();
            break;
          case BpmnContextMenuType.toRegularSequenceConnector:
            setSequenceLinkRegularFlow(
              <go.Link>this.myDiagram.selection.first(),
              this.myDiagram
            );
            break;
          case BpmnContextMenuType.toStandardSequenceConnector:
            setSequenceLinkDefaultFlow(
              <go.Link>this.myDiagram.selection.first(),
              this.myDiagram
            );
            break;
          case BpmnContextMenuType.toConditionalSequenceConnector:
            setSequenceLinkConditionalFlow(
              <go.Link>this.myDiagram.selection.first(),
              this.myDiagram
            );
            break;

          case BpmnContextMenuType.multipleInstancesTask:
            setActivityType(
              <go.Group>this.myDiagram.selection.first(),
              this.myDiagram,
              ActivityInstance.isParallel
            );
            break;
          case BpmnContextMenuType.loopIntancesTask:
            setActivityType(
              <go.Group>this.myDiagram.selection.first(),
              this.myDiagram,
              ActivityInstance.isLoop
            );
            break;
          case BpmnContextMenuType.simpleTask:
            clearActivityType(
              <go.Group>this.myDiagram.selection.first(),
              this.myDiagram
            );
            break;
          default:
            break;
        }
        this.myDiagram.currentTool.stopTool();
      }
    );
  }

  private splitPool(lanes: number): void {
    const selection = this.myDiagram.selection.first().data;
    const dataArray = this.myDiagram.model.nodeDataArray;
    const group = dataArray.filter((item) => item.group === selection.key);
    if (group.length < lanes) {
      for (let index = 0; index < lanes - group.length; index++) {
        this.addLane(LanePosition.down);
      }
    }
  }

  private addAnnotation(): void {
    const circleMenu = new CircleMenu(
      go,
      this.$,
      this.myDiagram,
      this.bpmnConfig
    );
    const annotation = mainPalette(go, this.$)
      .model.nodeDataArray.filter(
        (item) => item.category === PaletteCategory.annotation
      )
      .shift();
    circleMenu.createNodeAndLink(annotation, this.myDiagram.selection.first());
  }

  private addLane(position: LanePosition): void {
    const lane = mainPalette(go, this.$)
      .model.nodeDataArray.filter(
        (item) => item.category === PaletteCategory.lane
      )
      .shift();
    let selection = this.myDiagram.selection.first();
    const isLane: boolean = selection.category === PaletteCategory.lane;
    if (isLane) {
      const oldLocation = selection.location;
      selection = this.myDiagram.findNodeForKey(selection.data.group);
      selection.location = oldLocation;
    }
    const currentLane = <any>(
      this.myDiagram.model.nodeDataArray
        .filter((item) => item.category === PaletteCategory.lane)
        .shift()
    );
    lane.size = `${currentLane.size.split[0]} 0`;
    lane.group = +selection.key;
    this.myDiagram.model.addNodeData(lane);
    const newnode = this.myDiagram.findNodeForData(lane);
    if (isLane) {
      newnode.location = new go.Point(
        selection.location.x,
        position === LanePosition.up
          ? selection.location.y - 1
          : selection.location.y + 1
      );
    } else {
      if (position === LanePosition.up) {
        newnode.location = new go.Point(
          selection.location.x,
          selection.location.y - 1
        );
      }
    }
    relayoutDiagram(this.myDiagram);
    this.myDiagram.select(newnode);
  }

  private addEdgeEvent(eventType: StartEventType) {
    const circleMenu = new CircleMenu(
      go,
      this.$,
      this.myDiagram,
      this.bpmnConfig
    );
    const newData = intermediateEventPalette(go, this.$)
      .model.nodeDataArray.filter((item) => item.eventType === eventType)
      .shift();
    circleMenu.addEventBorderByNode(newData);
  }

  private convertToSubprocess() {
    const data = this.myDiagram.model.findNodeDataForKey(
      this.myDiagram.selection.first().data.key
    );
    if (data) {
      this.myDiagram.model.assignAllDataProperties(data, {
        category: PaletteCategory.subprocess,
        text: "palette.subProcess.main",
        isGroup: true,
        isSubProcess: true,
        taskType: 2,
      });
    }
  }

  private convertTaskTo(taskType: ActivityType) {
    const data = this.myDiagram.model.findNodeDataForKey(
      this.myDiagram.selection.first().data.key
    );
    if (data) {
      this.myDiagram.model.assignAllDataProperties(data, {
        taskType,
      });
    }
  }

  private convertGatewayTo(gatewayType: GatewayType) {
    const data = this.myDiagram.model.findNodeDataForKey(
      this.myDiagram.selection.first().data.key
    );
    if (data) {
      this.myDiagram.model.assignAllDataProperties(data, {
        gatewayType,
      });
    }
  }

  private convertEventTo(eventType: StartEventType) {
    const { category, eventDimension } = this.myDiagram.selection.first().data;

    let newData = [
      ...startEventPalette(go, this.$).model.nodeDataArray,
      ...intermediateEventPalette(go, this.$).model.nodeDataArray,
      ...endEventPalette(go, this.$).model.nodeDataArray,
    ];

    newData = newData.filter(
      (item) =>
        item.category === category &&
        item.eventType === eventType &&
        item.eventDimension === eventDimension
    );

    if (newData.length) {
      const data = this.myDiagram.model.findNodeDataForKey(
        this.myDiagram.selection.first().data.key
      );
      if (data) {
        this.myDiagram.model.assignAllDataProperties(data, newData[0]);
      }
    }
  }

  initModel() {
    this.myDiagram.model = new go.GraphLinksModel([
      {
        key: 555,
        category: PaletteCategory.pool,
        text: "",
        isGroup: true,
        loc: "0 0",
      },
      {
        key: 444,
        category: PaletteCategory.lane,
        text: "",
        isGroup: true,
        group: 555,
        size: "200 150",
        loc: "0 0",
      },
      {
        key: 333,
        category: PaletteCategory.event,
        text: "",
        group: 444,
        eventType: 1,
        eventDimension: 1,
        loc: "70 75",
      },
    ]);
    // seleccionar el evento de inicio
    if (!this.bpmnConfig.diagramIsReadOnly) {
      var node = this.myDiagram.findNodeForKey(333);
      this.myDiagram.select(node);
    }
  }

  // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
  computeMinPoolSize(pool: go.Group) {
    let len = BpmnScriptConfig.MINLENGTH;
    pool.memberParts.each(function (lane) {
      if (!(lane instanceof go.Group)) return;
      const holder = lane.placeholder;
      if (holder !== null) {
        const sz = holder.actualBounds;
        len = Math.max(len, sz.width);
      }
    });
    return new go.Size(len, NaN);
  }

  // compute the minimum size for a particular Lane Group
  computeLaneSize(lane: go.Group): go.Size {
    const sz = this.computeMinLaneSize(lane);
    if (lane.isSubGraphExpanded) {
      const holder = lane.placeholder;
      if (holder !== null) {
        const hsz = holder.actualBounds;
        sz.height = Math.max(sz.height, hsz.height);
      }
    }
    // minimum breadth needs to be big enough to hold the header
    const hdr = lane.findObject("HEADER");
    if (hdr !== null) {
      sz.height = Math.max(sz.height, hdr.actualBounds.height);
    }
    return sz;
  }

  // determine the minimum size of a Lane Group, even if collapsed
  computeMinLaneSize(lane: go.Group): go.Size {
    if (!lane.isSubGraphExpanded) {
      return new go.Size(BpmnScriptConfig.MINLENGTH, 1);
    }
    return new go.Size(BpmnScriptConfig.MINLENGTH, BpmnScriptConfig.MINBREADTH);
  }

  // Add a port to the specified side of the selected nodes.   name is beN  (be0, be1)
  // evDim is 5 for Interrupting, 6 for non-Interrupting
  addActivityNodeBoundaryEvent(evType: number, evDim: number) {
    this.myDiagram.startTransaction("addBoundaryEvent");
    this.myDiagram.selection.each((node) => {
      // skip any selected Links
      if (!(node instanceof go.Node)) return;
      if (
        node.data &&
        (node.data.category === "activity" ||
          node.data.category === "subprocess")
      ) {
        // compute the next available index number for the side
        let i = 0;
        const defaultPort = node.findPort("");
        // now this new port name is unique within the whole Node because of the side prefix
        while (node.findPort("be" + i.toString()) !== defaultPort) i++;
        const name = "be" + i.toString();
        if (!node.data.boundaryEventArray) {
          this.myDiagram.model.setDataProperty(
            node.data,
            "boundaryEventArray",
            []
          );
        }
        // initialize the Array of port data if necessary
        // create a new port data object
        const newportdata = {
          portId: name,
          eventType: evType,
          eventDimension: evDim,
          color: "white",
          alignmentIndex: i,
          // if you add port data properties here, you should copy them in copyPortData above  ** BUG...  we don't do that.
        };
        // and add it to the Array of port data
        this.myDiagram.model.insertArrayItem(
          node.data.boundaryEventArray,
          -1,
          newportdata
        );
      }
    });
    this.myDiagram.commitTransaction("addBoundaryEvent");
  }

  // changes the item of the object
  rename(obj: go.GraphObject) {
    if (obj === null || obj.part === null || obj.part.data === null) return;
    this.myDiagram.startTransaction("rename");
    const newName = prompt("Rename " + obj.part.data.item + " to:");
    this.myDiagram.model.setDataProperty(obj.part.data, "item", newName);
    this.myDiagram.commitTransaction("rename");
  }

  // shows/hides gridlines
  updateGridOption() {
    this.myDiagram.startTransaction("grid");
    const grid = document.getElementById("grid") as any;
    this.myDiagram.grid.visible = grid.checked;
    this.myDiagram.commitTransaction("grid");
  }

  // enables/disables snapping tools, to be implemented by buttons
  updateSnapOption() {
    const snap = document.getElementById("snap") as any;
    if (snap.checked) {
      this.myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;
      this.myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;
    } else {
      this.myDiagram.toolManager.draggingTool.isGridSnapEnabled = false;
      this.myDiagram.toolManager.resizingTool.isGridSnapEnabled = false;
    }
  }

  // user specifies the amount of space between nodes when making rows and column
  askSpace(): number {
    const space = parseFloat(
      prompt("Desired space between nodes (in pixels):") || "0"
    );
    return space;
  }

  getCurrentFileName(): string {
    const currentFile = document.getElementById(
      "currentFile"
    ) as HTMLDivElement;
    const name = currentFile.textContent || "";
    if (name && name[name.length - 1] === "*")
      return name.substr(0, name.length - 1);
    return name;
  }

  setCurrentFileName(name: string) {
    const currentFile = document.getElementById(
      "currentFile"
    ) as HTMLDivElement;
    if (this.myDiagram.isModified) {
      name += "*";
    }
    currentFile.textContent = name;
  }

  newDocument() {
    if (this.myDiagram.isModified) {
      const save = confirm(
        "Would you like to save changes to " + this.getCurrentFileName() + "?"
      );
      if (save) {
        this.saveDocument();
      }
    }
    this.setCurrentFileName(this.fileName);
    this.myDiagram.model = new go.GraphLinksModel();
    this.resetModel();
  }

  resetModel() {
    this.myDiagram.model.undoManager.isEnabled = true;
    (this.myDiagram.model as go.GraphLinksModel).linkFromPortIdProperty =
      "fromPort";
    (this.myDiagram.model as go.GraphLinksModel).linkToPortIdProperty =
      "toPort";

    this.myDiagram.model.copiesArrays = true;
    this.myDiagram.model.copiesArrayObjects = true;
    this.myDiagram.isModified = false;
  }

  checkLocalStorage() {
    return typeof Storage !== "undefined" && window.localStorage !== undefined;
  }

  // saves the current floor plan to local storage
  saveDocument() {
    if (this.checkLocalStorage()) {
      const saveName = this.getCurrentFileName();
      if (saveName === this.fileName) {
        this.saveDocumentAs();
      } else {
        this.saveDiagramProperties();
        window.localStorage.setItem(saveName, this.myDiagram.model.toJson());
        this.myDiagram.isModified = false;
      }
    }
  }

  // saves floor plan to local storage with a new name
  saveDocumentAs() {
    if (this.checkLocalStorage()) {
      const saveName = prompt("Save file as...") || this.getCurrentFileName();
      if (saveName && saveName !== this.fileName) {
        this.setCurrentFileName(saveName);
        this.saveDiagramProperties();
        window.localStorage.setItem(saveName, this.myDiagram.model.toJson());
        this.myDiagram.isModified = false;
      }
    }
  }

  // checks to see if all changes have been saved -> shows the open HTML element
  openDocument() {
    if (this.checkLocalStorage()) {
      if (this.myDiagram.isModified) {
        const save = confirm(
          "Would you like to save changes to " + this.getCurrentFileName() + "?"
        );
        if (save) {
          this.saveDocument();
        }
      }
      this.openElement("openDocument", "mySavedFiles");
    }
  }

  // shows the remove HTML element
  removeDocument() {
    if (this.checkLocalStorage()) {
      this.openElement("removeDocument", "mySavedFiles2");
    }
  }

  // these functions are called when panel buttons are clicked
  loadFile() {
    const listbox = document.getElementById("mySavedFiles") as any;
    let fileName;
    for (let i = 0; i < listbox.options.length; i++) {
      if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
    }
    if (fileName !== undefined) {
      this.setCurrentFileName(fileName);
      const savedFile = window.localStorage.getItem(fileName) || "";
      this.myDiagram.model = go.Model.fromJson(savedFile);
      this.loadDiagramProperties();
      this.myDiagram.model.undoManager.isEnabled = true;
      this.myDiagram.isModified = false;
    }
    this.closeElement("openDocument");
  }

  loadJSON(file: string) {}

  // Store shared model state in the Model.modelData property
  saveDiagramProperties() {
    this.myDiagram.model.modelData.position = go.Point.stringify(
      this.myDiagram.position
    );
  }

  // Called by loadFile and loadJSON.
  loadDiagramProperties(e?: go.DiagramEvent) {
    // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
    const pos = this.myDiagram.model.modelData.position;
    if (pos) this.myDiagram.initialPosition = go.Point.parse(pos);
  }

  // deletes the selected file from local storage
  removeFile() {
    const listbox = document.getElementById("mySavedFiles2") as any;
    if (listbox === null) return;
    let fileName;
    for (let i = 0; i < listbox.options.length; i++) {
      if (listbox.options[i].selected) fileName = listbox.options[i].text; // selected file
    }
    if (fileName !== undefined) {
      window.localStorage.removeItem(fileName);
    }
    this.closeElement("removeDocument");
  }

  updateFileList(id: string) {
    const listbox = document.getElementById(id) as any;
    if (listbox === null) return;
    let last;
    while ((last = listbox.lastChild)) listbox.removeChild(last);
    for (const key in window.localStorage) {
      const storedFile = window.localStorage.getItem(key);
      if (!storedFile) continue;
      const option = document.createElement("option");
      option.value = key;
      option.text = key;
      listbox.add(option, null);
    }
  }

  openElement(id: string, listid: string) {
    const panel = document.getElementById(id);
    if (panel !== null && panel.style.visibility === "hidden") {
      this.updateFileList(listid);
      panel.style.visibility = "visible";
    }
  }

  // hides the open/remove elements when the "cancel" button is pressed
  closeElement(id: string) {
    const panel = document.getElementById(id);
    if (panel !== null && panel.style.visibility === "visible") {
      panel.style.visibility = "hidden";
    }
  }

  undo() {
    this.myDiagram.commandHandler.undo();
  }

  redo() {
    this.myDiagram.commandHandler.redo();
  }

  cutSelection() {
    this.myDiagram.commandHandler.cutSelection();
  }

  copySelection() {
    this.myDiagram.commandHandler.copySelection();
  }

  pasteSelection() {
    this.myDiagram.commandHandler.pasteSelection();
  }

  deleteSelection() {
    setTimeout(() => relayoutDiagram(this.myDiagram), 0);
    this.myDiagram.commandHandler.deleteSelection();
  }

  selectAll() {
    this.myDiagram.commandHandler.selectAll();
  }

  alignLeft() {
    (this.myDiagram.commandHandler as DrawCommandHandler).alignLeft();
  }

  alignRight() {
    (this.myDiagram.commandHandler as DrawCommandHandler).alignRight();
  }

  alignTop() {
    (this.myDiagram.commandHandler as DrawCommandHandler).alignTop();
  }

  alignBottom() {
    (this.myDiagram.commandHandler as DrawCommandHandler).alignBottom();
  }

  alignCenterX() {
    (this.myDiagram.commandHandler as DrawCommandHandler).alignCenterX();
  }

  alignCenterY() {
    (this.myDiagram.commandHandler as DrawCommandHandler).alignCenterY();
  }

  alignRows() {
    (this.myDiagram.commandHandler as DrawCommandHandler).alignRow();
  }

  alignColumns() {
    (this.myDiagram.commandHandler as DrawCommandHandler).alignColumn();
  }
}
