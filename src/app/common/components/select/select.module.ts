import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from './select.component';
import { BpmnGlobal } from '../../services/bpmn.global';

@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    SelectComponent
  ],
  providers: [
    BpmnGlobal
  ]
})
export class SelectModule {}
