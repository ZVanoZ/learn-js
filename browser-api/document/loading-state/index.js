console.log(
	'document.readyState',
	document.readyState,
	document.readyState === 'complete' ? 'document-already-loaded' : 'document-not-loaded-yet'
);

const interval = setInterval(() => {
	if (document.readyState === 'complete') {
		console.log('interval/document-already-loaded');
		clearInterval(interval);
	} else {
		console.log('interval/document-not-loaded-yet');
	}
}, 0);

document.addEventListener('DOMContentLoaded', () => {
	console.log('document/on/DOMContentLoaded');
});

window.addEventListener('load', () => {
	console.log('window/on/load');
});

