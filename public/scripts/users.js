// Client facing scripts here
// jQuery for ajax method -login form
$('#login-form').on('submit', function(e) {
  e.preventDefault();

  const email = $('#email-input').val();
  const password = $('#password-input').val();

  $.ajax({
    url: '/login',
    method: 'POST',
    data: {
      email: email,
      password: password
    },
    success: function(response) {
      window.location.href = '/';
    },
    error: function(xhr, status, error) {
      $('#error-message').text(xhr.responseText);
    }
  });
});

// jQuery for ajax method -signup form
$('#signup-form').on('submit', function(e) {
  e.preventDefault();

  const firstName = $('#first-name-input').val();
  const lastName = $('#last-name-input').val();
  const phoneNumber = $('#phone-number-input').val();
  const email = $('#email-input').val();
  const password = $('#password-input').val();
  const city = $('#city-input').val();
  const address = $('#address-input').val();
  const postalCode = $('#postal-code-input').val();

  $.ajax({
    url: '/signup',
    method: 'POST',
    data: {
      first_name: firstName,
      last_name: lastName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      city: city,
      address: address,
      postal_code: postalCode
    },
    success: function(response) {
      window.location.href = '/';
    },
    error: function(xhr, status, error) {
      $('#error-message').text(xhr.responseText);
    }
  });
});