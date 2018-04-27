import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { DataService } from '../../shared/services/data.service';
import { NotesConstantsService } from './notes-constants.service';
import { Note } from '../models/note'

@Injectable()
export class NotesService {

  constructor(private data: DataService) { }

  getNotes(query) {
    return this.data
      .get(NotesConstantsService.APIURLS.getall+"/"+query)
      .map((notes: any) => {
        return notes;
      });
  }

  createNote(note) {
    return this.data
      .post(NotesConstantsService.APIURLS.create, note)
      .map((res: any) => {
        // debugger
        return res;
      });
  }

  updateNote(note) {
    return this.data
      .put(NotesConstantsService.APIURLS.update + '/' + note.guid, note)
      .map((res: Note) => {
        return res;
      });
  }

  deleteNote(id) {
    return this.data
      .delete(NotesConstantsService.APIURLS.delete + '/' + id)
      .map((res: Response) => {
        return res;
      });
  }
}