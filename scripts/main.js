
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
    if(localStorage.getItem('produtos_checados') !== null) {
        var readItens = (localStorage.getItem('produtos_checados') !== null)?JSON.parse(localStorage.getItem('produtos_checados')):false;
        var products = readItens['products'];
        var quantity = products[0].quantidade;
        var prodQty = document.querySelectorAll(".product-list .product div span");
        prodQty.forEach(function(el){
            el.innerText = quantity;
        });
        names = []
        products.forEach(function(el){
            names.push(el.item)
        });

        if(names.indexOf('React')<= -1) document.getElementById('react').remove();
        if(names.indexOf('Vue')<= -1) document.getElementById('vue').remove();
        if(names.indexOf('Angular')<= -1) document.getElementById('angular').remove();
    }else{
        if(localStorage.getItem('produtos_checados') === null) document.querySelector('.checkout-column.column1').remove();
        var noProducts = document.createElement("div");
        noProducts.className = "no-products-message";
        var conteudoDiv = document.createTextNode("Nenhum produto foi selecionado!");
        noProducts.appendChild(conteudoDiv);
        var divPai = document.querySelector(".checkout-container");
        divPai.appendChild(noProducts);
        var buttonText = document.querySelector('#button');
        buttonText.innerText = 'voltar';
    }

    
}