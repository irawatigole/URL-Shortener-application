const express = require('express');
const router = express.Router();
const { urlsController } = require('../app/controllers/urls_controller');
const { Url } = require('../app/models/url');

router.use('/urls', urlsController);

router.get('/:hash', (req,res) => {
    let hash = req.params.hash;
    let useragent = req.useragent;
  
    let detectDevice = function(){
        let result;
        if (useragent.isMobile){
            result = 'mobile'
        } else if (useragent.isTablet) {
            result = 'tablet'
        } else if (useragent.isiPad) {
            result = 'ipad'
        } else if (useragent.isiPhone) {
            result = 'iphone'
        } else if (useragent.isiPod) {
            result = 'ipod'
        } else if (useragent.isDesktop) {
            result = 'desktop'
        }
        return result;
        }
       
         /* Url.findOne({hashedUrl:hash}).then((url) =>{
             Url.findOneAndUpdate({id:url._id},
             {$push: {clicks: {osType:useragent.os, ipAddres:req.ip,
                browserName:useragent.browser, deviceType: detectDevice() }}} )
    })*/
    Url.findOneAndUpdate({hashedUrl: hash}, {$push: {clicks : {
        osType: useragent.os,
        ipAddres: req.ip,
        browserName: useragent.browser,
        deviceType: detectDevice()
    }}}).then((url)=> {
        res.redirect(url.originalUrl);
   });
 });


module.exports = {
    routes: router
}



