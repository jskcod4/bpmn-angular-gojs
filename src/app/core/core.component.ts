import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";
import { Language } from "../common/data/bpmn.enum";

import * as go from "gojs";
import { BpmnScript } from "../common/bpmn";
import {
  activityPalette,
  dataObjectPalette,
  endEventPalette,
  gatewayPalette,
  intermediateEventPalette,
  mainPalette,
  startEventPalette,
  subProcessPalette,
} from "../common/bpmn/palette/palette.seeds";
import { PaletteSeed } from "../common/bpmn/palette/palette.interface";
import { BpmnGlobal } from "../common/services/bpmn.global";
import { BpmnEventType, EventDimension } from "../common/bpmn/common/bpmn.enum";
import { PaletteCategory } from "../common/bpmn/palette/palette.enum";
import { BpmnConfig, BpmnSource } from "../common/bpmn/common/bpmn.interface";
import { LaneResizingTool } from "../common/bpmn/common/bpmn.classes";
import { BpmnContextMenu } from "../common/components/context-menu/common/context.menu.interface";
import { getDiagramMenu } from "../common/bpmn/menu-context";
import {
  EventBorderDataButton,
  EventEndDataButton,
  EventEndDataSeed,
  EventIntermediateDataButton,
  EventIntermediateDataSeed,
  EventStartDataButton,
  EventStartDataSeed,
  GatewayDataButton,
  GatewayDataSeed,
  SubprocessDataButton,
  SubprocessDataSeed,
  TaskDataButton,
  TaskDataSeed,
} from "../common/bpmn/circleMenu/conversionDataSeed";
import {
  bottomSymbols,
  MainCircleMenu,
  rightSymbols,
  topSymbols,
} from "../common/bpmn/circleMenu/circleMenu.seeds";
import { BpmnScriptConfig } from "../common/bpmn/bpmn.config";

@Component({
  selector: "app-root",
  templateUrl: "./core.component.html",
  styleUrls: ["./core.component.scss"],
})
export class CoreComponent implements OnInit {
  @HostBinding("class.grid-container") hostClass: boolean = true;
  @HostBinding("class.only-read") onlyRead: boolean = false;

  @Input() minResolution: number = 769;

  lang: Language = Language.english;
  bpmn: BpmnScript;
  openPaletteSidebar: boolean = false;
  topPaletteSidebar: number = 0;
  sidebarPalette: go.Palette;
  diagramContextMenu: BpmnContextMenu[] = [];
  loadMenuOpen: boolean = false;

  constructor(
    private translate: TranslateService,
    private bpmnGlobal: BpmnGlobal
  ) {
    this.lang =
      <Language>localStorage.getItem(environment.bpmnLanguageTag) || this.lang;
    this.changeLanguage(this.lang);
    this.handleEvents();
  }

  ngOnInit() {
    this.initBpmn();
    this.bpmnGlobal.eventBus.subscribe(BpmnEventType.selectElement, () => {
      this.bpmnGlobal.openMenu().subscribe();
    });
    this.bpmnGlobal.eventBus.subscribe(BpmnEventType.selectProperty, () => {
      this.bpmnGlobal.openMenu().subscribe();
    });
    this.bpmnGlobal.eventBus.subscribe(BpmnEventType.selectAttachment, () => {
      this.bpmnGlobal.openMenu().subscribe();
    });
  }

  private initBpmn(): void {
    const config: BpmnConfig = BpmnScriptConfig;
    config.diagramIsReadOnly = this.isReadOnly();
    this.bpmn = new BpmnScript(this.bpmnGlobal.eventBus, config);
    this.bpmn.init();
    this.bpmnGlobal.diagramInstance = this.bpmn.myDiagram;
    this.bpmnGlobal.overviewInstance = this.bpmn.myOverview;
    this.bpmn.myDiagram.toolManager.mouseDownTools.insertAt(
      0,
      new LaneResizingTool(this.bpmn)
    );
    this.setPalettes();
    this.setContextMenu();
    this.bpmnGlobal.createMenu();
    this.setCircleMenuSeed();
    this.coreActions();
  }

