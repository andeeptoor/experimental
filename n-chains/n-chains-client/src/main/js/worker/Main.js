importScripts('../lib/brain-0.6.0.js');
importScripts('Execution.js');


// NCHAINS Namespace
var NCHAINS = (function (my) {
	return my || {};
}(NCHAINS));

// Main worker app
NCHAINS.Main = (function () {

	/**
	 * @private
	 * Process the data
	 */
	function process(data) {
		returnData(NCHAINS.Execution.process(data));
	}

	/**
	 * @private
	 * Return the processed data to the main application
	 */
	function returnData(data) {
		self.postMessage(data);
	}

	// PUBLIC
	return {
		process: process
	};

}());

self.addEventListener('message', function (evt) {
	NCHAINS.Main.process(evt.data);
});
