const db = require('../db/db.json');
const fs = require('fs');

module.exports = function(app){

    function addNotestoDataBase(notes){
        notes = JSON.stringify(notes);
        fs.writeFileSync("./db/db.json",notes,function(err){
            if(err){
                return console.log(err);
            }
        });
    }
    app.get("/api/notes",function(req,res){
        res.json(db);
    });

    app.post("/api/notes",function(req,res){
        //set id to note to enable extra actions to the notes
        req.body.id = JSON.stringify(db.length);
        //console.log("Note ID is: "+req.body.id);
        //push the note to the json file
        db.push(req.body);
        addNotestoDataBase(db);
        console.log(db);
        res.json(req.body);
    })

    app.delete("/api/notes/:id",function(req,res){
        var id = req.params.id;
        console.log(id);

        for(var i = 0;i<db.length;i++){
            if(db[i].id === id){
                res.send(db[i])
                db.splice(i,1)
                break;
            }
        }
        addNotestoDataBase(db);
    })


















}