import React from 'react';
import './style.css';

function ProgressBar( { value = 50, max = 100 } ) {
	const percent = parseInt( value ) / parseInt( max ) * 100;
	const colorClass = percent >= 50 ? 'progress-bar-positive' : 'progress-bar-negative';

	return (
		<div className={ `progress-bar ${ colorClass }` } style={ { '--percent': `${ percent }%` } } />
	);
}

export default ProgressBar;