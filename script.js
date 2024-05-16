// image slider
const slides = document.querySelectorAll('.slides img')
let slideIndex = 0
let intervalId = null

// initiateSlider();

document.addEventListener("DOMContentLoaded", initiateSlider)

function initiateSlider(){
    if(slides.length > 0){
    slides[slideIndex].classList.add("displaySlide")
    intervalId = setInterval(nextSlide,5000)
    }
}

function showSlide(index){

    if(index >= slides.length){
        slideIndex = 0
    }
    else if(index<0){
        slideIndex = slides.length- 1   
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide")
    })
    slides[slideIndex].classList.add('displaySlide')

}

function prevSlide(){
    clearInterval(intervalId)
    slideIndex--
    showSlide(slideIndex)

}

function nextSlide(){
    slideIndex++
    showSlide(slideIndex)

}


// Scroll Animator
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }
        else{
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el))

// Scroll Speed
const sections = document.querySelectorAll('.menu');

const observered = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, {
  threshold: 0.5 
});

sections.forEach((section) => observered.observe(section));



// Order Cart
// order.js
// JavaScript for functional cart that adds and removes each product

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItem = document.getElementById("cartItem");
    const totalElement = document.getElementById("total");
    let cartItems = [];
    let total = 0;

    // Update cart items and total price
    function updateCart() {
        cartItem.innerHTML = "";
        total = 0;
        cartItems.forEach(item => {
            const itemTotal = item.quantity * item.price;
            total += itemTotal;
            cartItem.innerHTML += `
                <div>${item.quantity} x ${item.name}: ₦${itemTotal.toFixed(2)}</div>
            `;
        });
        totalElement.textContent = `₦${total.toFixed(2)}`;
    }

    // Add item to cart
    function addToCart(name, price) {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: name, price: price, quantity: 1 });
        }
        updateCart();
    }

    // Add event listeners to all add-to-cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const itemName = this.dataset.item;
            const itemPrice = parseFloat(this.dataset.price.replace("₦", "").replace(",", ""));
            addToCart(itemName, itemPrice);
        });
    });
});

  