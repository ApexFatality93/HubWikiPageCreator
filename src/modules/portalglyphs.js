const validPortalKeys = '0123456789ABCDEF';

function addPortalGlyphButtons(element) {
	if (!element) return;
	const glyphs = new Array;
	for (const letter of validPortalKeys) {
		const glyph = `<button type="button" class="button" value="${letter}" onclick="glyphOnClick(this)"><span class="glyph icon is-small">${letter}</span></button>`;
		glyphs.push(glyph);
	}
	element.innerHTML = glyphs.join('');
}
addPortalGlyphButtons(globalElements.output.portalglyphButtons);

function executeOnInput() {
	globalElements.input.portalglyphsInput.oninput.call(globalElements.input.portalglyphsInput);
}

function glyphOnClick(button) {
	const input = globalElements.input.portalglyphsInput;
	const portalCode = input.value;

	if (portalCode.length < 12) {
		input.value += button.value;
	}
	executeOnInput();
}

function displayGlyphs() {
	const input = globalElements.input.portalglyphsInput;
	const glyphString = input.value;
	pageData.portalglyphs = glyphString;
	const dest = input.dataset.destNoauto;
	wikiCode(glyphString, dest);
	glyphRegion(glyphString);
	try { wikiCode(glyphs2Coords(glyphString), "galacticCoords") } catch (error) { /* do nothing */ }
}

function deleteCharacter() {
	const enteredGlyphs = globalElements.input.portalglyphsInput.value.split('');
	enteredGlyphs.pop();
	const newString = enteredGlyphs.join('');
	globalElements.input.portalglyphsInput.value = newString;
	executeOnInput();
}

function glyphInputOnChange(input) {
	const newValue = input?.value?.toUpperCase?.();
	if (newValue == null) return;

	input.value = newValue
		.split('')
		.filter(char => validPortalKeys.includes(char))
		.join('')
		.substring(0, 12);
	displayGlyphs();
}

function glyphRegion(glyphs) {
	const glyphElement = globalElements.input.portalglyphsInput;
	const civ = pageData.civShort;
	const regionList = regions[civ];
	let region = '';
	if (glyphs?.length == 12) {
		const regionGlyphs = glyphs.substring(4);
		region = regionList[regionGlyphs];
	}
	if (region == undefined) {
		errorMessage(glyphElement, 'No valid Hub region. See <a href="https://nomanssky.fandom.com/wiki/Galactic_Hub_Regions" target="_blank" rel="noopener noreferrer">Galactic Hub Regions</a> for a list of valid regions.');
	} else {
		errorMessage(glyphElement);
	}
	wikiCode(region ?? '', 'region');
}

function glyphs2Coords(glyphs) {
	if (glyphs.length != 12) return '';

	const X_Z_POS_SHIFT = 2049;
	const X_Z_NEG_SHIFT = 2047;
	const Y_POS_SHIFT = 129;
	const Y_NEG_SHIFT = 127;

	const x_glyphs = parseInt(glyphs.substring(9, 12), 16);
	const y_glyphs = parseInt(glyphs.substring(4, 6), 16);
	const z_glyphs = parseInt(glyphs.substring(6, 9), 16);
	const system_idx = glyphs.substring(1, 4);

	let coords_x = 0;
	let coords_y = 0;
	let coords_z = 0;

	if (x_glyphs >= X_Z_POS_SHIFT) {
		coords_x = x_glyphs - X_Z_POS_SHIFT;
	} else {
		coords_x = x_glyphs + X_Z_NEG_SHIFT;
	}

	if (z_glyphs >= X_Z_POS_SHIFT) {
		coords_z = z_glyphs - X_Z_POS_SHIFT;
	} else {
		coords_z = z_glyphs + X_Z_NEG_SHIFT;
	}

	if (y_glyphs >= Y_POS_SHIFT) {
		coords_y = y_glyphs - Y_POS_SHIFT;
	} else {
		coords_y = y_glyphs + Y_NEG_SHIFT;
	}

	const coordinates = new Array(4);

	coordinates[0] = coords_x.toString(16).toUpperCase().padStart(4, '0');
	coordinates[1] = coords_y.toString(16).toUpperCase().padStart(4, '0');
	coordinates[2] = coords_z.toString(16).toUpperCase().padStart(4, '0');
	coordinates[3] = system_idx.padStart(4, '0');

	return coordinates.join(':');
}