const url = "http://localhost:8000"

import Swal from 'sweetalert2'
// const Swal = require('sweetalert2')
import axios from 'axios';
export async function getproducts() {
    return await axios.get(`${url}/products`)

}

export async function getcategory(cat) {

    return await axios.get(`${url}/products?category=${cat}`)

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
    return await axios.get(`${url}/cartlist`)

}

export async function removeitem(id) {
    const existing = await axios.get(`${url}/cartlist?id=${id}`);
    if (existing.data.length > 0) {
        const product = existing.data[0];
        if (product.quantity > 1) {
            await axios.patch(`${url}/cartlist/${id}`, { quantity: product.quantity - 1 });
        } else {
            await axios.delete(`${url}/cartlist/${id}`);
        }
    }
}

export async function addtocart(obj) {
Swal.fire({
  title: "Added successfully!",
  icon: "success",
  draggable: true,
  confirmButtonColor: "#000000",
});
    if (obj.discount > 0) {
        obj.price = obj.price - (obj.price * obj.discount / 100)

    }

    await axios.post(`${url}/cartlist`, obj);
    const existing = await axios.get(`${url}/cartlist?id=${obj.id}`);
    if (existing.data.length > 0) {
        const currentQuantity = existing.data[0].quantity || 1;
        await axios.patch(`${url}/cartlist/${obj.id}`, { quantity: currentQuantity + 1 });
    } else {
        obj.quantity = 1;
        await axios.post(`${url}/cartlist`, obj);
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
export async function updatereview(id, rate, obj) {
    obj.stars += rate
    obj.reviews += 1
    await axios.put(`${url}/products/${id}`, obj)
}