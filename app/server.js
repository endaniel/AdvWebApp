var express = require("express");
var mongodb = require('mongodb');
var path = require('path');
var http = require('http');
var MongoClient = mongodb.MongoClient;
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var _ = require('underscore');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var db = {};

MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, database){
    if(err) throw err;
    db = database;

    db.collection("system.namespaces").find({name: "test.messages"}).toArray(
        function(err, docs) {
            if(!docs.length) {
                db.collection('messages').insertMany([
                   {
                       id: 1,
                       name: 'daniel',
                       text: ['first','second','third','forth'],
                       pictures: [],
                       template: 'templates/templateA.html',
                       time: 5,
                       timeFrames: [{dateFrom: '2014-01-01',dateTo: '2015-12-31', dayOfTheWeek: [2,3,4], timeOfDayFrom: '6:00:00', timeOfDayTo: '12:00:00' }],
                       displayStationIds: [1,2]
                   },
                   {
                       id: 2,
                       name: 'guy',
                       text: ['first','second','third','forth','fifth','sixth','seventh','eighth','ninth','ten'],
                       pictures: ['img/first.jpg'],
                       template: 'templates/templateB.html',
                       time: 5,
                       timeFrames: [{dateFrom: '2014-03-01',dateTo: '2014-04-31', dayOfTheWeek: [3,4], timeOfDayFrom: '10:00:00', timeOfDayTo: '16:00:00' }],
                       displayStationIds: [1,3]
                   },
                   {
                       id: 3,
                       name: 'eraninio',
                       text: [],
                       pictures: [],
                       template: 'templates/templateC.html',
                       time: 5,
                       timeFrames: [{dateFrom: '2014-05-01',dateTo: '2014-06-15', dayOfTheWeek: [1,2,3,4,5,6,7], timeOfDayFrom: '08:00:00', timeOfDayTo: '22:00:00' }],
                       displayStationIds: [2,3]
                   },
                   {
                       id: 4,
                       name: 'guy',
                       text: ["first","second"],
                       pictures: [],
                       template: 'templates/templateA.html',
                       time: 5,
                       timeFrames: [{dateFrom: '2014-03-29',dateTo: '2014-04-15', dayOfTheWeek: [2], timeOfDayFrom: '15:00:00', timeOfDayTo: '19:00:00' }],
                       displayStationIds: [1]
                   },
                   {
                       id: 5,
                       name: 'eran',
                       text: ['first','second','third','forth','fifth','sixth','seventh'],
                       pictures: ['img/first.jpg','img/second.jpg'],
                       template: 'templates/templateB.html',
                       time: 5,
                       timeFrames: [{dateFrom: '2014-03-01',dateTo: '2014-04-31', dayOfTheWeek: [2,3,4], timeOfDayFrom: '1:00:00', timeOfDayTo: '23:00:00' }],
                       displayStationIds: [3]
                   }], function(err, result){
                       if(!err){
                           console.log("inserted successfully");
                       }
                   }
                )
            }
        });

    db.collection("system.namespaces").find({name: "test.displayStations"}).toArray(
        function(err, docs) {
            if(!docs.length) {
                db.collection('displayStations').insertMany([
                        {
                            id: 1,
                            address: "ציפמן 97 רעננה"
                        },
                        {
                            id: 2,
                            address: "הרצל 2 קדימה"

                        },
                        {
                            id: 3,
                            address: "רמת השרון"
                        }
                    ], function(err, result){
                        if(!err){
                            console.log("inserted successfully");
                        }
                    }
                )
            }
        });

    server.listen(3000);
    console.log("listening on port 3000");
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/main.html');
});


app.get('/station', function(req, res){
    db.collection("displayStations").find().toArray(function(err, docs){
        if(err){
            res.error("failed getting stations");
        }
        res.json(docs);
    })
});

app.put('/station/:displayStationAddress', function(req, res){
    db.collection("displayStations").find().sort({id : -1}).limit(1).toArray(function (err, docs) {
        if(err){
            res.error("failed creating station");
        }
        else{
            if(docs.length === 0){
                var newStationId = 1;
            }
            else{
                var newStationId = docs[0].id + 1;
            }
            db.collection("displayStations").insert({id: newStationId, address: req.params.displayStationAddress}, function (err, doc) {
                if(err){
                    res.error("failed creating station");
                }
                else{
                    res.json(doc.ops[0]);
                }
            })
        }

    })
});

app.delete('/station/:id', function (req, res) {
    var displayStationIdToDelete = +req.params.id;

    db.collection("messages").update({displayStationIds: {$in: [displayStationIdToDelete]}}, { $pull : { "displayStationIds" : displayStationIdToDelete} }, { multi: true }, function(err, docs){
        if(err){
            res.error("failed deleting display station fk");
        }
        else{
            db.collection("displayStations").remove({id: displayStationIdToDelete}, function (err, doc) {
                if(err){
                    res.error("failed deleting display station");
                }
                else{
                    return res.json(displayStationIdToDelete);
                }
            })
        }
    });
})

app.get('/message', function(req, res){
    db.collection("messages").find().toArray(function(err, docs){
        if(err){
            res.error("failed getting messages");
        }
        res.json(docs);
    })
});

