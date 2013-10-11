var NCHAINS = {},
	io,
	brain,
	fs,
	data;

io = require('socket.io').listen(8888);
brain = require('brain');
fs = require('fs');

NCHAINS.Application = (function () {

	data = require('./Data');

	var dataController = new data.DataController(fs);

	// set up listeners
	io.sockets.on('connection', function (socket) {
		// when connected parcel some data out
		console.log('Connection recieved, parcelling data...');
		parcelData(socket);

		// socket event listeners
		socket.on('returnData', onReturnData);
	});

	/**
	 * @private
	 * Returns a portion of data to the client for processing
	 */
	function parcelData(socket) {
		dataController.readData('input.dat', function (myData) {
			socket.emit('parcelData', myData);
		});
	}

	/**
	 * @private
	 * Recieves the neural network, and runs the neural network on the mock data input.
	 */
	function onReturnData(myData) {
		console.log('Recieved data from client...');

		var net = new brain.NeuralNetwork();
		
		net.fromJSON(myData);

		dataController.readData('input.dat', function (myData) {
			var input = dataController.formatOutput(myData),
				output = net.run(input);
			
			console.log('Saving processed data...');
			dataController.writeData('output.dat', JSON.stringify(output));
		});
	}

	return this;
}());

