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
