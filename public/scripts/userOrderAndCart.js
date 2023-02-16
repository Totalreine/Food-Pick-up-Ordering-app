// get dish
$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "/dishes",
    success: function(response) {
      console.log(response); 
    },
    error: function(xhr, status, error) {
      console.error(error); 
    }
  });
});

// get dishes by id

$(document).ready(function() {
  $('#form-id').submit(function(event) {
    event.preventDefault();
    
    var formData = $(this).serialize();
    var dishId = $('#dish-id').val();
    
    $.ajax({
      type: 'POST',
      url: `/dishes/${dishId}`,
      data: formData,
      success: function(response) {
        console.log('Form submitted successfully');
        console.log(response);
      },
      error: function(error) {
        console.error('Error submitting form');
        console.error(error);
      }
    });
  });
});

// get cart

$(document).ready(function() {
  $('#form-id').submit(function(event) {
    event.preventDefault();
    
    var formData = $(this).serialize();
    
    $.ajax({
      type: 'POST',
      url: '/carts',
      data: formData,
      success: function(response) {
        console.log('Form submitted successfully');
        console.log(response);
      },
      error: function(error) {
        console.error('Error submitting form');
        console.error(error);
      }
    });
  });
});

// get carts

$(document).ready(function() {
  $('#form-id').submit(function(event) {
    event.preventDefault();
    
    var formData = $(this).serialize();
    var id = $('#cart-id').val(); 
    
    $.ajax({
      type: 'POST',
      url: `/carts/${id}`,
      data: formData,
      success: function(response) {
        console.log('Form submitted successfully');
        console.log(response);
      },
      error: function(error) {
        console.error('Error submitting form');
        console.error(error);
      }
    });
  });
});

// add cart item

$(document).ready(function() {
  $('#form-id').submit(function(event) {
    event.preventDefault();
    
    var formData = $(this).serialize();
    var id = $('#cart-id').val(); 
    
    $.ajax({
      type: 'POST',
      url: `/carts/${id}`,
      data: formData,
      success: function(response) {
        console.log('Form submitted successfully');
        console.log(response);
      },
      error: function(error) {
        console.error('Error submitting form');
        console.error(error);
      }
    });
  });
});

// delete cart

$(document).ready(function() {
  $('#form-id').submit(function(event) {
    event.preventDefault();
    
    var id = $('#cart-id').val();
    
    $.ajax({
      type: 'POST',
      url: `/carts/${id}`,
      success: function(response) {
        console.log('Cart deleted successfully');
        console.log(response);
      },
      error: function(error) {
        console.error('Error deleting cart');
        console.error(error);
      }
    });
  });
});

// checkout feature 

$(document).ready(function() {
  $('#myForm').submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: '/checkout',
      type: 'POST',
      data: $('#myForm').serialize(),
      success: function(response) {
        console.log(response);
      },
      error: function(xhr) {
        console.error(error);
      }
    });
  });
});

// get order

$(document).ready(function() {
  $.ajax({
    url: '/orders',
    type: 'GET',
    success: function(response) {
      console.log(response);
    },
    error: function(error) {
      console.error(error);
    }
  });
});

// get orders 

$(document).ready(function() {
  $('#order-form').submit(function(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/orders',
      data: $(this).serialize(),
      success: function(data) {
        console.log(response);
      },
      error: function(error) {
        console.error(error);
      }
    });
  });
});

// post to cart 

$(document).ready(function() {
  $('#cart-form').submit(function(event) {
    event.preventDefault();

    const customer_id = $('#customer-id').val();
    const cart_total_price = $('#cart-total-price').val();
    const created_at = $('#created-at').val();

    $.ajax({
      method: 'POST',
      url: '/carts',
      data: { customer_id, cart_total_price, created_at },
      success: function(response) {
        console.log(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  });
});

// post to order
$(document).ready(function() {
  $('#order-form').submit(function(event) {
    event.preventDefault(); 
    
    const formData = {
      customer_id: $('input[name="customer_id"]').val(),
      order_total_price: $('input[name="order_total_price"]').val(),
      cart: $('input[name="cart"]').val(),
      time_est: $('input[name="time_est"]').val()
    };
    
    $.ajax({
      type: 'POST',
      url: '/orders',
      data: JSON.stringify(formData),
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
      },
      error: function(error) {
        console.error(error);
      }
    });
  });
});

$(document).ready(function() {
  $('#get-orders-form').submit(function(event) {
    event.preventDefault();
    const orderId = $('#order-id').val();
    $.ajax({
      type: 'GET',
      url: `/orders/${orderId}`,
      success: function(data) {
        console.log(data);
      },
      error: function(error) {
        console.error(error);
      }
    });
  });
});




