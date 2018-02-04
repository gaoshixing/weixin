import axios from "axios";

const loginRouter = 'portal.login';

export const baseURL = "/spoc-search/a/ws/search";

export const http = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true,
});


export default function () {
    return (res) => {
        if (res.data) {
            if (res.data.status == 'login') {
                if (this.$route.name != loginRouter) {
                    this.$router.push({ name: loginRouter });
                }
            } else if (res.data.status == 'error' || res.data.status == 'authority') {
                this.$Message.error(res.data.message);
            } else if (res.data.status == 'location') {
                location.href = res.data.location;
            } else if (res.data.status == 'success') {
                res.ok = true;
            } else {
                console.error("unknow status");
            }
        }
        return res;
    }
}

export const errors = function () {
    return (err) => {
        if (err) {
            this.$Message.error(err.toString());
        }
    }
}

export const listGrantMenu = (params) => {
    return axios.get('/spoc-search/a/ws/sys/menu/listGrantMenu',{params});
}

