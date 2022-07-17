var swiper = new Swiper(".swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

var addNewItem = async function(id, quantity, price) {

  var items = JSON.parse(localStorage.getItem('itemsInCart')) || [];

  var item = items.find(item => item.id === id);

  if (item) {
    item.quantity += Number(quantity);
  } else {
    items.push({
      id,
      quantity
    })
  }

  await postCart(JSON.stringify(items));
  
  localStorage.setItem('itemsInCart', JSON.stringify(items));

}

function updateCart(test){
  var qty = document.getElementById('qty').value;
  addNewItem(test,Number(qty))
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