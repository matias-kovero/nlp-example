import React, { useState, useEffect } from 'react';

const buildResultsArea = (highlights, text) => {
    let results = null;
    let textArray = [];

    highlights = highlights.sort((a,b) => {
      return a.endIndex - b.endIndex === 0 ? b.beginIndex - a.beginIndex : a.endIndex - b.endIndex;
    });

    let highestInColor = -1;
    highlights.forEach((highlight, index) => {
      let draw = highlight.endIndex > highestInColor;
      let crop = highestInColor >= highlight.beginIndex; // We need to crop

      if (index === 0) { //before the first highlight
        textArray = textArray.concat({ text: text.substring(0, highlight.beginIndex), isHighlight: false });
      }

      //all the hightlights
      if (index !== 0 && highlights[index - 1].endIndex <= highlight.beginIndex) { 
        // We add to the array "text string" last highlight endIndex, this higlight beginIndex 
        textArray = textArray.concat({ text: text.substring(highlights[index - 1].endIndex, highlight.beginIndex), isHighlight: false });
      }
      // We create a space.
      //textArray = textArray.concat({ text: ' ', isHighlight: false });
      if(draw) {
        textArray = textArray.concat({ 
          text: text.substring(crop ? highestInColor : highlight.beginIndex, highlight.endIndex),
          isHighlight: true, 
          color: highlight.color
        });
        highestInColor = highlight.endIndex;
      }
      // We add current highlight

      if (index === highlights.length - 1) { //after the last highlight
        textArray = textArray.concat({ text: ' ', isHighlight: false });
        textArray = textArray.concat({ text: text.substring(highlight.endIndex, text.length), isHighlight: false });
      }

    })

    results = textArray.map((textElement, index) => {
      let colorCode = textElement.isHighlight ? textElement.color : null;
      return (
        <span key={index} style={{color: colorCode}}>{textElement.text}</span>
      )
    })
    return results;
  };

function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

function ResultBox(props) {
  const [result, setResult] = useState([]);
  // eslint-disable-next-line
  const [text, setText] = useState(props.text);
  let borders = ColorLuminance(props.bg, -0.2);

  useEffect(() => {
    let colorText = buildResultsArea(props.data, text);
    setResult(colorText); 
  }, [props.data, text]);

  return(
    <div 
      className='output form-control form-group text-white text-left overflow-auto' 
      style={{backgroundColor: props.bg, color: props.color, height: '156px', borderColor: borders }}>
      {(result && result.length > 0) ? <div className='results-text'>
        {result}
      </div> : <div className='results-text'>{text}</div>}
    </div> 
  )
}

export default ResultBox;