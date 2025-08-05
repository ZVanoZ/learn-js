
window.addEventListener('load', () => {
	const div = document.createElement('div');
	div.innerHTML = `
<ul>
	<li><a href="https://developer.mozilla.org/ru/docs/Web/API">Интерфейсы веб API</a></li>
	<li><a href="https://developer.mozilla.org/ru/docs/Web/API/Document">Document</a></li>
	<li><a href="https://developer.mozilla.org/ru/docs/Web/API/Window">Window</a></li>
</ul>
`;
	document.body.append(div);
});