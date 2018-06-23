import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http:Http,private jwtHelper: JwtHelperService) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
    .pipe(map(res => res.json()));
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
    .pipe(map(res => res.json()));
  }

  getProfile(){
    const token = localStorage.getItem('id_token');
    this.authToken= token;
    let headers = new Headers();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
    .pipe(map(res => res.json()));
  }

  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;

  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken= token;
  }

  loggedIn(){
    return !this.jwtHelper.isTokenExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadUserType(){
    if(!this.jwtHelper.isTokenExpired()){
      const user = localStorage.getItem('user');
      this.user= JSON.parse(user);
      if(this.user.usertype=="admin"){
        return true;
      }
      else{
        return false;
    }
    }
    else{
      return false;
    }
    
  }
  
  loadUser(){
    return JSON.parse(localStorage.getItem('user'));
    
  }

}
