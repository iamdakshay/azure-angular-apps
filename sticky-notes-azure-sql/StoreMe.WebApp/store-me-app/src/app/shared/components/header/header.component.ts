import { Component, OnInit } from '@angular/core';
import { Adal4Service } from 'adal-angular4/adal4.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;

  constructor(private adal4Service: Adal4Service) {

    this.userName = sessionStorage.getItem("StoreMeUser");

    if (!this.userName) {
      this.userName = "User";
    }
  }

  ngOnInit() {


  }

}
