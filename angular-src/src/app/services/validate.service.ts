import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined ||user.username == undefined ||user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateLab(lab){
    if(lab.labname == undefined || lab.location == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateReservation(reservation){
    if(reservation.labname == undefined || reservation.reserveddate == undefined || reservation.from == undefined || reservation.to == undefined ){
      return false;
    } else {
      return true;
    }
  }

}
