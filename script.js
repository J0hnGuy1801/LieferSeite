function init() {
    return renderMenue();
}

function increaseItemAmount(indexCart) {
    if (cart[indexCart].amount < 10) {
        cart[indexCart].amount++;
        renderCart();
        updateCart();
    } else {
        alert('Maximale Anzahl des selben Artikel erreicht');
    }
    renderCart();
    renderCartContent();
    updateCart();
}

function deleteItem(indexCart) {
    if (cart[indexCart].amount > 1) {
        cart[indexCart].amount--;
    }
    else {
        cart.splice(indexCart, 1);
    }
    renderCart();
    renderCartContent();
    updateCart();
}

function addToCart(indexDishes) {
    let choosenFood = dishes[indexDishes];
    let cartIndex = cart.findIndex(item => item.item === choosenFood.item);
    if (cartIndex !== -1) {
        if (cart[cartIndex].amount < 10) {
            cart[cartIndex].amount++;
        } else {
            alert('Maximale Anzahl des selben Artikel erreicht');
        }
    }
    else {
        choosenFood.amount = 1;
        cart.push(choosenFood);
    }
    renderCart();
    updateCart();
    renderCartContent();
}

function calculatePrice(cart) {
    let totalPrice = 0;
    for (let indexCart = 0; indexCart < cart.length; indexCart++) {
        totalPrice += cart[indexCart].price * cart[indexCart].amount
    }
    return totalPrice;
}

function checkOut() {
    const popUpBg = document.getElementById('popUp-bg');
    const popUpDial = document.getElementById('popUp-dial');
    if (cart.length > 0) {
        popUpBg.classList.remove('d-none');
        popUpDial.classList.remove('d-none');
        popUpBg.onclick = function (event) {
            if (event.target === popUpBg) {
                closeDial();
            }
        };
    } else {
        alert('Legen Sie bitte Artikel in den Warenkorb');
        closeDial();
    }
    resetCart();
}

function closeDial() {
    const popUpBg = document.getElementById('popUp-bg');
    const popUpDial = document.getElementById('popUp-dial');
    popUpBg.classList.add('d-none');
    popUpDial.classList.add('d-none');
}

function toggleMobileCartPopup() {
    let mobileBasketContent = document.getElementById('popUpBasket');
    mobileBasketContent.classList.toggle('d-none-mobile');
}

function renderMobileCart() {
    renderCartContent();
    toggleMobileCartPopup();
}

function resetCart() {
    cart = [];
    renderCart();
    renderCartContent();
}

