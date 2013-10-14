module.exports = {
	Image: function (childProcess) {
		var IMG_PROC = 'ping -c 10 www.google.com',
			process;

		this.process = function () {
			console.log('Running image process ->' + IMG_PROC);
			process = childProcess.exec(IMG_PROC, function (error, stdout, stderr) {
				if (error) {
					console.log('Failed to execute the image process -> ' + IMG_PROC);
				}
			});

			process.on('exit', function (code) {
				console.log('Image process exited with code -> ' + code);
			});
		};
	}
};