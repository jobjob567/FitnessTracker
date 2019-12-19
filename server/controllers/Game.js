const express = require('express');


const { Tracker_Server } = require("../models/Game");

const app = express.Router();



app.get('/filter', (req, res)=>{
    const filtered = Tracker_Server.retList(req.partial);
    res.send({ success: true, filtered });
} );

app.get('/', (req, res)=>{
    res.send({ ...Tracker_Server.Get_State(), me: Tracker_Server.Players[req.user_id] } );
} );
app.post('/players', (req, res)=>{
    const player_id = Tracker_Server.Join(req.body.name);
    res.send({ success: true, player_id });
} );
app.post('/ccount', (req, res)=>{
    const burnt = Tracker_Server.Add_CCount(req.user_id, req.body.metvar, req.body.Cweight, req.body.Ctime);
    res.send({ success: true, burnt });
} );
app.get('/workouts', (req, res)=>{
    res.send(Tracker_Server.Get_Work());
} );

app.get('/done', (req, res)=>{
    const My_Done = Tracker_Server.Get_Done(req.user_id);
    res.send({ success: true, My_Done });
} );




module.exports = app;
