// Login
    if(document.getElementById('login')){
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
    }

// Cart
    if(document.getElementById('cart')) {
        const cardTable = document.getElementById('cardTable');
        const itemsLength = document.getElementById('itemsLength');

        function incrementValue(e) {
            console.log(e.closest('.tr').querySelector('#itemPrice'))
            let value = parseInt(e.parentNode.querySelector('#quantityValue').value, 10);
            let itemPrice = e.closest('.tr').querySelector('#itemPrice').innerText;
            let totalAmount = e.closest('.tr').querySelector('#totalAmount');
            value = isNaN(value) ? 0 : value;
            if(value<10){
                value++;
                e.parentNode.querySelector('#quantityValue').value = value;
                totalAmount.innerHTML = '$' + value * parseFloat(itemPrice);
            }
        }

        function decrementValue(e){
            let value = parseInt(e.parentNode.querySelector('#quantityValue').value, 10);
            let itemPrice = e.closest('.tr').querySelector('#itemPrice').innerText;
            let totalAmount = e.closest('.tr').querySelector('#totalAmount');
            value = isNaN(value) ? 0 : value;
            if(value>1){
                value--;
                e.parentNode.querySelector('#quantityValue').value = value;
                totalAmount.innerHTML = '$' + value * parseFloat(itemPrice);
            }

        }

        fetch("../data/products.json")
            .then((resp) => resp.json())
            .then(function(data) {
                let tab = 
                        `<div class="tr th">
                            <div class="td">Product Details</div>
                            <div class="td">Quantity</div>
                            <div class="td">Price</div>
                            <div class="td">Total</div>
                        </div>`;
                    
                    // Loop to access all rows 
                    for (let item of data) {
                        tab += `<div class="tr" id="${item.id}"> 
                            <div class="td">
                                <div class="cart__products">
                                    <div class="cart__image">
                                        <img src="${item.image}" alt="${item.title}" />
                                    </div>
                                    <div class="cart__content">
                                        <span class="cart__title">${item.title}</span>
                                        <span class="cart__category">${item.category}</span>
                                        <a href="#">Remove</a>
                                    </div>
                                </div>
                            </div>    
                            <div class="td">   
                                <div class="quantity__box">
                                    <input type="button" onclick="decrementValue(this)" value="-" />
                                    <input type="text" name="quantity" value="1" maxlength="2" max="10" size="1" id="quantityValue" />
                                    <input type="button" onclick="incrementValue(this)" value="+" />
                                </div>  
                            </div>      
                            <div class="td">
                                <span>$<span id="itemPrice">${item.price}</span></span>
                            </div>
                            <div class="td">
                                <span id="totalAmount">$${item.price}</span>
                            </div>
                        </div>`;
                }

                var size = Object.keys(data).length;
                itemsLength.innerHTML = size + ' Items';
                cardTable.innerHTML = tab;
            })
            .catch(function(error) {
                console.log(error);
            });

        function percentage(percent, total) {
            return ((percent/ 100) * total).toFixed(2)
        }

        document.getElementById('apply').onclick = function (){
            let promoCode = document.getElementById('promoCode').value;
            let subtotalAmount = parseFloat(document.getElementById('subtotalAmount').innerText);
            let totalCost = parseFloat(document.getElementById('totalCost').innerText);

            if(promoCode === "FIRST10") {
                let percentResult = percentage(10, subtotalAmount);
                let sub = subtotalAmount - percentResult;
                document.getElementById('totalCost').innerText = sub;
            }
        };
    }