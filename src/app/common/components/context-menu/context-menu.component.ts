import {
  Component,
  OnInit,
  HostBinding,
  Input,
  EventEmitter,
} from "@angular/core";
import { BpmnContextMenu } from "./common/context.menu.interface";
import { BpmnGlobal } from "../../services/bpmn.global";
import { BpmnEventType } from "../../bpmn/common/bpmn.enum";
import { BpmnContextMenuType } from "../../bpmn/menu-context";

@Component({
  selector: "bpmn-context-menu",
  templateUrl: "./context-menu.component.html",
  styleUrls: ["./context-menu.component.scss"],
})
export class ContextMenuComponent implements OnInit {
  @HostBinding("class.bpmn-context-menu") mainClass: boolean = true;
  @HostBinding("style.display") display: string = "";

  @Input() set items(elements: BpmnContextMenu[]) {
    this.list = elements;
  }

  @Input() select = new EventEmitter<BpmnContextMenu>();

  list: BpmnContextMenu[] = [];

  constructor(private globalService: BpmnGlobal) {}

  ngOnInit() {}

  onItemClick(item: BpmnContextMenu): void {
    if (!item.type) {
      return;
    }
    this.globalService.eventBus.emit(BpmnEventType.selectContextMenuItem, item);
  }

  setIncludeFor(item: BpmnContextMenu): string {
    if (!item.includeFor) {
      return "NONE";
    }
    return item.includeFor.join("-");
  }

  showItem(item: BpmnContextMenu): boolean {
    const selectedElements = this.elementsSelected();

    if (!selectedElements) {
      return true;
    }

    if (selectedElements === 1) {
      let show: boolean = true;
      switch (item.type) {
        case BpmnContextMenuType.distribute:
          show = false;
          break;
        case BpmnContextMenuType.align:
          show = false;
          break;
        case BpmnContextMenuType.splitThreeLanes:
          show = this.verifySplitPool(3);
          break;
        case BpmnContextMenuType.splitThreeLanes:
          show = this.verifySplitPool(2);
          break;
        case BpmnContextMenuType.distribute:
          show = false;
          break;
        default:
          show = true;
          break;
      }
      return show;
    }

    if (selectedElements > 1) {
      if (this.isSameGroup()) {
        return this.showOnMultiselect(
          <BpmnContextMenuType>item.type,
          selectedElements
        );
      } else {
        return this.showOnMultiselect(
          <BpmnContextMenuType>item.type,
          selectedElements
        );
      }
    }
    return false;
  }

  private verifySplitPool(lanes: number): boolean {
    const selection = this.globalService.diagramInstance.selection.first();
    const dataArray = this.globalService.diagramInstance.model.nodeDataArray;
    if (!selection) {
      return true;
    }
    const groups = dataArray.filter((item) => item.group === selection.key);
    if (groups.length >= lanes) {
      return false;
    }
    return true;
  }

  private elementsSelected(): number {
    return this.globalService.diagramInstance.selection.size;
  }

  private isSameGroup(): boolean {
    let isSameGroup: boolean = true;
    const selections = this.globalService.diagramInstance.selection;
    if (selections.size <= 1) {
      return false;
    }
    const arraySelections = selections.toArray();
    for (let i = 0; i < arraySelections.length; i++) {
      for (let j = 0; j < arraySelections.length; j++) {
        if (arraySelections[i].category !== arraySelections[j].category) {
          isSameGroup = false;
        }
      }
    }
    return isSameGroup;
  }

  private showOnMultiselect(
    item: BpmnContextMenuType,
    selectedElements: number
  ): boolean {
    let show: boolean = false;
    switch (item) {
      case BpmnContextMenuType.copy:
        show = true;
        break;
      case BpmnContextMenuType.delete:
        show = true;
      case BpmnContextMenuType.distribute:
        if (selectedElements >= 3) {
          show = true;
        }
        break;
      case BpmnContextMenuType.align:
        show = true;
        break;
      case BpmnContextMenuType.cut:
        show = true;
        break;
      default:
        show = false;
        break;
    }
    return show;
  }
}