  private async handleEvents() {
    this.bpmnGlobal.eventBus.subscribe(
      BpmnEventType.paletteMouseHover,
      async (source: BpmnSource) => {
        let paletteHover: PaletteSeed;
        const { data } = source.element;
        switch (data.category as PaletteCategory) {
          case PaletteCategory.event:
            if (data.eventDimension === EventDimension.start) {
              paletteHover = startEventPalette(
                this.bpmn.getGoInstance(),
                this.bpmn.$
              );
            }
            if (data.eventDimension === EventDimension.intermediate) {
              paletteHover = intermediateEventPalette(
                this.bpmn.getGoInstance(),
                this.bpmn.$
              );
            }
            if (data.eventDimension === EventDimension.end) {
              paletteHover = endEventPalette(
                this.bpmn.getGoInstance(),
                this.bpmn.$
              );
            }
            break;
          case PaletteCategory.gateway:
            paletteHover = gatewayPalette(
              this.bpmn.getGoInstance(),
              this.bpmn.$
            );
            break;
          case PaletteCategory.activity:
            paletteHover = activityPalette(
              this.bpmn.getGoInstance(),
              this.bpmn.$
            );
            break;
          case PaletteCategory.subprocess:
            paletteHover = subProcessPalette(
              this.bpmn.getGoInstance(),
              this.bpmn.$
            );
            break;
          case PaletteCategory.dataObject:
            paletteHover = dataObjectPalette(
              this.bpmn.getGoInstance(),
              this.bpmn.$
            );
            break;
          default:
            break;
        }
        if (!this.hasElementOpen()) {
          this.openMenuHover(paletteHover, source);

          return;
        }
        if (!this.elementIsEqualCategory(data.category)) {
          if (data.notHoverChange) {
            return;
          }
          await this.destroyMenuHover();
          this.openMenuHover(paletteHover, source);
        } else {
          if (data.category === PaletteCategory.event) {
            if (this.elementIsDifferentDimension(source)) {
              await this.destroyMenuHover();
              this.openMenuHover(paletteHover, source);
            }
          }
        }
      }
    );

    this.bpmnGlobal.eventBus.subscribe(BpmnEventType.diagramClick, async () => {
      if (this.hasElementOpen()) {
        await this.destroyMenuHover();
      }
    });

    this.bpmnGlobal.eventBus.subscribe(
      BpmnEventType.paletteClicked,
      async (e) => {
        if (
          e.event.path &&
          e.event.path[1] &&
          e.event.path[1].className.match(/--hover/)
        ) {
          return;
        }
        if (this.hasElementOpen()) {
          await this.destroyMenuHover();
        }
      }
    );

    this.bpmnGlobal.eventBus.subscribe(
      BpmnEventType.overviewClick,
      async (e) => {
        if (this.hasElementOpen()) {
          await this.destroyMenuHover();
        }
      }
    );
  }

  private async setPalettes() {
    const paletteMain = mainPalette(this.bpmn.getGoInstance(), this.bpmn.$);
    this.bpmn.setPalette(await this.translatePaletteSeed(paletteMain));
  }

  private setContextMenu() {
    this.diagramContextMenu = getDiagramMenu();
  }

  private translatePaletteSeed(pallete: PaletteSeed): Promise<PaletteSeed> {
    return new Promise(async (resolve) => {
      const data = pallete.model.nodeDataArray;
      for (const key of data) {
        if (typeof key.text === "string" && key.text) {
          key.text = await this.translate.get(key.text).toPromise();
        }
        if (typeof key.tooltip === "string" && key.tooltip) {
          key.tooltip = await this.translate.get(key.tooltip).toPromise();
        }
      }
      pallete.model.nodeDataArray = data;
      resolve(pallete);
    });
  }

  translateCircleMenuSeed(dataArray: any, type?: string) {
    let data = dataArray;
    if (type == "opctionsCircleMenu") {
      data = dataArray.dataArray;
    }
    data.map(async (key) => {
      if (type == "mainCircleMenu") {
        if (typeof key.data.text === "string" && key.data.text) {
          const trad = await this.translate.get(key.data.text).toPromise();
          key.data.text = trad;
        }
        if (typeof key.data.tooltip === "string" && key.data.tooltip) {
          const trad = await this.translate.get(key.data.tooltip).toPromise();
          key.data.tooltip = trad;
        }
      } else {
        if (typeof key.text === "string" && key.text) {
          const trad = await this.translate.get(key.text).toPromise();
          key.text = trad;
        }
        if (typeof key.tooltip === "string" && key.tooltip) {
          const trad = await this.translate.get(key.tooltip).toPromise();
          key.tooltip = trad;
        }
      }
      return key;
    });
    if (type == "opctionsCircleMenu") {
      dataArray.dataArray = data;
    } else {
      dataArray = data;
    }
    return dataArray;
  }

