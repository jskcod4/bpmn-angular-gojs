import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";

import { ZoomModule } from "../common/components/zoom/zoom.module";
import { translateData } from "../common/translate";
import { BpmnGlobal } from "../common/services/bpmn.global";
import { CoreComponent } from "./core.component";
import { ContextMenuModule } from "../common/components/context-menu/context-menu.module";
import { PropertyMenuModule } from "../common/components/property-menu/property-menu.module";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot(translateData),
    ZoomModule,
    ContextMenuModule,
    PropertyMenuModule,
  ],
  declarations: [CoreComponent],
  exports: [CoreComponent],
  providers: [BpmnGlobal],
})
export class CoreModule {}
