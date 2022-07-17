function onChange() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=confirm_password]');
            if(confirm.value === password.value){
              confirm.setCustomValidity('');
            }
            else{
              confirm.setCustomValidity('Şifreler Uyuşmuyor!');
            }
    }