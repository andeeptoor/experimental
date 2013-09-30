NCHAINS.namespace('NCHAINS');

NCHAINS.Log = (function () {
	
	var Logger = function (id) {
		this.id = id;
	},
		isConsole = !$.isEmptyObject(console);



	Logger.prototype = {

		debug: function (msg) {
			if (isConsole) {
				console.debug(this.id + ">> " + msg);
			}
		}

	};

	return {
		logger: function (id) {
			return new Logger(id);
		}
	};

})();
