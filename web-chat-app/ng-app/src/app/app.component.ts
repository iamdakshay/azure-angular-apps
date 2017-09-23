import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import * as socket_io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'Chat Application';
  message = "";
  messages = [];
  socket;
  socketId;

  @ViewChild("chatwindow") private chat_window: ElementRef;

  ngOnInit() {
    this.socket = socket_io("http://localhost:9697");
    // this.socket = socket_io("http://10.21.15.68:9697");
    this.socketId = this.socket.socketId;
    this.socket.on("new_message", (message) => {
      this.messages.push(message);
    });
    this.socket.on("connected", (data) => {
      this.socketId = data.clientId;
    });
    this.socket.on("take_history", (data) => {
      this.messages = data;
    });
  }

  ngAfterViewChecked() {
    this.chat_window.nativeElement.scrollTop = this.chat_window.nativeElement.scrollHeight;
  }
  sendMessage = () => {
    this.socket.emit("send_message", this.message);
    this.message = "";
  };

  sendSmily = () => {
    this.socket.emit("send_message", ":)");
  };

  clearChatWindow = () => {
    this.messages = [];
  };

  loadChatHistory = () => {
    this.socket.emit("get_history");
  };
}
