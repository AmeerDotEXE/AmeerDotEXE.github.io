(() => {
	loadModules.push(function(command, terminal) {
		if (command !== "driftshift") return false;
		onCommand();
		return true;
	});

	async function onCommand() {
		await term.echo(" \nOur drift mod comes with an ini file that allows you to\ncustomize the effect to your preferences.", { typing: true, delay: 30 });
		await term.echo(" \nIncreasing the friction would cause\nthe vehicle to slow down when driving sideways\nand the vehicle would start going sideways.", { typing: true, delay: 30 });
		await term.echo(" \nAs for the angular control, the higher value would make\nthe vehicle spin when steering.\nthis allows the vehicle to recover from oversteering.", { typing: true, delay: 30 });
		await term.echo(" \nAdditionally you can choose one of the 2 available control options;\n  - Hold Shift to Drift\n  - Trigger Shift to Drift\n \nCheat codes to aquire them are accordingly:\n \n	> HoldMeSideways\n	> Sideways\n \nPreferebly you can get the drift system by\nusing our modpack's garage mod, although its a bit costy.\n ", { typing: true, delay: 30 });
	}
})();