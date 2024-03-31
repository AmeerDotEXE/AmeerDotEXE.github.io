'use strict';

const projectManager = ((projects = []) => {
	const nullProject = {
		id: 'example',
		type: 'mini',
		projectType: 'Example Object',
		images: [
			{
				link: '',
				text: 'Preview'
			},
		],
		icon: {
			link: '',
			text: 'Icon'
		},
		name: 'Example',
		description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos harum blanditiis.',
		details: "",
		tags: [
			{ label: 'Beta' },
			{ label: 'Open-Source' },
			{ label: 'Discontinued' },
		],
		buttons: [
			{ type: 'normal', label: 'Reload' }
		]
	};

	let projectContainers = {
		large: document.getElementById('large-projects-container'),
		medium: document.getElementById('medium-projects-container'),
		mini: document.getElementById('mini-projects-container'),
		details: document.getElementById('project-details'),
	};

	let projectFormats = {
		details: function(project) {
			let htmlStructure = /*html*/`
				<div class="popup-buttons">
					<button class="button" data-close-btn onclick="document.getElementById('project-popup').classList.remove('show');">X</button>
				</div>
				<div class="icon-bar">
					<div class="icon-holder">
						<div class="image-placeholder"></div>
						<img class="image" alt="A" src="">
					</div>
					<ul class="image-list"></ul>
				</div>
				<div class="details-bar">
					<div class="info">
						<div class="flex" style="margin-bottom: .75rem;">
							<div class="icon-holder avatar-size">
								<div class="image-placeholder"></div>
								<img class="image" alt="A" src="">
							</div>
							<div class="avatar-details">
								<div class="name"></div>
								<div class="project-type"></div>
							</div>
						</div>
						<div class="divider"></div>
						<div class="description"></div>
						<div class="tags"></div>
						<div class="divider"></div>
					</div>
					<div class="details"></div>
					<div class="flex justify-end">
						<div class="buttons"></div>
					</div>
				</div>
			`;
			
			let element = projectContainers.details;
			element.innerHTML = htmlStructure;

			let imagesElement = element.getElementsByClassName('image-list')[0];
			for (let i = 0; i < project.images.length; i++) {
				const image = project.images[i];
				let imageElement = document.createElement('li');
				imageElement.classList.add('image-holder');
				imageElement.innerHTML = `<div class="image-placeholder"></div><img class="image" alt="E" src="">`;

				imageElement.getElementsByClassName('image')[0].src = image.link || '';
				imageElement.getElementsByClassName('image')[0].width = image.width;
				imageElement.getElementsByClassName('image')[0].height = image.height;
				// imageElement.getElementsByClassName('image')[0].alt = image.text || '?';
				imageElement.getElementsByClassName('image-placeholder')[0].textContent = image.text || '?';
				if (image.link || '' !== '') imageElement.getElementsByClassName('image-placeholder')[0].remove();

				imagesElement.appendChild(imageElement);
			}

			element.querySelectorAll('.icon-holder').forEach((iconHolder) => {
				iconHolder.getElementsByClassName('image')[0].src = project.icon?.link || '';
				// iconHolder.getElementsByClassName('image')[0].alt = project.icon?.text || '?';
				iconHolder.getElementsByClassName('image-placeholder')[0].textContent = project.icon?.text || '?';
				if (project.icon?.link || '' !== '') iconHolder.getElementsByClassName('image-placeholder')[0].remove();
			});

			element.getElementsByClassName('project-type')[0].textContent = project.projectType;
			element.getElementsByClassName('project-type')[0].title = project.projectType;
			element.getElementsByClassName('details')[0].innerHTML = project.details ? mdParser(project.details) : 'No Details Yet.';

			projectFormats.commonName(element, project);
			projectFormats.commonDesc(element, project);
			projectFormats.commonTags(element, project);
			projectFormats.commonBtns(element, project);

			const url = new URL(window.location);
			url.searchParams.set('projectid', project.id);
			window.history.replaceState({}, '', url);

			element.querySelector('[data-close-btn]').addEventListener('click', () => {
				const url = new URL(window.location);
				url.searchParams.delete('projectid');
				window.history.replaceState({}, '', url);
			});

			return element;
		},
		large: function(project) {
			let htmlStructure = /*html*/`
				<div class="icon-holder">
					<div class="image-placeholder"></div>
					<img class="image">
				</div>
				<div class="image-holder">
					<div class="image-placeholder"></div>
					<img class="image">
				</div>
				<div class="details">
					<div class="name"></div>
					<div class="description"></div>
					<div class="flex align-end">
						<div class="tags"></div>
						<div class="buttons"></div>
					</div>
				</div>
			`;
			
			let element = document.createElement('li');
			element.classList.add('project', project.type+'-project');
			element.innerHTML = htmlStructure;

			let imageHolder = element.getElementsByClassName('image-holder')[0];
			let displayImage = project.images.find(x => x.link) || project.images[0] || project.icon;
			imageHolder.getElementsByClassName('image')[0].src = displayImage.link || '';
			// imageHolder.getElementsByClassName('image')[0].alt = displayImage.text || '?';
			imageHolder.getElementsByClassName('image-placeholder')[0].textContent = displayImage.text || '?';
			if (displayImage.link || '' !== '') imageHolder.getElementsByClassName('image-placeholder')[0].remove();

			let iconHolder = element.getElementsByClassName('icon-holder')[0];
			iconHolder.getElementsByClassName('image')[0].src = project.icon?.link || '';
			// iconHolder.getElementsByClassName('image')[0].alt = project.icon?.text || '?';
			iconHolder.getElementsByClassName('image-placeholder')[0].textContent = project.icon?.text || '?';
			if (project.icon?.link || '' !== '') iconHolder.getElementsByClassName('image-placeholder')[0].remove();

			projectFormats.commonName(element, project);
			projectFormats.commonDesc(element, project);
			projectFormats.commonTags(element, project);
			projectFormats.commonBtns(element, project);

			element.addEventListener('click', (event) => {
				if (event.target !== null && (event.target.classList.contains('button'))) return;
				if (isMobile() == true && (!(event.target !== null && (event.target.closest('.icon-holder') !== null || event.target.classList.contains('name'))))) return;
				projectFormats.details(project);
				document.getElementById('project-popup').classList.add('show');
			});

			return element;
		},
		medium: function(project) {
			let htmlStructure = /*html*/`
				<div class="image-holder">
					<div class="image-placeholder"></div>
					<img class="image">
				</div>
				<div class="details">
					<div class="name"></div>
					<div class="description"></div>
					<div class="tags"></div>
					<div class="buttons">
						<a class="button">Learn More</a>
					</div>
				</div>
			`;
			
			let element = document.createElement('li');
			element.classList.add('project', 'medium-project');
			element.innerHTML = htmlStructure;

			let imageHolder = element.getElementsByClassName('image-holder')[0];
			let displayImage = project.icon || project.images.find(x => x.link) || project.images[0];
			imageHolder.getElementsByClassName('image')[0].src = displayImage.link || '';
			imageHolder.getElementsByClassName('image-placeholder')[0].textContent = displayImage.text || '?';
			if (displayImage.link || '' !== '') imageHolder.getElementsByClassName('image-placeholder')[0].remove();

			projectFormats.commonName(element, project);
			projectFormats.commonDesc(element, project);
			projectFormats.commonTags(element, project);
			// projectFormats.commonBtns(element, project);
			let moreBtnElement = element.getElementsByTagName('a')[0];
			// moreBtnElement.href = '?project-id='+project.id;

			if (isMobile()) {
				moreBtnElement.addEventListener('click', () => {
					projectFormats.details(project);
					document.getElementById('project-popup').classList.add('show');
				});
			} else {
				element.addEventListener('click', () => {
					projectFormats.details(project);
					document.getElementById('project-popup').classList.add('show');
				});
			}

			return element;
		},
		mini: function(project) {
			let htmlStructure = /*html*/`
				<div class="icon-holder">
					<div class="image-placeholder"></div>
					<img class="image">
				</div>
				<div class="details">
					<div class="name"></div>
					<div class="project-type"></div>
				</div>
			`;
			
			let element = document.createElement('li');
			element.classList.add('project', project.type+'-project');
			element.innerHTML = htmlStructure;

			let imageHolder = element.getElementsByClassName('icon-holder')[0];
			if (typeof project.icon === 'undefined' && project.type !== 'mini') imageHolder.remove();
			imageHolder.getElementsByClassName('image')[0].src = project.icon?.link || project.images?.[0]?.link || '';
			// imageHolder.getElementsByClassName('image')[0].alt = project.icon?.text || '?';
			imageHolder.getElementsByClassName('image-placeholder')[0].textContent = project.icon?.text || '?';
			if (project.icon?.link || project.images?.[0]?.link || '' !== '') imageHolder.getElementsByClassName('image-placeholder')[0].remove();
			
			projectFormats.commonName(element, project);
			
			element.getElementsByClassName('project-type')[0].textContent = project.projectType;
			element.getElementsByClassName('project-type')[0].title = project.projectType;

			element.addEventListener('click', () => {
				projectFormats.details(project);
				document.getElementById('project-popup').classList.add('show');
			});

			return element;
		},
		commonName(element, project) {
			element.getElementsByClassName('name')[0].textContent = project.name;
			element.getElementsByClassName('name')[0].title = project.name;
			return element;
		},
		commonDesc(element, project) {
			element.getElementsByClassName('description')[0].textContent = project.description;
			element.getElementsByClassName('description')[0].title = project.description;
			return element;
		},
		commonTags(element, project) {
			let tagsElement = element.getElementsByClassName('tags')[0];

			for (let i = 0; i < project.tags.length; i++) {
				const tag = project.tags[i];
				let tagElement = document.createElement('div');
				tagElement.classList.add('tag');
				tagElement.textContent = tag.label;
				tagsElement.appendChild(tagElement);
			}

			return element;
		},
		commonBtns(element, project) {
			let buttonsElement = element.getElementsByClassName('buttons')[0];

			for (let i = 0; i < project.buttons.length; i++) {
				const button = project.buttons[i];
				let buttonElement = document.createElement('a');
				buttonElement.classList.add('button', button.type+'-button');
				buttonElement.textContent = button.label;
				buttonElement.href = button.link || '';
				buttonsElement.appendChild(buttonElement);
			}

			return element;
		},
	};

	if (projects == null || projects.length == 0) return;
	projectContainers["mini"].querySelectorAll(".project").forEach((x, i) => {if (i != 0) x.remove();})
	projectContainers["medium"].innerHTML = "";
	projectContainers["large"].innerHTML = "";
	for (let i = 0; i < projects.length; i++) {
		const project = projects[i];
		let projectElement = createProjectElement(project);
		addProjectElement(project.type || 'mini', projectElement);

		let mediumElement = createProjectElement(project, 'medium');
		addProjectElement('medium', mediumElement);
	}

	let projectPopup = document.getElementById('project-popup');
	projectPopup.addEventListener('click', (event) => {
		if (event.target !== projectPopup) return;
		projectPopup.classList.remove('show');

		const url = new URL(window.location);
		url.searchParams.delete('projectid');
		window.history.replaceState({}, '', url);
	});

	if (window.location.href.includes("projectid=")) {
		let projectId = window.location.href.split("projectid=")[1].split("#")[0].split("&")[0];
		let project = projects.find(x => x.id === projectId);
		if  (typeof project === 'undefined' || project === null) return;

		projectFormats.details(project);
		document.getElementById('project-popup').classList.add('show');
	}

	function createProjectElement(project, type) {
		project = {...nullProject, ...project};
		let element = projectFormats[type || project.type]?.(project);

		return element;
	}

	function addProjectElement(type, projectElement) {
		projectContainers[type].appendChild(projectElement);
	}
})(window.projectList);

