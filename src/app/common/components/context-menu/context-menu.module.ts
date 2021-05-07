import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu.component';
import { BpmnGlobal } from '../../services/bpmn.global';

@NgModule({
  declarations: [
    ContextMenuComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    ContextMenuComponent
  ],
  providers: [
    BpmnGlobal
  ]
})
export class ContextMenuModule {}
