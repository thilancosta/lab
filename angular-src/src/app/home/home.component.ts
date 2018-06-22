import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ValidateService} from '../services/validate.service'; 
import {LabService} from '../services/lab.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  labname:String;
  description:String;
  lablist = [];

  constructor(
    private FlashMessageService: FlashMessagesService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
  ) { }

  ngOnInit() {
    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
