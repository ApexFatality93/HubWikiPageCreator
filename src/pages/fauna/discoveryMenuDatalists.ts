import getBiomeSentence from "../../datalists/creatureDiscoveryMenu/biome";
import { pageData, globalElements } from "../../variables/objects";
import getDietSentence, { robotSentences } from "../../datalists/creatureDiscoveryMenu/diet";
import getTemperamentSentences from "../../datalists/creatureDiscoveryMenu/temperament";
import { noLineBreak } from "./fauna";
import { wikiCode } from "../../common";

function generateOption(value: string) {
	return `<option value="${value}"></option>`;
}

export function setBiomeSentenceDatalist() {
	const { biome, newName, planet, moon, genus } = pageData;

	if (typeof biome !== 'string' || typeof newName !== 'string' || typeof planet !== 'string' || typeof moon !== 'string' || typeof genus !== 'string') return;
	const biomeSentenceArray = genus === 'Mechanoceris' ? robotSentences : getBiomeSentence(biome, newName, moon || planet);
	addDataList('dmBiomeSentenceList', biomeSentenceArray)
}

export function setTemperamentSentenceDatalist() {
	const { behaviour } = pageData;
	if (typeof behaviour !== 'string') return;
	const temperamentSentenceArray = getTemperamentSentences(behaviour);
	addDataList('dmTemperamentSentenceList', temperamentSentenceArray)
}

export function setDietSentenceDatalist() {
	const { diet } = pageData;
	if (typeof diet !== 'string') return;
	const dietSentenceArray = getDietSentence(diet);
	addDataList('dmDietSentenceList', diet ? dietSentenceArray : undefined)
}

function addDataList(listName: string, values: string[] = []) {
	const options = values.map(item => generateOption(item));
	const outputElement = globalElements.output[listName];
	if (outputElement instanceof HTMLDataListElement) outputElement.innerHTML = options.join('');
}

export function buildDmSentence() {
	const dmInput = globalElements.input.dmInput;
	const { dmBiomeSentence, dmTemperamentSentence, dmDietSentence } = pageData;

	if (typeof dmBiomeSentence !== 'string' || typeof dmTemperamentSentence !== 'string' || typeof dmDietSentence !== 'string' || !(dmInput instanceof HTMLTextAreaElement)) return;

	dmInput.value = `${dmBiomeSentence} ${dmTemperamentSentence} ${dmDietSentence}`;

	noLineBreak();
	wikiCode(dmInput)
}