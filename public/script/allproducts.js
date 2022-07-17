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
