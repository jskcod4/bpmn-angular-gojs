import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TranslateModule } from '@ngx-translate/core';
import { UploadOptionModule } from './common/components/upload-option/upload-option.module';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [
    UploadComponent,
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    TranslateModule,
    UploadOptionModule
  ],
  exports: [
    UploadComponent
  ]
})
export class UploadModule {}
