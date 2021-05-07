import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule} from '@angular/material/slider';
import { ZoomComponent } from './zoom.component';
import { NouisliderModule } from 'ng2-nouislider';
import { BpmnGlobal } from '../../services/bpmn.global';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ZoomComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    NouisliderModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ZoomComponent
  ],
  providers: [
    BpmnGlobal
  ],
})
export class ZoomModule {}
