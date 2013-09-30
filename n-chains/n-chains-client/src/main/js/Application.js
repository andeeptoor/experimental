NCHAINS.namespace('NCHAINS');

NCHAINS.Application = (function () {

	var App = function () { 

		var LOG = NCHAINS.Log.logger('main.Application');

		this.worker = new Worker('src/main/js/worker/Main.js');

		this.worker.addEventListener('message', $.proxy(function (evt) {
			$('p').append('<span>' + evt.data + '</span><br>');
			setTimeout($.proxy(function () {
				this.run();
			}, this), 3000);
		}, this));

		this.initialize = function () {
			LOG.debug('Initializing worker.');
			this.worker.postMessage('GO');
		};

		this.run = function () {
			LOG.debug('Running annother iteration...')
			this.worker.postMessage('run');
		};
	};

	return App;

})();