const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const {Customer} = require('./models/customer');
const PORT = process.env.PORT || 3000;
const IP = process.env.IP;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

//CREATE A CUSTOMER
app.post('/customers', async (req, res) => {
    try {
    const customer = await (new Customer(req.body)).save();
    res.send(customer);
    }
    catch(e) {
        (e) => {res.status(400).send(e)}
    }
    
});

//READ ALL CUSTOMERS DATA
app.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.send({ customers });
});

//READ ONE CUSTOMER
app.get('/customers/:id', async (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send('ID IS NOT VALID!');
    }
    try {
        const customer = await Customer.findById(id);
        res.send({ customer });
    } 
    catch(err) {
        (err) => {res.status(400).send(err)} 
    }
});

//DELETE ONE CUSTOMER
app.delete('/customers/:id', async (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send('ID IS NOT VALID!');
    }
    try {
        const customer = await Customer.findByIdAndRemove(id);
        res.send({ customer });
    } 
    catch(err) {
        (err) => {res.status(400).send(err)} 
    }
});

//PATCH ROUTE / UPDATE ONE CUSTOMER
app.patch('/customers/:id', async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['first_name', 'last_name', 'date_of_birth', 'country']);
    
    if(!ObjectID.isValid(id)) {
        return res.status(400).send('ID IS NOT VALID!');
    }
    
    try {
        const customer = await Customer.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        if(!customer) {
            return res.status(404).send();
        }
        res.send({ customer });
    }
    catch(err) {
        res.status(400).res.send();
    }
    
});


app.listen(PORT, IP, () => {
    console.log(`Server started on PORT: ${PORT}`);
});