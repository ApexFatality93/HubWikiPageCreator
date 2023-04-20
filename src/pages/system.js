function startupFunctions(){celestialStartupFunctions(),combineEconConf(),merchantUpgrades(),regionLong(),spaceStationSection(),planetInputs(),expectedHubTagSentence(),civCatalog(),addTemplate(),wikiCodePercentage(),autoPirate(globalElements.input.wealthInput)}const systemElements={input:{planetInput:"planetNumInput",moonInput:"moonNumInput",terminalInputs:"terminalInputs",systemExtras:"systemExtras"},output:{tradeTerminal:"tradeTerminal",planets:"planets",Freighters:"Freighters",Derelict:"Derelict",Organic:"Organic",Starships:"Starships",MTs:"MTs"}};updateGlobalElements(systemElements);const systemElementFunctions={civ:["regionLong(); expectedHubTagSentence(); civCatalog()",null,!0],portalglyphsInput:["regionLong(); expectedHubTagSentence(); autoBH()",null,!0],planetInput:["numberStats(this); planetInputs()"],moonInput:["numberStats(this); planetInputs()"],nameInput:["expectedHubTagSentence()"],factionInput:["spaceStationSection(); combineEconConf()"],economybuyInput:["wikiCodePercentage(this)"],economysellInput:["wikiCodePercentage(this)"],wealthInput:["autoPirate(this)"],conflictInput:["autoPirate(this)"],platformInput:["docByExternal()"],distanceInput:["numberStats(this)"],systemExtras:["addTemplate(this)"]};function locationSentence(){const{region:t,civShort:e}=pageData,n=regNr(t),o=HubGal(e);wikiCode(`Located in the [[${t}]] [[region]]${n} of the ${o}.`,"loc")}async function planetInputs(){const t=globalElements.input.waterInput.parentElement.previousElementSibling,e=globalElements.output.planets,{planet:n,moon:o}=pageData,a=(s=parseInt(n)+parseInt(o),i=2,l=6,Math.max(i,Math.min(l,s)));var s,i,l;if(isNaN(a))return;function c(){const t=new Set,e=(()=>{const e=document.querySelectorAll("[data-planet]");for(const n of e)t.add(n.dataset.planet);return t.size})();return a-e}const r=document.querySelectorAll("[data-planet]");let u=getChildIndex(r,"dataset.planet");for(;0!=c();)c()>0?(await p(u),u++):d();function d(){const t=document.querySelectorAll("[data-planet]"),e=new Set;for(const n of t)e.add(n.dataset.planet);const n=Array.from(e).pop(),o=document.querySelectorAll(`[data-planet="${n}"]`);removeSection(o)}async function p(n){const o={i:n,oddEvenClass:"is-"+oddEven(n)},a=await loadHTML("src/htmlSnippets/planetInputs.html",o),s=await loadHTML("src/htmlSnippets/planetOutputs.html",o);addAllTooltips(a),t.insertAdjacentHTML("beforebegin",a.body.innerHTML),e.insertAdjacentHTML("beforeend",s.body.innerHTML),initialiseSectionInputs(`[data-planet="planet${n}"]`);const i={output:{}},l=document.querySelectorAll(`#body${n} output`);for(const t of l){const e=t.id;i.output[e]=e}updateGlobalElements(i),biomeLinks(a.getElementById(`biome_input${n}`));const c=document.getElementById(`addResourceButton${n}`);for(let t=0;t<3;t++)addResourceInput(c,n)}}function addResourceInput(t,e){const n=t.parentElement,o=document.querySelectorAll("[data-resource]"),a=getChildIndex(o,"dataset.resource"),s="resource"+e,i="resource_input"+a,l="is-"+oddEven(e),c=`<div class="tableCell text removable ${l}" data-section="resource${e} planet${e}" data-resource="section${a}" data-planet="planet${e}">\n\t\t<button class="button is-danger is-outlined icon is-small" title="Remove resource" type="button" disabled onclick="removeSpecificSection('section${a}', 'resource'); removeResource('${i}')">&#10006</button>\n\t\t<label for="${i}">Resource name:</label>\n\t</div>\n\t<div class="tableCell data ${l}" data-section="resource${e} planet${e}" data-resource="section${a}" data-planet="planet${e}">\n\t\t<input type="text" list="resources" id="${i}" data-dest-noauto="${s}" oninput="addResource(this)">\n\t</div>`;n.insertAdjacentHTML("beforebegin",c);const r={input:{}};r.input[i]=i,updateGlobalElements(r);const u=getResourceInputSections(e),d=getResourceInputSectionCount(u);if(d+1>6&&(t.disabled=!0),d>3)for(const t of u){const e=t.querySelector("button");e&&(e.disabled=!1)}}function getResourceInputSections(t){return document.querySelectorAll(`[data-resource][data-planet="planet${t}"]`)}function getResourceInputSectionCount(t){const e=new Set;for(const n of t)e.add(n.dataset.resource);return e.size}function removeResource(t){const e=globalElements.input[t],n=e.dataset.destNoauto,o=e.id,a=extractNumber(n);e.value&&(delete links.resources[n][o],addResource()),document.getElementById(`addResourceButton${a}`).disabled=!1;const s=getResourceInputSections(a);if(getResourceInputSectionCount(s)<4)for(const t of s){const e=t.querySelector("button");e&&(e.disabled=!0)}}function moonSwitch(t){const e=document.getElementById(t.dataset.destNoauto),n=extractNumber(t.id),o=t.checked?"Moon":"Planet";document.getElementById("planetClass"+n).innerText=o,expandDescriptor(e,o)}function expandDescriptor(t,e=null){const n=extractNumber(t.id);e||(e=document.getElementById("moon_input"+n).checked?"Moon":"Planet");const o=t.value,a=t.dataset.destNoauto,s=buildDescriptor(o,e,"<br>");globalElements.output[a].innerText=s;infestedBiomeLinks("infested"+n,autoInfested(t))}function merchantUpgrades(t=null){const e=document.querySelectorAll("[data-dest-checkbox-group]");if(t)return void o(t);const n=new Set;for(const t of e)t.onchange||assignFunction(t,"merchantUpgrades(this.dataset.destCheckboxGroup)"),n.add(t.dataset.destCheckboxGroup);for(const t of n)o(t);return;function o(t){const e=document.querySelectorAll(`[data-dest-checkbox-group="${t}"]`),n=t.startsWith("SD")?"":t.substring(0,2),o=new Array;for(const t of e)t.checked&&o.push(t.value);const a=new Array;for(let t=1;t<=o.length;t++){const e=`| ${n}${t}=${o[t-1]}`;a.push(e)}wikiCode(a.join("\n"),t);const s=globalElements.output[t].closest("#scrapDealer");s&&(0==a.length?s.style.display="none":s.style.display="")}}async function tradeables(){const{input:{terminalInputs:t},output:{tradeTerminal:e}}=globalElements,n=document.querySelectorAll("[data-tradeable]"),o=getChildIndex(n,"dataset.tradeable"),a={childIndex:o,price:"price"+o,text:"text"+o,text_input:"text_input"+o,price_input:"price_input"+o},s=await loadHTML("src/htmlSnippets/tradeableInputs.html",a),i=`<div data-tradeable="section${o}">|-</div>\n\t<div data-tradeable="section${o}">| {{ilink|<output id="${a.text}"></output>}} || {{Units}} <output id="${a.price}"></output></div>`,l=s.querySelectorAll(`[data-tradeable="section${o}"] input[data-dest]`);for(const t of l)assignFunction(t,"wikiCode(this)");const c=s.querySelectorAll(`[data-tradeable="section${o}"] input[data-dest-noauto]`);for(const t of c)assignFunction(t,"storeData(this); numberStats(this)");t.insertAdjacentHTML("beforebegin",s.body.innerHTML),e.insertAdjacentHTML("beforeend",i);const r=document.querySelectorAll("[data-tradeable]"),u=(()=>{const t=new Set;for(const e of r){const n=e.dataset.tradeable;t.add(n)}return t.size})(),d=t.querySelector("button");u+1>5&&(d.disabled=!0)}function enableTradeableAdd(){globalElements.input.terminalInputs.querySelector("button").disabled=!1}function resetExternal(){const t=document.querySelectorAll("[data-tradeable], [data-planet]");removeSection(t)}function regionLong(){const t=pageData.region,e=1==t.split(" ").length?t+" region":t;globalElements.output.regionLong.innerText=e}function addResource(t=null){const e=links.resources??=new Object;if(t){const n=t.value,o=t.dataset.destNoauto,a=t.id;e[o]??=new Object,e[o][a]=sanitiseString(n)}const n=new Set,o=sortObj(structuredClone(e),!0);for(const t in o){const e=o[t];for(const a in e){const s=e[a];s&&!n.has(s)&&(o[t][a]=`[[${s}]]`,n.add(s))}}for(const t in o){const e=Object.values(o[t]).filter((t=>t)).join("<br>");globalElements.output[t].innerText=e}}function biomeLinks(t){const e=t.value,n=t.dataset.destNoauto,o=links.biomes??=new Object;o[n]=sanitiseString(e);const a=new Set,s=sortObj(structuredClone(o),!0);for(const t in s){const e=s[t];e&&!a.has(e)&&(s[t]=`{{Biome|${e}}}`,a.add(e))}setBiomeText(s)}function infestedBiomeLinks(t,e){const n=links.infestedBiomes??=new Object;n[t]=e;let o=!1;const a=sortObj(structuredClone(n),!0);for(const t in a){const e=a[t];e&&!o?(a[t]="<br>([[Biome Subtype - Infested|Infested]])",o=!0):e?a[t]=" (Infested) ":(a[t]="",delete n[t])}setBiomeText(a)}function setBiomeText(t){for(const e in t){const n=t[e];globalElements.output[e].innerText=n}}function expectedHubTagSentence(){const t=globalElements.output.expectedHubTag,e=pageData.name;if(!e)return void(t.innerHTML="");const{region:n,portalglyphs:o}=pageData,a=`HUB${getHubNumber(n)}-${(()=>{let t=o.substring(1,4);for(;t.startsWith("0")&&t.length>1;)t=t.substring(1);return t})()}`;t.innerHTML="",e.includes(a)||(t.innerText=`The expected HUB Tag for this system is ${a}.\n\n`)}function spaceStationSection(){const t={uncharted:"This system is uncharted and has no [[Space Station]].",abandoned:"This space station is abandoned.\n\n"},e={normal:["img","terminal","merchant","scrapDealer"],pirate:["img","scrapDealer"],abandoned:["img","note","terminal"],uncharted:["note"]},n=(()=>{const t=pageData.faction;return"Uncharted"==t?"uncharted":t.includes("Abandoned")?"abandoned":pageData.wealth.includes("Black Market")?"pirate":"normal"})(),o=document.querySelectorAll("[data-station]");for(let t=0;t<o.length;t++){const s=o[t],i=s.dataset.station;e[n].includes(i)?("merchant"!=i&&"scrapDealer"!=i||!a(s)||t++,"scrapDealer"!=s.id||pageData.SDMerchant?s.style.display="":s.style.display="none"):s.style.display="none"}function a(t){const e=t.querySelector("button");if(!e)return;const n=e.dataset.buttonId;if(!n)return;const o="display"+n;return e.dataset[o]}t[n]&&(document.querySelector('[data-station="note"]').innerText=t[n])}function autoBH(){const t=pageData.portalglyphs,e=globalElements.input.colorInput;"79"==t.substring(2,4)?(hideInput(e,"none"),e.value="Black Hole"):hideInput(e,""),wikiCode(e)}function autoPirate(t){const e=t.value;if(!e.includes("Black Market")&&!e.includes("Pirate Controlled"))return;const{conflictInput:n,wealthInput:o}=globalElements.input,a=[o,n];for(const t of a){const e=t.querySelector('optgroup[label="Pirate"] option').value;t.value=e,wikiCode(t)}spaceStationSection()}function combineEconConf(){const t=pageData.faction,{wealthInput:e,economyInput:n,conflictInput:o}=globalElements.input,a=[e,n,o];if(t.includes("Abandoned")||"Uncharted"==t)for(const t of a){const e=t.querySelector('optgroup[label="Abandoned/Uncharted"] option').value;t.value=e,wikiCode(t),hideInput(t,"none")}else for(const t of a)hideInput(t,"")}function addTemplate(t=null){if(!t){const t=document.getElementsByName("systemExtras");for(const e of t)addTemplate(e);return}globalElements.output[t.value].style.display=t.checked?"":"none"}function civCatalog(){const t=shortenGHub(pageData.civShort);wikiCode(t,"civShorter")}function generateGalleryArray(){const t=["","System Exploration Guide","System Page","Default SS Multi-Tool"];("Uncharted"==pageData.faction||pageData.faction.includes("Abandoned"))&&t.pop(),pageData.galleryArray=t}function galleryExplanationExternal(){return"There is a preferred order of pictures:\n\t<div class='dialog-center'>\n\t\t<ol class='dialog-list'>\n\t\t\t<li>System Exploration Guide</li>\n\t\t\t<li>System Page</li>\n\t\t\t<li>Default SS Multi-Tool</li>\n\t\t</ol>\n\t</div>"}assignElementFunctions(systemElementFunctions),(()=>{const t=["tradeableInputs"];for(const e of t)cachedHTML.files.add(`src/htmlSnippets/${e}.html`)})();
