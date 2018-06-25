import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../services/validate.service'; 
import { LabService } from '../services/lab.service';
import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.service';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-editreservation',
  templateUrl: './editreservation.component.html',
  styleUrls: ['./editreservation.component.css']
})
export class EditreservationComponent implements OnInit {
  reservation:any;
  reservationId:string
  id:string;
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
    private authService:AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    //this.reservation=0;
    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      
    },
    err => {
      console.log(err);
      return false;
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      //console.log(this.id);
    });
    this.reservationService.getoneReservation(this.id).subscribe(onereservation => {
      this.reservation = onereservation.reservation;
      console.log(this.reservation);  
      this.labname = this.reservation.labname;
      this.reserveddate = this.reservation.reserveddate;
      this.from = this.reservation.from;
      this.to = this.reservation.to;
    },
    err => {
      console.log(err);
      return false;
    });

  }

  processdates = function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
}

  onEditLabReservation(resId){
    const user = this.authService.loadUser();
    const rdate = this.reserveddate.toString();
    const realdate = this.processdates(rdate);
    console.log(realdate);
    const editedreservation = {
      username:user.username,
      useremail:user.email,
      labname:this.labname,
      reserveddate:realdate,
      from:this.from,
      to:this.to

  } 
  console.log(editedreservation);
  console.log('on edit reservation');
  this.reservationService.editReservation(this.id,editedreservation).subscribe(data => {
    if(data.success) {
     this._flashMessagesService.show('Reservation has been successfully Edited',{cssClass: 'alert-success', timeout: 5000}) 
     this.router.navigate(['/profile']); 
      
    

    } else {
     this._flashMessagesService.show('Something went wrong',{cssClass: 'alert-danger', timeout: 5000})  
     this.router.navigate(['/dashboard']); 
    }
  });


  
}

}
