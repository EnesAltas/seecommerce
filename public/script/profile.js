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

const saveButton = document.getElementsByClassName('save-button')[0];

saveButton.addEventListener('click',() =>{
  var userid = document.getElementsByTagName('meta')[0].content;
  var oldpassword = document.getElementsByName("oldpassword")[0].value;
  var password = document.getElementsByName("newpassword")[0].value;
  var confirmation = document.getElementsByName("repassword")[0].value;
  if(!oldpassword,!password,!confirmation){
    document.getElementById("notify").innerHTML="Kaydedilecek bir şey yok!";
    document.getElementsByClassName("notify-keep")[0].style.display= "flex";
  }
  if(oldpassword,password,confirmation){
    changePass(oldpassword,password,confirmation);
  }
})

function changePass(oldpassword,password,confirmation){
	var data = new FormData()
	if(oldpassword,password,confirmation){
		data.append('oldpassword', oldpassword)
		data.append('password', password)
    data.append('confirmation', confirmation)
		fetch(`/userchangepass`, {
        method: 'POST',
		    body: data,
	}).then((response) => response.json())
  .then((result) => {
  document.getElementById("notify").innerHTML=result.Success;
  document.getElementsByClassName("notify-keep")[0].style.display= "flex";
    if(result.Reload === "True"){
      setTimeout(function(){
        location.reload();
      }, 3500);
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
