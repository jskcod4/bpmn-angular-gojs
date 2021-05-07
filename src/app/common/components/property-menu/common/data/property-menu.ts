import * as go from 'gojs';

import { PropertyRefType, MenuCategory } from './property.data';
import { BpmnData } from 'src/app/common/bpmn/common/bpmn.interface';
import { PaletteCategory } from 'src/app/common/bpmn/palette/palette.enum';
import { EventDimension, StartEventType, GatewayType, ActivityType, ActivityInstance } from 'src/app/common/bpmn/common/bpmn.enum';
import { startEventPalette, intermediateEventPalette, endEventPalette, gatewayPalette, activityPalette } from 'src/app/common/bpmn/palette/palette.seeds';
import { PaletteNodeDataArray } from 'src/app/common/bpmn/palette/palette.interface';
import { BpmnSelectItem } from '../../../select/select.component';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { BpmnContextMenu } from '../../../context-menu/common/context.menu.interface';
import { instanceActivities } from 'src/app/common/bpmn/menu-context';
import { BpmnGlobal } from 'src/app/common/services/bpmn.global';

export class PropertyMenuHandle {
  $ = go.GraphObject.make;
  globalService: BpmnGlobal;

  constructor(globalService: BpmnGlobal) {
    this.globalService = globalService;
  }

  public getDiagramData() {
    return {
      data: this.globalService.diagramData
    };
  }

  public updateDiagramData(): boolean {
    const selection = this.globalService.diagramInstance.selection;
    return selection.count <= 0;
  }

  public isFieldEditable(key: string): boolean {
    let editable = false;
    switch (key) {
      case 'text':
        editable = true;
        break;
      case 'description':
        editable = true;
        break;
      case 'actor':
        editable = true;
        break;
      case 'type':
        editable = true;
        break;
      case 'instance':
        editable = true;
        break;
      case 'approver':
        editable = true;
        break;
      case 'consulted':
        editable = true;
        break;
      case 'informed':
        editable = true;
        break;
      default:
        break;
    }
    return editable;
  }

  public getLabel(key: string): string {
    let label: string = '';
    switch (key) {
      case 'text':
        label = 'propertyMenu.title';
        break;
      case 'description':
        label = 'propertyMenu.description';
        break;
      case 'actor':
        label = 'propertyMenu.actor';
        break;
      case 'type':
        label = 'propertyMenu.type';
        break;
      case 'instance':
        label = 'propertyMenu.instance'
        break;
      case 'approver':
        label = 'propertyMenu.approver';
        break;
      case 'consulted':
        label = 'propertyMenu.consulted';
        break;
      case 'informed':
        label = 'propertyMenu.informed';
        break;
      default:
        break;
    }
    return label;
  }

  public getType(key: string): PropertyRefType {
    let type = PropertyRefType.input;
    switch (key) {
      case 'description':
        type = PropertyRefType.textArea;
        break;
      case 'type':
        type = PropertyRefType.select;
        break;
      case 'instance':
        type = PropertyRefType.select;
        break;
      case 'file':
        type = PropertyRefType.file;
        break;
      default:
        break;
    }
    return type;
  }

  public appendMissingValues(data: BpmnData): BpmnData {
    if (!data.description) {
      Object.assign(data, { description: ''});
    }
    if (!data.file) {
      Object.assign(data, { file: [] })
    }
    switch (data.category) {
      case PaletteCategory.lane:
        Object.assign(data, { actor: '' });
        break;
      case PaletteCategory.event:
        Object.assign(data, { type: '' });
        break;
      case PaletteCategory.gateway:
        Object.assign(data, { type: '' });
        break;
      case PaletteCategory.activity:
        Object.assign(data, { type: '' });
        if (!data.instance) {
          Object.assign(data, { instance: '' });
        }
        if (!data.actor) {
          Object.assign(data, { actor: '' });
        }
        if (!data.approver) {
          Object.assign(data, { approver: '' });
        }
        if (!data.consulted) {
          Object.assign(data, { consulted: '' });
        }
        if (!data.informed) {
          Object.assign(data, { informed: '' });
        }
        break;
      default:
        break;
    }
    return data;
  }

  public getEventType(dimension: EventDimension, eventType: StartEventType): BpmnSelectItem[] {
    let array: PaletteNodeDataArray[] = [];
    switch (dimension) {
      case EventDimension.start:
        array = startEventPalette(go, this.$).model.nodeDataArray;
        break;
      case EventDimension.intermediate:
        array = intermediateEventPalette(go, this.$).model.nodeDataArray;
        break;
      case EventDimension.end:
        array = endEventPalette(go, this.$).model.nodeDataArray;
        break;
      default:
        break;
    }
    let items: BpmnSelectItem[] = [];
    array.forEach(element => {
      items.push({
        label: element.text,
        value: element.eventType.toString(),
        active: +element.eventType === +eventType ? true : false
      });
    });
    return items;
  }

