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
  availabilityData: any;
  typesOfRooms: any[]= [];
  selectedRooms = [];// ['FAM-S', 'GDBL-S']; // This should be updated on user selecting rooms
  totalPrice = '$0.00';

  constructor(private demoService: DemoApiService){
    // Pass dates in this request to service later and return JSON.
    this.availability$ = demoService.getAvialibility(this.date, this.dateDep);
    this.availability$.subscribe((data: Observable<any>) => {
      this.fetchAndSanitizeData(data);
      // this.findTotalFare(data); // this should set the total price here.
      console.log('availa', data);
      
    });
  }

  fetchAndSanitizeData(data) {
    data.subscribe(finalData => {
      this.availabilityData = data;
      console.log('final data', finalData);
      const inventory = finalData.availability.inventory[0];
      // debugger;
      this.typesOfRooms = [];
      inventory.inventoryItem.forEach(room => {
        this.typesOfRooms.push({
          name: room['$'].description,
          inventoryCode: room['$'].inventoryCode,
          images: room.images[0].image[0]['_']
        });
      });
    });
  }

  /**
   * Update selected rooms inventoryId
   */
  updateRoomInventorySelection(room) {
    this.selectedRooms.push(room.inventoryCode); 
    console.log('selected array', this.selectedRooms);
    this.log(room);
  }

  /**
   * Gets triggered each time new availability data is fetch.
   * Returns thong 
   */
  findTotalFare(availabilityData: any) {
    console.log('arr date', this.date);
    console.log('dep date', this.dateDep);
    if (this.date === undefined || this.dateDep === undefined || this.selectedRooms.length === 0) { return; }
    this.calculatePrice(this.selectedRooms, availabilityData);

  }

  /** This method takes in room selections and availabilty data  
   * and returns total price.
   */
  calculatePrice(selections, availabilityData) {
    /* Add logic to it */
    console.log('Calculating price now');
    this.totalPrice = '$123.56';
    // return { totalPrice: '$123.45' };
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
    // call this service with arrivalDate, departureDate
    // this.availability$ = this.demoService.getAvialibility(this.date, this.dateDep);
    this.availability$.subscribe(data => this.fetchAndSanitizeData(data));
    this.findTotalFare(this.availabilityData); // this should set the total price here.
  }
}
