import * as go from 'gojs';

import { PaletteSeed } from './palette.interface';
import { BpmnEventBus } from '../../data/bpmn.class';
import { BpmnEventType } from '../common/bpmn.enum';
import { BpmnConfig } from '../common/bpmn.interface';
import { BpmnScriptConfig } from '../bpmn.config';

export class BpmnPalette {
  $: any
  go: any;
  bpmnEventBus: BpmnEventBus;
  paletteRef: go.Palette;
  config: BpmnConfig;

  constructor(go: any, $: any, bpmnEventBus?: BpmnEventBus, config?: BpmnConfig) {
    this.go = go;
    this.$ = $;
    if (bpmnEventBus) {
      this.bpmnEventBus = bpmnEventBus;
    }
    this.config = config ? config : BpmnScriptConfig;
  }

  public setPalette(paletteSeed: PaletteSeed): go.Palette {
    const nodeTemplateMap = new go.Map<string, go.Node>();
    const groupTemplateMap = new go.Map<string, go.Group>();
    const { layout } = paletteSeed;

    paletteSeed.templates.forEach(el => {
      nodeTemplateMap.add(el.key, el.function(this.go, this.$, this.bpmnEventBus ? this.bpmnEventBus : null, this.config));
    });

    paletteSeed.groupTemplate.forEach(el => {
      groupTemplateMap.add(el.key, el.function(this.go, this.$, this.bpmnEventBus ? this.bpmnEventBus : null, this.config));
    });

    this.paletteRef = this.$(
      this.go.Palette,
      paletteSeed.idDivElement,
      {
        nodeTemplateMap,
        groupTemplateMap,
        layout,
        click: e => {
          if (this.bpmnEventBus) {
            this.bpmnEventBus.emit(BpmnEventType.paletteClicked, e);
          }
        },
        mouseDragOver: () => {
          this.paletteRef.currentCursor = 'context-menu';
        }
      }
    );

    this.paletteRef.setProperties({
      hoverDelay: 0,
      'toolManager.mouseWheelBehavior': go.ToolManager.WheelNone
    });

    this.paletteRef.model = this.$(this.go.GraphLinksModel, paletteSeed.model);

    return this.paletteRef;
  }

}
