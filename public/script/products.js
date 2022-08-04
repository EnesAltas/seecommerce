const leftMenuButton = document.getElementsByClassName('opener')[0]
const leftMenu = document.getElementsByClassName('left-menu')[0]
const sideKeeper = document.getElementsByClassName('side-keeper')[0]
const main = document.getElementsByClassName('main')[0]
const productsButton = document.getElementById('products')
const addProduct = document.getElementById('addProduct')
var space = document.getElementsByClassName('side-keeper')[0];

leftMenuButton.addEventListener('click', async () => {
  if(leftMenuButton.style.left === '200px'){
    leftMenuButton.style.left = '0px'
  }else{
    leftMenuButton.style.left = '200px'
    leftMenuButton.style.zIndex = "2";
  }
  leftMenu.classList.toggle('active')
})

addProduct.addEventListener('click', () => {
  var addnewel = document.getElementsByClassName('product')[0]

  if(addnewel.classList.length == 1){
    addnewel.classList.add('addNew');
  }else{
    addnewel.classList.remove('addNew');
  }

})

const imgInp = document.getElementById('imgInp')

imgInp.onchange = event => {
  $('.image-preview').empty()

  for (let i = 0; i < imgInp.files.length; i++) {
      var nfile = imgInp.files[i]
      if (nfile) {
        var html = '<img style="margin-right: 10px;" width="150px" height="200px" src=' + '"' + `${URL.createObjectURL(nfile)}`+ '"' + '>'
        $('.image-preview').append(html);
      }
  }

}

var ncategory = document.getElementById('ncategory');

ncategory.addEventListener("change", function(event){
  if(event.target.value == 'new' ){
    document.getElementById('cancel').style.display = 'inline'
    document.getElementById('ncategoryi').style.display = 'inline'
    ncategory.style.display = "none";
  }
})

function test(test){
  var queryi = 'input[data-value='+'"'+test.getAttribute('data-value')+'"'+']'
  var queryb = 'button[data-value='+'"'+test.getAttribute('data-value')+'"'+']'
  var querys = 'select[data-value='+'"'+test.getAttribute('data-value')+'"'+']'
  if(test.value == 'new'){
    document.querySelectorAll(queryi)[1].style.display = ''
    document.querySelector(queryb).style.display = 'inline'
    document.querySelector(querys).style.display = 'none'
  }
}

function cancel(){
  document.getElementById('cancel').style.display = 'none'
  document.getElementById('ncategoryi').style.display = 'none'
  ncategory.style.display = "";
}

function cancelp(data){
  var queryi = 'input[data-value='+'"'+data+'"'+']'
  var queryb = 'button[data-value='+'"'+data+'"'+']'
  var querys = 'select[data-value='+'"'+data+'"'+']'
  document.querySelectorAll(queryi)[1].style.display = 'none'
  document.querySelector(queryb).style.display = 'none'
  document.querySelector(querys).style.display = ''
  document.querySelector(querys).value = ''
}

function createProduct(){
  var pfile = imgInp.files;
  var nhead = document.getElementById('nhead').value;
  var nprice = document.getElementById('nprice').value;
  var nstock = document.getElementById('nstock').value;
  var ndiscount = document.getElementById('ndiscount').value;
  var ninfo = document.getElementById('ninfo').value;
  var ncategory;

  if(document.getElementById('cancel').style.display === 'inline'){
    ncategory = document.getElementById('ncategoryi').value;
  }else{
    ncategory = document.getElementById('ncategory').value;
  }

    var data = new FormData()
    if(pfile.length !== 0 && nhead && nprice && nstock && ninfo && ncategory && ndiscount){
      for (let i = 0; i < imgInp.files.length; i++) {
        var nfile = imgInp.files[i]
        if (nfile) {
          data.append(`img${i}`, nfile)
        }
      }
      data.append('nhead', nhead)
      data.append('nprice', nprice)
      data.append('nstock', nstock)
      data.append('ndiscount', ndiscount)
      data.append('ninfo', ninfo)
      data.append('ncategory', ncategory)
      fetch(`/createproduct`, {
        method: 'POST',
        body: data,
      }).then((response) => response.json())
      .then((result) => {
          if(result.Status === 'OK'){
            window.location.reload()
          }
      })
    }else{
      alert('Missing entry!')
    }
}

