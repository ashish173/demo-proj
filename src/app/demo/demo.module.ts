import {DpDayPickerComponent} from './../dp-day-picker/dp-day-picker.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DemoComponent} from './demo/demo.component';
import {DemoRootComponent} from './demo-root.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {DpDatePickerModule} from '../dp-date-picker.module';
import {MultiselectTestComponent} from './multiselect-test/multiselect-test.component';
import { ModalModule } from 'ng2-bootstrap';

import { DemoApiService } from './demo/demo.service.api';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DpDatePickerModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'multiselect-test',
        component: MultiselectTestComponent,
      },
      {
        path: '**',
        component: DemoComponent,
      }
    ])
  ],
  declarations: [
    DemoRootComponent,
    DemoComponent,
    MultiselectTestComponent,
    
  ],
  entryComponents: [
    DpDayPickerComponent,
  ],
  providers: [DemoApiService],
  bootstrap: [DemoRootComponent]
})
export class DemoModule {
}
