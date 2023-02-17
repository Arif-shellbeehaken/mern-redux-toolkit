const express = require('express');
const router = express.Router();

//Item
const Item = require('../../models/Items');

// @route GET api/items
// @desc GET All Items
// @access public

router.get('/',(req, res) => {
    try {
        const items = Item.find()
                          .sort({date: -1})
                          .then(items => res.json(items));
        // if (items.length > 0){
        //     res.status(200).json({status: "ok", data:items, msg: "OK"});
        // }else{
        //     res.status(404).json({status: "false",data:items, msg: "'No data found!'"});
        // }
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route POST api/items
// @desc Create a new item
// @access public

router.post('/', (req, res) => {
    console.log(req.body);
    const newItem = new Item({name: req.body.name});
    try {
        if(newItem) {
            newItem.save()
            .then(item => res.status(200).json({status: "ok", statusCode: 200, data: newItem, msg: "Item created successfully"}));
        }else{
            res.status(200).json({status: "false", statusCode: 406, data: newItem, msg: "Unsuccessfull, Try again"});
        }
    } catch (error) {
        res.status(200).json(error);
    }
});

// @route POST api/items/:id
// @desc Delete a item
// @access public

router.delete('/:id', (req, res) => {
    try {
        Item.findByIdAndDelete(req.params.id)
            .then((item) => res.status(200).json({status: "ok", data: item, msg: "Item deleted successfully!"}))
            .catch(err => res.status(404).json({msg: "data not found"}))
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route PUT api/items/:id
// @desc Updated a item
// @access public

router.put('/:id', (req, res) => {
    console.log(req.body.name);
    try {
        const query =  {$set:{name: req.body.name}}
        Item.findByIdAndUpdate(id, query, {new: true, useFindAndModify: false})
            .then((item) => console.log(item))
            .catch(err => res.status(404).json({msg: "data not found"}))
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;