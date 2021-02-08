const base_url = 'https://wishlist-app-ferd.herokuapp.com/'

function auth () {
    if(!localStorage.getItem('access_token')) {
        $('#btn-logout').hide();
        $('#login-container').show();
        $('#home-container').hide();
        $('#add-container').hide();
    } else {
        $('#btn-logout').show();
        $('#login-container').hide();
        $('#home-container').show();
        $('#add-container').hide();
        getWishlists();
    }
}

function postLogin(){
    let password = $('#password-login').val();
    let email = $('#email-login').val();
    $.ajax({
        url: base_url+'login',
        method: 'POST',
        data: {
            email, password
        }
    })
    .done(res => {
        console.log(res);
        localStorage.setItem('access_token', res.access_token);
        $('#current_saldo').text(`${res.saldo}`);
        auth();
    })
    .fail((xhr, text) => {
        console.log(xhr.responseJSON);
        swal('error', xhr.responseJSON.message, "error")
    })
    .always((_)=> {
        $('#password-login').val('');
        $('#email-login').val('');
        console.log('always postlogin triggered')
    })

}

function getWishlists() {
    $.ajax({
        url: base_url+'wishlists',
        method: 'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(data => {
        $('#wishlists').empty();
        if(data.length === 0) {
            $('#empty-wishlist').show();
        } else {
            $('#empty-wishlist').hide();
            data.forEach(el => {
                $('#wishlists').append(`
                <div class="col-4 mb-4">
                <img src="${el.image_url}" class="card-img-top" alt="...">
                <div class="card text-center">
                    <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    <p class="card-text">${el.price}</p>
                    <button onclick="delWishlist(${el.id})" class="btn btn-dark" id="btn-delete-wl" type="submit">Delete</button>
                    </div>
                </div>
                </div>
              </div>
                `)
            })
        }
    })
    .fail((xhr, text) => {
        swal('error', xhr.responseJSON.message, 'error')
    })
}

function delWishlist(wishlistid) {
    $.ajax({
        url: base_url + `wishlists/${wishlistid}`,
        method: 'DELETE',
        headers: {
            access_token: localStorage.getItem('access_token')
        }   
    })
    .done((data)=> {
        getWishlists()
        $('#current_saldo').text(data.saldo)
    })
    .fail((xhr, text) => {
        console.log(xhr.responseJSON)
        swal('error', xhr.responseJSON.message, 'error')
    })
}

function addWishlists () {
    let name = $('#wl-name').val();
    let image_url =  $('#wl-image').val() || './template/images/background_login.jpeg'
    let price = $('#wl-price').val();
    let description = $('#wl-desc').val();
    $.ajax({
        url: base_url+'wishlists',
        method: 'POST',
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            name,
            image_url,
            price,
            description
        }
    })
    .done(data => {
        getWishlists();
        $('#current_saldo').text(data.saldo)
    })
    .fail((xhr, text) => {
        console.log(xhr.responseJSON)
        swal('error', xhr.responseJSON.message, 'error')
    })
    .always((_)=> {
        $('#wl-name').val('');
        $('#wl-image').val('');
        $('#wl-price').val('');
        $('#wl-desc').val('');
    })
}
function logout() {
    localStorage.clear();
    auth();
}

$(document).ready(()=> {
    auth();

    $('#btn-login').on('click', (event) => {
        event.preventDefault();
        postLogin();
    })

    $('#btn-logout').on('click', (event) => {
        event.preventDefault();
        logout();
    })

    $('#btn-show-add').on('click', (event) => {
        event.preventDefault();
        $('#add-container').show();
    })

    $('#btn-add').on('click', event => {
        event.preventDefault();
        addWishlists();
    })

    $('#btn-cancel').on('click', event => {
        event.preventDefault();
        $('#wl-name').val('');
        $('#wl-image').val('');
        $('#wl-price').val('');
        $('#wl-desc').val('');
        $('#add-container').hide();
    })

})