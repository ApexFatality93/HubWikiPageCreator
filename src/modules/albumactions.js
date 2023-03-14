// The logic for calculating the link target should be done by the main JS file of the page
const albumElements = {
	output: {
		albumCiv: 'albumCiv',
		album: 'album',
		albumType: 'albumType',
		albumHeaderName: 'albumHeaderName',
		albumImage: 'albumImage',
		albumName: 'albumName',
		albumOther: 'albumOther',
		albumGlyphs: 'albumGlyphs',
		albumDiscoverer: 'albumDiscoverer',
		albumText: 'albumText',
		albumDesc: 'albumDesc'
	}
};		// this semicolon is necessary, otherwise the code throws an error

(() => {
	const wikitext = `<h3 class="title is-5 has-text-left has-text-weight-bold mb-2"><output id="albumCiv"></output>
<output id="album" name="type"></output> <output id="albumType"></output> entry for <output id='albumHeaderName' name="name"></output>:
</h3>
<div id="albumText" class="wikiText">
| {{album| file=<output name="image" id="albumImage"></output> | name=[[<output id="albumName"></output>]]
| other=<output id="albumOther"></output> | glyph=<output id='albumGlyphs' name="portalglyphs"></output> |
<output id="albumDiscoverer"></output>}} <output id="albumDesc"></output>
</div>`

	const actions = `<button id="albumBtn" class="button is-outlined is-primary"
onclick="copyCode(this, 'albumText')">
Copy album wikicode
</button>
<a class="button is-outlined is-primary" id="albumLink"
onclick="albumLink(this)">
Open Album
</a>`
	if (globalElements.output.albumEntry) globalElements.output.albumEntry.innerHTML = wikitext;
	if (globalElements.output.albumActions) globalElements.output.albumActions.innerHTML = actions;
	updateGlobalElements(albumElements);

	const albumElementFunctions = {
		civ: ['albumCiv()', null, true],
	}
	assignElementFunctions(albumElementFunctions);
})();

// expects external 'albumLinkGen()' function which returns the PAGENAME of the album
function albumLink(element) {
	element.style.pointerEvents = 'none';
	const catalogue = (() => {
		if (typeof albumLinkGen == 'function') {
			return albumLinkGen();
		} else if (pageData.catalogue) {
			return pageData.catalogue;
		} else {
			console.warn('No wiki page provided. Add the function `albumLinkGen()` to your code or define a catalog in the `pageData.catalogue` property!');
			element.style.pointerEvents = '';
		}
	})();
	if (catalogue) assignLink(element, wikiLink + catalogue);
}

// these functions can be overwritten using by chaining "External" behind their name.
// the external function should return the value that should go into the field.

// the part directly behind the civ in the heading
function albumItemType() {
	const output = (() => {
		if (typeof albumItemTypeExternal == 'function') {
			return albumItemTypeExternal();
		} else {
			return pageData.type;
		}
	})();
	albumElements.output.album.innerText = output;
}

// this is after the album macro, used for MT pages
function albumDesc() {
	const output = (() => {
		if (typeof albumDescExternal == 'function') {
			return albumDescExternal();
		} else {
			return '';
		}
	})();
	albumElements.output.albumDesc.innerText = output;
}

// discoverer in the album
function albumDiscoverer() {
	const output = (() => {
		if (typeof albumDiscovererExternal == 'function') {
			return albumDiscovererExternal();
		} else {
			const discovered = pageData.discovered;
			const discoveredlink = pageData.discoveredlink;
			if (discoveredlink) {
				return `wiki=${discoveredlink}`;
			} else {
				return `discoverer=${discovered}`;
			}
		}
	})();
	albumElements.output.albumDiscoverer.innerText = output;
}

// name of civ in the heading
function albumCiv() {
	const output = (() => {
		if (typeof albumCivExternal == 'function') {
			return albumCivExternal();
		} else {
			return pageData.civShort;
		}
	})();
	albumElements.output.albumCiv.innerText = output;
}

// name of the object in the album
function albumName() {
	const output = (() => {
		if ((typeof albumNameExternal == 'function')) {
			return albumNameExternal();
		} else {
			return pageData.name;
		}
	})();
	albumElements.output.albumName.innerText = output;
}

// "other" parm in the album
function albumOther() {
	const output = (() => {
		if (typeof albumOtherExternal == 'function') {
			return albumOtherExternal();
		} else {
			return '';
		}
	})();
	globalElements.output.albumOther.innerText = output;
}

// third part in the heading, before the "entry"
function albumType() {
	const output = (() => {
		if (typeof albumTypeExternal == 'function') {
			return albumTypeExternal();
		} else {
			return '';
		}
	})();
	albumElements.output.albumType.innerText = output;
}

// wrap all functions from above into one so it can be easier called on pageload
function albumFunctions() {
	albumCiv();
	albumDiscoverer();
	albumName();
	albumOther();
	albumType();
	albumItemType();
	albumDesc();
}