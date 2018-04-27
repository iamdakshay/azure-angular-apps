import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/notes.service';
import * as _ from 'lodash';
import { Note } from '../../models/note';
import { AzureAdAuthenticationService } from '../../../shared/services/azure-ad-authentication.service';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css'],
})
export class MyNotesComponent implements OnInit {

  newNote: Note;
  tags: any;
  notes: Array<Note>;
  alert: any = null;
query: string = "";

  constructor(private notesService: NotesService, private azureAdAuthenticationService: AzureAdAuthenticationService) {
  }

  ngOnInit() {

    this.newNote = new Note("", "");
    this.notes = [];
 
    this.azureAdAuthenticationService.handleAuthenticationCallback();

    // debugger
    this.alert = {
      type: "info",
      message: "loading . . ."
    };

    this.notesService.getNotes(this.query).subscribe(notes => {
      this.notes = this.notes.concat(notes);

      this.alert = {
        type: "success",
        message: "notes are fetched successfully."
      }
    },
      error => {
        this.alert = {
          type: "error",
          message: "Error in fetching your notes."
        };
        console.error("Error while getting all notes.");
        console.error(error.error.Message);
      });

  }

  deleteNote(note) {

    console.log("Delete note: " + note.Id);

    if (note.Id) {

      console.log(this.notes.indexOf(note));

      this.alert = {
        type: "info",
        message: "Deleting the note.."
      };

      this.notesService.deleteNote(note.Id).subscribe(res => {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.alert = {
          type: "success",
          message: "Note is deleted successfully with id " + note.Id
        };
      },
        error => {

          this.alert = {
            type: "error",
            message: (error && error.error) ? error.error.Message : "Error occured while deleting the note"
          },

            console.error("Error occured while deleting the note.");
          console.error((error && error.error) ? error.error.Message : "Error occured while deleting the note");
        });
    }
    else {
      note.Title = "";
      note.Description = "";
    }
  }

  addNote(note) {

    this.alert = {
      type: "info",
      message: "Saving your note to server..."
    }

// debugger

    note.Tags = JSON.stringify(_(this.tags).map('value').value());

    this.notesService.createNote(note).subscribe(addedNote => {
      // debugger

      this.alert = {
        type: "success",
        message: "Note is added successfully with id" + addedNote.Id
      };

      note = addedNote;
      this.notes.splice(0, 0, note);
      this.newNote = new Note("", "");

    },
      error => {

        this.alert = {
          type: "error",
          message: (error && error.error) ? error.error.Message : "Error occured while adding the note."
        };
        console.error("Error occured while adding the note.");
        console.error((error && error.error) ? error.error.Message : "Error occured while adding the note.");
      });
  }

  updateNote(note) {

    this.notesService.updateNote(note).subscribe(res => {
      debugger
    });
  }

  alertClosed() {
    this.alert = null;
  }
}