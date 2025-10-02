document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registerForm');
    const nameInput = form.elements['name'];
    const passInput = form.elements['pass'];
    const cpassInput = form.elements['cpass'];

    function validateName() {
        const name = nameInput.value.trim();
        if (name === "") {
            document.getElementById('nameError').textContent = "Il nome non può essere vuoto.";
            return false;
        }
        document.getElementById('nameError').textContent = "";
        return true;
    }

    function validatePassword() {
        const password = passInput.value.trim();
        const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        if (!passwordRegex.test(password)) {
            document.getElementById('passError').textContent = "La password deve contenere almeno 8 caratteri, un numero, una maiuscola e un carattere speciale.";
            return false;
        }
        document.getElementById('passError').textContent = "";
        return true;
    }

    function validateConfirmPassword() {
        const password = passInput.value.trim();
        const confirmPassword = cpassInput.value.trim();
        if (password !== confirmPassword) {
            document.getElementById('cpassError').textContent = "Le password non coincidono.";
            return false;
        }
        document.getElementById('cpassError').textContent = "";
        return true;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const isNameValid = validateName();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isNameValid && isPasswordValid && isConfirmPasswordValid) {
            form.submit();
        }
    });
 
    nameInput.addEventListener('input', validateName);
    passInput.addEventListener('input', validatePassword);
    cpassInput.addEventListener('input', validateConfirmPassword);
});

