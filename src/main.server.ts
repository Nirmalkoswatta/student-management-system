import 'zone.js';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';
import { bootstrapApplication } from '@angular/platform-browser';

export default bootstrapApplication(AppComponent, config);
