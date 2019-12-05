<template>

<div>
    <h1 class="is-size-1">
        This is the Game Page/ WILL BE FITNESS
    </h1> 

    <div class="columns">
        <div id = "Tracking" class="column is-one-quarter">

            <form name="Track" method="GET"><br>
                What did you do today? <br/><span>
                    <select id= "select" name="type" form="Ex">
                        <option value="" selected disabled>Please select workout</option>
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

                    
                How long did you do it?(Minutes) <input type="integer" name="Ctime" id = "Ctime"><br/>
                What is your current weight? <input type="integer" name="Cweight" id = "Cweight"><br/><br/>
                Your total calories burned in this activity were: <span id="Tburnt"></span><br/>
                <input type="button" value="Submit" @click="getCCount(select, weight, time)">
            </form>
            
            <ul class="panel">
                <p class="panel-heading">
                    Players
                </p>
                <li v-for="(p, i) in game.Players " :key="i" 
                    class="panel-block" :class="{ 'is-active': i == game.Dealer, 'has-text-primary': i == me.User_Id }">
                    <span class="panel-icon">
                    <i class="fas" :class=" i == game.Dealer ? 'fa-user-secret' : 'fa-user' " aria-hidden="true"></i>
                    </span>
                    {{p.name}}
                </li>
            </ul>
            
        </div>
        <div class="column">
            
            <ul class="panel">
                <p class="panel-heading">
                    Burn List.
                </p>
                <li v-for="(c, i) in My_Done " :key="i" class="panel-block is-active">
                  {{c}}
                    
                </li>
            </ul>
        </div>
    </div>

</div>
</template>

<script>

import { Tracker_Server } from "../models/Game";

export default {
    data: ()=> ({
        game:{},
        My_Done: [],
        me: Tracker_Server.User,

    }),

    async created(){
        this.Workouts = await Tracker_Server.Get_Work();
        setInterval( async ()=> this.game = await Tracker_Server.Get_State(), 2000 )
    },
    created(){
        this.Workouts = Tracker_Server.Get_Work();
        },

    methods: {
        getIndex(str){
            Tracker_Server.Get_Index(str);
        },
        getMET(index){
            Tracker_Server.Get_MET(Get_Index(work));
        },
        getCCount(work, weight, time){
            Tracker_Server.Get_CCount(getMET(getIndex(work)), weight, time);
            
            this.My_Done = Tracker_Server.Get_Done();
        },
        join(){
            Tracker_Server.Join(this.name)
                .catch(err=> {
                    console.error(err);
                    this.error = err.message;
                });
        },
    }
}

</script>

<style>
    .is-clickable {
        cursor: pointer;
    }
</style>