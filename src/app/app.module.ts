import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { CoreComponent } from './core/core.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CoreModule,
    BrowserAnimationsModule
  ],
  bootstrap: [
    CoreComponent
  ],
  declarations: []
})
export class AppModule { }
