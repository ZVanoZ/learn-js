//-----------------------------------------------------------------------------
// Скрипт транслирует все события в родительское окно.
//----

console.log('proxy-events-script.js', 'window.opener', window.opener);
(
	() => {
//-----------------------------------------------------------------------------
		// Проверяем, существует ли родительское окно
		const isInFrame = !!(window.opener);
		if (!isInFrame) {
			console.log('WARNING! Скрипт загружен в документе без родительского окна.');
			return;
		}
		console.log('INFO. Скрипт загружен в документе с родительским окном.', window.opener);

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
						return;
					}

					// Отправляем сообщение родительскому окну

					window.opener.postMessage({
						eventName: 'event-in-child',
						payload: {
							'child-event-name': eventName,
							//'child-event-aegs': args
						}
					});

					console.log(document.title, 'Отправлено сообщение родительскому окну.');
				});
			}
		);


	}
)();

