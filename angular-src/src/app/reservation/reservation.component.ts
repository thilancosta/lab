import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ValidateService} from '../services/validate.service'; 
import {LabService} from '../services/lab.service';
import {ReservationService} from '../services/reservation.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  today = Date.now();
  username:string;
  useremail:string;
  labname:String;
  reserveddate:String;
  from:String;
  to:String;
  lablist = [];

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
    private reservationService:ReservationService,
    private authService:AuthService
  ) { }

  ngOnInit() {

    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      
    },
    err => {
      console.log(err);
      return false;
    });
    this.labname='';
    this.reserveddate='';
    this.from='';
    this.to='';
  }
  processdates = function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
}

  
  
  onReserveLab() {
    const user = this.authService.loadUser();
    const rdate = this.reserveddate.toString();
    const realdate = this.processdates(rdate);
    console.log(realdate);
    const reservation = {
      username:user.username,
      useremail:user.email,
      labname:this.labname,
      reserveddate:realdate,
      from:this.from,
      to:this.to
    }
    //console.log(reservation);
    
   if(!this.validateService.validateReservation(reservation)){
      //console.log(lab.labname);
      //console.log(lab.location);
       this._flashMessagesService.show('Please fill Requied Fields',{cssClass: 'alert-danger', timeout: 5000})
       return false;
    }
    
    this.reservationService.insertReservation(reservation).subscribe(data => {
      if(data.success) {
       this._flashMessagesService.show('Reservation has been successfully added',{cssClass: 'alert-success', timeout: 5000}) 
        this.ngOnInit();
        this.router.navigate(['/addreservation']); 
        
      

      } else {
       this._flashMessagesService.show('Time Overlap',{cssClass: 'alert-danger', timeout: 5000})   
       this.router.navigate(['/addreservation']); 
      }
    });
  }

}
