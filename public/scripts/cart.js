const adddishToCart = (dishId, cartValueAsString) => {
  const cartObj = cartValueAsString ?
    JSON.parse(cartValueAsString) :
    {};

  if (cartObj[dishId]) {
    cartObj[dishId] += 1;
  } else {
    cartObj[dishId] = 1;
  }

  cartValueAsString = JSON.stringify(cartObj);

  return cartValueAsString;
};

// For a price like 0.00$, returns a number:
const priceStringToNumber = priceAsString => {
  return Number(priceAsString.replace(/[.$\s]/g, ''));
};

// Adds dish item price to current totals
const updatePrice = (dishPrice, currentTotal) => {
  currentTotal = priceStringToNumber(currentTotal);

  if (currentTotal) { // If it's not a number, will return NaN which is falsy
    currentTotal += dishPrice;
  } else {
    currentTotal = dishPrice;
  }

  return (currentTotal / 100).toFixed(2) + '$';
};


// On Page Load
$(() => {

  // Dynamically modifies times from time elements of class timeago
  
  $(document).ready(function() {
    $("time.timeago").timeago();
  });

  // Handles events related to "Dog-Me button on the index
  $(".add-dish-btn").click(function() {
    // Updates Cart Input Value
    const dishId = $(this).val();
    const $cartField = $("#carts");
    const cartValue = $cartField.val();

    $cartField.val(adddishToCart(dishId,cartValue));

    // Updates current total
    const priceAsString = $(this).closest("div").find(".price").text();
    const $priceField = $(".price-counter");
    const currentTotal = $priceField.text();

    const dishPrice = priceStringToNumber(priceAsString);

    $priceField.text(updatePrice(dishPrice, currentTotal));
  });
});