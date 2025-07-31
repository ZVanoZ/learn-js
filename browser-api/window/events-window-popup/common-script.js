/**
 * Этот скрипт загружается  и в родительском, и в дочернем окне.
 * Он общий.
 * При отрабатывании кода в нем нужно проверять window.opener
 */

//-----------------------------------------------------------------------------

// Проверяем, существует ли родительское окно
if (window.opener) {
	// В дочернем окне можно отлавливать стандартные события родительского окна.
	// Ловим 'resize' чтобы продемонстрировать.
	window.opener.addEventListener('resize', (event) => {
		console.log(document.title, 'on/window.opener/resize', event);
	});

	// Если родительское окно закрывается, то
	window.opener.addEventListener('beforeunload', (event) => {
		console.log(document.title, 'on/window.opener/beforeunload', event);
		window.close();
	});
}

//-----------------------------------------------------------------------------

const windowEvents = [
	'afterprint',
	'beforeprint',
	'beforeunload', // Перед закрытием страницы
	'blur',         // Потеря фокуса окном
	'error',        // Ошибка загрузки ресурса или выполнения скрипта
	'focus',        // Получение фокуса окном
	'hashchange',   // Изменение хэша URL (часть после #)
	'languagechange', // Изменение языка пользователя
	'load',         // Загрузка страницы
	'message',      // Получение сообщения через postMessage
	'offline',      // Переход браузера в офлайн
	'online',       // Переход браузера в онлайн
	'orientationchange', // Изменение ориентации устройства (мобильные)
	'pageshow',     // Страница отображена (включая из BFCache)
	'pagehide',     // Страница скрыта (включая в BFCache)
	'popstate',     // Изменение истории браузера (кнопки Вперед/Назад)
	'rejectionhandled', // Необработанное отклонение промиса
	'resize',       // Изменение размера окна
	'scroll',       // Прокрутка окна
	'storage',      // Изменение Local Storage/Session Storage в другом окне/вкладке
	'unhandledrejection', // Отклоненный промис без catch
	'unload',       // Окно разгружается (не рекомендуется использовать, предпочитайте beforeunload/pagehide)
];

windowEvents.forEach(
	(eventName) => {
		window.addEventListener(eventName, (...args) => {
			console.log(document.title, 'window', eventName, args);

			if (!window.opener) {
				// Проверяем, существует ли родительское окно
				// если window.opener не является окном, то:
				// * Вариант 1. Этот загружен в родительском окне.
				// * Вариант 2. Этот загружен в дочернем окне, но родительское окно закрыто и
				//   ссылка в дочернем обнулилась

				// console.warn('POPUP (child) - Родительское окно не найдено (может быть закрыто).');
				return;
			}

			// Отправляем сообщение родительскому окну
			// event.data будет объектом, который мы передаем
			// event.origin должен совпадать с origin родителя
			window.opener.postMessage({
				eventName: 'event-in-child',
				payload: {
					'child-event-name': eventName,
					//'child-event-aegs': args
				}
			});
			// window.opener.postMessage(
			// 	{
			// 		type: 'event-in-child',
			// 		payload: {
			// 			data: {
			// 				eventName: eventName
			// 			},
			// 			timestamp: new Date().toISOString()
			// 		}
			// 	},
			// 	window.location.origin // Указываем целевой origin для безопасности
			// );
			console.log(document.title, 'Отправлено сообщение родительскому окну.');
		});
	}
);

