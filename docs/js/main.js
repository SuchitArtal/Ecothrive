document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email === 'abc@gmail.com' && password === 'abc@123') {
            window.location.href = 'products.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});