let executeButton = document.querySelector('.code-execute');
if (executeButton !== null) {
	executeButton.addEventListener('click', () => {
		let parentElement = executeButton.parentElement;
		executeButton.remove();

		let tech = window.getTech().technologies;
		let codeBlock = document.createElement('div');
		codeBlock.classList.add('code-block', 'executed');

		tech.forEach((techName, techIndex) => {
			let techElement = document.createElement('span');
			techElement.classList.add('string');
			techElement.textContent = '"'+techName+'"';

			let dividerElement = document.createElement('span');
			dividerElement.classList.add('curly-parants');
			dividerElement.textContent = ', ';

			codeBlock.appendChild(techElement);
			if (tech.length - 1 !== techIndex) codeBlock.appendChild(dividerElement);
		});

		parentElement.appendChild(codeBlock);
	});

	let isButtonLeft = true;
	let hoverTroll = (text, callback, options) => (() => {
		executeButton.textContent = text;

		if (typeof callback != 'function') return;
		executeButton.addEventListener('mouseover', () => {
			if (options && options.left) {
				executeButton.style.left = options.left+'%';
				executeButton.style.transform = 'translate(-'+options.left+'%, 0)';
				if (options.isButtonLeft) isButtonLeft = options.isButtonLeft;
			}
			else {
				executeButton.style.left = isButtonLeft ? '100%' : '';
				executeButton.style.transform = isButtonLeft ? 'translate(-100%, 0)' : 'translate(0, 0)';
				isButtonLeft = !isButtonLeft;
			}
			callback();
		}, { once: true });
	});
	let troll = hoverTroll('Try Function',
		hoverTroll('Try',
			hoverTroll('Huh?',
				hoverTroll('Try again',
					hoverTroll('oops?',
						hoverTroll('Execute')
					)
				)
			), {left: 50}
		)
	);
	troll();
}
window.getTech = (language) => ({
	technologies: [
		"Unity",
		"Discord Bots",
		"Backend Servers",
		"Automation",
		"API Usage and Creation",
		"Web Scraping",
		"DOM Manipulation",
		"Web Extensions",

		"Tauri",
	],
});

