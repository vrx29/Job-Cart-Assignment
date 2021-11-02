let cart = [];
let items = data;
displayItems(items);

//category icons display
let categories = [...new Set(items.map((item) => item.category))];
for (let i = 0; i < categories.length; i++) {
  const categoryEl = document.querySelector(".item-category");
  const catBtn = document.createElement("button");
  catBtn.textContent = categories[i];
  catBtn.className = "category-btn";
  categoryEl.append(catBtn);
  catBtn.addEventListener("click", () => updateCategory(categories[i]));
}

//function to update Category on user selection
function updateCategory(category) {
  let updatedItems;
  if (category != "") {
    updatedItems = items.filter((item) => item.category == category);
    displayItems(updatedItems);
  } else {
    updatedItems = items;
    displayItems(updatedItems);
  }
}

//function initally display all items and changes on category change
function displayItems(items) {
  const parEl = document.querySelector(".wrapper");
  parEl.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    const card = document.createElement("div");
    const imgContainer = document.createElement("div");
    const dataContainer = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h3");
    const price = document.createElement("p");
    const btnContainer = document.createElement("div");
    const decBtn = document.createElement("button");
    const qtyBtn = document.createElement("button");
    const incBtn = document.createElement("button");

    card.className = "card";
    img.src = item.image;
    imgContainer.className = "img-container";
    imgContainer.append(img);
    card.append(imgContainer);

    dataContainer.className = "item-details";
    name.innerHTML = item.name;
    price.innerHTML = "₹ " + item.price;

    qtyBtn.innerText = 0;
    qtyBtn.className = " btn btn-qty";
    decBtn.innerText = "-";
    decBtn.className = "btn btn-dec";
    incBtn.innerText = "+";
    incBtn.className = "btn btn-inc";

    btnContainer.append(decBtn);
    btnContainer.append(qtyBtn);
    btnContainer.append(incBtn);
    btnContainer.className = "btn-container";

    dataContainer.append(name);
    dataContainer.append(price);
    dataContainer.append(btnContainer);

    card.append(imgContainer);
    card.append(dataContainer);

    //add event Listener
    decBtn.addEventListener("click", () => updateQuantity(item, "dec"));
    incBtn.addEventListener("click", () => updateQuantity(item, "inc"));

    parEl.append(card);

    //function to update Quantity and update cart
    //Quantity cannot be <0 and >10
    function updateQuantity(item, type) {
      let indx = cart.findIndex((x) => x.name == item.name);
      let qty = qtyBtn.textContent;

      if (type == "dec") {
        if (qty > 0) {
          qty--;
          qtyBtn.textContent = qty;
          if (indx != -1) {
            cart[indx].quantity = qty;
          } else {
            let billObj = {
              name: item.name,
              price: item.price,
              quantity: qty,
              category: item.category
            };
            cart.push(billObj);
          }
        }
        if (qty == 0) {
          cart = cart.filter((item) => item.quantity != 0);
        }
      }

      if (type == "inc") {
        if (qty < 10) {
          qty++;
          qtyBtn.textContent = qty;
          if (indx != -1) {
            cart[indx].quantity = qty;
          } else {
            let billObj = {
              name: item.name,
              price: item.price,
              quantity: qty,
              category: item.category
            };
            cart.push(billObj);
          }
        }
      }

      updateBill();
      showCartItems();
    }
  }
}

//All cart calculations are done in this function
function updateBill(amount, quantity) {
  const payBtn = document.querySelector(".btn-pay");
  const subTotal = document.querySelector(".bill-sub-total");
  const tax = document.querySelector(".bill-taxes");
  const discount = document.querySelector(".bill-discount");

  let total = cart.reduce((prevBill, curr) => {
    let currItemTotal = Number(curr.price) * Number(curr.quantity);
    prevBill += currItemTotal;
    prevBill.toFixed(2);
    return prevBill;
  }, 0);

  subTotal.innerHTML = `₹ ${total}`;
  let currTax = (total * 0.28).toFixed(2);
  tax.innerHTML = `₹ ${currTax}`;
  discount.innerHTML = `₹ ${0.0}`;

  let finalAmount = total + Number(currTax);
  payBtn.innerHTML = `Pay  ₹ ${finalAmount.toFixed(2)}`;
}

//This function shows items in cart
function showCartItems() {
  const billItemContainer = document.querySelector(".bill-items");
  billItemContainer.innerHTML = "";
  if (cart.length > 0) {
    const billItem = document.createElement("div");
    billItem.classList = "bill-item";
    const itemName = document.createElement("h4");
    itemName.innerHTML = "Name";
    const itemQuantity = document.createElement("p");
    itemQuantity.innerHTML = "Qty";
    const itemPrice = document.createElement("p");
    itemPrice.innerHTML = "Price";

    billItem.appendChild(itemName);
    billItem.appendChild(itemQuantity);
    billItem.appendChild(itemPrice);

    billItemContainer.appendChild(billItem);
  }
  cart.map((item) => {
    const billItem = document.createElement("div");
    billItem.classList = "bill-item";

    const itemName = document.createElement("h5");
    itemName.innerHTML = item.name;
    const itemQuantity = document.createElement("p");
    itemQuantity.innerHTML = ` x ${item.quantity}`;
    const itemPrice = document.createElement("p");
    itemPrice.innerHTML = "₹ " + item.price;

    billItem.appendChild(itemName);
    billItem.appendChild(itemQuantity);
    billItem.appendChild(itemPrice);

    billItemContainer.appendChild(billItem);
  });
}

// Sidebar Functionality///
const sideBtn = document.querySelector(".btn-sidebar");
const sideBar = document.querySelector(".sidebar");
sideBtn.addEventListener("click", () => sideBar.classList.toggle("hide"));
