import './polyfills.ts';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {DemoModule} from './app/demo/demo.module';
// window['xml2js'] = require('../node_modules/xml2js/lib/xml2js.js');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(DemoModule);
