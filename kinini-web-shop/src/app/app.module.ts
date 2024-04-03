import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router'
import { AppRoutingModule} from './app.routing.module'

import { AppComponent } from './app.component';
import { AdminModule} from './@admin/admin.module';
import { PublicModule} from './@public/pages/public.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AdminModule,
    PublicModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
