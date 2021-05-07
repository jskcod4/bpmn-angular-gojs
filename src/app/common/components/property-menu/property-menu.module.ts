import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SelectModule } from '../select/select.module';
import { PropertyMenuComponent } from './property-menu.component';
import { BpmnGlobal } from '../../services/bpmn.global';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PropertyToggleModule } from './common/components/toggle/toggle.module';
import { UploadModule } from './common/components/upload/upload.module';

@NgModule({
  declarations: [
    PropertyMenuComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    PropertyToggleModule,
    UploadModule
  ],
  exports: [],
  entryComponents: [
    PropertyMenuComponent
  ],
  providers: [
    BpmnGlobal
  ]
})
export class PropertyMenuModule {}
