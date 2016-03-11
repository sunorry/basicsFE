JSONP.count = 0;

const JSONP = (url, jsonpObj) => {
	let cbName = "cb" + JSONP.count++;
	let cbQuery = "JSONP." + cbName;

	let paramsToQuery = obj => {
		let query = "?";
		for(var k in obj) {
			if(obj.hasOwnProperty(k)) {
				query += `${k}=${obj[k]}&`;
			}
		}
		return query;
	}

	JSONP[cbName] = data => {
		try {
			jsonpObj.callback(data);
		} finally {
			delete JSONP[cbName];
			document.body.removeChild(script);
		}
	}

	let queryStr = paramsToQuery(jsonpObj.data) + 'callback=' + cbQuery;
	let script = document.createElement('script');
	script.src = url + encodeURIComponent(queryStr);
	document.body.appendChild(script);
}


const JSONP = (function() {
	const global = window

	const defaultOptions = Object.freeze({
		data: {},
		callback: (data) => {}
	})

	return (root, opts = defaultOptions) => {
		let url = root.trim().replace(/\?$/, '') + '?'

		const keys = Object.keys(opt.data)

		for(const key of keys) {
			url += `${safeEscape(key)}=${safeEscape(opt.data[key])}&`
		}

		const callbackName = `json${Math.random().toString(32).substr(2)}`

		global[callbackName] = function(data) {
			opts.callback.call(JSONP, data)
			delete global[callbackName]
			document.body.removeChild(script)
		}

		url += `jspnpcallback=${callbackName}`

		const script = document.createElement('script')
		script.src = url

		document.body.appendChild(script)

		function safeEscape(str) {
			return encodeURIComponent(str.toString)
		}
	}
})()
