importScripts('Ajax.js');
importScripts('brain-0.6.0.js');

var NCHAINS = (function (my) {
	my.Executor = (function () {
		var Executor = function () { };
		Executor.prototype = {

			/**
			 * Gets input from the server.
			 */
			getInput: function () {	
				NCHAINS.Ajax.request({
					url: 'api/getInput',
					method: 'get',
					callback: function (response, options) {
						var result = JSON.parse(response.responseText);
						this.train(this._parseInput(result));
					},
					scope: this
				});
			},

			/**
			 * Parses the input and puts it into brain.js format
			 */
			_parseInput: function (input) {
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
			},

			/**
			 * Trains the neural network with input
			 */
			train: function (input) {
				var net = new brain.NeuralNetwork();
				this.sendOutput(net.train(input));
			},

			/**
			 * Sends the training result
			 */
			sendOutput: function (output) {
				NCHAINS.Ajax.request({
					url: 'api/sendOutput',
					jsonData: output,
					method: 'get',
					callback: function (response, options) {
						self.postMessage(JSON.stringify(output));
					}
				});
			}
		};
		return new Executor();
	}());
	return my;
}(NCHAINS || {}));

self.addEventListener('message', function(evt) {
	NCHAINS.Executor.getInput();
});