setupSite();





function setupSite() {
	setupSelectedPage();
	setupNavbarListeners();
	setupContactButtons();


	//hide loader
	let loaderElement = document.querySelector('.site-loader');
	loaderElement.style.transition = 'opacity 150ms';
	loaderElement.style.opacity = '0';
	setTimeout(() => {
		loaderElement.style.display = 'none';
	}, 150);
}

function setupNavbarListeners() {
	document.querySelectorAll('.site-navbar .navbar-center > *')
	.forEach((navButton, btnIndex, navbuttons) => {
		navButton.addEventListener('click', () => {
			if (navButton.classList.contains('selected')) return;

			navbuttons.forEach(btn => btn.classList.remove('selected'));
			navButton.classList.add('selected');

			let page = navButton.getAttribute('page');

			document.querySelectorAll('.site-content > .page')
			.forEach((pageElement) => {
				pageElement.classList.toggle('show', pageElement.id === page);
			});
		});
	});
}

function setupSelectedPage() {
	let section = window.location.hash;
	let sectionId = section.startsWith('#') ? section.slice(1) : section;
	if (sectionId === '') return;

	let sectionElement = document.getElementById(sectionId);
	if (sectionElement === null) return;

	let containedPageElement = sectionElement.closest('.page');
	if (containedPageElement === null) throw ReferenceError('page with section: '+section+' does not exist');
	
	//update nav btns
	document.querySelector('.site-navbar .button.selected')?.classList.remove('selected');
	document.querySelector(`a[href="${section}"]`)?.classList.add('selected');

	document.querySelectorAll('.site-content > .page')
	.forEach((pageElement) => {
		pageElement.classList.toggle('show', pageElement === containedPageElement);
	});
}

