/**
 * Этот скрипт загружается только в родительском окне.
 */
//-----------------------------------------------------------------------------


class App {
	iframes;

	constructor() {
		console.log('App', 'constructor', [this]);
		this.iframes = [];
		window.addEventListener('load', this.onWindowLoad.bind(this));
	}

	onWindowLoad(event) {
		console.log('App', 'onWindowLoad', [this, event]);
		let button;

		button = document.getElementById('button-print');
		button.addEventListener('click', this.onPrintClick.bind(this))

		button = document.getElementById('button-print-and-close');
		button.addEventListener('click', this.onPrintAndCloseClick.bind(this))


		button = document.getElementById('button-close-iframes');
		button.addEventListener('click', this.onCloseIFramesClick.bind(this))

		window.addEventListener('message', this.parseMessage.bind(this))
	}

	onCloseIFramesClick(event) {
		console.log('App', 'onCloseIFramesClick', [this, event]);

		console.log('App', 'onCloseIFramesClick/iframes-before', this.iframes);
		for (let i = this.iframes.length - 1; i >= 0; i--) {
			const el = this.iframes[i].el;
			el.remove();
			delete this.iframes[i];
		}
		console.log('App', 'onCloseIFramesClick/iframes-after', this.iframes);
	}

	onPrintClick(event) {
		console.log('App', 'onPrintClick', [this, event]);
		const iframe = this.createIFrame();

		this.iframes.push({
			el: iframe,
			addedAt: new Date(),
		});
	}

	onPrintAndCloseClick(event){
		console.log('App', 'onPrintClick', [this, event]);
		const iframe = this.createIFrame();

		// Запускаем таймер, чтобы удалить iframe после печати.
		// Это даёт пользователю время на взаимодействие с диалогом.
		setTimeout(() => {
			// Проверяем, что iframe всё ещё существует, прежде чем удалять его
			if (iframe.parentNode) {
				iframe.remove();
				console.log('Iframe удалён после вызова печати.');
			}
		}, 100);
	}


	createIFrame() {
		console.log('App', 'createIFrame', [this]);

		const nowString = (new Date()).toISOString();
		const htmlString = `
<html>
<head>
<title>print-html-by-iframe/${nowString}</title>
</head>
<body >
<div style="border: 1px solid red">
	<h1>${nowString}</h1>
</div>
</body>
<script src="iframe-script.js"></script>
</html>
`;

		const iframe = document.createElement('iframe');
		// 2. Устанавливаем атрибуты
		iframe.id = 'myDynamicIframe'; // Присвоим ID для удобства
		//iframe.src = ''; // Изначальный URL
		iframe.width = '600';
		iframe.height = '400';
		iframe.style.display = 'block';

		iframe.frameborder = '0'; // Убираем рамку
		iframe.addEventListener(
			'load',
			() => {
				console.log('iframe/on/load');
				try {
					const iframeDoc = iframe.contentWindow.document;
					console.log('iframe/on/load/title', iframeDoc.title);
				} catch (e) {
					console.log('iframe/on/load/catch', [
						'Не удалось получить доступ к содержимому iframe из-за Same-Origin Policy:' + e.message,
						e,
						iframe,
					]);
				}
			}
		);
		iframe.addEventListener(
			'message',
			(event) => {
				console.log('iframe/on/message', event);
			}
		);
		document.body.appendChild(iframe);

		// iframe.document.write(htmlString);
		iframe.contentWindow.document.open(); // Открываем документ для записи
		iframe.contentWindow.document.write(htmlString);
		iframe.contentWindow.document.close(); // Закрываем документ
		//iframe.contentWindow.focus();
		iframe.contentWindow.print();

		return iframe;
	}

	parseMessage(event) {
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
	}
}

const app = new App();




