NCHAINS.namespace('NCHAINS');

/**
 * NChains Logger factory.
 */
NCHAINS.Log = (function () {

	return {
		/**
		 * Logger factory used to create a new log object.
		 */
		logger: function (id) {
			var Logger = function (logID) {
				this.id = logID;
				this.debug = function (message) {
					if (!$.isEmptyObject(console)) {
						console.debug(this.id + "> " + new Date().toTimeString() + " >> " + message);
					}
				};
			};

			return new Logger(id);
		}
	};

})();
