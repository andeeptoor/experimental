module.exports = {
	DataController: DataController
};

/**
 * @class DataController
 * @param File System object.
 */
function DataController(fs) {
	this.fs = fs; 
	this.INPUT_DIR = '../resources/input/';
	this.OUTPUT_DIR = '../resources/output/';

	/**
	 * Reads data from the specified file and returns the data object.
	 * @return data object.
	 */
	this.readData = function (filename, callback, scope) {
		var that = this,
			data,
			filepath = this.INPUT_DIR + filename;
		
		this.fs.readFile(filepath, 'utf8', function (err, data) {
			if (err) {
				console.error(err.stack);
				console.error('Error reading file -> ' + filepath);
			} else {
				callback.call(scope, that.formatInput(JSON.parse(data)));
			}
		});
	};

	/**
	 * Writes the data object to the specified output filename.
	 * @param The name of the file.
	 * @param The data object to write.
	 */
	this.writeData = function (filename, data) {
		var filepath = this.OUTPUT_DIR + filename;

		this.fs.writeFile(filepath, JSON.stringify(data), function (err, data) {
			if(err) {
				console.error('Error writing file -> ' + filepath);
			} else {
				console.log('Saved ' + filepath + '!');
			}
		});

	};

	/**
	 * Formats the data into the brain.js training format.
	 */
	this.formatOutput = function (data) {
		data = data[0];
		data = data.input;
		var result = [],
			i,
			end;
		
		for (i = 0, end = data.length; i < end; i++) {
			result.push(data[i]);
		}
		
		return result;
	};

	/**
	 * Formats data for brain.js input format.
	 */
	this.formatInput = function (data) {
		var result = [];
		for (key in data) {
			if (data.hasOwnProperty(key)) {
				result.push(data[key]);
			}
		}
		
		return [{ input: result, output: result }];
	};
}

