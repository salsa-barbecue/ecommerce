import axios from "axios";

export const setDefaultHeader = () => {
    let token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export const getAvailableCoupons = async () => {
    //ottiene tutti i buoni disponibili, gia contenenti immagini, tipo e varie dimensioni disponibili

    setDefaultHeader();
    let r = await axios.get(process.env.REACT_APP_BACKEND_URL + "/coupon/available")
    return r.data?.data
}

export const getUserCoupons = async () => {
    //ottiene tutti i buoni generati dall'utente, ordinati dal piu vecchio al piu recente, con il tipo e le immagini
    //gia collegate

    setDefaultHeader();
    let r = await axios.get(process.env.REACT_APP_BACKEND_URL + "/coupon/list")
    let outCoupons = r.data?.data?.userCoupons.map(el => {
        let t = new Date(el.createdAt)
        el.createdAt = t.toLocaleString("it-IT")
        return el
    })
    return {userCoupons: outCoupons, count: r.data?.data?.count || 0}
}

export const createCoupon = async (type_id, size_id) => {
    //crea un buono, il codice utente viene preso direttamente dal backend tramite il token

    let payload = JSON.stringify({
        type_id: type_id,
        size_id: size_id
    })
    let createCallConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.REACT_APP_BACKEND_URL + '/coupon/create',
        headers: {
            'Content-Type': 'application/json'
        },
        data: payload
    };

    let r = await axios.request(createCallConfig)
    return r.data?.msg
}

export const doLogin = async (username, password) => {
    //effettua il login di un utente e ne restituisce il token da inserire nelle prossime richieste, in questo
    //caso il token viene salvato nel localStorage ma si puo' implementare anche uno store redux

    let payload = JSON.stringify({
        username: username,
        password: password
    })

    let loginCallConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.REACT_APP_BACKEND_URL + '/user/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: payload
    };

    let r = await axios.request(loginCallConfig)
    let generatedToken = r.data?.data?.token
    localStorage.setItem('token', generatedToken)
    setDefaultHeader(generatedToken)
    localStorage.setItem('username', username)
    return r.data?.data
}

export const doRegister = async (username, password) => {
    //crea un utente nel database e poi chiama direttamente la funzione di login

    let payload = JSON.stringify({
        username: username,
        password: password
    })
    let registerCallConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.REACT_APP_BACKEND_URL + '/user/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: payload
    };
    await axios.request(registerCallConfig)

    return await doLogin(username, password)
}