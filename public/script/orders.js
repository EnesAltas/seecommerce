const leftMenuButton = document.getElementsByClassName('opener')[0]
const leftMenu = document.getElementsByClassName('left-menu')[0]
const sideKeeper = document.getElementsByClassName('side-keeper')[0]
const main = document.getElementsByClassName('main')[0]
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
