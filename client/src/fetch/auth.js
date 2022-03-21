export async function getToken() {
    return await fetch("/api/gettoken", {
        method: "POST",
        body: JSON.stringify({ username: "oguzhan", password: "12345" }),
        headers: { "Content-Type": "application/json" },
    }).then((response) => {
        var data = response.json();
        return data
    }).catch((err) => {
        console.log(err);
    });
}