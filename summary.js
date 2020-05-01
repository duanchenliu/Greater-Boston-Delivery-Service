var received = Cookies.get()
console.log(received)

var name = Cookies.get('Name')
console.log(name)

var address = Cookies.get('Address')
console.log(address)

var phone = Cookies.get('Phone')
console.log(phone)

var totalprice = Cookies.get('Total')
console.log(totalprice)

var totalNumProducts = length(received) - 4
console.log(totalNumProducts)

var tableholder = document.getElementById("table");
var k = 1;

//add product to the table
for(i in received){
    // console.log(i)
    if(i !== 'Name' && i !== 'Phone' && i !== 'Total' && i !== 'Address'){
        console.log(typeof(i))
        // var eachProduct = document.createElement("TR");
        // eachProduct.setAttribute("id", "line"+k);
        // tableholder.appendChild(eachProduct);

        // var productName = document.createElement("TH");
        // document.getElementById("line"+k).appendChild(productName);
        // productName.setAttribute("id", i);
        // productName.innerText = i;

        // var quantity = document.createElement("TH");
        // document.getElementById("line"+k).appendChild(quantity);
        // // console.log(received.i);
        // quantity.setAttribute("id", received[i]);
        // quantity.innerText = received[i];



         // Insert a row at the end of the table
        let newRow = tableholder.insertRow(-1);

        // Insert a cell in the row at index 0
        let newCell1 = newRow.insertCell(0);
        newCell1.innerText = i;
        let newCell2 = newRow.insertCell(1);
        newCell2.innerText = received[i];
        k++;
    }
}











function length(obj) {
    return Object.keys(obj).length;
}



