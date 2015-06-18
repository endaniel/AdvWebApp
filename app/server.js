var express = require("express");
var mongodb = require('mongodb');
var path = require('path');
var http = require('http');
var MongoClient = mongodb.MongoClient;
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = {};

MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, database){
    if(err) throw err;
    db = database;

    db.collection("system.namespaces").find({name: "test.messages"}).toArray(
        function(err, docs) {
            if(!docs.length) {
                db.collection('messages').insert([
                   {
                       id: 1,
                       name: 'guy',
                       text: ['first','second','third','forth'],
                       pictures: ['img/first.jpg','img/second.jpg'],
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
                       name: 'guy',
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
                       name: 'guy',
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

    server.listen(3000);
    console.log("listening on port 3000");
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/stationId/:stationId', function(req, res){
    var stationId = +req.params.stationId;
    res.header('Access-Control-Allow-Origin', '*');
    db.collection("messages").find({"displayStationIds": stationId}).toArray(function(err, docs){
        if(err){
            res.error("failed getting messages");
        }
        res.json(docs)
    })
});

app.get('/messages', function(req, res){
    db.collection("messages").find().toArray(function(err, docs){
        if(err){
            res.error("failed getting messages");
        }
        res.json(docs)
    })
});

app.get('/api/message/:id', function(req, res){
    db.collection("messages").findOne({id: parseInt(req.params.id)}, function(err, docs) {
        res.json(docs)
    });
});

app.get('*', function(req,res) {
    res.sendFile('main.html', {root:path.join(__dirname, 'public')});
});

app.delete('message/:messageId/displayStation/:stationId', function(req, res){
    var stationId = +req.params.stationId;
    var messageId = +req.params.messageId;
    //db.collection("messages").find({"displayStationIds": stationId}).toArray(function(err, docs){
    //    if(err){
    //        res.error("failed getting messages");
    //    }
    //    res.json(docs)
    //})

    db.collection("messages").update({'id': messageId}, { $pull: { "displayStationIds" : stationId} }, function(err, result){
        if(err){
            res.error("failed getting messages");
        }
        res.ok(result)
    });
});

app.put('/TestUpdate/:stationId', function (req, res) {
    var stationId = +req.params.stationId;
    res.header('Access-Control-Allow-Origin', '*');
    db.collection("messages").find({"displayStationIds": stationId}).toArray(function(err, docs){
        if(err){
            res.error("failed getting messages");
        }
        io.emit('messageChanged', docs);
    });
});

io.on('connection', function(socket){
    console.log('a user connected');
});
