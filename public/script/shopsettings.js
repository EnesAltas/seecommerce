const leftMenuButton = document.getElementsByClassName('opener')[0]
const leftMenu = document.getElementsByClassName('left-menu')[0]

leftMenuButton.addEventListener('click', async () => {
  if(leftMenuButton.style.left === '200px'){
    leftMenuButton.style.left = '0px'
  }else{
    leftMenuButton.style.left = '200px'
    leftMenuButton.style.zIndex = "2";
  }
  leftMenu.classList.toggle('active')
})

const imgInp = document.getElementById('shopthumbnail')

imgInp.onchange = event => {
  $('.shop-thumbnails').empty()
      var nfile = imgInp.files[0]
      if (nfile) {
        var html = '<img style="margin-right: 10px;" width="150px" height="150px" src=' + '"' + `${URL.createObjectURL(nfile)}`+ '"' + '>'
        $('.shop-thumbnails').append(html);
      }
}

const imgInp2 = document.getElementById('shopbannerimages')

imgInp2.onchange = async event => {
  for (let i = 0; i < imgInp2.files.length; i++) {
      var nfile = imgInp2.files[i]
      if (nfile) {
        var html = '<img style="margin-right:10px; width: 200px; height: 100px;" src=' + '"' + `${URL.createObjectURL(nfile)}`+ '"' + '>'
        $('.shop-banners').append(html);
      }
  }
  updateBanner()
}

function saveChanges(){
  var shopname = document.getElementById('shopname').value
  var shopdomain = document.getElementById('shopdomain').value
  var shopmail = document.getElementById('shopmail').value
  var shopphone = document.getElementById('shopphone').value
  var shopcurrency = document.getElementById('shopcurrency').value
  var shopabout = document.getElementById('shopabout').value
  var shopthumbnail = document.getElementById('shopthumbnail').files[0]
	
  var data = new FormData()
  data.append('control', false)
	data.append('shopname', shopname)
  data.append('shopdomain', shopdomain)
  data.append('shopmail', shopmail)
  data.append('shopphone', shopphone)
  data.append('shopcurrency', shopcurrency)
  data.append('shopabout', shopabout)
  if(shopthumbnail){
    data.append('shopthumbnail', shopthumbnail)
  }

	fetch(`/shopsettings`, {
      method: 'POST',
	    body: data,
  }).then((response) => response.json())
  .then((result) => {
      if(result.Status === 'OK'){
        window.location.reload()
      }
  })
}

function deleteBanner(id){  
  if(confirm('Are you sure you want to update your shop banners ? (If you accept, the pictures will be removed automatically by the system without pressing the save changes button)')){
    var data = new FormData()
    data.append('control', 'bannerRemove')
    data.append('bannerid', id)

    fetch(`/shopsettings`, {
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

function updateBanner(){  
  if(confirm('Are you sure you want to update your shop banners ? (If you accept, the pictures will be added automatically by the system without pressing the save changes button)')){
    
    var data = new FormData()

    for (let i = 0; i < imgInp2.files.length; i++) {
      var nfile = imgInp2.files[i]
      if (nfile) {
        data.append(`banner${i}`, nfile)
      }
    }
    
    data.append('control', 'bannerAdd')
    
    fetch(`/shopsettings`, {
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

