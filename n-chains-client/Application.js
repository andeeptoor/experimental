NCHAINS.namespace('NCHAINS');

NCHAINS.Application = (function () {

	var App = function () { 

		var LOG = NCHAINS.Log.logger('main.Application');


		this.getInput = function () {
			LOG.debug('Getting input...');
			
			$.getJSON('api/getInput', $.proxy(function (data) {
				LOG.debug('received data.');
				this.train(this.parseInput(data));
			}, this));
		};

		this.parseInput = function (data) {
			var result = [],
				vals = [];

			$.each(data, function (key, value) {
				vals.push(value);
			});


			result.push({ input: vals, output: vals });
			return result;
		};

		this.train = function (data) {
			LOG.debug('Training...');

			// TODO: put into a webworker
			var net = new brain.NeuralNetwork(),
				output = net.train(data);

			this.sendOutput(output);
			LOG.debug('Training complete...');
		};

		this.sendOutput = function (output) {
			LOG.debug('Sending output...');

			//TODO: send output to server
			setTimeout($.proxy(function () {
				this._finish();
			}, this), 4000);
		};

		this.initialize = function () {
			LOG.debug('Initializing...');
			this.getInput();
		};

		this._finish = function () {
			LOG.debug('finished, restarting cycle...');
			this.getInput();
		};

	};

	return App;

})();