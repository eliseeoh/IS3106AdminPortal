const address = "http://localhost:3000";

const Api = {
    updateProfile(updateData, profileImage) {
        const formData = new FormData();
        formData.append("profileImage", profileImage);
        Object.keys(updateData).forEach(key => {
            formData.append(key, updateData[key]);
        });

        return fetch(`${address}/api/admins/profile`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "PUT",
            body: formData
        });
    },
    getProfile() {
        return fetch("http://localhost:3000/api/admins/profile", {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "GET",
        });
    },
    getProfileById(id) {
        return fetch(`http://localhost:3000/api/admins/profile/${id}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "GET",
        });
    },
    getAllAdmins() {
        return fetch("http://localhost:3000/api/admins/all", {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "GET",
        });
    },
    getAllBusinesses() {
        return fetch("http://localhost:3000/api/businesses/all", {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "GET",
        });
    },
    getBusinessById(businessId) {
        return fetch(`http://localhost:3000/api/businesses/profile/${businessId}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "GET",
        });
    },
    updateBusinessProfile(updateData, profileImage, businessId) {
        const formData = new FormData();
        formData.append("profilePicture", profileImage);
        Object.keys(updateData).forEach(key => {
            formData.append(key, updateData[key]);
        });

        return fetch(`${address}/api/businesses/editProfile/${businessId}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "PUT",
            body: formData
        });
    },
    getAllUsers() {
        return fetch("http://localhost:3000/api/users/all", {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "GET",
        });
    },
    getUserById(id) {
        return fetch(`http://localhost:3000/api/users/profileDetails/${id}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "GET",
        });
    },
    updateUserProfile(updateData, profileImage, userId) {
        const formData = new FormData();
        formData.append("profilePicture", profileImage);
        Object.keys(updateData).forEach(key => {
            formData.append(key, updateData[key]);
        });

        return fetch(`${address}/api/users/editProfile/${userId}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "PUT",
            body: formData
        });
    },
    uploadGalleryImage(formData, businessId) {
        return fetch(`${address}/api/businesses/galleryImage/${businessId}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "POST",
            body: formData
        });
    },
    deleteGalleryImage(imageId, businessId) {
        return fetch(`${address}/api/businesses/galleryImage/delete/${businessId}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ image: imageId })
        });
    },
    disableBusinessAccount(businessId) {
        return fetch(`${address}/api/businesses/disable/${businessId}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "PATCH",
        });
    },
    enableBusinessAccount(businessId) {
        return fetch(`${address}/api/businesses/enable/${businessId}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "PATCH",
        });
    },
    disableUserAccount(userId) {
        return fetch(`${address}/api/users/disable/${userId}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "PATCH",
        });
    },
    enableUserAccount(userId) {
        return fetch(`${address}/api/users/enable/${userId}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
            method: "PATCH",
        });
    },
    getBookingsFromBusiness(businessId) {
        return fetch(`http://localhost:3000/api/bookings/businessBookings/${businessId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
            }
        })
    },
    getBookingsFromUser(userId) {
        return fetch(`http://localhost:3000/api/bookings/userBookings/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
            }
        })
    },
    getSubscription() {
        return fetch(`${address}/api/system/subscription`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
        });
    },
    updateSubscription(subscription) {
        return fetch(`${address}/api/system/subscription`, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ subscription }),
        });
    },
    getTotalBusinessCount() {
        return fetch(`${address}/api/businesses/monthlyCount`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            },
        });
    },
    getTotalSubscribedUsersCount() {
        return fetch(`${address}/api/users/subscribedUsers`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            }
        });
    },
    getAllSubscribedUsers() {
        return fetch(`${address}/api/users/allSubscribedUsers`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
            }
        });
    }
}

export default Api;
export { address };
