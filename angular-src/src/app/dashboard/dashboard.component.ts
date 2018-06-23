import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ValidateService} from '../services/validate.service'; 
import {LabService} from '../services/lab.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  labname:String;
  location:String;
  lablist = [];

  constructor(
    private FlashMessageService: FlashMessagesService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
  ) { }

  ngOnInit() {
    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onLabSubmit(){
    const lab = {
      labname:this.labname,
      location:this.location
     
    }
    
    if(!this.validateService.validateLab(lab)){
      console.log(lab.labname);
      console.log(lab.location);
       this.FlashMessageService.show('Please fill Requied Fields',{cssClass: 'alert-danger', timeout: 5000})
       return false;
    }
    
    this.labService.insertLab(lab).subscribe(data => {
      if(data.success) {
       this.FlashMessageService.show('Lab has been entered Successfully',{cssClass: 'alert-success', timeout: 5000}) 
        this.ngOnInit();
        this.router.navigate(['/dashboard']); 
        
      

      } else {
       this.FlashMessageService.show('Something went wrong',{cssClass: 'alert-danger', timeout: 5000})  
       this.router.navigate(['/dashboard']); 
      }
    });


  }

  onLabDelete(id) {
      this.labService.deletelab(id).subscribe(data =>{
        if(data.success){
         this.FlashMessageService.show('Lab has been deleted Successfully',{cssClass: 'alert-success', timeout: 5000}) 
         this.ngOnInit();
        } else {
         this.FlashMessageService.show('Something went wrong',{cssClass: 'alert-success', timeout: 5000}) 
        }
      })
  }

}
