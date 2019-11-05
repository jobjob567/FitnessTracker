import Caption_Deck from "./Captions";
import Workouts from "./Track_Info";
import METS from "./Track_Info";

export const Game_Server = {
    Players: [],
    Picture_Deck: [
        "https://cdn.pixabay.com/photo/2014/04/26/04/25/fitness-332278_1280.jpg",
        "https://image.shutterstock.com/image-photo/strong-woman-exercising-battle-ropes-600w-1014402268.jpg",
        "https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/14/15/coast-1834827_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/02/19/03/31/man-641691_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/03/09/09/59/men-1245982_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/03/27/07/08/man-1282232_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/09/06/01/00/surfing-926822_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/01/16/15/28/boxer-1984344_1280.jpg",
    ],
    Caption_Deck,
    Top_Of_Picture_Deck: 0,
    Top_Of_Caption_Deck: 0,    

    Dealer: -1,
    Captions_In_Play: [], // strings
    Picture_In_Play: "",
    Caption_Chosen: -1,
    Get_Hand(amount = 7){
        this.Top_Of_Caption_Deck += amount;
        return this.Caption_Deck.slice(this.Top_Of_Caption_Deck - amount, this.Top_Of_Caption_Deck)
    },
    Get_Next_Picture(){
        if(this.Top_Of_Picture_Deck == this.Picture_Deck.length){
            this.Top_Of_Picture_Deck = 0;
            return this.Picture_Deck[this.Top_Of_Picture_Deck++];
        }
        else{
            return this.Picture_Deck[this.Top_Of_Picture_Deck++];
        }
    }
}

export const Game_Client = {
    Players: [
        { name: "Moshe", points: 0 },
        { name: "Bernie", points: 0 },
        { name: "Donald", points: 0 },
        { name: "Andrew", points: 0 },
    ],
    Dealer: -1,
    Captions_In_Play: [], // strings
    Picture_In_Play: "",
    Caption_Chosen: -1
}

export var My_Captions = [

];

export class Player {
    name;
    points;
    captions;
}

// my irunnning code js starts here

export const Tracker_Server = {
    User: [],
    Workouts,
    METS

}

export const Tracker_Client = {
    Players: [
        { name: "Moshe", points: 0 }
    ],
    Dealer: 0,
    Captions_In_Play: [], // strings
    Picture_In_Play: "",
    Caption_Chosen: -1
}