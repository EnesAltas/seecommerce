const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

var space = document.getElementsByClassName('main')[0];
function changeStyle() {
  if(space.style.paddingTop === '160px') {
    space.style.paddingTop = '45px';
  } else {
    space.style.paddingTop = '160px'
  }
}

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
  changeStyle()
})

const username = document.querySelector('input[name=user_name]');

function namewriter(value){
    username.value = value;
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