import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
// For MDB Angular Free
import { CarouselModule, WavesModule,InputsModule,NavbarModule } from 'angular-bootstrap-md'
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MatDatepickerModule,MatNativeDateModule,MatInputModule,MatSelectModule} from '@angular/material';
// import {MatFormFieldModule} from '@angular/material/form-field';



import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';


import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import { ReservationComponent } from './reservation/reservation.component';
import { SearchComponent } from './search/search.component';
import { EditreservationComponent } from './editreservation/editreservation.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'addreservation',component:ReservationComponent,canActivate:[AuthGuard]},
  {path:'search/:labname',component:SearchComponent,canActivate:[AuthGuard]},
  {path:'editreservation/:id',component:EditreservationComponent,canActivate:[AuthGuard]} 
]
export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ReservationComponent,
    SearchComponent,
    EditreservationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    CarouselModule,
    WavesModule,
    InputsModule,
    NavbarModule
    
    // MatDatepickerModule,
    // MatNativeDateModule,
    // BrowserAnimationsModule,
    // MatInputModule,
    // MatSelectModule,
    // MatFormFieldModule
    
    
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
