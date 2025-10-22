const url = "http://localhost:3000"
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
    return { data: res.data.filter(product => product.stars === 5) };
}

export async function getproduct(id) {
    return await axios.get(`${url}/products/${id}`);
}
export async function getitems() {
    return await axios.get(`${url}/cartlist`)

}
export async function removeitem(id) {
    await axios.delete(`${url}/cartlist/${id}`)

}
export async function addtocart(obj) {
    if (obj.discount > 0) {
        obj.price = obj.price - (obj.price * obj.discount / 100)

    }
    
    await axios.post(`${url}/cartlist`, obj)

}
export async function decrementquantity(obj ,id,amount){
    obj.quantity-=amount
    await axios.put(`${url}/products/${id}`,obj)

}
export async function incrementquantity(obj ,id ,amount){
    obj.quantity+=amount
    await axios.put(`${url}/products/${id}`,obj)

}