import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import { AlertComponent } from './components/alert/alert.component';
import {Adal4Service} from 'adal-angular4/adal4.service';
import {SharedRoutingModule} from './shared-routing.module';

@NgModule({
  imports: [CommonModule, SharedRoutingModule],
  declarations: [AlertComponent, HeaderComponent],
  providers:[Adal4Service],
  exports: [AlertComponent, HeaderComponent]
})
export class SharedModule { }
