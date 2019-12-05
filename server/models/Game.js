const Caption_Deck = require('./Captions');
const { CustomError } = require('./CustomError');


module.exports.Game = {
    Players: [
        /*
        { name: "Moshe", points: 0 },
        { name: "Bernie", points: 0 },
        { name: "Donald", points: 0 },
        { name: "Andrew", points: 0 },
        */
    ],
    Picture_Deck: [
        "http://www.dailyhaha.com/_pics/prepared-to-slice-onions.jpg",
        "http://www.dailyhaha.com/_pics/no-parking-here-guys.jpg",
        "http://www.dailyhaha.com/_pics/best-parking-spot.jpg",
        "http://www.dailyhaha.com/_pics/a-good-selling-point.jpg",
    ],
    Caption_Deck,
    Top_Of_Picture_Deck: 0,
    Top_Of_Caption_Deck: 0,    

    Dealer: 0,
    Captions_In_Play: [], // strings
    Picture_In_Play: "",
    Caption_Chosen: -1,
    Get_Hand(amount = 7){
        this.Top_Of_Caption_Deck = (this.Top_Of_Caption_Deck + +amount) % this.Caption_Deck.length;
        return this.Caption_Deck.slice(this.Top_Of_Caption_Deck - amount, this.Top_Of_Caption_Deck)
    },
    Flip_Picture(){
        this.Top_Of_Picture_Deck = (this.Top_Of_Picture_Deck + 1) % this.Picture_Deck.length;
        this.Picture_In_Play = this.Picture_Deck[this.Top_Of_Picture_Deck];
        this.Caption_Chosen = -1;
        this.Captions_In_Play = [];
    },
    Join(name){
        if(this.Players.find(x=> x.name == name )){
            throw new CustomError(409, 'Another user is already using that name.');
        }
        this.Players.push({ name, score: 0 });
        return this.Players.length - 1;
    },
    Submit_Caption(player_id, text){
        if(player_id == this.Dealer){
            throw new CustomError(500, "Dealer is not allowed to submit a caption")
        }
        if( this.Captions_In_Play.some( x=> x.player_id == player_id ) ){
            throw new CustomError(500, "Sorry, you already submitted a caption")
        }
        this.Captions_In_Play.push( { player_id, text } );
    },
    Choose_Caption(player_id, id){
        if(player_id != this.Dealer){
            throw new CustomError(403, "Only a dealer is allowed to choose the winning caption")
        }
        this.Caption_Chosen = id;
        this.Dealer = (this.Dealer + 1) % this.Players.length;
    },
    Get_State(){
        return {
            Players: this.Players,
            Dealer: this.Dealer,
            Captions_In_Play: this.Captions_In_Play.map(x=> ({ text: x.text, player: this.Caption_Chosen == -1 ? 'hidden' : this.Players[x.player_id].name })), 
            Picture_In_Play: this.Picture_In_Play,
            Caption_Chosen: this.Caption_Chosen
        }
    }
}

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
    Get_CCount(met, weight, time){
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
        this.Players.push({ name, score: 0 });
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

