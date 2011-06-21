/**
 * @author mmazo
 * @require: prototype.js
 */

function StringTruncator(){
	
	/**
	 * etalon div id where we put the given text
	 */
	var etalonId = "string_truncator_div";
	
	/**
	 * text ending
	 */
	var ending = "...";
		
	/*
	 * try to get the etalon div and create it dynamically if not found
	 */
	var etalonDiv = $(etalonId);
	if (!etalonDiv) {
		var et = document.createElement("div");
		et.id = etalonId;
		document.body.appendChild(et);
		etalonDiv = $(etalonId);
		etalonDiv.setStyle({
		  backgroundColor: '#000000',
		  color: '#ffffff',
		  position: 'absolute',
		  top: '0px',
		  left: '0px',
		  display: 'none'
		});
	}
	
	/**
	 * Truncates the given text string according text width in pixel taking
	 * in account the width of specified text ending. If no ending specified
	 * adds default '...' ending. Returns truncated string
	 * @param {Integer} textWidth - text width in pixel
	 * @param {String} textString - text string
	 * @param {String} textEnding - text ending
	 * @param {String} textClass - the class name for the text style you use
	 */
	this.truncate = function(textWidth, textString, textEnding, textClass){
		var ret = "";
		if (textEnding) {ending = textEnding;}
		etalonDiv.className = textClass;
		etalonDiv.innerHTML = textString;
		var tmpText = textString;
		var actualWidth = etalonDiv.getWidth();
		while (actualWidth > textWidth){
			tmpText = tmpText.substring(0,tmpText.length - 1);
			etalonDiv.innerHTML = tmpText + ending;
			actualWidth = etalonDiv.getWidth();
		}
		ret = etalonDiv.innerHTML;
		return ret;
	};
		
}