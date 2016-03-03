var docCookies = {
    originalString: document.cookie,

    getCookieHash: function() {

        var cookieArr = this.originalString.split(';');
        var cookieHash = {};
        var reg = /^\s*|\s*$/g;
        for (var i = 0, len = cookieArr.length; i < len; i++) {
            var el = cookieArr[i];
            if (el.indexOf('=') != -1) {
                var KV = el.split('='),
                    K = KV[0],
                    V = KV[1];
                cookieHash[K.replace(reg, '')] = unescape(V.replace(reg, ''));
            }
        }
        return cookieHash;

    },

    setCookie: function(name, value, expire, domain, path) {
        var cookieString = name + '=' + escape(value);
        if(expire) cookieString += '; expire=' expire.toGMTString();
        if(domain) cookieString += '; domain=' + domain;
        if(path) cookieString += '; path=' + path;
        document.cookie = cookieString;
        this.originalString = document.cookie;
    },

    // 没有传domain和path导致无法成功删除cookie
    deleteCookie: function(name, domain, path) {
        this.setCookie(name, '', new Date(1), domain, path);
    }
}
