import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Note} from '../../models/note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  @Input() note:any;
  @Input() index:any;

  @Output() deleteNote: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() addNote: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() { }

  ngOnInit() {
  }

  cancelClicked(note){
    this.deleteNote.emit(note);
  }

  addNoteClicked(note){
    this.addNote.emit(note);
  }
}
