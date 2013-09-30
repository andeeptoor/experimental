var NCHAINS = (function (my) {
	
	my.Ajax = (function () { 
		var Ajax = function () { };
		Ajax.prototype = {
			request: function (config) {
				// assuming everything but IE5/6
				var xmlhttp = new XMLHttpRequest(),
					callback = config.callback,
					error = config.error,
					scope = config.scope || this,
					method = config.method,
					data = config.jsonData ? JSON.stringify(config.jsonData) : undefined,
					url = config.url;

				xmlhttp.onreadystatechange = function () {
					if (xmlhttp.readyState === 4 &&
						xmlhttp.status === 200) {
						callback.call(scope, xmlhttp, config);
					} else {
						if (error) {
							error.call(scope, xmlhttp, config);
						}
					}
				};

				xmlhttp.open(method, url, true);
				xmlhttp.send(data);
			}
		};

		return new Ajax();

	}());

	return my;

}(NCHAINS || {}));
