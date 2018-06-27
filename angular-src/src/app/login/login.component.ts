import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  loginForm: FormGroup;


  constructor(private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      defaultFormEmail: ['', Validators.required],
      defaultFormPass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }
  

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data=>{
        if(data.success){
          this.authService.storeUserData(data.token,data.user);
          this._flashMessagesService.show('You are logged in',{cssClass: 'alert-success', timeout: 5000})
          this.router.navigate(['/']);
        }
        else{
          this._flashMessagesService.show(data.msg,{cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/login']);
        }
    });




  }

}
