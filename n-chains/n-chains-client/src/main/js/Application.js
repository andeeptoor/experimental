NCHAINS.namespace('NCHAINS');

NCHAINS.Application = (function () {

	var LOG = NCHAINS.Log.logger('main.Application'),
		worker = new Worker('src/main/js/worker/Main.js'),
		socket = io.connect('http://localhost:8888'),

		onParcelData = function (data) {
			var serializedData = JSON.stringify(data);

			LOG.debug('Data received from server, passing to worker thread.');
			consoleWrite('Data recieved from server, passing to worker thread:');
			consoleWrite(serializedData);

			worker.postMessage(serializedData);
		},

		onReturnData = function (evt) {
			consoleWrite('Passing processed data to server: ');
			consoleWrite(JSON.stringify(evt.data));
			socket.emit('returnData', evt.data);
		},

		consoleWrite = function (message) {
			$('p').append('<span style="color: #ffffff">' + new Date().toTimeString() + ' >> ' + message + '</span><br>');
		};



	// initialize server-side listeners.
	socket.on('parcelData', onParcelData);

	// initialize worker listeners
	worker.addEventListener('message', onReturnData);

	return {
		initialize: function () {
			LOG.debug('Application Initialized!');
			return this;
		}	
	};

})();