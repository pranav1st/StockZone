var init_signup = document.querySelector("#signup-submit");
init_signup.addEventListener("click", next);

var init_login = document.querySelector("#login-submit");
init_login.addEventListener("click", next_login);


async function next(){
    var email_id = document.querySelector(".email-id").value;
    var passwd = document.querySelector(".passwd").value;
    var proceed1 = 1;
    function validator_email() {
        if (!email_id){
            throw new Error("Invalid Email ID");
        }
    }
    function validator_pass() {
        if (!passwd){
            throw new Error("Please enter valid Password!");
        }
    }
    try {validator_email();} catch(err){
        alert("Please enter valid Email ID");
        proceed1 = 0;
    };
    try {validator_pass();} catch(err){
        alert("Please enter valid Password");
        proceed1 = 0;
    };

    if (proceed1){
        console.log("Recieved inputs..");   //
        
        const result = await fetch("/api/register",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email_id, passwd})
        }).then(res => res.json())

        if(result.status == 'ok')
        {
            console.log("Login successful!");
            alert("Account created successfully!")
        }
        else{
            alert(result.error);
        }
    }
    console.log("--Client side---");
    console.log(email_id);
    console.log(passwd);
    console.log('----------');
};

async function next_login(){
    var email_id = document.querySelector(".email-id").value;
    var passwd = document.querySelector(".passwd").value;
    var proceed2 = 1;
    function validator_email() {
        if (!email_id){
            throw new Error("Invalid Email ID");
        }
    }
    function validator_pass() {
        if (!passwd){
            throw new Error("Please enter valid Password!");
        }
    }
    try {validator_email();} catch(err){
        alert("Please enter valid Email ID");
        proceed2 = 0;
    };
    try {validator_pass();} catch(err){
        alert("Please enter valid Password");
        proceed2 = 0;
    };

    if (proceed2){
        console.log("Recieved inputs..");   //
        
        const result = await fetch("/api/login",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email_id, passwd})
        }).then(res => res.json())

        if(result.status == 'ok')
        {
            console.log("Login successful!");
            alert('Login success!');

            window.location.href="https://www.youtube.com/watch?v=tiAlSpyWIDs"   //connect to main page

            view_port(email_id);
        }
        else{
            alert(result.error);
        }
    }
}

async function view_port(email_id){

}