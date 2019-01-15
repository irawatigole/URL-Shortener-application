const express = require('express');
const router = express.Router();
const { Url } = require('../models/url');
const { validateID } = require('../middlewares/utilities');


router.get('/tags', (req,res) => {
    let names = req.query.names.split(',');
    Url.find({tags: {$in: names}}).then((url) =>{
        if (url){
            res.send(url)
            } else {
                res.send({
                    notice: 'Url not found'
                });
            }
        }).catch((err) => {
            res.send(err);
        });
});

router.get('/', (req, res) => {
    Url.find().then((urls) => {
        res.send(urls);
    }).catch((err) => {
        res.send(err);
    })
})

router.get('/:id', validateID, (req, res) => {

    let id = req.params.id;
    Url.findById(id).then((url) => {
        if (url){
        res.send(url)
        } else {
            res.send({
                notice: 'Url not found'
            });
        }
    }).catch((err) => {
        res.send(err);
    });
});

router.get('/tags/:name', (req,res) => {
    let name = req.params.name;
    Url.find( {tags: name }).then((url) =>{
        if (url){
            res.send(url)
            } else {
                res.send({
                    notice: 'Url not found'
                });
            }
        }).catch((err) => {
            res.send(err);
        });
});

router.post('/', (req,res) => {
    let body = req.body;
    let url = new Url(body);
    url.save().then((url) => {
        res.send({
            url,
            notice: 'Successfully created the url'
        });
    }).catch((err) => {
        res.send(err);
    })
})

router.delete('/:id', validateID, (req,res) => {

    let id = req.params.id;
    Url.findByIdAndRemove(id).then((url) => {
        if(url) {
            res.send(url)
        } else {
            res.send({
                notice: 'Url not found'
            });
        }  
    }).catch((err) => {
        res.send(err);
    });
});


router.put('/id:', validateID, (req,res) => {

    let id = req.params.id;
    let body = req.body;
    Url.findOneAndUpdate({_id: id}, { $set: body }, { new: true, runValidators: true}).then((url) => {
        if(!url) {
            res.send({
                notice: 'Url not found'
            });
        }
        res.send({
            url,
            notice: 'Successfully updated the url'
        });
    }).catch((err) => {
        res.send(err);
    })
});



module.exports = {
    urlsController: router,
    
}