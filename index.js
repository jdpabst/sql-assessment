var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connString = "postgres://vidphmqttxktsx:8829111596b0662011abecb00114edc1144dec777a427ef3a878e824392e0b9f@ec2-54-197-232-155.compute-1.amazonaws.com:5432/d2f6fi2p7t3iol?ssl=true";


var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);
    const mainCtrl = require('./mainCtrl.js');


    app.get('/api/users', mainCtrl.getUsers);
    app.get('/api/vehicles', mainCtrl.getVehicles);

    app.get('/api/user/:userId/vehiclecount', mainCtrl.vehicleCount);
    
    app.get('/api/user/:userId/vehicle', mainCtrl.getUserVehicles);

    app.get('/api/newervehiclesbyyear', mainCtrl.getVehiclesByYear);

    app.post('/api/users', mainCtrl.createUser);
    app.post('/api/vehicles', mainCtrl.createVehicle);

    app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.changeOwnerById);

    app.delete('/api/user/:userId/vehicle/:vehicleId', mainCtrl.removeOwnershipOfUser);

    app.delete('/api/vehicle/:vehicleId', mainCtrl.destroyVehicle);
    
})




app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
