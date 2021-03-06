// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="html5shiv.js" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
/**
* @preserve HTML5 Shiv 3.7.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
/// <summary>
/// </summary>
/// <param name="window">The window.</param>
/// <param name="document">The document.</param>
/// <summary>
/// </summary>
/// <summary>
/// </summary>
/// <summary>
/// Adds the style sheet.
/// </summary>
/// <param name="ownerDocument">The owner document.</param>
/// <param name="cssText">The CSS text.</param>
/// <summary>
/// Gets the elements.
/// </summary>
/// <summary>
/// Adds the elements.
/// </summary>
/// <param name="newElements">The new elements.</param>
/// <param name="ownerDocument">The owner document.</param>
/// <summary>
/// Gets the expando data.
/// </summary>
/// <param name="ownerDocument">The owner document.</param>
/// <summary>
/// Creates the element.
/// </summary>
/// <param name="nodeName">Name of the node.</param>
/// <param name="ownerDocument">The owner document.</param>
/// <param name="data">The data.</param>
/// <summary>
/// Creates the document fragment.
/// </summary>
/// <param name="ownerDocument">The owner document.</param>
/// <param name="data">The data.</param>
/// <summary>
/// Shivs the methods.
/// </summary>
/// <param name="ownerDocument">The owner document.</param>
/// <param name="data">The data.</param>
/// <summary>
/// </summary>
/// <param name="nodeName">Name of the node.</param>
/// <summary>
/// </summary>
/// <param name="nodeName">Name of the node.</param>
/// <summary>
/// Shivs the document.
/// </summary>
/// <param name="ownerDocument">The owner document.</param>
/// <summary>
/// </summary>
/// <param name="oThis">The o this.</param>
/// <summary>
/// </summary>
/// <summary>
/// </summary>
(function(window,document){var version="3.7.2";var options=window.html5||{};var reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var supportsHtml5Styles;var expando="_html5shiv";var expanID=0;var expandoData={};var supportsUnknownElements;(function(){try{var a=document.createElement("a");a.innerHTML="<xyz></xyz>";supportsHtml5Styles="hidden"in a;supportsUnknownElements=a.childNodes.length==1||function(){document.createElement("a");var frag=document.createDocumentFragment();return typeof frag.cloneNode=="undefined"||typeof frag.createDocumentFragment=="undefined"||typeof frag.createElement=="undefined"}()}catch(e){supportsHtml5Styles=true;supportsUnknownElements=true}})();function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement("p"),parent=ownerDocument.getElementsByTagName("head")[0]||ownerDocument.documentElement;p.innerHTML="x<style>"+cssText+"</style>";return parent.insertBefore(p.lastChild,parent.firstChild)}function getElements(){var elements=html5.elements;return typeof elements=="string"?elements.split(" "):elements}function addElements(newElements,ownerDocument){var elements=html5.elements;if(typeof elements!="string"){elements=elements.join(" ")}if(typeof newElements!="string"){newElements=newElements.join(" ")}html5.elements=elements+" "+newElements;shivDocument(ownerDocument)}function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];if(!data){data={};expanID++;ownerDocument[expando]=expanID;expandoData[expanID]=data}return data}function createElement(nodeName,ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createElement(nodeName)}if(!data){data=getExpandoData(ownerDocument)}var node;if(data.cache[nodeName]){node=data.cache[nodeName].cloneNode()}else if(saveClones.test(nodeName)){node=(data.cache[nodeName]=data.createElem(nodeName)).cloneNode()}else{node=data.createElem(nodeName)}return node.canHaveChildren&&!reSkip.test(nodeName)&&!node.tagUrn?data.frag.appendChild(node):node}function createDocumentFragment(ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createDocumentFragment()}data=data||getExpandoData(ownerDocument);var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;for(;i<l;i++){clone.createElement(elems[i])}return clone}function shivMethods(ownerDocument,data){if(!data.cache){data.cache={};data.createElem=ownerDocument.createElement;data.createFrag=ownerDocument.createDocumentFragment;data.frag=data.createFrag()}ownerDocument.createElement=function(nodeName){if(!html5.shivMethods){return data.createElem(nodeName)}return createElement(nodeName,ownerDocument,data)};ownerDocument.createDocumentFragment=Function("h,f","return function(){"+"var n=f.cloneNode(),c=n.createElement;"+"h.shivMethods&&("+getElements().join().replace(/[\w\-:]+/g,function(nodeName){data.createElem(nodeName);data.frag.createElement(nodeName);return'c("'+nodeName+'")'})+");return n}")(html5,data.frag)}function shivDocument(ownerDocument){if(!ownerDocument){ownerDocument=document}var data=getExpandoData(ownerDocument);if(html5.shivCSS&&!supportsHtml5Styles&&!data.hasCSS){data.hasCSS=!!addStyleSheet(ownerDocument,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}"+"mark{background:#FF0;color:#000}"+"template{display:none}")}if(!supportsUnknownElements){shivMethods(ownerDocument,data)}return ownerDocument}var html5={elements:options.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:version,shivCSS:options.shivCSS!==false,supportsUnknownElements:supportsUnknownElements,shivMethods:options.shivMethods!==false,type:"default",shivDocument:shivDocument,createElement:createElement,createDocumentFragment:createDocumentFragment,addElements:addElements};window.html5=html5;shivDocument(document)})(this,document);if(!Function.prototype.bind){Function.prototype.bind=function(oThis){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function(){},fBound=function(){return fToBind.apply(this instanceof fNOP&&oThis?this:oThis,aArgs.concat(Array.prototype.slice.call(arguments)))};fNOP.prototype=this.prototype;fBound.prototype=new fNOP;return fBound}}