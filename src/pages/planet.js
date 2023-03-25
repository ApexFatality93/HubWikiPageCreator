function planetStartupFunctions() {
	moonList();
}

const planetElements = {
	input: {
		moonInputs: 'moonInputs',
	},
	output: {
	}
}
updateGlobalElements(planetElements);

/**
 * Add a new section for adding a moon to a planet.
 * @param {HTMLElement} element - The element that triggered the addition of the moon section.
 * @returns {void}
 */
function addMoon(element) {
	const inputSection = element.parentElement;
	const elementList = document.querySelectorAll('[data-moon]');
	const childIndex = getChildIndex(elementList, 'dataset.moon');
	const moon_input = 'moon_input' + childIndex;

	const inputHTML = `<div class="tableCell text removable" data-moon="section${childIndex}">
		<button class="button is-outlined is-danger icon is-small" title="Remove moon" type="button" onclick="removeSpecificSection('section${childIndex}', 'moon'); enableMoonAdd()">&#10006</button>
		<label for="${moon_input}">Moon name:</label>
	</div>
	<div class="tableCell data" data-moon="section${childIndex}">
		<input type="text" id="${moon_input}" oninput="moonList()">
	</div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML);

	const moonInputSectionCount = document.querySelectorAll('[data-moon]').length / 2;

	// enter the number of sections you want to allow behind the ">" operator.
	if (moonInputSectionCount + 1 > 2) {
		element.disabled = true;
	}
}

/**
 * Enables the add button for moonInputs and triggers the moonList function
 * @function
 * @returns {void}
 */
function enableMoonAdd() {
	const addButton = globalElements.input.moonInputs.querySelector('button');
	addButton.disabled = false;
	moonList();
}

/**
* Populates the moon list in the output with the current values of the moonInputs.
* @function moonList 
* @returns {undefined}
*/
function moonList() {
	const moonInputs = document.querySelectorAll('[data-moon] input');
	const moons = new Array;
	for (const input of moonInputs) {
		if (input.value) moons.push(`[[${sanitiseString(input.value)}]]`);
	}

	globalElements.output.moonList.innerText = moons.join(', ');
	pageData.moons = moons;
	moonSentence()
}

/**
 * Generates a sentence describing the moons of the current planet.
 * @function
 * @returns {string} - Sentence describing the planet's moons.
 */
function moonSentence() {
	const output = (() => {
		const moons = pageData.moons;
		if (!moons || moons.length == 0) {
			return `This planet has no moons.`;
		} else {
			const moonCount = moons.length;
			return `This planet's [[moon]]${(moonCount == 2) ? 's' : ''} ${plural(moonCount)} ${moons.join(' and ')}.`;
		}
	})();
	wikiCode(output, 'moonSentence');
}

function galleryExplanationExternal() {
	return `There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Landscape</li>
			<li>Night View</li>
			<li>Cave System</li>
			<li>Coast Area</li>
			<li>Underwater</li>
			<li>Analysis Visor</li>
			<li>Planet Exploration Guide</li>
			<li>Planet Page</li>
			<li>System Page</li>
			<li>Galaxy Map</li>
		</ol>
	</div>`
}