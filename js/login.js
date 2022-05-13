class Login {
    authenticate() {
        const credentials = {
            id: 1, 
            user: "test", 
            password: "test"
        };

        const userArray = new Array(credentials);

        let user = document.getElementById('userName');
        let password = document.getElementById('password');

        if(userArray.length > 0){
            for(let i = 0; i < userArray.length; i++){
                if((user.value == userArray[i].user) && (password.value == userArray[i].password)){
                    localStorage.setItem('user1',JSON.stringify(userArray));
                    window.location.href="cart.html"; 
                } else {
                    this.troubleshoot(user, password, userArray);
                }
            }
        } else{
            alert("No match found.");
            this.resetValue(user, password);
        }
    }

    resetValue(u, p) {
        u.value = "";
        p.value = "";
    }

    troubleshoot(u, p, userArray) {
        for(let j = 0; j < userArray.length; j++){
            if(u.value == userArray[j].user){
                alert("Bad password");
                this.resetValue(u, p);
            } else if (p.value == userArray[j].password){
                alert("Bad user");
                this.resetValue(u, p);
            } else {
                alert("No match found.");
                this.resetValue(u, p);
            }
        };
    }
}


document.getElementById('submit').onclick = function (){
    let auth = new Login();
    auth.authenticate();
}; 
