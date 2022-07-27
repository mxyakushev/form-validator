const form = document.querySelector('.form');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const confirmPassword = document.querySelector('.confirm-password');
const date = document.querySelector('.date');
const labels = document.querySelectorAll('.label-upper');
const errText = document.querySelectorAll('.error-text');

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const dateFormat = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{2}$/;
const inputArray = [firstName, lastName, email, password, confirmPassword, date];

form.addEventListener('submit', (e) => {
    let counter = 0;
    e.preventDefault();

    new Validator().isFirstName(firstName);
    new Validator().isLastName(lastName);
    new Validator().isEmail(email);
    new Validator().isPassword(password);
    new Validator().isConfirmPassword(confirmPassword);
    new Validator().isDate(date);

    inputArray.forEach(input => {
        if(input.parentElement.classList.contains('success')){
            counter++;
        }
    })

    if(counter == 6){
        form.submit();
    }
    
});

class Validator{
    isFirstName(input){
        if (input.value.trim() == '') {
            this.onError(input, 'First name cannot be blank');
        } else {
            this.onSuccess(input);
        }
    }

    isLastName(input){
        if (input.value.trim() == '') {
            this.onError(input, 'Last name cannot be blank');
        } else {
            this.onSuccess(input);
        }
    }

    isEmail(input){
        if (input.value.trim() == '') {
            this.onError(input, 'Email cannot be blank');
        } else if (!input.value.match(mailFormat)) {
            this.onError(input, 'Invalid email address');
        } else {
            this.onSuccess(input);
        }
    }

    isPassword(input){
        if (input.value == '') {
            this.onError(input, 'Password cannot be blank');
        } else if (input.value.length < 8) {
            this.onError(input, 'Minimum 8 characters');
        } else {
            this.onSuccess(input);
        }
    }

    isConfirmPassword(input){
        if (input.value == '') {
            this.onError(input, 'Password cannot be blank');
        } else if (confirmPassword.value.trim() != password.value.trim()) {
            this.onError(input, 'Passwords do not match');
        } else {
            this.onSuccess(input);
        }
    }

    isDate(input){
        if (input.value.trim() == '') {
            this.onError(input, 'Date cannot be blank');
        } else if (!input.value.match(dateFormat)) {
            this.onError(input, 'Invalid date');
        } else {
            this.onSuccess(input);
        }
    }

    onError(input, message) {
        const inputWrapper = input.parentElement;
        errText.forEach(el => {
        if (el.parentElement.contains(inputWrapper)) {
            el.innerText = message;
        }
        })
        inputWrapper.classList.remove('success');
        inputWrapper.classList.add('error');
    }

    onSuccess(input) {
        const inputWrapper = input.parentElement;
        inputWrapper.classList.remove('error');
        inputWrapper.classList.add('success');
    }
}