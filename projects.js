// why not json?
//i'm lazy. why you bother checking here?
//just realized people won't be able to fetch this data :|
window.projectList = [
	{
		id: "presencex",
		type: "large",
		projectType: "Program",
		images: [
			{
				link: "https://media.discordapp.net/attachments/1119951360293613638/1119951885932179537/image.png",
				text: "PresenceX",
			},
		],
		icon: {
			link: "https://cdn.discordapp.com/attachments/1119951360293613638/1119951360503332925/app-icon.png",
			text: "P",
		},
		name: "PresenceX",
		description: "a powerful discord rich presence",
		details: "this project is made to expand my knowledge on program development.  \nNo Details yet.",
		tags: [
			{ label: "In-Development" },
			{ label: "Alpha" },
		],
		buttons: [
			{ type: "download", label: "Download", link: "https://AmeerDotEXE.github.io/PresenceX/" },
		]
	},
	{
		id: "roblokis",
		type: "large",
		projectType: "Web Extension",
		images: [
			{
				link: "https://lh3.googleusercontent.com/ihBd4W4EzcUZ7X8nUHONK8I8c2uY1YKunm1NxM4Q8c-6e_pK0BDJQup_jPoHjS2ms8bjTb-pp6hOeqxfEEK7-J4qBw=w640-h400-e365-rj-sc0x00ffffff",
				text: "Roblokis",
			},
		],
		icon: {
			link: "https://media.discordapp.net/attachments/1114223568599924806/1114223568725749870/8WhzqMb-oCfDpx5tkeZTP4fEyC0_HRVdTXPAw0wUYdVwfFmfr0oMR9AfGkvkWEuWz_dArEcnNHU9dN3KfqFDdZvPw128-h128-e365-rj-sc0x00ffffff.png",
			text: "Rkis",
		},
		name: "Roblokis",
		description: "an extension to design your own custom theme for roblox website.",
		details: "",
		tags: [
			{ label: "Maintained" },
		],
		buttons: [
			{ type: "link", label: "Visit", link: "https://ameerdotexe.github.io/roblokis/" },
			{ type: "download", label: "Download", link: "https://chrome.google.com/webstore/detail/roblokis/olofnhaecbnacbmgcknhcnacnffepkij?hl=en-US" },
		]
	},
	{
		id: "this-site",
		projectType: "Web Site",
		images: [],
		icon: {
			text: "📄",
		},
		name: "Personal Website",
		description: "this current website.",
		details: "I needed an archive for my projects, so I decided to create this site.\n\n## Designs\n---\n\nI did a little research on personal websites in the progress I got some inspiration from some portfolios.\n\nI got the card design idea from [my extenstion Roblokis](/?projectid=roblokis)  \nbut I modified it to work on home page to look a bit wider than the original design.\n\nwhen a project is clicked, I made it show info about the project with a details field written as markdown.\n\n#### Markdown functionality\n\nthe markdown used in this text is actually fully written by `my code`, I hate using libraries for simple functionality. I think they are very bloated with unnecessary operations.\n\n> I created a markdown function to learn a lot about regex.  \n> most basic markdown features are available (except tables)\n\neverything in the function is made with safety in mind,  \nit was made to level up my regex knowledge.\n\n# More\n---\n\nI didn't intend to make this site as a portfolio but let me know if I should.  \ncontact details in home page at the bottom :b\n\nif you want to visit my personal website you can [click here](/)  \nbut if you want to view the result of this project then click the visit button below\n\nas of this point you surely noticed I'm not a writer.  \nand everything above is made to make the project look cool.  \nbut thanks for reading this far :D",
		tags: [
			{ label: "Open-Source" },
		],
		buttons: [
			// { label: "Visit", link: "https://ameerdotexe.github.io/" },
			{ type: "link", label: "Visit", link: "/" },
		]
	},
	{
		id: "leaf",
		projectType: "Game",
		images: [],
		icon: {
			text: "🍃",
		},
		name: "Leaf",
		description: "a game made in 2 days for a game jam.",
		details: "",
		tags: [
			{ label: "Discontinued" },
		],
		buttons: []
	},
	{
		id: "emojis-sim",
		projectType: "Game Bot",
		images: [],
		icon: {
			text: "😎",
		},
		name: "Emojis Simulator",
		description: "a discord bot that had many minigames and mechanics.",
		details: "",
		tags: [
			{ label: "Discontinued" },
			{ label: "Disabled" },
		],
		buttons: []
	},
	{
		id: "color-pasting-tool",
		projectType: "Macro Script",
		images: [],
		icon: {
			text: "🖌",
		},
		name: "Color Pasting Tool",
		description: "an AutoHotKey script that converts images into clicks.",
		details: "",
		tags: [
			{ label: "Discontinued" },
			{ label: "Open-Source" },
		],
		buttons: [
			{ type: "download", label: "Download", link: "https://www.mediafire.com/file/mqc4y03ksue7t4e/Color_Pasting_Tool.zip/file" },
		]
	},
	{
		id: "dir",
		projectType: "Program",
		images: [],
		icon: {
			link: "https://media.discordapp.net/attachments/1114227227257737329/1114227227509407985/discord-avatar-512-0E8D9.png",
			text: "DIR",
		},
		name: "Discord is Rich",
		description: "a basic discord rich presence",
		details: "",
		tags: [
			{ label: "Discontinued" },
			{ label: "Open-Source" },
		],
		buttons: [
			{ type: "link", label: "Github", link: "https://github.com/AmeerDotEXE/DiscordIsRich/tree/open-source" },
			{ type: "download", label: "Download", link: "https://github.com/AmeerDotEXE/DiscordIsRich/" },
		]
	},
];