if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    // alert('Thank you for your purchase')
    // clear all items in the cart
    var cartItems = document.getElementsByClassName('cart-items')[0]
    // log the item names
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        console.log(cartItemNames[i].innerText)
    }
    // log the quantities
    var cartItemQuantity = cartItems.getElementsByClassName('cart-quantity-input')
    for (var j = 0; j < cartItemQuantity.length; j++){
        console.log(cartItemQuantity[j].value)
    }
    // total amount $
    var totalAmount = document.getElementsByClassName('cart-total-price')[0].innerText
    console.log(totalAmount)

    // get personal information
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    console.log(name)
    console.log(phone)
    console.log(address)
    
    //remove all cookies
    deleteAllCookies()
    // try set cookie
    for (var k = 0; k < cartItemNames.length; k++){
        var names = cartItemNames[k].innerText;
        var quats = cartItemQuantity[k].value;
        Cookies.set(names, quats)
    }
    Cookies.set('Total', totalAmount)
    Cookies.set('Name', name)
    Cookies.set('Address', address)
    Cookies.set('Phone', phone)

    document.getElementById('namevalue').innerText=name;
    document.getElementById('phonevalue').innerText=phone;
    document.getElementById('addressvalue').innerText=address;


    //set all the div with textbox values

    //pdf tryyyyyy plz work
    // var doc = new jsPDF();
    // var specialElementHandlers = {
    //     '#editor': function (element, renderer) {
    //        return true;
    //     }
    // };
    // ($('#purchase')).click(function () {
    //     doc.fromHTML($('#results').html(), 15, 15, {
    //         'width': 170,
    //             'elementHandlers': specialElementHandlers
    //     });
    //     doc.save('sample-file.pdf');
    // });

    var doc = new jsPDF('p', 'pt', 'a4', true);
    doc.fromHTML($('#results').get(0), 50, 50, {
      'width': 1000
    }, function (dispose) {
    doc.save('ordersummary.pdf');
    });
    // getPDF();


    // while (cartItems.hasChildNodes()) {
    //     cartItems.removeChild(cartItems.firstChild)
    // }
    // set total to zero
    // updateCartTotal()


}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    button.style.background = "#7FFF00"
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
            <div class="quantityvalue"> </div>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    //update the div quantityvalue to 1 when added to cart - for pdf
    cartRow.getElementsByClassName('quantityvalue')[0].innerText = 1
    alert('Item added to cart. :)')

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        //update the div quantityvalue to match the current quantity - for pdf 
        cartRow.getElementsByClassName('quantityvalue')[0].innerText = quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}






function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    }
}


//Create PDf from HTML...
function getPDF(){
 
    var HTML_Width = $(".html-content").width();
    var HTML_Height = $(".html-content").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    
    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    
    
    html2canvas($(".html-content")[0],{allowTaint:true}).then(function(canvas) {
    canvas.getContext('2d');
    
    console.log(canvas.height+"  "+canvas.width);
    
    
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
    
    
    for (var i = 1; i <= totalPDFPages; i++) { 
    pdf.addPage(PDF_Width, PDF_Height);
    pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
    }
    
        pdf.save("HTML-Document.pdf");
           });
    };