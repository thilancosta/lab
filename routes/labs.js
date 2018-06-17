const express = require('express');
const router = express.Router();
const config = require('../config/database');
const User = require('../models/lab');

router.post('/newlab',(req,res,next)=>{
    let newLab = new Lab({
        labname:req.body.labname,
        location:req.body.location

    });

    Lab.addLab(newLab,(err,lab)=>{
        if(err){
            res.json({success:false,msg:'Failed to add Lab'});

        }
        else{
            res.json({success:true,msg:'Lab added successfully'});
        }
    });
});

router.get('/alllabs',(req,res,next) => {
    Lab.getAllLabs((err,lablist) => {
        if(err){
            res.json({success:false,msg:'failed to load all labes'});
        } else {
            res.json({success:true,lablist:lablist});
        }
    });
});

router.delete('/:id',(req,res,next) => {    
    const id = req.params.id;
    Lab.deleteLab(id,(err,lab) => {
        if(err){
            res.json({success:false,msg:'Something went worng'})
        } else {
            res.json({success:true,msg:'lab details deleted successfully'});
        }
    });
});

router.post('/editLab/:id',(req,res,next) =>{
    const id = req.params.id;
    Lab.editLab(id,(err,lab) =>{
        if(err){
            res.json({success:false,msg:'Something went wrong'});
        } else {
            res.json({success:true,msg:'Lab details Edited Successfully'});
        }
    });
});


module.exports = router;