import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservation:any;

  constructor(
    private http:Http
  ) { }

  insertReservation(reservation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/reservations/newreservation',reservation,{headers:headers})
      .pipe(map(res => res.json()));
  
  }

  getMyReservation(username) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/reservations/myreservations/'+username,{headers:headers})
      .pipe(map(res => res.json()));
    }

    deleteReservation(id) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.delete('http://localhost:3000/reservations/'+id,{headers:headers})
        .pipe(map(res => res.json()));
    }

    getoneReservation(id){
      console.log('form one reservation services'+id);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/reservations/getreservation/'+id,{headers:headers})
        .pipe(map(res => res.json()));
    }


    editReservation(id,reservation) {
      //console.log('on edit reservation as fuck');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/reservations/editreservation/'+id,reservation,{headers:headers})
        .pipe(map(res => res.json()));

    }


    getReservationByDate(labname){
      console.log('form one reservation services'+labname);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/reservations/getreservationbydate/'+labname,{headers:headers})
        .pipe(map(res => res.json()));
    }

    searchReservationByDate(searchobject){
      //console.log('form one reservation services'+labname);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/reservations/searchreservation',searchobject,{headers:headers})
        .pipe(map(res => res.json()));
    }

}
