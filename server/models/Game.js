
const { CustomError } = require('./CustomError');

const Work_List = require('./Track_Info');
const METS =  require('./METS');


module.exports.Tracker_Server = {
    Players: [],
    Type_Of_Workout: 0,
    My_Done: [],
    Work_List,
    METS,
    Cwork: "",
    Cmet: 0,
    Cweight: 0,
    Ctime: 0,
    extra: [],

    retList(partial){
        extra: [];
        for (let index = 0; index < Work_List.length; index++) {
            if (Work_List[index].filter(partial)) {
                const ex = Work_List.W[index];
                this.extra.push(ex);
            }
        }
        return extra;
    },

    Add_CCount(player_id, Cmet, Cweight, Ctime){
        cal= 0.0175 * Cmet * Cweight;
        cal = cal * Ctime;
        this.My_Done.push({ id: player_id, burnt: cal})
        return cal;
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
            return this.My_Done;
    },

    Get_State(){
        me: "";
        return {
            Players: this.Players,
            My_Done: this.My_Done,
        }
    },

    
}

///////////////////unused code/////////////////////////////

/*


    Get_Met(num){
        this.val = num;
        return val;
    },
    Get_Index(str){
        this.chosen;
        for (i = 0; i < Work_List.length; i++) {
            if(Work_List[i].equals(str) == true){
                this.chosen = i;
            }
          }
          return chosen;
    },
    Get_CCount(player_id){
        cal= 0.0175*this.Cmet*this.Cweight;
        cal = cal * this.Ctime;
        this.My_Done.push({ id: player_id, burnt: cal})
        return cal;
    },

    Submit_Caption(player_id, text){
        this.Captions_In_Play.push( { player_id, text } );
    },
    
    Set_Met(i){
        this.Cmet = i;
    },
    Set_Weight(i){
        this.Cweight = i;
    },
    Set_Time(i){
        this.Ctime = i;
    },
*/