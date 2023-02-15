// Client facing scripts here
const createMenuItem = function (dishs) {
  const $item = $("<article>")
    .addClass("dishs")
    .append(
      $("<div>")
        .addClass("dishs-visual")
        .append(
          $("<img>")
            .addClass("dishs-photo")
            .attr("src", dishs.photo_url)
        ),
      $("<div>")
        .addClass("dishs-specs")
        .append(
          $("<span>")
            .addClass("dishs-preptime")
            .text(`Preparation time : ${dishs.preparation_time} min.`),
          $("<span>")
            .addClass("dishs-name")
            .text(dishs.name),
          $("<span>")
            .addClass("dishs-description")
            .text(dishs.description),
          $("<span>")
            .addClass("glueton-free")
            .text(dishs.glueton-free)
        ),
      $("<div>")
        .addClass("order")
        .append(
          $("<span>")
          .addClass("dishs-price")
          .text(`Price : ${dishs.price} $` ),
          $("<span>")
          .addClass("dishs-ratings")
          .text(`Price : ${dishs.ratings} $` ),
          $("<div>")
            .addClass("box")
            .append(
              $("<select>")
                .append(
                  $("<option>")
                    .text("1"),
                  $("<option>")
                    .text("2"),
                  $("<option>")
                    .text("3"),
                  $("<option>")
                    .text("4"),
                  $("<option>")
                    .text("5"),
                  $("<option>")
                    .text("6"),
                  $("<option>")
                    .text("7"),
                  $("<option>")
                    .text("8")

                
                )
            ),
          $("<div>")
            .append(
              $("<button>")
                .addClass("addtogetCarts-button")
                .text("Add to getCarts")
            )
        )
    )
  return $item;
};

$(document).ready(function () {
  $('#phone').mask('(000) 000-0000');
  let dishes;
  let totalgetCartsValue = 0;
  let getCarts = {
    items: [],
    finalPrice: 0,
    comment: '',
    phone: ''
  };

  $.ajax({
    method: "GET",
    url: "/dishes"
  }).done((obj) => {
    const arrayMenuItems = obj.menuItems;
    dishes = arrayMenuItems;

    arrayMenuItems.forEach(dish => {
      let renderMenuItem = createMenuItem(dish);
      $("#menu-items").prepend(renderMenuItem);
    });


    $('.addtogetCarts-button').click(function (event) {

      const dishId = $(event.target).parent().parent().parent()[0].dataset.id;
      const currentClickedDish = dishes.filter((dish) => parseInt(dish.id) === parseInt(dishId))[0];
      const quatity = $(`#${parseInt(currentClickedDish.id)}`).val();
      $('#getCarts-item-display').prepend(`<div class="item">
      <div class="left-col-items">
          <span>${currentClickedDish.name}</span>
          <span>Quantity: ${quatity}</span>
      </div>
      <div class="right-col-items">
        <span>
          $${currentClickedDish.price}
        </span>
      </div>
      </div> `);
      lclStorage(currentClickedDish, quatity);
      getTotalgetCarts(currentClickedDish.price, quatity);

    });
  });



  const getTotalgetCarts = function (value, qty) {
    totalgetCartsValue += value * qty;
    getCarts.finalPrice = totalgetCartsValue;
    $('#total-amount').text(totalgetCartsValue);
  };


  const lclStorage = function (data, quatity) {
    getCarts.items.push({ id: data.id, name: data.name, quatity: quatity, restaurantID: data.restaurant_id });
    localStorage.setItem('getCartss', JSON.stringify(getCartss));
    console.log(getCarts);
  };

  const cleargetCarts = function () {
    totalgetCartsValue = 0;
    $('#total-amount').text(0);
    $('#getCarts-item-display').empty();
    getCarts = {
      items: [],
      finalPrice: 0,
      phone: ''
    };
    $('#phone').val('');
  };

  const messageSendToDB = function () {
    $('#placeOrder').click(function () {
      getCarts.phone = $('#phone').val();
      console.log($('#phone').cleanVal());
      getCarts.comment = $('#comment').val();
      $.ajax({
        method: "POST",
        url: "/api/orders",
        data: getCarts
      }).done((obj) => {
        console.log('clear');
        cleargetCarts();
      })
        .fail(function () {
          console.log("error");
        });

    });

  };
  messageSendToDB();
  $('.reset').click(cleargetCarts);

  // When user scrolls down 500px from the top of the document, scroll up button will appear.

  $(document).on("scroll", function () {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      $("#scroll-up-btn").css("display", "block");
    } else {
      $("#scroll-up-btn").css("display", "none");
    }
  });

  // When the scroll up button is pressed, the user is brought to the top of the document.

  $("#scroll-up-btn").on("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

});




