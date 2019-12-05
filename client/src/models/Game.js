
// class important stuff
import { api, User } from "./my-fetch";
import $router from "../router/index";


// my irunnning code js starts here ////////////////////////////////////////////////////////////////////////////////////////////////

export const Tracker_Server = {
    User,
    Get_Done(){
        return api('done')
    },
    Get_Met(num){
        return api('met', { num })
    },
    GetIndex(str){
        return api('index', { str })
    },
    Get_CCount( work, weight, time){
        return api('ccount', { work, weight, time })
    },
    Get_Work(){
        return api('workouts')
    },
    async Join(name){
        const { player_id } = await api('players', { name });
        User.User_Id = player_id;
        $router.push( { name: 'game'} );

    },
    Get_State(){
        return api('')
    }
}

export var Workouts = [
  
];

export var Calorie_Counter = [
    
];

export const Tracker_Client = {
    Workouts,
    Cut_Cal: 0,
}

////////////////// class code //////////////////////////////////////////

