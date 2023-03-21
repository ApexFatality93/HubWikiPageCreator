(()=>{addAllTooltips();globalElements.output.explanation.innerHTML=`<h2 id="explanationHeading" class="title is-4"></h2>
	<div id="explanationContent" class="nms-font"></div>
	<a id="explanationLink" target='_blank' rel='noopener noreferrer'>
		<img id="explanationImg" alt='Explainer Image'>
	</a>
	<form method="dialog">
		<button class="button" type="submit" autofocus>Close</button>
	</form>`,updateGlobalElements({output:{explanationHeading:"explanationHeading",explanationContent:"explanationContent",explanationLink:"explanationLink",explanationImg:"explanationImg"}})})();const cachedImages=new Set;function explanation(t,n,e){const a=globalElements.output.explanationImg;var o=globalElements.output.explanationLink,l=globalElements.output.explanation;e?(cachedImages.has(e)?(o.classList.remove("loading"),a.getAttribute("src")!=e&&(a.src="",a.src=e,o.href=e)):(a.src="",a.style.opacity=0,a.style.marginBlockStart=0,a.src=e,o.classList.add("loading"),o.href=e),o.style.display=""):o.style.display="none",globalElements.output.explanationHeading.innerText=t,globalElements.output.explanationContent.innerHTML=n,a.onload=()=>{a.style.marginBlockStart="1rem",a.style.opacity=1,cachedImages.add(e)},l.style.translate="0 -100vh",l.showModal(),l.style.translate="0 0",l.scrollTo(0,0)}function addAllTooltips(){for(const l of document.querySelectorAll("span.tooltip")){e=o=n=a=t=void 0;var t=l;if((a=t.getElementsByTagName("data")).length){var n=new Array;for(const t of a){var e=t.innerHTML;n.push(e)}var a=document.createElement("img"),o=(a.src="./assets/vector/help.svg",a.alt="Help",document.createElement("span"));o.classList.add("tooltiptext","nms-font"),o.innerHTML=n[0],1<n.length&&assignFunction(t,"explanation(`"+(n[1]??"")+"`,`"+(n[2]??"")+"`,`"+(n[3]??"")+"`)","onclick"),t.innerHTML=a.outerHTML+o.outerHTML}}}