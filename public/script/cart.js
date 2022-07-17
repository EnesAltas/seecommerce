const shopcurrency = document.querySelector('meta[name=shopcurrency]').content

async function cartItems() {
    var items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
    var postcart = [];

    if(items.length === 0){
        var html = '<h1>You have no items in your cart</h1>'
        $('.cart-all-items').append(html);
    }

    items.forEach(async element => {
        postcart.push(element.id)
    });

    await validateCart(postcart)
}

cartItems()

async function validateCart(cart){
	var data = new FormData()
	if(cart){
		data.append('cart', JSON.stringify(cart))
		fetch(`/validatecart`, {
            method: 'POST',
            body: data,
        }).then((response) => response.json())
        .then((result) => {
            var subtotalel = document.getElementsByClassName('total-price-price')[0]
            var items = JSON.parse(result.Data)
            var litems = JSON.parse(localStorage.getItem('itemsInCart')) || [];
            var total = 0;

            items.forEach(async element => {

                total += litems.find(item => item.id === element.productid).quantity*element.productprice

                txt = "'data-value'"

                var img;

                if(element.productimages[0]){
                    img = element.productimages[0].image
                }else{
                    img = 'imagenotavailable.jpg'
                }

                var html =
                '<div class="item">'+
                    '<div class="delete-button" data-value="' + element.productid + '" onclick="removeItem(this,this.getAttribute('+`${txt}`+'))">X</div>'+
                    '<img width="100px" src="../public/img/'+img+'"/>'+
                    '<div class="product">' + element.producthead + '</div>'+
                    '<div class="price">' + element.productprice + shopcurrency +'</div>'+
                    '<div class="quantity">' + litems.find(item => item.id === element.productid).quantity + '</div>'+
                    '<div class="subtotal">' + litems.find(item => item.id === element.productid).quantity*element.productprice + shopcurrency +'</div>'+
                '</div>'
        
                $('.cart-all-items').append(html);
            });

            subtotalel.innerHTML = total+shopcurrency
            
        })
    }
}

var removeItem = async function(elem, id) {
    var totalprice = document.getElementsByClassName('total-price-price')[0];
    var total = Number(document.getElementsByClassName('total-price-price')[0].innerHTML.split(shopcurrency)[0])
    var price = Number(elem.parentElement.children[5].innerHTML.split(shopcurrency)[0])

    elem.parentNode.remove();

    var items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
    
    var item = items.find(item => item.id === id);

    total -= price

    totalprice.innerHTML = total+shopcurrency

    if(item){

        items.splice(items.findIndex(item => item.id === id),1);
    
    }

    await postCart(JSON.stringify(items));
  
    localStorage.setItem('itemsInCart', JSON.stringify(items));
}

async function postCart(items){
    var data = new FormData()
    if(items){
      data.append('items', items)
      fetch(`/cartupdate`, {
        method: 'POST',
        body: data,
      })
    }
  }

function searchBox(product){
  var resultbox = document.getElementsByClassName('results')[0]

  if(!product){
    resultbox.style.display = 'none'
    return;
  }

  var data = new FormData()

  data.append(`product`, product)
    
  fetch(`/search`, {
      method: 'POST',
      body: data,
  }).then((response) => response.json())
  .then((result) => {
      if(result.Data != 'Not Found'){
        var data = JSON.parse(result.Data)
        data.forEach(product => {
          resultbox.style.display = 'block'
          $('#result_output').empty();
          var html = `<a style="color:black; " href="/product/${product.url}"><li style="padding: 5px;">${product.producthead}<li></a>`
          $('#result_output').append(html);
        });
      }else{
        resultbox.style.display = 'block'
        $('#result_output').empty();
        var html = `<li>${result.Data}<li>`
        $('#result_output').append(html);
      }
  })
}