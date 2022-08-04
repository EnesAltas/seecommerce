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

var inputdate = document.querySelector('input[name=event-date]');
var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('.')[0].slice(0,-3)

inputdate.setAttribute("min", localISOTime)
if(inputdate.value.length == 0){
  inputdate.value = localISOTime
}

inputdate.addEventListener('input', () =>{
  var selectedDate = new Date(document.getElementById("eventdate").value).getTime()
  var nowDate = new Date(localISOTime).getTime()
  if(selectedDate < nowDate){
    alert('Invalid Date Time')
    inputdate.value = localISOTime
  }
})

var checker = document.getElementById('all')

checker.addEventListener('change', (event) =>{
  if(event.currentTarget.checked){
    document.getElementsByClassName('event-products')[0].style.display = 'none'
    var products = document.querySelectorAll('input[type="checkbox"]:checked')
    products.forEach(product => {
      if(product.name != 'all'){
        product.checked = false
      }
    });
  }else{
    document.getElementsByClassName('event-products')[0].style.display = ''
  }
})

function createEvents(){
  var eventhead = document.getElementById('eventhead').value
  var eventdescription = document.getElementById('eventdescription').value
  var eventdiscount = document.getElementById('eventdiscount').value
  var eventdate = document.getElementById('eventdate').value
  var allproducts = document.getElementById('all').checked
  var products = document.querySelectorAll('input[type="checkbox"]:checked')

  var data = new FormData()

  if(eventhead&&eventdescription&&eventdiscount&&eventdate){
    if(allproducts){
      data.append('itemall', 'all')
    }else{
      products.forEach(product => {
        if(product.name != 'all'){
          data.append("products", product.name)
        }
      });
    }

    data.append('eventhead',eventhead)
    data.append('eventdescription',eventdescription)
    data.append('eventdiscount',eventdiscount)
    data.append('eventdate',eventdate)

    fetch(`/createevent`, {
      method: 'POST',
      body: data,
    }).then((response) => response.json())
    .then((result) => {
      if(result.Status == 'OK'){
        location.reload()
      }
    })
  }else{
    alert('Missing Entry')
  }
}

function deleteEvents(){
  fetch(`/deleteevent`, {
    method: 'POST'
  }).then((response) => response.json())
  .then((result) => {
    if(result.Status == 'OK'){
      location.reload()
    }
  })
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
