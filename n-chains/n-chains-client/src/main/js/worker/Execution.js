NCHAINS.namespace('NCHAINS');

/**
 * 1. Requests input from the server.
 * 2. Parses input, and trains the neural network.
 * 3. Sends output to server, and on send request, posts message back to main application.
 */
NCHAINS.Execution = (function () {

	/**
	 * @private
	 * Retrieves the input
	 */
	function getInput() {
		NCHAINS.Ajax.request({
			url: '../../../../api/getInput',
			method: 'get',
			callback: function (response, options) {
				var result = JSON.parse(response.responseText);
				train(parseInput(result));
			},
			scope: this
		});
	}

	/**
	 * @private
	 * Parses the returned data into the correct format for brain.js
	 */
	function parseInput(input) {
		var key,
			value,
			obj = { input: [], output: null },
			results = [];

		for(key in input) {
			if (input.hasOwnProperty(key)) {
				value = input[key];

				obj.input.push(value);
			}
		}

		obj.output = obj.input;
		results.push(obj);

		return results;
	}

	/**
	 * @private
	 * Trains the neural network with the given input
	 */
	function train(input) {
		var net = new brain.NeuralNetwork();
		sendOutput(net.train(input));
	}

	/**
	 * @private
	 * Sends the training output, also posts a message back to the client.
	 */
	function sendOutput(output) {
		NCHAINS.Ajax.request({
			url: '../../../../api/sendOutput',
			jsonData: output,
			method: 'get',
			callback: function (response, options) {
				self.postMessage(JSON.stringify(output));
			}
		});
	}

	// PUBLIC
	return {
		/**
		 * Starts the chain of execution
		 */
		execute: function () {
			getInput();
		}
	};

}());