  setCircleMenuSeed() {
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(TaskDataSeed),
      PaletteCategory.activity
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(GatewayDataSeed),
      PaletteCategory.gateway
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(EventStartDataSeed),
      "eventStart"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(EventIntermediateDataSeed),
      "eventIntermediate"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(EventEndDataSeed),
      "eventEnd"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(SubprocessDataSeed),
      PaletteCategory.subprocess
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(TaskDataButton),
      "conversion",
      PaletteCategory.activity
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(GatewayDataButton),
      "conversion",
      PaletteCategory.gateway
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(EventBorderDataButton),
      "conversion",
      "eventBorder"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(EventStartDataButton),
      "conversion",
      "eventStart"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(EventIntermediateDataButton),
      "conversion",
      "eventIntermediate"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(EventEndDataButton),
      "conversion",
      "eventEnd"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(SubprocessDataButton),
      "conversion",
      PaletteCategory.subprocess
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(MainCircleMenu, "mainCircleMenu"),
      "mainCircleMenu"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(topSymbols, "opctionsCircleMenu"),
      "opctionsCircleMenu",
      "top"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(rightSymbols, "opctionsCircleMenu"),
      "opctionsCircleMenu",
      "right"
    );
    this.bpmn.setCircleMenuSeed(
      this.translateCircleMenuSeed(bottomSymbols, "opctionsCircleMenu"),
      "opctionsCircleMenu",
      "bottom"
    );
  }

  private changeLanguage(lang: Language): void {
    localStorage.setItem(environment.bpmnLanguageTag, lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang).subscribe();
    this.lang = lang;
  }

  private elementIsEqualCategory(category: PaletteCategory): boolean {
    if (this.bpmnGlobal.hoverElementOpen.element.data.category === category) {
      return true;
    }
    return false;
  }

  private hasElementOpen(): boolean {
    if (this.bpmnGlobal.hoverElementOpen) {
      return true;
    }
    return false;
  }

  private destroyMenuHover(): Promise<void> {
    return new Promise((resolve) => {
      if (this.sidebarPalette) {
        this.bpmn.detroyPalette(this.sidebarPalette);
        this.openPaletteSidebar = false;
        this.bpmnGlobal.hoverElementOpen = null;
        this.sidebarPalette = null;
        resolve();
      }
    });
  }

  private async openMenuHover(paletteHover: PaletteSeed, source: BpmnSource) {
    if (this.loadMenuOpen) {
      return;
    }
    this.loadMenuOpen = true;
    if (this.sidebarPalette) {
      await this.destroyMenuHover();
    }
    const { data } = source.element;
    this.openPaletteSidebar = true;
    this.topPaletteSidebar = +data.loc.split(" ")[1];
    await this.wait(20);
    this.sidebarPalette = this.bpmn.setPalette(
      await this.translatePaletteSeed(paletteHover)
    );
    this.bpmnGlobal.hoverElementOpen = source;
    this.loadMenuOpen = false;
  }

  private elementIsDifferentDimension(source: BpmnSource): boolean {
    try {
      const { eventDimension } = source.element.data;
      if (!eventDimension) {
        return true;
      }
      if (
        eventDimension !==
        this.bpmnGlobal.hoverElementOpen.element.data.eventDimension
      ) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return true;
    }
  }

  private wait(delay: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }

  private coreActions(): void {
    if (window.innerWidth < this.minResolution) {
      this.onlyRead = true;
      this.bpmnGlobal.onlyRead = true;
    }
  }

  private isReadOnly(): boolean {
    if (window.innerWidth < this.minResolution) {
      this.onlyRead = true;
      this.bpmnGlobal.onlyRead = true;
      return true;
    }
    return false;
  }
}
