const express = require('express');
const router = express.Router();
const config = require('../config/database')
const Reservation = require('../models/reservation');


router.get('/allreservations',(req,res,next) => {
    Reservation.getAllReservations((err,reslist) => {
        if(err){
            res.json({success:false,msg:'Failed to make get request'});
        } else {
            res.json({success:true,reslist:reslist});
        }
    });
})

router.get('/myreservations/:username',(req,res,next) => {
    const username = req.params.username;
    Reservation.getMyReservations(username,(err,reslist) => {
        if(err){
            res.json({success:false,msg:'Failed to load the data'});
        } else {
            res.json({success:true,reslist:reslist});
        }
    });
});
     

router.delete('/:id',(req,res,next) => {   
    const id = req.params.id;
    console.log(id);
    Reservation.deleteReservation(id,(err,lab) => {
        if(err){
            res.json({success:false,msg:'Something went worng'})
        } else {
            res.json({success:true,msg:'Reservation has been deleted successfully'});
        }
    });
});


router.post('/editreservation/:id',(req,res,next) => {
    const id = req.params.id;
    const labname = req.body.labname;
    const reserveddate = req.body.reserveddate;
    const from = req.body.from;
    const to = req.body.to;  
    
    let newReservation = new Reservation ({
        username:req.body.username,
        useremail:req.body.useremail,
        labname:req.body.labname,   
        reserveddate:req.body.reserveddate,
        from:req.body.from,
        to:req.body.to
    }); 

    Reservation.getReservationByDate(reserveddate,labname,(err,reservation) => {
        if(err) {
            res.json({success:false,msg:'Failed to load that specific lab reservation'});
        } else  {
            if(isEmpty(reservation)){
                console.log('err1');
                
                Reservation.addReservation(newReservation ,(err,user) => {
                    if(err) {
                        res.json({success:false,msg:'Failed to make reservation'});
                    } else {
                        res.json({success:true,msg:'Reservation make successfully'});
                    }
                });
            }
            else{
                function overlap(reservation){
                    
                    for (let x of reservation) {
                        if((x.from<from) && (from<x.to) && (x.id!=id)){
                            return false;
                        }
                        else if((from<=x.from) && (x.to<=to) && (x.id!=id)){
                            
                            return false;
                        }
                        else if((x.from<to) && (to<x.to) && (x.id!=id)){
                            return false;
                        }
                    
                      }
                      return true;

                }
                if(overlap(reservation)){
                    console.log('err2');
                    Reservation.deleteReservation(id,(err,lab) => {
                        if(err){
                            console.log('error');
                        } else {
                            console.log('success');
                        }
                    });
                    
                  Reservation.addReservation(newReservation ,(err,user) => {
                    if(err) {
                        res.json({success:false,msg:'Failed to make reservation'});
                    } else {
                        res.json({success:true,msg:'Reservation make successfully'});
                    }
                });
                }
                else{
                    console.log('err4');
                    res.json({success:false,msg:'Time Overlap'});
                }
                
                  
 
            }
        }
       });
   });

   router.get('/getreservation/:id',(req,res,next) => {
       const id = req.params.id;
       //console.log(id);
       Reservation.getOneReservation(id,(err,reservation) => {
        if(err) {
            res.json({success:false,msg:'Failed to load that specific lab'});
        } else  {
            res.json({success:true,reservation:reservation});
        }
       });
       
   });

   router.get('/getreservationbydate/:labname',(req,res,next) => {
    const labname = req.params.labname;
    const displayDate = new Date().toLocaleDateString();
    const rdate = processdates(displayDate);
    Reservation.getReservationByDate(rdate,labname,(err,reservation) => {
     if(err) {
         res.json({success:false,msg:'Failed to load that specific lab'});
     } else  {
         res.json({success:true,reservation:reservation});
     }
    });
    
});

router.post('/searchreservation',(req,res,next) => {
    const labname = req.body.labname;
    const reserveddate = req.body.reserveddate;
    Reservation.getReservationByDate(reserveddate,labname,(err,reservation) => {
     if(err) {
         res.json({success:false,msg:'Failed to load that specific lab reservation'});
     } else  {
         if(isEmpty(reservation)){
            res.json({success:false,msg:'Failed to load that specific lab reservation'});
         }
         else{
             console.log(reservation);
            res.json({success:true,reservation:reservation}); 
         }
     }
    });
    
});



processdates = function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

router.post('/newreservation',(req,res,next) => {
    const labname = req.body.labname;
    const reserveddate = req.body.reserveddate;
    const from = req.body.from;
    const to = req.body.to;       
    let newReservation = new Reservation ({
        username:req.body.username,
        useremail:req.body.useremail,
        labname:req.body.labname,
        reserveddate:req.body.reserveddate,
        from:req.body.from,
        to:req.body.to
    });
    
    Reservation.getReservationByDate(reserveddate,labname,(err,reservation) => {
        if(err) {
            res.json({success:false,msg:'Failed to load that specific lab reservation'});
        } else  {
            if(isEmpty(reservation)){
                
                Reservation.addReservation(newReservation ,(err,user) => {
                    if(err) {
                        res.json({success:false,msg:'Failed to make reservation'});
                    } else {
                        res.json({success:true,msg:'Reservation make successfully'});
                    }
                });
            }
            else{
                function overlap(reservation){
                    for (let x of reservation) {
                        if((x.from<from) && (from<x.to)){
                            
                            return false;
                        }
                        else if(from<=x.from && x.to<=to){
                            
                            return false;
                        }
                        else if((x.from<to) && (to<x.to)){
                            return false;
                        }
                    
                      }
                      return true;

                }
                if(overlap(reservation)){
                    
                  Reservation.addReservation(newReservation ,(err,user) => {
                    if(err) {
                        res.json({success:false,msg:'Failed to make reservation'});
                    } else {
                        res.json({success:true,msg:'Reservation make successfully'});
                    }
                });
                }
                else{
                    res.json({success:false,msg:'Time Overlap'});
                }
                
                  
 
            }
        }
       });
   })



module.exports = router;