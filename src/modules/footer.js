(() => {
	const content = `<button class="button" id="switchTheme" onclick="switchTheme()">Switch light/dark mode</button>
	<div class="footerLinks">
		<button type="button" onclick="showSettings()">Settings</button>
		<a href='./about.html' id="about">About</a>
		<a href='https://docs.google.com/forms/d/e/1FAIpQLSdXFIaHbeCWVsiaeIvcJL0A3aWiB5tQQFf2ofg0dr7lOkDChQ/viewform' rel='noreferrer noopener' target='_blank'>Feedback Form</a>
	</div>
	<dialog id="settings" class="modal-content content">
		<h2 class="title is-4">Global Preload Values</h2>
		<div class="table">
			<div class="tableCell text">
				<label>Civ:</label>
			</div>
			<div class="tableCell data">
				<select id="civDefault" data-store="civInput">
					<option value="GHub">GHub</option>
					<option value="CalHub">CalHub</option>
					<option value="EisHub">EisHub</option>
				</select>
			</div>
			<div class="tableCell text">
				<label for="discoveredlinkDefault">Discoverer wiki account:</label>
			</div>
			<div class="tableCell data">
				<input id="discoveredlinkDefault" type="text" data-store="discoveredlinkInput builderlinkInput ownerlinkInput">
			</div>
			<div class="tableCell text">
				<label for="discoveredDefault">Discoverer alias if no wiki:</label>
			</div>
			<div class="tableCell data">
				<input id="discoveredDefault" type="text" data-store="discoveredInput builderInput ownerInput">
			</div>
			<div class="tableCell text">
				<label>Platform:</label>
			</div>
			<div class="tableCell data">
				<select id="platformDefault" data-store="platformInput">
					<option value="PC">PC</option>
					<option value="PS">PlayStation</option>
					<option value="XB">Xbox</option>
					<option value="NS">Switch</option>
				</select>
			</div>
			<div class="tableCell text">
				<label>Chapter:</label>
			</div>
			<div class="tableCell data">
				<select id="researchteamDefault" data-store="researchteamInput">
				</select>
			</div>
			<div class="tableCell text">
				<div class="label-combo">
					<label for="portalglyphsDefault">Portalglyphs:</label>
					<button class="button is-small is-danger" type="button" data-input-bind="portalglyphsDefault" onclick="deleteCharacter(this)">&larr;
						Delete</button>
				</div>
			</div>
			<div class="tableCell data">
				<input type="text" id="portalglyphsDefault" maxlength="12" data-store="portalglyphsInput">
			</div>
			<div class="tableHeader data">
				<div id="settingsPortalglyphButtons" class="portalglyphButtons"></div>
				<output id="settingsPortalglyphsPreview" class="glyph portalglyphsPreview"></output>
			</div>

		</div>
		<form method="dialog">
			<button class="button is-primary" type="submit" onclick="updateDefaultValues()">Set</button>
			<button class="button is-danger" type="submit" autofocus>Cancel</button>
			<button class="button is-warning" type="reset" onclick="restoreDefaults()">Restore Defaults</button>
		</form>
	</dialog>`;

	if (typeof globalElements == 'undefined') {
		document.getElementById('footer').innerHTML = content
	} else {
		globalElements.output.footer.innerHTML = content;
	}

	// determines if the user has a set theme
	let theme = localStorage.getItem('theme') ?? 'light';    //default to light
	// local storage is used to override OS theme settings
	if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// OS theme setting detected as dark
		theme = 'dark';
	}

	// if dark theme is preferred, set document with a `data-theme` attribute
	if (theme == 'dark') document.documentElement.dataset.theme = 'dark';

	if (!localStorage.getItem('theme')) localStorage.setItem('theme', theme);

	const about = document.getElementById('about');
	if (about.href == window.location) about.remove();
})();

// function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme() {
	document.documentElement.dataset.transition = 'true';
	if (localStorage.getItem('theme') == 'light') {
		localStorage.setItem('theme', 'dark');
		document.documentElement.dataset.theme = 'dark';
	} else {
		localStorage.setItem('theme', 'light');
		document.documentElement.dataset.theme = 'light';
	}

	// adding delay to allow the CSS transition to complete. This is only for Chrome, Firefox would work with any timeout (even 0) #chromesucks
	setTimeout(() => {
		delete document.documentElement.dataset.transition;
	}, 400);
}

// custom global settings
const footerElements = {
	input: {
		settings: 'settings',
	}
};
(() => {
	const inputs = document.querySelectorAll('footer dialog .data>*');
	inputs.forEach(input => footerElements.input[input.id] = input.id);
	updateGlobalElements(footerElements);
	footerElements.inputs = inputs
	addPortalGlyphButtons(globalElements.input.settingsPortalglyphButtons, 'portalglyphsDefault');

	// define dialog internal logic
	const settingsElementFunctions = {
		civDefault: '[researchTeamDropdown(globalElements.input.researchteamDefault, this.value)]',
		discoveredDefault: '[hideDiscoverer("discoveredDefault", "discoveredlinkDefault")]',
		discoveredlinkDefault: '[hideDiscoverer("discoveredlinkDefault", "discoveredDefault")]',
		portalglyphsDefault: '[glyphInputOnChange(this); document.getElementById("settingsPortalglyphsPreview").value = validateGlyphs(this.value)]',
	}
	assignElementFunctions(settingsElementFunctions);
})();


// shows modal
function showSettings() {
	const dialog = globalElements.input.settings;
	dialog.style.scale = '0';
	dialog.showModal();
	dialog.style.scale = '1';
	dialog.scrollTo(0, 0);

	const settings = JSON.parse(localStorage.getItem('defaultSettings')) ?? new Object;
	for (const setting in settings) {
		const input = dialog.querySelector(`.data [data-store="${setting}"]`);
		if (!input) continue;
		input.value = settings[setting];
		switch (input.id) {
			case 'civDefault':
				input.onchange();
				break;
			case 'portalglyphsDefault':
				executeOnInput(input)
		}
	}
	hideDiscoverer();
}

// called when user submits values. Stores entered values in localstorage
function updateDefaultValues() {
	const settings = new Object;

	const inputs = footerElements.inputs;
	for (const input of inputs) {
		const value = input?.value;
		if (!value) continue;
		const store = input?.dataset?.store;
		settings[store] = sanitiseString(value);
	}

	localStorage.setItem('defaultSettings', JSON.stringify(settings));
}

// called on pageload and on reset. Populates inputs with values before the code automation kicks in
function readDefaultValues() {
	const settings = JSON.parse(localStorage.getItem('defaultSettings')) ?? new Object;
	for (const setting in settings) {
		const input = (() => {
			if (setting.split(' ').length > 1) {
				return setting.split(' ').map(id => document.getElementById(id)).find(element => element);
			} else {
				return document.getElementById(setting);
			}
		})();
		if (input) {
			input.value = settings[setting];

			switch (setting) {
				case 'civInput':
					pageData.civShort = settings[setting];
					researchTeamDropdown();
					break;
				case 'portalglyphsInput':
					executeOnInput(input);
					break;
			}
		}
	}
}

// called when user resets custom globals. Sets all dialog options back to default
function restoreDefaults() {
	const inputs = footerElements.inputs;
	for (const input of inputs) {
		if (input?.value == undefined) continue;
		if (input.tagName.toLowerCase() == 'select') {
			input.value = input.options?.[0]?.value;
		} else {
			input.value = '';
		}
	}
	hideDiscoverer();
}