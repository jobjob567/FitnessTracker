const express = require('express');
const { Game } = require("../models/Game");
const { CustomError } = require('../models/CustomError');


const { Tracker_Server } = require("../models/Game");

const app = express.Router();

app.get('/', (req, res)=>{
    res.send({ ...Tracker_Server.Get_State(), me: Tracker_Server.Players[req.user_id] } );
} );
app.get('/hand', (req, res)=>{
    res.send(Tracker_Server.Get_Hand());
} );
app.get('/picture/flip', (req, res)=>{
    if(req.user_id != Tracker_Server.Dealer){
        throw new CustomError(403, "Only the dealer can flip the picture")
    }
    Tracker_Server.Flip_Picture();
    res.send({ success: true, url: Tracker_Server.Picture_In_Play });
} );
app.post('/players', (req, res)=>{
    const player_id = Tracker_Server.Join(req.body.name);
    res.send({ success: true, player_id });
} );

// miiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiine

app.post('/ccount', (req, res)=>{
    const cal = Tracker_Server.Add_CCount(req.user_id, req.body.Cmet, req.body.Cweight, req.body.Ctime);
    res.send({ success: true, cal });
} );
app.get('/workouts', (req, res)=>{
    res.send(Tracker_Server.Get_Work());
} );

app.get('/', (req, res)=>{
    res.send({ ...Tracker_Server.Get_State(), me: Tracker_Server.Players[req.user_id] } );
} );

app.get('/done', (req, res)=>{
    res.send(Tracker_Server.Get_Done(req.user_id));
} );
app.post('/met', (req, res)=>{
    res.send(Tracker_Server.Get_Met(req.body.text));
} );
app.post('/index', (req, res)=>{
    res.send(Tracker_Server.Get_Index(req.body.text))
} );
app.post('/setmet', (req, res)=>{
    res.send(Tracker_Server.Set_Met(req.body.text))
} );
app.post('/setweight', (req, res)=>{
    res.send(Tracker_Server.Set_Weight(req.body.text))
} );
app.post('/settime', (req, res)=>{
    res.send(Tracker_Server.Set_Time(req.body.text))
} );





module.exports = app;
