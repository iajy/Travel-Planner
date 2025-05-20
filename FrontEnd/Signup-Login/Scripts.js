let generatedOtp = null;
let otpSentTo = null;

document.getElementById('sendOtpBtn').addEventListener('click', () => {
  const emailField = document.getElementById('registerEmail');
  const email = emailField.value.trim();
  if (!email) {
    alert('Please enter your email to receive OTP');
    emailField.focus();
    return;
  }
  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  otpSentTo = email;
  alert(`OTP sent to ${email}: ${generatedOtp} (simulation)`);

  document.getElementById('otpInputSection').style.display = 'block';
  document.getElementById('sendOtpBtn').disabled = true;
  document.getElementById('registerPassword').disabled = false;
  document.getElementById('registerConfirmPassword').disabled = false;
  document.getElementById('registerSubmitBtn').disabled = false;
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = e.target.registerName.value.trim();
  const email = e.target.registerEmail.value.trim();
  const otpInput = document.getElementById('otpInput').value.trim();
  const password = e.target.registerPassword.value;
  const confirmPassword = e.target.registerConfirmPassword.value;

  if (!name || !email || !otpInput || !password || !confirmPassword) {
    alert('Please fill in all fields and verify OTP first');
    return;
  }
  if (otpInput !== generatedOtp) {
    alert('Invalid OTP. Please check your email OTP and try again.');
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }
  alert(`Registration successful for ${name} with email ${email}`);
});
