const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const sh = require('shorthash');



const urlSchema = new Schema({
    title: {
        type: String,
        reuired: true,
    },
    originalUrl: {
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return validator.isURL(value);
            },
            message: function(){
                return 'invalid URL format'
            }
        }
    },
    hashedUrl: {
        type: String
    },
    tags: {
        type: [String],
        required: true
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    },
    clicks:[
            { createdAt: { type: Date, default: Date.now },
             ipAddress: { type:String },
             osType: { type: String },
             browserName: { type: String },
             deviceType: { type: String} }
           ]
});

urlSchema.pre('save', function(next){
    let url = this;
     url.hashedUrl = sh.unique(url.originalUrl);
        next();
 });

  
 const Url = mongoose.model('Url', urlSchema);

 module.exports = {
     Url
 }