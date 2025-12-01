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
    await axios.put(`${url}/products/${id}`, obj, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
    }
    )
}

export async function incrementquantity(obj, id, amount) {
    obj.quantity += amount
    await axios.put(`${url}/products/${id}`, obj, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
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
    if (localStorage.getItem('auth_token')) {
        return axios.get(`${url}/wishlists`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        })

    }
    return await axios.get(`${url}/wishlists`);
}

export async function removeWishlistitem(id) {
    if (localStorage.getItem('auth_token')) {
        return axios.delete(`${url}/wishlists/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        })

    }
    else {

        await axios.delete(`${url}/wishlists/${id}`);
    }
}
// profile page
export async function getuserinfo() {
    return await axios.get(`${url}/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
    }
    )

}
export async function savechanges(obj) {
    Swal.fire({
        title: "Changes saved successfully!",
        icon: "success",
        draggable: true,
        confirmButtonColor: "#000000",
    });

    return await axios.put(`${url}/users`, obj, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }


    })


}
export async function addAllToCart() {
    try {
        await axios.post(`${url}/wishlist/cart`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        Swal.fire({
            title: "Added to cart successfully!",
            icon: "success",
            draggable: true,
            confirmButtonColor: "#000000",
        });
    } catch (error) {
        console.error(error);
    }
}

export async function removeALLwishlist() {
    try {
        await axios.delete(`${url}/wishlists`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        Swal.fire({
            title: "wishlist cleared successfully!!",
            icon: "success",
            draggable: true,
            confirmButtonColor: "#000000",
        });


    }
    catch (error) {

        console.log(error)
    }

}
export async function removeAccount() {

    const result = await Swal.fire({
        title: "Are you sure you want to delete your account?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        confirmButtonColor: "rgba(253, 93, 93, 1)",
        cancelButtonColor: "#bdb1a0ff",
    });
    if (result.isConfirmed) {
        try {
            await axios.delete(`${url}/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            })
            Swal.fire({
                title: "account deleted successfully!!",
                icon: "success",
                draggable: true,
                confirmButtonColor: "#000000",
            });
            localStorage.removeItem('auth_token')
            return true

        }
        catch (error) {
            console.log(error)
        }
    }
    else {
        return
    }


}
export async function logout() {
    const result = await Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        confirmButtonColor: "rgba(253, 93, 93, 1)",
        cancelButtonColor: "#bdb1a0ff",
    });
    if (result.isConfirmed) {

        localStorage.removeItem('auth_token')
        return true


    }

}
// save order
export async function saveorder(order) {
    await axios.post(`${url}/orders`, order, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
}
//  get guest order
export async function getguestorder (){
    return await axios.get(`${url}/orders`)

}


// checkout 
export function isloggedin() {
    if (localStorage.getItem('auth_token')) {
        return true
    }
    return false


}
export async function getOrders() {
    await axios.get("/orders", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }

    })

}
// photo upload
export async function upload(photofile) {
    const formData = new FormData();
    formData.append('photo', photofile);
    await axios.post(`${url}/upload`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`

        }
    })


}
export async function deletephoto() {
    await axios.delete(`${url}/deletephoto`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`

        }

    })

}
export async function changepassword(originalpassword, oldpassword, newpassword) {
    if (originalpassword == oldpassword && oldpassword!= newpassword) {
        await axios.put(`${url}/changepassword`,{password: newpassword}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`


            }
        })
        Swal.fire({
            title: "password changed successfully!!",
            icon: "success",
            draggable: true,
            confirmButtonColor: "#000000"
        });

    }
    else if (oldpassword == newpassword) {
        Swal.fire({
            title: "new password cannot be the same as the old password",
            icon: "error",
            draggable: true,
            confirmButtonColor: "#000000"
        });



    }
    else {
        Swal.fire({
            title: "old password is incorrect",
            icon: "error"

        })
    }
}