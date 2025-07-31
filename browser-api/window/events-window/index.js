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
			console.log(eventName, args);
		});
	}
);