function setupContactButtons() {
	let mailBtn = document.getElementById('my-mail');
	mailBtn.style.cursor = "pointer";
	mailBtn.addEventListener('click', () => {
		mailBtn.textContent = "ameer"+"khalid"+"193"+"@"+"gmail.com";
		mailBtn.title = "My business mail";
		setTimeout(() => {
			mailBtn.href = "mailto:"+mailBtn.textContent;
		});
	}, {once: true});
}


// Copyright AmeerDotEXE
//   for private use only!
//   redistrbution not allowed
// credit me when using this function
function mdParser(markdown) {
	const parseMarkdownPart = function(mdPart, exludeList = []) {
		if (typeof mdPart !== "string") return "";
		const elementsList = ["header", "paragraph", "blockquote", "li"];

		if (!exludeList.includes("header") && /^#{1,6} [^]+/.test(mdPart)) {
			let headerSize = mdPart.split(" ")[0].split("#").length - 1;
			let headerText = mdPart.split(" ").slice(1, mdPart.endsWith("#") ? -1 : mdPart.length).join(" ");
			// if (headerText.endsWith("#")) headerText = headerText.split(" ").slice(0, -1).join(" ");
			exludeList.push(...elementsList);
			let styledHeader = parseMarkdownPart(headerText, exludeList);
			return `<h${headerSize}>${styledHeader}</h${headerSize}>`;
		}
		else if (!exludeList.includes("header") && /[^]+\n(=|-)+$/.test(mdPart)) {
			let headerSize = mdPart.split("\n").slice(-1)[0].includes("=") ? 1 : 2;
			let headerText = mdPart.split("\n").slice(0, -1).join("\n");
			exludeList.push(...elementsList);
			let styledHeader = parseMarkdownPart(headerText, exludeList);
			return `<h${headerSize}>${styledHeader}</h${headerSize}>`;
		}
		else if (!exludeList.includes("blockquote") && mdPart.split("\n").every(x => x.startsWith("> ") || x === ">")) {
			let blockquoteText = mdPart.split("\n").map(x => /^( |>)( .*)?$/.test(x) ? x.slice(2) : x).join("\n");
			let newMarkdownParts = blockquoteText.split("\n\n");
			let styledBlockquote = "";
			for (let index = 0; index < newMarkdownParts.length; index++) {
				const newMarkdownPart = newMarkdownParts[index];
				styledBlockquote += parseMarkdownPart(newMarkdownPart, exludeList);
			}
			return `<blockquote>${styledBlockquote}</blockquote>`;
		}
		else if (!exludeList.includes("li") && /^(?:\*|-|\+|\d+\.) (.+(?:\n .*)*)/g.test(mdPart)) {
			let listElements = mdPart.split(/^(?:\*|-|\+|\d+\.) /gm).map(x => ("  "+x).split("\n").map(x => x.slice(2)).join("\n")).slice(1);
			exludeList.push("paragraph");
			let styledlistElements = "";
			for (let elementIndex = 0; elementIndex < listElements.length; elementIndex++) {
				const listElement = listElements[elementIndex];
				let newMarkdownParts = listElement.split("\n\n");
				if (/^(?:\*|-|\+|\d+\.) /g.test(listElement.split("\n")[1])) newMarkdownParts = [listElement.split("\n")[0], listElement.split("\n").slice(1).join("\n")]
				let styledListElement = newMarkdownParts.map(x => parseMarkdownPart(x, exludeList)).join("<br>");
				styledlistElements += `<li>${styledListElement}</li>`;
			}
			let listType = /^\d+\. /.test(mdPart) ? "ol" : "ul";
			return `<${listType}>${styledlistElements}</${listType}>`;
		}

		else if (!exludeList.includes("paragraph")) {
			exludeList.push("paragraph");
			let styledParagraph = parseMarkdownPart(mdPart, exludeList);
			return `<p>${styledParagraph}</p>`;
		}

		let result = escapeHTML(mdPart)
			.replace(/^ *(-|_|\*) *(?:\1 *){2,}$/gm, "<hr>")

			.replace(/\*\*([^\*]+)\*\*/g, "<strong>$1</strong>")
			.replace(/\*([^\*]+)\*/g, "<em>$1</em>")

			// .replace(/(?:-|\+) .+(?:\n(?: |-|\+).*)*/g, "<ul>$&</ul>")
			// .replace(/\d+\. .+(?:\n(?: |\d+\.).*)*/g, "<ol>$&</ol>")
			// .replace(/(?:\*|-|\+|\d+\.) (.+(?:\n .*)*)/g, "<li>$1</li>")

			.replace(/!\[([^\]]+)\]\(([^\) "']+)\)/g, '<img src="$2" alt="$1">')
			.replace(/!\[([^\]]+)\]\(([^\) "']+)(?: "([^"']*)")?\)/g, '<img src="$2" alt="$1" title="$3">')

			.replace(/&lt;(http[^" '>]+)&gt;/g, '<a href="$1">$1</a>')
			.replace(/&lt;(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)&gt;/g, '<a href="mailto:$1">$1</a>')
			.replace(/\[([^\]]+)\]\(([^\) "']+)\)/g, '<a href="$2">$1</a>')
			.replace(/\[([^\]]+)\]\(([^\) "']+)(?: "([^"']*)")?\)/g, '<a href="$2" title="$3">$1</a>')

			.replace(/___([^_>]+)___(?![^<]+>)/g, "<em><strong>$1</strong></em>")
			.replace(/__([^_>]+)__(?![^<]+>)/g, "<strong>$1</strong>")
			.replace(/_([^_>]+)_(?![^<]+>)/g, "<em>$1</em>")

			.replace(/```\n?([^```]+)```/g, "<pre><code>$1</code></pre>")
			.replace(/```(\w+)\n([^```]+)```/g, `<pre><code lang="$1">$2</code></pre>`)
			.replace(/`([^`]+)`/g, "<code>$1</code>")

			// .replace("\n", "<br>")
			.replace(/  \n/g, "<br>")
			.trim()
		;
		// console.log(result);
		return result;
	}

	let mdParts = markdown.split("\n\n");
	return mdParts.map(mdPart => parseMarkdownPart(mdPart.trim())).join("");
}

function escapeHTML(...text) {
	let temp = document.createElement('div');
	temp.textContent = text.join('');
	let result = temp.innerHTML;
	temp.remove();
	return result;
}

//http://detectmobilebrowsers.com/
function isMobile() {
	let a = navigator.userAgent || navigator.vendor || window.opera;
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) return true;
	return false;
}
