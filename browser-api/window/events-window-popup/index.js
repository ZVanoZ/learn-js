/**
 * Этот скрипт загружается только в родительском окне.
 */
//-----------------------------------------------------------------------------
const html = `
<html>
<head>
<title>events-window-popup/child</title>
    <script src="common-script.js"></script>
</head>
<body >
<div style="border: 1px solid red">
	<h1>Дочернее окно</h1>
</div>
</body>
</html>
`;

(
	() => {
		const popupWindow = window.open('', '_blank');
		if (!popupWindow) {
			console.warn('Всплывающее окно было заблокировано браузером.');
			alert('Пожалуйста, разрешите всплывающие окна для этого сайта.');
			return;
		}
		popupWindow.document.write(html);
		popupWindow.document.close();
	}
)();

window.addEventListener('message', (event) => {
	// Важно: всегда проверяйте origin отправителя для безопасности!
	// В данном случае, так как это наше же приложение,
	// можно быть менее строгим, но в реальном коде origin важен.
	// if (event.origin !== "http://your-domain.com") {
	//     console.warn("Получено сообщение от неизвестного источника:", event.origin);
	//     return;
	// }

	const messageData = event.data; // Получаем данные из сообщения

	if (!messageData) {
		console.log(document.title, 'ERR: Ожидаем получить объект.', messageData);
		return;
	}

	if (messageData.eventName !== 'event-in-child') {
		console.log(document.title, 'WARN: получен неизвестный тип пакета. Игнорируем.', messageData);
		return;
	}
	console.log(document.title, 'Получено пользовательское событие от дочернего окна!', messageData);
});