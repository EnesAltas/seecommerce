var items = JSON.parse(localStorage.getItem('itemsInCart')) || [];

var item = document.getElementById('items')

item.value = JSON.stringify(items)