

const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem("tw_token")}`
}

export const data =  {
    get: (endpoint) => {
        return fetch(`http://localhost:8000/${endpoint}`, {
            headers:headers
        })
            .then(response => response.json())
    },

    getOne: (endpoint, id) => {
        return fetch(`http://localhost:8000/${endpoint}/${id}`, {
            headers:headers
        })
            .then(response => response.json())
    },

    post: (endpoint, object) => {
        return fetch(`http://localhost:8000/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("tw_token")}`
            },
            body: JSON.stringify(object)
         })
    },

    update: (endpoint, id, object) => {
        return fetch(`http://localhost:8000/${endpoint}/${id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(object)
         })
    },

    delete: (endpoint, id) => {
        return fetch(`http://localhost:8000/${endpoint}/${id}`, {
            method: 'DELETE',
            headers:headers
        })
            .then(response => response.json())
    }

}