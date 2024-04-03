import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { HeaderComponent } from './core/components/header/header.component';
import { TitleComponent } from './core/components/title/title.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    HeaderComponent,
    TitleComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
