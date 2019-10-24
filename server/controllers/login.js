var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.

const users = [
    { id: "job", pass: giuliani},
    { id: "test", pass: 123}
];

function register(userN, passN){
    const arr1 = [
        {id: userN, pass: passN}
    ];
    users.concat(arr1);
}

function validate(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    for(i=0; i < users.length(); i++){
        if ( username == users[i].id && password == users[i].pass){
            alert ("Login successfully");
            window.location = "index.html"; // Redirecting to other page.
            return false;
        }
    
        else{
            attempt --;// Decrementing by one.
            alert("You have left "+attempt+" attempt;");
            // Disabling fields after 3 attempts.
            if( attempt == 0){
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("submit").disabled = true;
                return false;
            }
        }
    }
}