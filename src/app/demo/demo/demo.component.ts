import { Observable } from 'rxjs/Rx';
import { DemoApiService } from './demo.service.api';
import {Component, ViewChild, HostListener} from '@angular/core';
import {DpDayPickerComponent} from '../../dp-day-picker/dp-day-picker.component';
import {Moment} from 'moment';
import {IDayPickerConfig} from '../../dp-day-picker/service/day-picker-config.model';
import debounce from '../../common/decorators/decorators';
import * as moment from 'moment';

@Component({
  selector: 'dp-demo',
  templateUrl: './demo.component.html',
  entryComponents: [DpDayPickerComponent],
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  @ViewChild('dayPicker') dayPicker: DpDayPickerComponent;
  demoFormat = 'DD-MM-YYYY';
  numberOfDaysStay = 1;
  // pickerMode = 'inline';
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  pickerMode = 'popup';
  rooms = [{
    name: 'Hotel First',
    id: 1
  }, {
    name: 'Hotel Second',
    id: 2
  }, {
    name: 'Hotel Third',
    id: 3
  },
  {
    name: 'Hotel Fourth',
    id: 4
  },
  {
    name: 'Hotel Fifth',
    id: 5
  }, 
  {
    name: 'Hotel Sixth',
    id: 6
  }];
  // Main api observable.
  availability$: Observable<any>;
  typesOfRooms: any[]= [];

  constructor(private demoService: DemoApiService){
    // Pass dates in this request to service later and return JSON.
    this.availability$ = demoService.getAvialibility();
    this.availability$.subscribe(data => {
      data.availability.inventory.inventoryItem.forEach(room => {
        this.typesOfRooms.push({
          name: room.description,
          inventoryCode: room.inventoryCode,
          images: room.images.image
        });
      });
    });
  }

  open() {
      this.dayPicker.api.open();
  }

  close() {
        this.dayPicker.api.close();
  }

  dateDep: Moment;
  date: Moment;
  dates: Moment[] = [];

  material: boolean = true;
  required: boolean = false;
  disabled: boolean = false;
  validationMinDate: Moment;
  validationMaxDate: Moment;
  placeholder: string = 'Choose a date...';

  config: IDayPickerConfig = {
    firstDayOfWeek: 'su',
    calendarsAmount: 1,
    format: 'DD-MM-YYYY',
    monthFormat: 'MMM, YYYY',
    allowMultiSelect: false,
    closeOnSelect: true,
    closeOnSelectDelay: 100,
    userValueType: 'string',
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    },
    appendTo: document.body,
    drops: 'down',
    opens: 'right'
  };
  isAtTop: boolean = true;

  @HostListener('document:scroll')
  @debounce(100)
  updateIsAtTop() {
    this.isAtTop = document.body.scrollTop === 0;
  }

  configChanged() {
    this.config = Object.assign({}, this.config);
  };

  createCustomWeekDays() {
    this.config.weekdayNames = this.config.weekdayNames || {};
  }

  openCalendar() {
    this.dayPicker.api.open();
  }

  closeCalendar() {
    this.dayPicker.api.close();
  }

  log(item) {
    console.log(item);
  }
}
