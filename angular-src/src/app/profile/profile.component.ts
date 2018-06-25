import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  reslist = [];

  constructor(
    private router:Router,
    private authservice:AuthService,
    private reservationService:ReservationService,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(profile=>{
    this.user = profile.user;
    

  },
  err=>{
    console.log(err);
    return false;

  });

    const username = this.authservice.loadUser().username;
    this.reservationService.getMyReservation(username).subscribe(List => {
    this.reslist = List.reslist;   
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onReservationDelete(id) {
    this.reservationService.deleteReservation(id).subscribe(data => {
      if(data.success){
       this._flashMessagesService.show('Reservation has been deleted successfully',{cssClass: 'alert-success', timeout: 5000}) 
       this.ngOnInit();
      } else {
       this._flashMessagesService.show('Something went wrong',{cssClass: 'alert-danger', timeout: 5000}) 
      }
    })
}

onShowOneReservation(id) {
  this.router.navigate(['editreservation/'+id]);
}

}
