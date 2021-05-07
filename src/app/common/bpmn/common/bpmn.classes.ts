import * as go from 'gojs';

import { BpmnScript } from '../script';
import { BpmnScriptConfig } from '../bpmn.config';
import { relayoutDiagram } from './bpmn.functions';
import { PaletteCategory } from '../palette/palette.enum';

export class LaneResizingTool extends go.ResizingTool {
  bpmnScripts: BpmnScript;

  constructor(bpmnScripts: BpmnScript) {
    super();
    this.bpmnScripts = bpmnScripts;
  }

  isLengthening() {
    return (this.handle !== null && this.handle.alignment === go.Spot.Right);
  }

  computeMinSize(): go.Size {
    if (this.adornedObject === null) {
      return new go.Size(BpmnScriptConfig.MINLENGTH, BpmnScriptConfig.MINBREADTH);
    }
    const lane = this.adornedObject.part;
    if (!(lane instanceof go.Group) || lane.containingGroup === null) {
      return new go.Size(BpmnScriptConfig.MINLENGTH, BpmnScriptConfig.MINBREADTH);
    }
    const msz = this.bpmnScripts.computeMinLaneSize(lane);
    if (this.isLengthening()) {
      const sz = this.bpmnScripts.computeMinPoolSize(lane.containingGroup);
      msz.width = Math.max(msz.width, sz.width);
    } else {
      const sz = this.bpmnScripts.computeLaneSize(lane);
      msz.width = Math.max(msz.width, sz.width);
      msz.height = Math.max(msz.height, sz.height);
    }
    return msz;
  }

  canStart(): boolean {
    if (!go.ResizingTool.prototype.canStart.call(this)) return false;
    const diagram = this.diagram;
    const handl = this.findToolHandleAt(diagram.firstInput.documentPoint, this.name);
    if (handl === null || handl.part === null) return false;
    const ad = handl.part as go.Adornment;
    if (ad.adornedObject === null || ad.adornedObject.part === null) return false;
    return (ad.adornedObject.part.category === 'Lane');
  }

  resize(newr: go.Rect): void {
    if (this.adornedObject === null) return;
    const lane = this.adornedObject.part;
    if (lane instanceof go.Group && lane.containingGroup !== null && this.isLengthening()) {
      lane.containingGroup.memberParts.each((l) => {
        if (!(l instanceof go.Group)) return;
        const shape = l.resizeObject;
        if (shape !== null) {
          shape.width = newr.width;
        }
      });
    } else {
      super.resize.call(this, newr);
    }
    relayoutDiagram(this.bpmnScripts.myDiagram);
  }
}

export class PoolLayout extends go.GridLayout {
  cellSize = new go.Size(1, 1);
  wrappingColumn = 1;
  wrappingWidth = Infinity;
  isRealtime = false;
  alignment = go.GridLayout.Position;
  bpmnScripts = new BpmnScript();

  comparer = (a: go.Part, b: go.Part) => {
    const ay = a.location.y;
    const by = b.location.y;
    if (isNaN(ay) || isNaN(by)) return 0;
    if (ay < by) return -1;
    if (ay > by) return 1;
    return 0;
  }

  doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>) {
    const diagram = this.diagram;
    if (diagram === null) {
      return
    };
    diagram.startTransaction('PoolLayout');
    const pool = this.group;
    if (pool !== null && pool.category === PaletteCategory.pool) {
      const minsize = this.bpmnScripts.computeMinPoolSize(pool);
      pool.memberParts.each(lane => {
        if (!(lane instanceof go.Group)) {
          return
        };
        if (lane.category !== PaletteCategory.pool) {
          const shape = lane.resizeObject;
          if (shape !== null) {
            const sz = this.bpmnScripts.computeLaneSize(lane);
            shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
            shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
            const cell = lane.resizeCellSize;
            if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) {
              shape.width = Math.ceil(shape.width / cell.width) * cell.width;
            }
            if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) {
              shape.height = Math.ceil(shape.height / cell.height) * cell.height;
            }
          }
        }
      });
    }
    super.doLayout.call(this, coll);
    diagram.commitTransaction('PoolLayout');
  }
}