function deleteProduct(productId){
    var data = new FormData()
    if(confirm('Are you sure you want to delete this product ?')){
      if(productId){
        data.append('productid', productId)
        fetch(`/deleteproduct`, {
          method: 'POST',
          body: data,
        }).then((response) => response.json())
        .then((result) => {
            if(result.Status === 'OK'){
              window.location.reload()
            }
        })
      }else{
        alert('Missing entry!')
      }
    }
}

function productImageDelete(image){
  var data = new FormData()
  if(confirm('Are you sure you want to delete this product image ?')){
    if(image){
      data.append('image', image)
      fetch(`/deleteproductimage`, {
        method: 'POST',
        body: data,
      }).then((response) => response.json())
      .then((result) => {
          if(result.Status === 'OK'){
            window.location.reload()
          }
      })
    }else{
      alert('Missing entry!')
    }
  }
}

function imageData(event){
  var querys = event.getAttribute('data-value')
  for (let i = 0; i < event.files.length; i++) {
    var nfile = event.files[i]
    if (nfile) {
      var html = '<img style="margin-right:10px; width: 100px; height: 100px;" src=' + '"' + `${URL.createObjectURL(nfile)}`+ '"' + '>'
      $('#'+querys).append(html);
    }
  }
  productImageUpdate(event.getAttribute('data-value'),event)
}

function productImageUpdate(id,event){
  if(confirm('Are you sure you want to update your shop banners ? (If you accept, the pictures will be added automatically by the system without pressing the save changes button)')){
    
    var data = new FormData()

    for (let i = 0; i < event.files.length; i++) {
      var nfile = event.files[i]
      if (nfile) {
        data.append(`banner${i}`, nfile)
      }
    }

    data.append(`productid`, id)
    
    fetch(`/productimageupdate`, {
        method: 'POST',
        body: data,
    }).then((response) => response.json())
    .then((result) => {
        if(result.Status === 'OK'){
          window.location.reload()
        }
    })
  }
}

function saveChanges(productId){
    var selector = document.querySelectorAll("[data-value^="+`'${productId}'`+"]")
    var nhead = selector[1].value
    var nprice = selector[2].value
    var nstock = selector[3].value
    var ndiscount = selector[4].value
    var ninfo = selector[7].value
    var ncategory;

    if(selector[5].style.display == 'none'){
      ncategory = selector[4].value
    }else{
      ncategory = selector[5].value
    }
    console.log(ncategory)
    var data = new FormData()
    if(confirm('Are you sure you want to update this product ?')){
      if(productId){
        data.append('productid', productId)
        data.append('nhead', nhead)
        data.append('nprice', nprice)
        data.append('nstock', nstock)
        data.append('ndiscount', ndiscount)
        data.append('ninfo', ninfo)
        data.append('ncategory',ncategory)
        fetch(`/updateproduct`, {
          method: 'POST',
          body: data,
        }).then((response) => response.json())
        .then((result) => {
            if(result.Status === 'OK'){
              window.location.reload()
            }
        })
      }else{
        alert('Missing entry!')
      }
    }
}

function search(){
  var input, filter, products, product, a, i
  input = document.getElementById("productsearch");
  filter = input.value.toUpperCase();
  products = document.getElementById("productsholder");
  product = products.getElementsByClassName("product");
  for (i = 1; i < product.length; i++) {
      a = product[i].children[1].children[0].children[1].value
      if (a.toUpperCase().indexOf(filter) > -1) {
        product[i].style.display = "";
      } else {
        product[i].style.display = "none";
      }
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


