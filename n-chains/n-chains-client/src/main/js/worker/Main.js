importScripts('../lib/brain-0.6.0.js');

importScripts('_def.js');
importScripts('Execution.js');
importScripts('../core/Ajax.js');

self.addEventListener('message', function(evt) {
	NCHAINS.Execution.execute();
});