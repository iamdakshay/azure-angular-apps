import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { CommonConstantsService } from '../shared/services/common-constants.service'
import { NotesService } from './services/notes.service'
import { NotesRoutingModule } from './notes-routing.module';

import { MyNotesComponent } from './components/my-notes/my-notes.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { OrderbyPipe } from '../shared/pipes/orderby.pipe';
import { DataService } from '../shared/services/data.service';
import { AzureAdAuthenticationService } from '../shared/services/azure-ad-authentication.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpClientModule,
    NotesRoutingModule, SharedModule, TagInputModule
  ],
  declarations: [MyNotesComponent, NoteCardComponent, OrderbyPipe],
  providers: [DataService, CommonConstantsService, NotesService, AzureAdAuthenticationService]

})
export class NotesModule { }
