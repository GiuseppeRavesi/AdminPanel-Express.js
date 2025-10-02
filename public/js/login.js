document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const name = document.querySelector('input[name="name"]');
    const pass = document.querySelector('input[name="pass"]');

    form.addEventListener('input', (event) => {
        validateField(event.target);
    });

    form.addEventListener('submit', function(event) {
        let isValid = true;
        isValid &= validateField(name);
        isValid &= validateField(pass);

        if (!isValid) {
            event.preventDefault();
        }
    });

    function validateField(field) {
        let isValid = true;
        switch (field.name) {
            case 'name':
                if (field.value.trim() === '') {
                    isValid = false;
                    document.getElementById('nameError').textContent = "campo obbligatorio";
                }else{
                    document.getElementById('nameError').textContent = "";
                }
                break;
            case 'pass':
                if (field.value.trim() === '') {
                    isValid = false;
                    document.getElementById('passError').textContent = "campo obbligatorio";                
                }else{
                    document.getElementById('passError').textContent = "";
                }
                break;
        }

        return isValid;
    }

});

document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});