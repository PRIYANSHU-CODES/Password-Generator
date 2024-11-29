const passwordLengthSlider = document.getElementById('password-length-slider');
const passwordLengthValue = document.getElementById('password-length-value');
const uppercaseLetters = document.getElementById('uppercase-letters');
const lowercaseLetters = document.getElementById('lowercase-letters');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateButton = document.getElementById('generate-password');
const passwordOutput = document.getElementById('password-output');
const copyButton = document.getElementById('copy-password');
const passwordStrengthIndicator = document.getElementById('password-strength-indicator');

// Ensure no checkbox is checked by default
uppercaseLetters.checked = false;
lowercaseLetters.checked = false;
numbers.checked = false;
symbols.checked = false;

function generatePassword() {
    const length = passwordLengthSlider.value;
    const charSet = (uppercaseLetters.checked ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
        (lowercaseLetters.checked ? 'abcdefghijklmnopqrstuvwxyz' : '') +
        (numbers.checked ? '0123456789' : '') +
        (symbols.checked ? '!@#$%^&*()_+~`|}{[]\\:;?><,./-=' : '');

    if (charSet === '') {
        alert('Please select at least one character set!');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    passwordOutput.value = password;
    updatePasswordStrength(password);
}

function updatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

    passwordStrengthIndicator.className = `password-strength-indicator password-strength-${strength}`;
}

// Event listener for the generate button
generateButton.addEventListener('click', generatePassword);

// Event listener for the copy button
copyButton.addEventListener('click', () => {
    passwordOutput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});

// Event listener for the slider, only updates the displayed value
passwordLengthSlider.addEventListener('input', () => {
    const length = passwordLengthSlider.value;
    passwordLengthValue.textContent = length;
});

// Set the initial slider value display
passwordLengthValue.textContent = passwordLengthSlider.value;