app.get('/api/message/:id', function(req, res){
    db.collection("messages").findOne({id: parseInt(req.params.id)}, function(err, docs) {
        res.json(docs);
    });
});

app.put('/api/message/:id', function(req, res){
    var message = req.body;
    delete message._id;
    db.collection("messages").findOneAndUpdate({id: parseInt(req.params.id)}, message,{returnOriginal: false}, function(err, docs) {
        io.emit('messageChanged',docs.value)
        res.json(docs.value);
    });
});

app.post('/api/message', function(req, res){
    db.collection("messages").findOne({$query:{},$orderby:{id:-1}}, function (err, docs) {
        var message = req.body;
        message.id = docs.id + 1;
        db.collection("messages").insertOne(req.body, function(err, docs) {
            res.json(docs.ops[0]);
        });
    });
});

app.get('/messageDisplayRelation', function(req, res){
    db.collection("messages").find().toArray(function(err, docs){
        if(err){
            res.error("failed getting messages");
        }

        var data = []
        _.each(docs, function(message){
            _.each(message.displayStationIds, function(displayStationId){
                data.push({
                    messageDbId: message._id,
                    messageId: message.id,
                    displayStationId: displayStationId
                })
            })
        })

        res.json(data);
    })
});

app.get('/messages/displayStation/:id',function(req, res){
    db.collection("messages").find({displayStationIds: { $eq: parseInt(req.params.id) }}).toArray(function(err, docs) {
        res.json(docs);
    });
});

app.put('/messageDisplayRelation/:messageId/:displayStationId/:actionType', function(req, res){
    var messageId = +req.params.messageId;
    var displayStationId = +req.params.displayStationId;
    var action = req.params.actionType;

    if(action === "push"){
        db.collection("messages").update({'id': messageId}, { $addToSet : { "displayStationIds" : displayStationId} }, function(err, docs){
            if(err){
                res.error("failed getting messages");
            }
            return res.json({messageId: messageId, displayStationId: displayStationId});
        });
    }
    if(action === "pull"){
        db.collection("messages").update({'id': messageId}, { $pull : { "displayStationIds" : displayStationId} }, function(err, docs){
            if(err){
                res.error("failed getting messages");
            }
            return res.json({messageId: messageId, displayStationId: displayStationId});
        });
    }
});

app.post('/data/file', multipartMiddleware,function(req,res) {
    var tempPath = req.files.file.path;
    var fileName = req.files.file.name;
    fs.readFile(tempPath, function (err, data) {
        var newPath = __dirname + "\\public\\img\\" + fileName;
        fs.writeFile(newPath, data, function (err) {
            fs.unlink(tempPath, function(err) {
                if (err) {
                    return res.send(500, 'Something went wrong');
                }

                res.send('img/' + fileName);

            });
        });
    });
});

io.on('connection', function(socket){
    console.log('a user connected');
});

app.get('/templatesUsage', function(req, res){
    db.collection("messages").aggregate([
        {$group : {_id:"$template", count:{$sum: 1}}}
    ]).toArray(function (err, docs) {
        if(err){
            console.log("error getting group by")
        }
        else{
            res.json(docs)
        }
    })
});

app.get('/screensPerMessage', function(req, res){
    db.collection("messages").find().toArray(function (err, docs) {
        if(err){
            console.log("error getting group by")
        }
        else{
            var messagesWithDisplay = _.filter(docs, function (message) {
                return message.displayStationIds.length > 0 ;
            })
            var messagesWithNumOfDisplays = _.map(messagesWithDisplay, function (message) {
                return {name: message.name, count: message.displayStationIds.length}
            });
            res.json(messagesWithNumOfDisplays)
        }
    })
});

app.get('/template', function(req, res){
    var files = fs.readdirSync("public/templates");
    var fileNamesObjectArray = _.map(files, function (file) {
        return "templates/" + file;
    });
    res.json(fileNamesObjectArray);


});

app.delete('/template/:name', function (req, res) {
    var fileFullName = "templates/" + req.params.name
    db.collection("messages").find({template: fileFullName}).toArray(function (err, docs) {
        if(err){
            console.log("error deleting template");
        }
        if(docs.length > 0){
            res.status(400).send("enable to delete template used by message")
        }
        else{
           fs.unlink(__dirname + "/templates/" + req.params.name, function (err) {
               if (err) {
                   throw err;
               }
               res.json(fileFullName);
           }) 
        }
    })
})

app.post('/template', multipartMiddleware,function(req,res) {
    var tempPath = req.files.file.path;
    var fileName = req.files.file.name;
    fs.readFile(tempPath, function (err, data) {
        var newPath = __dirname + "\\public\\templates\\" + fileName;
        fs.writeFile(newPath, data, function (err) {
            fs.unlink(tempPath, function(err) {
                if (err) {
                    return res.send(500, 'Something went wrong');
                }

                res.send('img/' + fileName);

            });
        });
    });
});

app.get('*', function(req,res) {
    res.sendFile('main.html', {root:path.join(__dirname, 'public')});
});