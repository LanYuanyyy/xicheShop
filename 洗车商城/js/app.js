// document.domain = 'zlla.cn'

function AppConf() {
    const conf = {
        pa: "http://bjapi.zlla.cn",/*http://huixiang.ciboom.cn:11002*/
        pb: "8c6f5fb18e47e5e0"
    }
    /**
     * headers预处理
     * @param props 请求参数
     */
    this.a = function (props) {
        let headers = {};
        headers.Timestamp = new Date().toTimestamp(true);
        headers.Sign = c(props, headers.Timestamp, conf.pb);
        return headers;
    }
    /**
     * url预处理
     *
     * @return String
     */
    this.b = function (url) {
        // 如果url是个完整的http地址 直接返回
        if (url.indexOf('http') === 0 || url.indexOf('//') === 0) {
            return url;
        }
        if (url.indexOf('/') > 0) {
            url = `/${url}`;
        }
        // 不是完整地址 请求地址与当前接口地址同属一个host
        return `${conf.pa}${url}`;
    }
    /**
     * 签名处理
     * @param props
     * @param timestamp
     * @param secret
     */
    const c = function (props, timestamp, secret) {
        // debugger
        secret = secret || '';
        let propStr = '';
        if (props) {
            propStr = Object.keys(props).sort(function (a, b) { return a.toLowerCase() > b.toLowerCase() ? 1 : -1; }).reduce((body, key) => {
                let value = props[key];
                value = value === null || value === undefined ? '' : value;
                if (value instanceof Array || value instanceof Object) {
                    return `${body}${key}`;
                }
                return `${body}${key}${value}`;
            }, '');
        }
        const content = `${propStr}${timestamp}${secret}`;
        // console.log(content)
        var ret = md5(content);
        return ret;
    }

    this.d = function () {
        return conf.pa;
    }
}
window.appconf = new AppConf();
