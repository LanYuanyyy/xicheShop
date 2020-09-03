// axios.defaults.withCredentials = true
axios.interceptors.request.use(function (config) {
    var props;
    switch (config.method) {
        case 'get':
        case 'delete':
            props = config.params;
            break
        default:
            props = config.data;
            break
    }
    config.url = window.appconf.b(config.url);
    config.headers = { ...config.headers, ...window.appconf.a(props) };

    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (res) {
    const status = Number(res.status) || 200;
    const message = res.data.message || '未知错误';
    if (status === 401) {
        console.log("身份验证失败！");
        return Promise.reject(new Error(message));
    }
    if (status === 412) {
        console.log("签名校验失败！");
        return Promise.reject(new Error(message));
    }
    if (status > 299 && status <= 500) {
        return Promise.reject(new Error(message));
    }
    // if (status === 200 && res.data.code !== 200) {
    //     return Promise.reject(new Error(message));
    // }

    return res;
}, function (error) {
    return Promise.reject(error);
});
