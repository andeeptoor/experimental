var NCHAINS = {},
	io,
	brain,
	_data;

io = require('socket.io').listen(8888);
brain = require('brain');
_data = require('./_Data');

NCHAINS.Application = (function () {

	// set up listeners
	io.sockets.on('connection', function (socket) {
		// when connected parcel some data out
		console.log('Connection recieved, parcelling data...');
		socket.emit('parcelData', doParcelData());

		// socket event listeners
		socket.on('returnData', onReturnData);
	});

	/**
	 * @private
	 * Returns a portion of data to the client for processing
	 * (MOCK DATA for now).
	 */
	function doParcelData() {
		console.log('PARCELLED DATA' + JSON.stringify(_data.mockData));
		return _data.formatOutput(_data.mockData);
	}

	/**
	 * @private
	 * Recieves the neural network, and runs the neural network on the mock data input.
	 */
	function onReturnData(data) {
		console.log('Processed data recieved');

		var net = new brain.NeuralNetwork(),
			input,
			output;
		
		net.fromJSON(data);

		input = _data.formatInput(_data.mockData);
		output = net.run(input);

		console.log('Neural Network output -> ');
		console.log(JSON.stringify(output));
	}

	return this;
}());

