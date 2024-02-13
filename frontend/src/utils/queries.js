import axios from "axios";

export const setDefaultHeader = () => {
    let token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export const getAvailableCoupons = async () => {
    setDefaultHeader();
    let r = await axios.get(process.env.REACT_APP_BACKEND_URL + "/coupon/available")
    if (r.status !== 200) {
        throw new Error(r.data?.msg)
    }
    return r.data?.data
}

export const getUserCoupons = async () => {
    setDefaultHeader();
    let r = await axios.get(process.env.REACT_APP_BACKEND_URL + "/coupon/list")
    if (r.status !== 200) {
        throw new Error(r.data?.msg)
    }
    let outCoupons = r.data?.data?.userCoupons.map(el => {
        let t = new Date(el.createdAt)
        el.createdAt = t.toLocaleString("it-IT")
        return el
    })
    return {userCoupons: outCoupons, count: r.data?.data?.count || 0}
}

export const createCoupon = async (type_id, size_id) => {
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
    if (r.status !== 200) {
        throw new Error(r.data?.msg)
    }
    return r.data?.msg
}

export const doLogin = async (username, password) => {
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

    if (r.status !== 200) {
        throw new Error(r.data?.msg)
    }

    let generatedToken = r.data?.data?.token
    localStorage.setItem('token', generatedToken)
    setDefaultHeader(generatedToken)
    localStorage.setItem('username', username)
    return r.data?.data
}

export const doRegister = async (username, password) => {
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

    let rRegister = await axios.request(registerCallConfig)
    if (rRegister.status !== 200) {
        throw new Error(rRegister.data?.msg)
    }

    try {
        return await doLogin(username, password)
    } catch (e) {
        throw new Error(e)
    }
}