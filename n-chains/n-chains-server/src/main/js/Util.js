module.exports = {
	util: {
		
			/**
			 * Creates a proxy for a function, so that it executes in a given scope.
			 */
			proxy: function (fn, scope) {
				return function () {
					fn.apply(scope, Array.prototype.slice.call(arguments, 0));
				}
			}
	}
};

