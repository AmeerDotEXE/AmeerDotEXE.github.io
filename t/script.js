const loadModules = [];

const greetingTemplate = `    _                             
   / \\   _ __ ___   ___  ___ _ __ 
  / _ \\ | '_ \` _ \\ / _ \\/ _ \\ '__|
 / ___ \\| | | | | |  __/  __/ |   
/_/   \\_\\_| |_| |_|\\___|\\___|_|   `;

$(function() {
	window.term = $('#terminal').terminal(function(command, term) {
		if (loadModules.length == 0) return;

		for (let index = 0; index < loadModules.length; index++) {
			const loadModule = loadModules[index];
			if (loadModule(command, term)) break;
		}
	}, {
		greetings: greetingTemplate+"\n",
		memory: true,
		exit: false,
		onClear: function(term) {setTimeout(() => {term.greetings();}, 1);},
		name: "ameer-portfolio",
	});
});

async function delay(ms) {
	await new Promise((resolve, reject) => {
		setTimeout(resolve, ms);
	});
}