loadModules.push(async function(command, terminal) {
	if (command !== "e") return false;
	await term.echo("EA Sports", { typing: true, delay: 100 });
	await term.echo("It's in the Game!", { typing: true, delay: 50 });
	return true;
});