// Get all dishes
$.ajax({
  type: 'GET',
  url: '/get-dishes',
  success: function(data) {
    // handle success response
    console.log(data);
  },
  error: function(xhr, status, error) {
    // handle error response
    console.log(xhr.responseText);
  }
});

// Get a single dish
$.ajax({
  type: 'GET',
  url: '/get-dish/' + dishId,
  success: function(data) {
    // handle success response
    console.log(data);
  },
  error: function(xhr, status, error) {
    // handle error response
    console.log(xhr.responseText);
  }
});


// Add a new dish
$('#add-dish-form').submit(function(event) {
  event.preventDefault(); // prevent default form submission
  
  const id = parseInt(req.params.id);
  const formData = {
    restaurant_id: id,
    name: $('#name').val(),
    description: $('#description').val(),
    price: $('#price').val(),
    food_category: $('#food_category').val(),
    vegan: $('#vegan').is(':checked'),
    gluten_free: $('#gluten_free').is(':checked'),
    picture_url: $('#picture_url').val(),
    rating: $('#rating').val()
  };
  
  $.ajax({
    type: 'POST',
    url: '/add-dish',
    data: JSON.stringify(formData),
    contentType: 'application/json',
    success: function(data) {
      // handle success response
      console.log(data);
    },
    error: function(xhr, status, error) {
      // handle error response
      console.log(xhr.responseText);
    }
  });
});


// get add dish

$(document).ready(function() {
  $("#addDishForm").submit(function(e) {
    e.preventDefault(); // Prevent form from submitting normally
    var form_data = $(this).serialize(); // Serialize form data
    var id = parseInt($("#restaurantId").val()); // Get restaurant ID from a form input field
    form_data += "&id=" + id; // Append restaurant ID to the form data

    $.ajax({
      type: "POST",
      url: "/add-dish",
      data: form_data,
      success: function(response) {
        console.log(response); // Handle success response
      },
      error: function(xhr, status, error) {
        console.error(error); // Handle error response
      }
    });
  });
});

// get edit dishes

$(document).ready(function() {
  $("#editDishForm").submit(function(e) {
    e.preventDefault(); // Prevent form from submitting normally
    var form_data = $(this).serialize(); // Serialize form data
    var id = parseInt($("#dishId").val()); // Get dish ID from a form input field
    form_data += "&id=" + id; // Append dish ID to the form data

    $.ajax({
      type: "POST",
      url: "/edit-dish",
      data: form_data,
      success: function(response) {
        console.log(response); // Handle success response
      },
      error: function(xhr, status, error) {
        console.error(error); // Handle error response
      }
    });
  });
});

// post adddish

$(document).ready(function() {
  $("#addDishForm").submit(function(e) {
    e.preventDefault(); // Prevent form from submitting normally
    var form_data = $(this).serialize(); // Serialize form data

    $.ajax({
      type: "POST",
      url: "/add-dish",
      data: form_data,
      success: function(response) {
        // console.log(response); // Handle success response
      },
      error: function(xhr, status, error) {
        // console.error(error); // Handle error response
      }
    });
  });
});

// get restuarant confirm

var form = $('#my-form');
form.submit(function(event) {
  event.preventDefault(); 
  var formData = form.serialize();
  $.ajax({
    type: 'POST',
    url: '/restaurant_confirm/' + order_id,
    data: formData,
    success: function(response) {
      $('#my-container').html(response);
    },
    error: function(xhr, status, error) {
      // handle errors
      console.log('Error:', error);
    }
  });
});

// confirm the order

$(document).ready(function() {
  $("#confirmOrderForm").submit(function(e) {
    e.preventDefault(); // Prevent form from submitting normally
    var form_data = $(this).serialize(); // Serialize form data

    $.ajax({
      type: "POST",
      url: "/confirm_order",
      data: form_data,
      success: function(response) {
        console.log(response); 
      },
      error: function(xhr, status, error) {
        console.error(error); 
      }
    });
  });
});

// completed order 

$(document).ready(function() {
  $("#completedForm").submit(function(e) {
    e.preventDefault(); // Prevent form from submitting normally
    var form_data = $(this).serialize(); // Serialize form data

    $.ajax({
      type: "POST",
      url: "/completed",
      data: form_data,
      success: function(response) {
        console.log(response);
      },
      error: function(xhr, status, error) {
        console.error(error); 
        
      }
    });
  });
});

$(document).ready(function() {
$('#edit-dish-form').submit(function(event) {
  event.preventDefault();  // prevent default form submission behavior

  const formData = $(this).serialize();  // get the form data

  $.ajax({
    type: 'POST',
    url: '/edit-dish',  // the server endpoint URL
    data: formData,  // the form data to be sent
    dataType: 'json',
    success: function(data) {
      // console.log(data);  // log the server response
      alert('Dish updated successfully');
    },
    error: function(xhr, status, error) {
      // console.error(xhr.responseText);  // log any errors
      alert('Error updating dish');
    }
  });
});
});


$('#delete-button').click(function() {
  const id = 'your_id_here'; // Replace with the ID of the dish to delete
  $.ajax({
    url: `/dishes/${id}`,
    type: 'DELETE',
    success: function(result) {
      console.log(result);
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
});