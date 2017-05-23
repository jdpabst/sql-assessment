let app = require('./index.js');
let db = app.get('db');

module.exports= {

        getUsers: function(req, res, next){
            db.get_users(function(err, users){
                res.status(200).send(users)
            })
        },
        getVehicles: function(req, res, next){
            let email = req.query.UserEmail;
            let letter = req.query.userFirstStart;

            if(email){
                db.user_email([email], function(err, result){
                console.log(err);
                return res.status(200).send(result)

            })} else if(letter){
                db.user_first_letter([letter+'%'], function(err, result){
                console.log(err);
                return res.status(200).send(result)
            })} else{
                db.get_vehicles(function(err, vehicles){
                return res.status(200).send(vehicles);
            })
            }
            
        },
        createUser: function(req, res, next){
            let newUser = req.body;
            db.create_user([newUser.id, newUser.firstname, newUser.lastname, newUser.email], function(err, users){
                console.log(err);
                res.status(200).send(users)
            })
        },
        createVehicle: function(req, res, next){
            let vehicle = req.body;
            db.create_vehicle([vehicle.make,vehicle.model, vehicle.year, vehicle.ownerId], function(err, vehicle){
                console.log(err);
                res.status(200).send(vehicles)
            })
        },
        
        vehicleCount: function(req, res, next){
            let id = req.params.userId;
            db.vehicle_count([id], function(err, result){
                res.status(200).send(result);
            })
        },

        getUserVehicles: function(req, res, next){
            let id = req.params.userId;
            db.user_vehicles([id], function(err, result){
                console.log(err);
                res.status(200).send(result)
            })
        },


        getVehiclesByYear: function(req, res, next){
            db.vehicle_year(function(err, result){
                res.status(200).send(result);
            })
        },

        changeOwnerById: function(req, res, next){
            let vehicleId = req.params.vehicleId;
            let userId = req.params.userId;

            let id = userId;
            
            
            db.change_user([vehicleId, id], function(err, result){
                res.status(200).send(result)
            })
        },

        removeOwnershipOfUser: function(req, res, next){
            let id = req.params.vehicleId;
            let userId = req.params.userId;

            db.remove_ownership([vehicles.id, users.id], function(err, result){
                res.status(200).send(result)
            })
        },


        destroyVehicle: function(req, res, next){
            let id = req.params.vehicleId;
            let vehicle = req.body;

            db.destroy_vehicle([id], function(err, results){
                res.status(200).send(result);
            })
        }







}