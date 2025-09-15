/**
 * Загружает страницу auto.ria.com в fetch
 *
 * Работает частично. Страница загружается, а объявления нет.
 * Вероятно, потому что объявления подгружаются через AJAX.
 */
(
	async () => {
		//debugger;
		// https://auto.ria.com/uk/search/?indexName=auto%2Corder_auto%2Cnewauto_search&category_id=1&price_do=4000&currency=1&type%5B8%5D=6&abroad=2&custom=1&page=5&countpage=10
		// https://auto.ria.com/uk/search/?category_id=1&price_do=4000&currency=1&type%5B8%5D=6&abroad=2&&page=1&countpage=10
		const searchUrlTemplate = 'https://auto.ria.com/uk/search/?category_id=1&price_do=4000&currency=1&type%5B8%5D=6&abroad=2&page=PAGE_INDEX&countpage=10';
		let pageIndex;

		while (true) {
			pageIndex = 'number' === typeof (pageIndex) ? pageIndex++ : 0;
			const url = searchUrlTemplate.replace('PAGE_INDEX', pageIndex);
			console.log(url);

			const response = await fetch(url);
			console.log(response);

			const html = await response.text();
			console.log(html);

			break;
		}
	}
)();