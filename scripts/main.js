
function updateInputValue() {
    var qty = document.querySelector('#input-qty');
    qty.addEventListener('input', ()=> {
        var newValue = qty.valueAsNumber;
        if(newValue > 999) {
            qty.setAttribute('value',String(999));
            qty.value = '999';
        }else if(newValue < 1 ) {
            qty.setAttribute('value',String(1));
            qty.value = '1';
        }else{
            qty.setAttribute('value',String(newValue));
        }

        if(qty.value === '') {
            qty.setAttribute('value',String(1));
            qty.value = '1';
        }
    });
}

function increaseQuantity() {
    var qty = document.querySelector('#input-qty');
    if(qty.valueAsNumber < 999) {
        qty.setAttribute('value',String(qty.valueAsNumber+=1));
    } 
}


function decreaseQuantity() {
    var qty = document.querySelector('#input-qty');
    if(qty.valueAsNumber > 1 && qty.valueAsNumber <= 999) {
        qty.setAttribute('value',String(qty.valueAsNumber-=1));
    } 
}

function createItensObject() {
    var items = {};
    var products = [];
    var item = (document.querySelectorAll(".checkbox-item input:checked").length > 0)?document.querySelectorAll(".checkbox-item input:checked"):false;

    if(item)item.forEach(function(el) {
        var name = el.parentNode.innerText;
        var qty = parseInt(document.querySelector("#input-qty").value);
        var text = document.querySelector("#input-text").value;

        products.push({'item':name,'quantidade':qty,'comentarios':text});
        items['products'] = products;
    });

    if(items['products'] !== undefined)localStorage.setItem('produtos_checados',JSON.stringify(items));
    else localStorage.removeItem('produtos_checados');
}



function readItensObject() {
    var readItens = (localStorage.getItem('produtos_checados') !== null)?JSON.parse(localStorage.getItem('produtos_checados')):false;
    var products = readItens['products'];
    var quantity = products[0].quantidade;
    var prodQty = document.querySelectorAll(".product-list .product div span");
    prodQty.forEach(function(el){
        el.innerText = quantity;
    });
}