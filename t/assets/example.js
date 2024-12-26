(() => {
	loadModules.push(function(command, terminal) {
		if (command !== "e") return false;
		onCommand();
		return true;
	});

	async function onCommand() {
		await term.echo("EA Sports", { typing: true, delay: 100 });
		await term.echo("It's in the Game!", { typing: true, delay: 50 });
	}
})();