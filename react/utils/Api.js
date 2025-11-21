import Swal from 'sweetalert2';
import axios from 'axios';

const url = "http://localhost:5000";

export async function getproducts() {
    return await axios.get(`${url}/products`);
}

export async function getcategory(cat) {
    return await axios.get(`${url}/products?category=${cat}`);
}

export async function getsales() {
    const res = await axios.get(`${url}/products`);
    return { data: res.data.filter(product => product.discount > 0) };
}

export async function getbestselling() {
    const res = await axios.get(`${url}/products`);
    return { data: res.data.filter(product => product.stars == 5) };
}

export async function getproduct(id) {
    return await axios.get(`${url}/products/${id}`);
}

export async function getitems() {
    if (localStorage.getItem('auth_token')) {
        return await axios.get(`${url}/cartlist`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`

            }
        })
    }
    return await axios.get(`${url}/cartlist`);
}

export async function removeitem(id) {
    if (localStorage.getItem('auth_token')) {
        await axios.delete(`${url}/cartlist/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`

            }
        })
    }
    await axios.delete(`${url}/cartlist/${id}`);
}

export async function addtocart(obj) {
    Swal.fire({
        title: "Added to cart successfully!",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#000000",
    });

    if (obj.discount > 0) {
        obj.price = obj.price - (obj.price * obj.discount / 100)
    }
    if (localStorage.getItem('auth_token')) {
        await axios.post(`${url}/cartlist`, obj, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }

        });
    }
    else {
        await axios.post(`${url}/cartlist`, obj)
    }
}

export async function decrementquantity(obj, id, amount) {
    obj.quantity -= amount
    await axios.put(`${url}/products/${id}`, obj)
}

export async function incrementquantity(obj, id, amount) {
    obj.quantity += amount
    await axios.put(`${url}/products/${id}`, obj)
}

export async function getreviews() {
    return axios.get(`${url}/reviews`)
}

export async function addreview(obj) {
    await axios.post(`${url}/reviews`, obj)
} 

export async function updatereview(id, newAverage, newCount) {
    await axios.patch(`${url}/products/${id}`, {
        stars: newAverage,
        reviews: newCount
    });
}


export async function addToWishList(obj) {

    getWishListitems().then(async (res) => {
        const alreadyExists = res.data.some(item => item.id === obj.id);
        if (!alreadyExists) {
            if (localStorage.getItem('auth_token')) {
                await axios.post(`${url}/wishlists`, obj, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                    }

                });
            } else {
                await axios.post(`${url}/wishlists`, obj);
            }
        }

    });


    Swal.fire({
        title: "Added to wishlist successfully!",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#000000",
    });
}

export async function getWishListitems() {
    return await axios.get(`${url}/wishlists`);
}

export async function removeWishlistitem(id) {
    await axios.delete(`${url}/wishlists/${id}`);
}


