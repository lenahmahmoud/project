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
    return await axios.get(`${url}/cartlist`);
}

export async function removeitem(id) {
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
    await axios.post(`${url}/cartlist`, obj);
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
            await axios.post(`${url}/wishlists`, obj);
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

// =================== AUTH ===================


export function loginUser({ email, password }) {
  return new Promise((resolve, reject) => {
    if (!/^\S+@\S+\.\S+$/.test(email))
      return reject("Invalid email address");
    if (password.length < 6)
      return reject("Password must be at least 6 characters");

    axios
      .get(`${url}/users`, {
        params: { email, password },
      })
      .then((res) => {
        const users = res.data;
        if (Array.isArray(users) && users.length > 0) {
          resolve(users[0]); // success
        } else {
          reject("Invalid email or password");
        }
      })
      .catch(() => {
        reject("Failed to connect to the server");
      });
  });
}



export function signupUser({ firstName, lastName, email, password, confirm }) {
  return new Promise((resolve, reject) => {
    // Basic validation
    if (!firstName.trim() || !lastName.trim())
      return reject("First and last name are required");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return reject("Invalid email address");
    if (password.length < 6)
      return reject("Password must be at least 6 characters");
    if (password !== confirm)
      return reject("Passwords do not match");

    // POST request to JSON Server
    axios
      .post(`${url}/users`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => resolve(res.data))
      .catch(() => reject("Failed to connect to the server"));
  });
}