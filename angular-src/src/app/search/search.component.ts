import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../services/validate.service'; 
import { LabService } from '../services/lab.service';
import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.service';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  today = Date.now();
  labname:string;
  reserveddate:string;
  reservationlist = [];

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

    this.route.params.subscribe(params => {
      this.labname = params['labname'];
  });

  this.reservationService.getReservationByDate(this.labname).subscribe(dashboard => {
      this.reservationlist = dashboard.reservation;
      
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

    onSearchReservation(){
        console.log('hiii');
        const searchdate = this.processdates(this.reserveddate);
        
        const searchobj = {
            labname:this.labname,
            reserveddate:searchdate
        }
        

        this.reservationService.searchReservationByDate(searchobj).subscribe(dashboard => {
            this.reservationlist = dashboard.reservation;
            if(dashboard.success) {
             this._flashMessagesService.show('Found a record',{cssClass: 'alert-success', timeout: 5000})
            } else {
               this._flashMessagesService.show('No Records Found',{cssClass: 'alert-danger', timeout: 5000})
            } 
            },
            err => {
              console.log(err);
              return false;
            });
        }

}
