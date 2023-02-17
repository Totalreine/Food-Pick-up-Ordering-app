$(document).ready(function() {
  $('#order').submit(function(event) {
    event.preventDefault(); 
    
    const formData = {
      customer_id: $('input[name="order_id"]').val(),
      order_total_price: $('input[name="order_total_price"]').val(),
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
      }});
    });
  });
  
  $.ajax({
    type: "GET",
    url: "/orders",
    success: function(response) {
      var orders = response.placedOrders;
      var orderList = $("#order-list");
      orderList.empty();
      orders.forEach(function(order) {
        var row = $("<tr>");
        row.append($("<td>").text(order.order_id));
        row.append($("<td>").text(order.order_total_price));
        orderList.append(row);
      });
    },
    error: function(error) {
      console.error(error);
    }
  });
  
  $(document).ready(function() {
  fetchOrders();
  });