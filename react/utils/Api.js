const url = "http://localhost:3000"
import axios from 'axios';
export async function getproducts() {
    return await axios.get(`${url}/products`)

}

export async function getcategory(cat) {
    
    return await  axios.get(`${url}/products?category=${cat}`)

} 