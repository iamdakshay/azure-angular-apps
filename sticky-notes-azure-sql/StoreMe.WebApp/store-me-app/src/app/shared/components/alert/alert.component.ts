import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

@Input() alert: any;
@Output() closed: EventEmitter<boolean> =new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close(){
    this.closed.emit(true);
  }

}
