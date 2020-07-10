import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { ListCardComponent } from 'src/app/shared/components/list-card/list-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, ListCardComponent],
  imports: [HomeRoutingModule, CommonModule, SharedModule],
})
export class HomeModule {}
