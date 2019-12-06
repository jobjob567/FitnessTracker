
const { CustomError } = require('./CustomError');

const Work_List = require('./Track_Info');
const METS =  require('./METS');


module.exports.Tracker_Server = {
    Players: [],
    Type_Of_Workout: 0,
    Worked_Outs: [],
    Work_List,
    METS,
    Get_Met(num){
        this.val = METS[num];
        return val;
    },
    Get_Index(str){
        this.chosen;
        for (i = 0; i < Work_List.length; i++) {
            if(Work_List[i].equals(this.str) == true){
                this.chosen = i;
            }
          }
          return chosen;
    },
    Get_CCount(player_id, met, weight, time){
        cal= 0.0175*met*weight;
        cal = cal * time;
        this.Worked_Outs.push({ player_id, cal})
        return cal;
    },
    Work_Set(){

    },
    Get_Work(){
        return this.Work_List.slice(0,Work_List.length)
    },
    Join(name){
        if(this.Players.find(x=> x.name == name )){
            throw new CustomError(409, 'Another user is already using that name.');
        }
        this.Players.push({ name });
        return this.Players.length - 1;
    },

    Get_Done(player_id){
        if(player_id == this.player_id){
            return this.Worked_Outs;
        }
    },

    Get_State(){
        return {
            Players: this.Players,
            Worked_Outs: this.Worked_Outs,
            Captions_In_Play: this.Captions_In_Play.map(x=> ({ text: x.text, player: this.Caption_Chosen == -1 ? 'hidden' : this.Players[x.player_id].name })), 
            Picture_In_Play: this.Picture_In_Play,
            Caption_Chosen: this.Caption_Chosen
        }
    },


    //**************use for submitting workouts */
    Submit_Caption(player_id, text){
        this.Captions_In_Play.push( { player_id, text } );
    },

    
}

