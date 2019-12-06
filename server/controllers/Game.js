const express = require('express');
const { Game } = require("../models/Game");
const { CustomError } = require('../models/CustomError');


const { Tracker_Server } = require("../models/Game");

const app = express.Router();

app.get('/', (req, res)=>{
    res.send({ ...Game.Get_State(), me: Game.Players[req.user_id] } );
} );
app.get('/hand', (req, res)=>{
    res.send(Game.Get_Hand());
} );
app.get('/picture/flip', (req, res)=>{
    if(req.user_id != Game.Dealer){
        throw new CustomError(403, "Only the dealer can flip the picture")
    }
    Game.Flip_Picture();
    res.send({ success: true, url: Game.Picture_In_Play });
} );
app.post('/players', (req, res)=>{
    const player_id = Tracker_Server.Join(req.body.name);
    res.send({ success: true, player_id });
} );

// miiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiine

app.post('/ccount', (req, res)=>{
    Tracker_Server.Get_CCount(req.user_id, req.body.Cwork, req.body.Cweight, req.body.Ctime);
    res.send({ success: true });
} );
app.get('/workouts', (req, res)=>{
    res.send(Tracker_Server.Get_Work());
} );
app.get('/done', (req, res)=>{
    res.send(Tracker_Server.Get_Done(req.user_id));
} );
app.get('/met', (req, res)=>{
    res.send(Tracker_Server.Get_Met(req.body.text));
} );
app.get('/index', (req, res)=>{
    res.send(Tracker_Server.Get_Index(req.body.text))
} );





module.exports = app;
