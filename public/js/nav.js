// navbar

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if(scrollY >= 180){
        navbar.classList.add('bg');
    } else{
        navbar.classList.remove('bg');
    }
})

const createNavbar = () => {
    let navbar = document.querySelector('.navbar');

    navbar.innerHTML += `
    
        <ul class="links-container">
        <li class="link-item"><a href="/" class="link">home</a></li>
            <li class="link-item"><a href="/products" class="link">product</a></li>
            <li class="link-item"><a href="/about" class="link">about</a></li>
            <li class="link-item"><a href="/contact" class="link">contact</a></li>
        </ul>
        <div class="user-interactions">
            <div class="search-box">
                <input type="text" class="search" placeholder="search item">
                <button class="search-btn"><img src="../img/search.png" alt=""></button>
            </div>
            <div class="cart" onclick="location.href = '/cart'">
                <img src="../img/cart.png" class="cart-icon" alt="">
                <span class="cart-item-count">00</span>
            </div>
            <div class="user">
                <img src="../img/user.png" class="user-icon" alt="">
                <div class="user-icon-popup">
                    <p>login to your account</p>
                    <a>login</a>
                </div>
            </div>
        </div>

    `
}

createNavbar();

// user icon popup

let userIcon = document.querySelector('.user-icon');
let userPopupIcon = document.querySelector('.user-icon-popup');

userIcon.addEventListener('click', () => userPopupIcon.classList.toggle('active'))

let text = userPopupIcon.querySelector('p');
let actionBtn = userPopupIcon.querySelector('a');
let user = JSON.parse(sessionStorage.user || null);

if(user != null){ // user is logged in
    text.innerHTML = `log in as, ${user.name}`;
    actionBtn.innerHTML = 'log out';
    actionBtn.addEventListener('click', () => logout());
} else{
    text.innerHTML = 'login to your account';
    actionBtn.innerHTML = 'login';
    actionBtn.addEventListener('click', () => location.href = '/login');
}

const logout = () => {
    sessionStorage.clear()
    location.reload();
}

// search box

let searchBtn = document.querySelector('.search-btn')
let searchBox = document.querySelector('.search');

let searchProduct = () => {
    if(searchBox.value.length){
        // location.href = `/search/${searchBox.value}`;

        // make request to backend to fetch product url

        fetch("/search-product", {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ title: searchBox.value.toLowerCase() })
        })
        .then(res => res.json())
        .then(({ productURL }) => {

            if(productURL){
                location.href = `/products/${productURL}`
            } else{
                alert("no product found")
            }
        })
        .catch(err => {
            console.log(err);
        })

    }
}

searchBtn.addEventListener('click', searchProduct)
searchBox.addEventListener('keydown', (e) => {
    if(e.keyCode == 13) {
        searchProduct();
    }
})

// nav cart count

const updateNavCartCounter = () => {
    let cartCounter = document.querySelector('.cart-item-count');

    let cartItem = JSON.parse(localStorage.getItem('cart'));

    if(cartItem == null){
        cartCounter.innerHTML = '00';
    } else{
        if(cartItem.length > 9){
            cartCounter.innerHTML = '9+';
        } else if(cartItem.length <= 9){
            cartCounter.innerHTML = `0${cartItem.length}`
        }
    }
}

updateNavCartCounter();