import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../services/validate.service'; 
import { LabService } from '../services/lab.service';
import { ReservationService } from '../services/reservation.service';
import { AuthService } from '../services/auth.service';
import { Router,ActivatedRoute,Params } from '@angular/router';



declare var jsPDF: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //today = Date.now();
  labname:string;
  reserveddate:string;
  reservationlist = [];
  array1 = [];

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

  //   for(let i of this.reservationlist) {
  //     var arr =[];
  //     arr.push(i.reserveddate,i.from);
  //  }
  }

  processdates = function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
    }

    onSearchReservation(){
        
        const searchdate = this.processdates(this.reserveddate);
        
        const searchobj = {
            labname:this.labname,
            reserveddate:searchdate
        }
        

        this.reservationService.searchReservationByDate(searchobj).subscribe(dashboard => {
            this.reservationlist = dashboard.reservation;
            console.log(this.reservationlist);
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

        // @ViewChild('content') content: ElementRef;
        // downloadPDF(){
        //   let doc = new jsPDF();

        //   let specialElementHandlers = {
        //     '#editors' : function(element, renderer){
        //       return true;
        //     }
        //   };

        //   let content = this.content.nativeElement;

        //   doc.fromHTML(content.innerHTML, 15, 15, {
        //     'width' : 190,
        //     'elementHandlers' : specialElementHandlers
        //   });

        //   doc.save('dayReservations.pdf');

        // }

        download(){

          const labname= this.labname;
          var columns = ["DATE", "FROM", "TO", "RESERVED BY"];
          var rows = [];
          var data = this.reservationlist;
          for(let i of data) {
            var arr =[];
            arr.push(i.reserveddate,i.from,i.to,i.username);
            rows.push(arr);
         }
          
          // Only pt supported (not mm or in)
          var doc = new jsPDF('p', 'pt');
          doc.autoTable(columns, rows);
          doc.save(labname+'_'+this.reserveddate+'_'+'reservations.pdf');

        }

        // arraymake= function(array){
        //   var data = array;
        //   for(let i in data) {
        //     var arr =[];
        //     arr.push(i.reserveddat,);
        //  }

        // }

}
