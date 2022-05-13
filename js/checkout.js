var app = window.app || {};

(function(){
	app.init = function(){
		app.getProducts();
	}

	app.getProducts = function(){
		const cardTable = document.getElementById("cardTable");
		const itemsLength = document.getElementById("itemsLength");

		var items = localStorage.getItem('newProducts');
		let itemsParsed = JSON.parse(items);

		let tab = `<div class="tr th">
			<div class="td">Product Details</div>
			<div class="td">Total</div>
		</div>`;
		
		for (let item of itemsParsed) {
			tab += `<div class="tr item-product" id="${item.id}"> 
				<div class="td">
					<div class="layout__products">
						<div class="layout__image">
							<img src="${item.image}" alt="${item.title}" />
						</div>
						<div class="layout__content">
							<span class="layout__title">${item.title}</span>
						</div>
					</div>
				</div>       
				<div class="td">
					<span>$<span class="item-price">${item.price}</span></span>
				</div>
			</div>`;
		}

		var size = Object.keys(itemsParsed).length;
		itemsLength.innerHTML = size + " Items";
		cardTable.innerHTML = tab;
	}

	if (localStorage.getItem("user1") === null) {
		window.location.href="index.html"; 
	} else {
		document.addEventListener("DOMContentLoaded", function(event) {
			app.init();
			document.getElementById("checkout").classList.remove("hide");
		});
	}
})();