const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');


const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions,(req,res) => res.sendStatus(200))
.get(cors.cors,authenticate.verifyUser,(req, res, next) => {
    Favorite.find({ user: req.user._id })
    .populate('user')
    .populate('campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    console.log(req.body);
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if(favorite){
         /* for(let i=0;i<req.body.length;i++){
              const campsiteId=req.body[i];*/
              req.body.forEach(campsiteId  =>{
             if(!favorite.campsites.includes(campsiteId))
                 favorite.campsites.push(campsiteId);
             })
          favorite.save()
          .then(favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        })
    .catch(err => next(err));
        }else{
//create favorite and add campsite.
           Favorite.create({
               user:req.user._id,
               campsites:req.body
           })
           .then(favorite => {
            console.log("favorite Created", favorite);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
           })
           .catch(err => next(err));
        }
        
       
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser, (req,res) =>{
    res.statusCode=403;
    res.end('PUT operation not supported on /campsites');
})

.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>{
    Favorite.findOneAndDelete({ user: req.user._id })
    .then(favorite => {
        if(favorite){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
        }
        else{
            res.setHeader("Content-Type", "text/plain");
            res.end( 'You do not have any favorites to delete.')
        }
    })
    .catch(err => next(err));
});
 


favoriteRouter.route( '/:campsiteId') 
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on /campsites/${req.params.campsiteId}`);
})

.post(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if(favorite){
            console.log(favorite.campsites)
          if(favorite.campsites.includes(req.params.campsiteId))
          {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json('That campsite is already a favorite!');
          }else{
          favorite.campsites.push(req.params.campsiteId);
             
          favorite.save()
          .then(favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
          })
          .catch(err => next(err));
         }
       }else{
//create favorite and add campsite.
   Favorite.create({
       user:req.user._id,
       campsites:req.params
   })
   .then(favorite => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(favorite);
   })
   .catch(err => next(err));
}

})

})
       
.put(cors.corsWithOptions,authenticate.verifyUser,(req, res,next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}`);
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if(favorite){
      const campsite1 = favorite.campsites.indexOf(req.params.campsiteId)
        campsite1 > -1 ?favorite.campsites.splice(campsite1,1):false;
        //favorite.campsites.remove({ _id: req.params.campsiteId });
        
        favorite.save()
        .then(favorite => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        })
        .catch(err => next(err));
       }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('There are no favorites to delete');
           
        }
    })
    .catch(err => next(err));
});




module.exports = favoriteRouter;