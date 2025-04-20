function decodeJWT(token) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
}

export function getUserInfo() {
    const token = localStorage.getItem('token');
    if(!token) {
        throw new Error("Token not found");
    }

    return decodeJWT(token);
}




