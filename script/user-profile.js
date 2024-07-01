const myHeaders = new Headers();
myHeaders.append("accept", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZmlAbWQiLCJpYXQiOjE3MTk0NDE1MzcsImV4cCI6MTcxOTUyNzkzN30.u-aXThoE4L5iPL-_W-wefy1CEJrpBdjK91UNQmbI9Qw");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "text": "Ali => 404 => { console.lgo( will it my last capstone :) )  "
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  document.getElementById('cartForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    let itemInput = document.getElementById('itemInput');
    let itemName = itemInput.value.trim();

    if (itemName !== '') {
        addToCart(itemName); // Custom function to add item to cart (can be replaced with your logic)
        itemInput.value = ''; // Clear input field after adding item
    }
});

function addToCart(itemName) {
    // Example: Append item to cart items list
    let cartItemsDiv = document.getElementById('cartItems');
    let itemElement = document.createElement('div');
    itemElement.textContent = itemName;
    cartItemsDiv.appendChild(itemElement);
}