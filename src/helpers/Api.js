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
    }
}

export default Api;
export { address };
