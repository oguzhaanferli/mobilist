export async function GetUsers(querystring) {
    return await fetch("/api/users" + querystring, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
    }).then((response) => {
        var data = response.json();
        return data
    }).catch((err) => {
        console.log(err);
    });
}

export async function DeleteUsers(id) {
    return await fetch("/api/users/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
    }).then((response) => {
        var data = response.json();
        return data
    }).catch((err) => {
        console.log(err);
    });
}

export async function AddUsers(postdata) {
    return await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(postdata),
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
    }).then((response) => {
        var data = response.json();
        if (response.status == 200 || response.status == 201 || response.status == 204) {
            return data
        }
        else {
            console.log(data.data);
        }
    }).catch((err) => {
        console.log(err);
    });
}

export async function UpdateUsers(postdata, id) {
    return await fetch("/api/users/" + id, {
        method: "PUT",
        body: JSON.stringify(postdata),
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
    }).then((response) => {
        var data = response.json();
        if (response.status == 200 || response.status == 201 || response.status == 204) {
            return data
        }
        else {
            console.log(data.data);
        }
    }).catch((err) => {
        console.log(err);
    });
}