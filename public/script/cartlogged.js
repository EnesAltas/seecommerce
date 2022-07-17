const shopcurrency = document.querySelector('meta[name=shopcurrency]').content

var removeItem = async function(elem, id) {
    var totalprice = document.getElementsByClassName('total-price-price')[0];
    var total = Number(document.getElementsByClassName('total-price-price')[0].innerHTML.split(shopcurrency)[0])
    var price = Number(elem.parentElement.children[5].innerHTML.split(shopcurrency)[0])

    elem.parentNode.remove();

    var items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
    
    var item = items.find(item => item.id === id);

    total -= price

    console.log(price)
    totalprice.innerHTML = total+''+shopcurrency

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
        $('#result_output').empty();
        data.forEach(product => {
          resultbox.style.display = 'block'
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
