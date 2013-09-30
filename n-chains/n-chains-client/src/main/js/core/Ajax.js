NCHAINS.namespace('NCHAINS');


NCHAINS.Ajax = (function () { 
	return {
		/**
		 * Makes an Asynchronous XML HTTP Request.
		 * @param Request options
		 *		url: The URL of the ajax request.
		 *		method: The method of the request GET/PUT/POST/DELETE/etc....
		 *		callback: function to execute when request succeeds.
		 *		error: function to execute when request fails.
		 *		scope: context in which to run callback / error methods.
		 */
		request: function (config) {
			// assuming everything but IE5/6
			var xmlhttp = new XMLHttpRequest(),
				callback = config.callback,
				error = config.error,
				scope = config.scope || this,
				method = config.method,
				data = config.jsonData ? JSON.stringify(config.jsonData) : undefined,
				url = config.url;

			// tie callback and error handlers to xml http request events
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState === 4 &&
					xmlhttp.status === 200) {
					if (callback) {
						callback.call(scope, xmlhttp, config);		
					}
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
}());
