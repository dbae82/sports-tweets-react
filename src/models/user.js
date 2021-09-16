const url = 'http://localhost:4000/api/v1/user';

class User {
    static show() {
        return fetch(`${url}/`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.uid}`,
            },
        }).then(response => response.json());
    }
    static update(id, data) {
        return fetch(`${url}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json());
    }
    static delete(id) {
        return fetch(`${url}/${id}`, { method: "DELETE" }).then(response => response.json());
    }
}

export default User;