  public getGatewayType(gatewayType: GatewayType): BpmnSelectItem[] {
    let array: PaletteNodeDataArray[] = gatewayPalette(go, this.$).model.nodeDataArray;
    let items: BpmnSelectItem[] = [];
    array.forEach(element => {
      items.push({
        label: element.text,
        value: element.gatewayType.toString(),
        active: +element.gatewayType === +gatewayType
      });
    });
    return items;
  }

  public getActivityType(taskType: ActivityType): BpmnSelectItem[] {
    let array: PaletteNodeDataArray[] = activityPalette(go, this.$).model.nodeDataArray;
    let items: BpmnSelectItem[] = [];
    array.forEach(element => {
      items.push({
        label: element.text,
        value: element.taskType.toString(),
        active: +element.taskType === +taskType
      });
    });
    return items;
  }

  public getActivityInstance(instance: ActivityInstance): BpmnSelectItem[] {
    let array: BpmnContextMenu[] = instanceActivities;
    let items: BpmnSelectItem[] = [];
    array.forEach(element => {
      items.push({
        label: element.label,
        value: element.value,
        active: element.value === instance
      });
    });
    return items;
  }

  public getSelectData(data: BpmnData, key: string): FormArray {
    const myArray = new FormArray([]);
    switch (data.category) {
      case PaletteCategory.event:
        const items = this.getEventType(data.eventDimension, data.eventType);
        items.forEach(element => {
          const myFormGroup = new FormGroup({});
          for (const key in element) {
            if (element.hasOwnProperty(key)) {
              myFormGroup.addControl(key, new FormControl(element[key]));
            }
          }
          myArray.push(myFormGroup);
        });
        break;
      case PaletteCategory.gateway:
        const gatewayType = this.getGatewayType(data.gatewayType);
        gatewayType.forEach(element => {
          const myFormGroup = new FormGroup({});
          for (const key in element) {
            if (element.hasOwnProperty(key)) {
              myFormGroup.addControl(key, new FormControl(element[key]));
            }
          }
          myArray.push(myFormGroup);
        });
        break;
      case PaletteCategory.activity:
        if (key === 'instance') {
          const activityInstances = this.getActivityInstance(data.instance || ActivityInstance.general);
          activityInstances.forEach(element => {
            const myFormGroup = new FormGroup({});
            for (const key in element) {
              if (element.hasOwnProperty(key)) {
                myFormGroup.addControl(key, new FormControl(element[key]));
              }
            }
            myArray.push(myFormGroup);
          });
        }
        if (key === 'type') {
          const activityCategory = this.getActivityType(data.taskType);
          activityCategory.forEach(element => {
            const myFormGroup = new FormGroup({});
            for (const key in element) {
              if (element.hasOwnProperty(key)) {
                myFormGroup.addControl(key, new FormControl(element[key]));
              }
            }
            myArray.push(myFormGroup);
          });
        }
        break;
      default:
        break;
    }
    return myArray;
  }

  public wrapperSave(currentData: BpmnData, data: any) {
    for (const key in data) {
      if (typeof data[key] === 'object') {
        if (data[key].length) {
          const active = data[key].filter(item => item.active === true).shift();
          if (active) {
            data[this.wrapperKey(currentData, key)] = active.value;
          }
        } else {}
      }
    }
    return data;
  }

  private wrapperKey(data: BpmnData, key: string) {
    let keying = '';
    switch (data.category) {
      case PaletteCategory.event:
        if (key === 'type') {
          keying = 'eventType';
        }
        break;
      case PaletteCategory.gateway:
        if (key === 'type') {
          keying = 'gatewayType';
        }
        break;
      case PaletteCategory.activity:
        if (key === 'type') {
          keying = 'taskType';
          break;
        }
        if (key === 'instance') {
          keying = 'instance';
          break;
        }
        break;
      default:
        break;
    }
    return keying;
  }

  public elementIsBlacklisted(bpmn: BpmnData): boolean {
    let block: boolean = false;
    switch (bpmn.category) {
      case PaletteCategory.link:
        block = true;
        break;
      default:
        break;
    }
    return block;
  }

  public getValueByKey(data: BpmnData, key: string): string {
    if (key === 'type') {
      return 'text';
    }
    return key;
  }

  public getCategory(label: string): PaletteCategory {
    let menuCategory: PaletteCategory = PaletteCategory.diagram;
    switch (label) {
      case 'file':
        break;
      default:
        break;
    }
    return menuCategory;
  }

  public getLabeByCategory(category: PaletteCategory, customName?: string) {
    if (customName) {
      return customName;
    }
    let myTag = 'propertyMenu.category.general'
    switch (category) {
      case PaletteCategory.event:
        myTag = 'propertyMenu.category.event';
        break;
      case PaletteCategory.activity:
        myTag = 'propertyMenu.category.task';
        break;
      case PaletteCategory.gateway:
        myTag = 'propertyMenu.category.gateway'
        break;
      default:
        break;
    }
    return myTag;
  }
}
