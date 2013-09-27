NCHAINS.namespace('NCHAINS');

NCHAINS.Application = (function () {

	var App = function () { 

		var LOG = NCHAINS.Log.logger('main.Application');

		this.getInput = function () {
			LOG.debug('Getting input...');
			
			setTimeout($.proxy(function () {
				this.train();
			}, this), 4000);
		};

		this.train = function () {
			LOG.debug('Training...');

			setTimeout($.proxy(function () {
				this.sendOutput();
			}, this), 4000);
		};

		this.sendOutput = function () {
			LOG.debug('Sending output...');

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