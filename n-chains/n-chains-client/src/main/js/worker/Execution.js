
// NCHAINS Namespace
var NCHAINS = (function (my) {
	return my || {};
}(NCHAINS));

/**
 * Processes input using a neural network.
 */
NCHAINS.Execution = (function () {

	function process (input) {
		input = JSON.parse(input);

		var net = new brain.NeuralNetwork();
		net.train(input);

		return net.toJSON();
	}

	return {
		/**
		 * Processes the given training input, and 
		 * returns a neural network stringified JSON object.
		 * @param input
		 */
		process: process
	};

}());
