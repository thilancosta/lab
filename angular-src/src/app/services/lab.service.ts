import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabService {
  lab:any;
  constructor(
    private http:Http,
    
  ) { }

  insertLab(lab){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labs/newlab',lab,{headers:headers})
      .pipe(map(res => res.json()));
  
  }

  getAllLabs() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/labs/alllabs',{headers:headers})
      .pipe(map(res => res.json()));
  }  

  deletelab(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/labs/'+id,{headers:headers})
      .pipe(map(res => res.json()));
  }

  editLab(id,lab) { 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labs/editLab/'+id,lab,{headers:headers})
      .pipe(map(res => res.json()));
  }

  

  
}