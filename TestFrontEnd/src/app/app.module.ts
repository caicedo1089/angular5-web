import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';

import {PlanesService} from "./services/planes.services";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    PlanesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
