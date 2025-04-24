document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/cart');
    const data = await response.json();

    displayTable(data.cart);
});

function displayTable(cart) {
    const cartTableBody = document.querySelector('#cartTable tbody'); 
    cart.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <div id='item-${item.id}'>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
            <button onclick="minusCP(${item.id})">-</button> 
                ${item.quantity} 
            <button onclick="plusCP(${item.id})">+</button> 
            </td>
            <td><button onclick="deleteCP(${item.id})">삭제</button></td>
        </div>
        `
        cartTableBody.appendChild(row);
    })
}

function updateQuantity(id){

}

function minusCP(id){

}
function plusCP(id){

}

async function deleteCP(id){
    const response = await fetch(`/api/delCP/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
    });
    const idData = await response.json();
    console.log(idData);

    if(response.ok){
        const cartitem = document.getElementById(`item-${id}`);
        cartitem.parentElement.remove();s
    }
}