<template>

<div>
    <h1 class="is-size-1">
        This is the Game Page/ WILL BE FITNESS
    </h1> 

    <div class="columns">
        <div class="column is-one-quarter">

            <form id="Track" method="GET"><br>
                What did you do today? <br/><span>
                    <select name="type" form="Ex">
                        <option>"Bicycling; 12-13.9 mph (leisure, moderate effort)"</option>
                        <option>"Bicycling; mountain-biking, uphill, vigorous effort"</option>
                        <option>"Stationary cycling; (90-100 watts)"</option>
                        <option>"Circuit training, vigorous intensity, minimal rest"</option>
                        <option>"Resistance training – squats, explosive effort"</option>
                        <option>"Resistance training – multiple exercises, 8-15 reps"</option>
                        <option>"Jumping rope"</option>
                        <option>"Hatha Yoga"</option>
                        <option>"Home activity – cleaning, moderate effort"</option>
                        <option>"Home activity – laundry (incl. walking)"</option>
                        <option>"Playing w/children, (only active periods)"</option>
                        <option>"Yardwork – moderate-to-vigorous effort"</option>
                        <option>"Gardening – general, moderate effort"</option>
                        <option>"Running – 6 mph (10 min./mile)"</option>
                        <option>"Running – 14 mph (4.3 min./mile)"</option>
                        <option>"Golf – walking (carrying clubs)"</option>
                        <option>"Tennis – singles"</option>
                        <option>"Basketball – general"</option>
                        <option>"Walking for exercise – brisk pace (3.5 mph)"</option>
                        <option>"Swimming laps – freestyle – moderate effort"</option>
                        <option>"Hiking (hills w/10-20lb. load)"</option>
                        <option>"Exercise/activity- moderate effort (e.g. Wii Fit)"</option>
                        <option>"Video-exercise (DVD/TV) moderate effort"</option>
                        <option>"Sitting– at desk / watching TV / reading"</option>
                        <option>"Standing– working on computer/ talking on phone"</option>
                    </select>
                    </span><br/>

                    
                How long did you do it?(Minutes) <input type="integer" name="Ctime" id = "Cweight"><br/>
                What is your current weight? <input type="integer" name="Cweight" id = "Cweight"><br/><br/>
                Your total calories burned in this activity were: <span id="Tburnt"></span><br/>
                <input type="button" value="Submit" onClick="writeValues(form)">
            </form>
            
            
            
        </div>
        <div class="column">
            
            <ul class="panel">
                <p class="panel-heading">
                    Workout Test
                </p>
                <li v-for="(c, i) in Workouts " :key="i" class="panel-block is-active">
                  
                <button type="button" class="btn btn-primary" @click="click" >{{c}}</button>
                    
                </li>
                <li>
                    <span class="panel-icon">
                    <input type="text" class="form-control" placeholder="What is your weight?" v-model="weight" />
                    <p id='demo' style='display: none'>{{weight}}</p>     
                    <button type='button' onclick="toggleText()">Click me</button>
                    </span>
                </li>
            </ul>
        </div>
    </div>

</div>
</template>

<script>
import { Game_Client, Game_Server, My_Captions } from "../models/Game";
import { Tracker_Server, Tracker_Client, Workouts } from "../models/Game";
export default {
    data: ()=> ({
        game: Game_Client,
        My_Captions,
        Tracker_Client,
        Workouts
    }),
    created(){
        this.My_Captions = Game_Server.Get_Hand();
    },
    created(){
        this.Workouts = Tracker_Server.Get_Work();
    },

    methods: {
        pictureClicked(){
            Game_Server.Flip_Picture();
        },
        async submitCaption(caption, i){
            const response = await Game_Server.Submit_Caption(caption);
            this.My_Captions.splice(i, 1);
        },
        async chooseCaption(i){
            const response = await Game_Server.Choose_Caption(i);
        }
    }
}
window.writeValues = function(form) {
    var Wtype = form.type.value;
    var Ct = form.Ctime.value;
    var Cw = form.Cweight.value;
    var index = Tracker_Server.GetIndex(Wtype);
    var mets = Tracker_Server.Get_Met(index);
    var summith = Tracker_Server.Get_CCount(mets,Cw);

    document.getElementById("Tburnt").innerHTML = Wtype + ' '+Ct;
}



</script>

<style>
    .is-clickable {
        cursor: pointer;
    }
</style>