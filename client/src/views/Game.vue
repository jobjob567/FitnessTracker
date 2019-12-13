<template>

<div>
    <h1 class="is-size-1">
        Fitness Tracker
    </h1> 

    <div class="columns">
        <div id = "Tracking">

            
            <ul class="panel">
                <p class="panel-heading">
                    Calorie Calculator
                </p>
                What did you do today? <br/><span>
                    <select v-model="Cwork" id= "select" name="Cwork" form="Ex">
                    
                        <option value="" selected disabled>Please select workout</option>
                        <option v-for="(w,i) in Workouts" :key="i">
                            {{w.W}} {{w.MET}}
                        </option>
                    </select>
                    </span><br/>

                    
                How long did you do it?(Minutes) <input type="integer" name="Ctime" id = "Ctime" v-model="Ctime"><br/>
                What is your current weight? <input type="integer" name="Cweight" id = "Cweight" v-model="Cweight"><br/><br/>
                Your total calories burned in this activity were: <span id="Tburnt"></span><br/>
                <input type="button" value="Submit" @click="addCCount(me, Cwork, Cweight, Ctime)">
            </ul>
            
            <ul class="panel">
                <p class="panel-heading">
                    Current Users
                </p>
                <li v-for="(p, i) in game.Players " :key="i" class="panel-block" 
                :class="{ 'is-active': i == game.Dealer, 'has-text-primary': i == me.User_Id }">
                    <span class="panel-icon">
                    <i class="fas" :class=" i == me.User_Id ? 'fa-user-secret' : 'fa-user' " aria-hidden="true"></i>
                    </span>
                    {{p.name}}
                </li>
            </ul>
            
        </div>
        <div class="column">
            
            <ul class="panel">
                <p class="panel-heading">
                    Burn List for all,
                    Your User ID: {{me.User_Id}}
                </p>
                <li v-for="(c, i) in game.My_Done " :key="i" class="panel-block" 
                :class="{'is-hidden': My_Done.id != game.Dealer }">
                  User id: {{c.id}}, You have burned a total of {{c.burnt}} calories from this workout!
                    
                </li>
            </ul>
        </div>
    </div>

</div>
</template>

<script>

import { Tracker_Server, Workouts } from "../models/Game";

export default {
    data: ()=> ({
        game:{},
        My_Done: [],
        me: Tracker_Server.User,
        Ctime: 0, 
        Cweight: 0,
        Cwork: "",
        Workouts: [],
        Players: [],

    }),

    async created(){
        this.Workouts = await Tracker_Server.Get_Work();
        
        setInterval( async ()=> this.game = await Tracker_Server.Get_State(), 2000 )
    },
    methods: {
        async addCCount(me, Cwork, Cweight, Ctime){
            console.log(me);
            var matches = Cwork.match(/\d+/g); 
            if (matches.length< 2) {
                var metvar = matches[0];
            }
            else
            {
                var metvar = (+matches[0]);
                var change = +matches[1]
                metvar = metvar + change;
            }
            
            console.log(metvar);
            console.log(matches);
            console.log(Cweight);
            console.log(Ctime);

            //Tracker_Server.Get_CCount(me);
             const response = await Tracker_Server.Add_CCount({ me, metvar, Cweight, Ctime })
            
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