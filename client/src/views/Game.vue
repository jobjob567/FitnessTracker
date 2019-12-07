<template>

<div>
    <h1 class="is-size-1">
        This is the Game Page/ WILL BE FITNESS
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
                            {{w.W}}
                        </option>
                    </select>
                    </span><br/>

                    
                How long did you do it?(Minutes) <input type="integer" name="Ctime" id = "Ctime" v-model="Ctime"><br/>
                What is your current weight? <input type="integer" name="Cweight" id = "Cweight" v-model="Cweight"><br/><br/>
                Your total calories burned in this activity were: <span id="Tburnt"></span><br/>
                <input type="button" value="Submit" @click="getCCount">
            </ul>
            
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
        Ctime: "", 
        Cweight: "",
        Cwork: "",
        Workouts: [],

    }),

    async created(){
        this.Workouts = await Tracker_Server.Get_Work();
        //setInterval( async ()=> this.game = await Tracker_Server.Get_State(), 2000 )
    },
    methods: {
        getCCount(Cwork, Cweight, Ctime){
            Cwork = Cwork;
            Tracker_Server.Get_CCount(this.Cwork.MET, +this.Cweight, +this.Ctime);
            
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