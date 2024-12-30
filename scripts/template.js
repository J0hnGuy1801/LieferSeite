function renderMenue() {
  let menuContainer = document.getElementById('menu_Container');
  menuContainer.innerHTML += '';
  for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
    let menu = dishes[indexDishes];
    if (menu['foodPicture']) {
      menuContainer.innerHTML += /*html*/`
                <div class="banner_container">
                    <img src="${menu['foodPicture']}" alt="" id="${menu['id']}"> 
                </div>`;}
    menuContainer.innerHTML += /*html*/`
            <div class="dishes" id="item${indexDishes}" onclick="addToCart(${indexDishes})">
                <div class="food_title">
                    <div class="food_header" > <h2> ${menu['item']}</h2>
                        <div class="addTobasket"> 
                        <img src="./img/assets/plus.png" alt="add">
                    </div>
                </div>
              <div class="description">
                    <p>${menu['info']}</p>
                </div>
              <div class="price">
                    <h2>${menu['price']} €</h2>
                </div>
                </div>
            </div>`;
    renderCart();}
}

function renderCart() {
  let korb = document.getElementById('basket_content')
  let totalPrice = calculatePrice(cart);
  let deliveryFee = 2.00;
  let totalIncludDelivery = totalPrice + deliveryFee;
  korb.innerHTML = '';
  korb.innerHTML += /*html*/`
        <div class="basket">
          <h1>Warenkorb</h1>
          <div class="button-container">
            <button class="order-btn takeaway">
            <img src="./img/assets/takeaway-food.png" alt="" /> Takeaway
            </button>
            <button class="order-btn delivery">
              <img src="./img/assets/fast-delivery.png" alt="" /> Delivery
            </button>
          </div>
          <div id="basket" class="basket_list">
          </div>
          <div id="total" class="total">Gesamt: ${totalIncludDelivery.toFixed(2)} €</div>
          <button class="pay_btn" onclick="checkOut()"> Zur Kasse </button>`;
}

function updateCart() {
  let menuCart = document.getElementById('basket');
  menuCart.innerHTML = '';
  for (let indexBasket = 0; indexBasket < cart.length; indexBasket++) {
    let choosenFood = cart[indexBasket];

    menuCart.innerHTML += /*html*/`
                <li class="choosenFood">
                    <span>${choosenFood.item}</span>
                    <span><div class="quantity"><button onclick="deleteItem(${indexBasket})" class="plus_minus_input">-</button> ${choosenFood.amount} <button class="plus_minus_input" onclick="increaseItemAmount(${indexBasket})">+</button></div></span>
                </li>`;}
}

function renderCartContent() {
  let mobileBasketContent = document.getElementById('popUpBasket');
  mobileBasketContent.innerHTML = '';
  if (cart.length === 0) {
    mobileBasketContent.innerHTML = '<p>Ihr Warenkorb ist leer.</p>';
    return;
  }
  let totalPrice = 0;
  for (let indexBasket = 0; indexBasket < cart.length; indexBasket++) {
    let choosenFood = cart[indexBasket];
    totalPrice += choosenFood.price * choosenFood.amount;
    mobileBasketContent.innerHTML += /*html*/`
      <li class="choosenFood">
          <span>${choosenFood.item}</span>
          <span>
            <div class="quantity">
              <button onclick="deleteItem(${indexBasket})" class="plus_minus_input">-</button> 
              ${choosenFood.amount} 
              <button class="plus_minus_input" onclick="increaseItemAmount(${indexBasket})">+</button>
            </div>
          </span>
        </li>`;}
  let deliveryFee = 2.00;
  let totalIncludDelivery = totalPrice + deliveryFee;
  let totalPriceDisplay = /*html*/`
    <div class="total-price">
      <p>Gesamtpreis (inkl. Lieferung): ${totalIncludDelivery.toFixed(2)} €</p>
    </div>`;
  let checkoutButton = /*html*/`
    <button class="checkout-btn" onclick="checkOut()">Zur Kasse</button>`;
  mobileBasketContent.innerHTML += totalPriceDisplay + checkoutButton;
}
