/**
 * Загружает страницу auto.ria.com в ifarame
 *
 * Работает.
 */
(
	async () => {
		class App {
			integrationSelector = 'app-grub'
			// https://auto.ria.com/uk/search/?indexName=auto%2Corder_auto%2Cnewauto_search&category_id=1&price_do=4000&currency=1&type%5B8%5D=6&abroad=2&custom=1&page=5&countpage=10
			// https://auto.ria.com/uk/search/?category_id=1&price_do=4000&currency=1&type%5B8%5D=6&abroad=2&&page=1&countpage=10
			searchUrlTemplate = 'https://auto.ria.com/uk/search/?category_id=1&price_do=4000&currency=1&type%5B8%5D=6&abroad=2&page=PAGE_INDEX&countpage=10';

			/**
			 * @var {HTMLIFrameElement|HTMLElement}
			 */
			iframe;

			/**
			 * @var {HTMLDivElement|HTMLElement}
			 */
			wrapEl;
			wrapElId = 'app-grub-el';

			constructor() {
				this.wrapEl = document.getElementById(this.wrapElId);
				if (this.wrapEl === null) {
					/**
					 *
					 * @type {HTMLButtonElement|Element}
					 */
					const buttonClose = document.createElement('button');
					buttonClose.innerHTML = 'X';
					buttonClose.addEventListener('click', this.close.bind(this));

					const title = document.createElement('div');
					title.innerHTML = this.integrationSelector;
					title.appendChild(buttonClose);

					this.iframe = document.createElement('iframe');
					this.iframe.style.width = '100%';
					this.iframe.style.height = '100%';
					//this.iframe.frameborder = '0'; // Убираем рамку

					this.wrapEl = document.createElement('div');
					this.wrapEl.id = this.wrapElId;
					//this.wrapEl.style.position = 'absolute';
					this.wrapEl.style.backgroundColor = 'gray';
					this.wrapEl.style.padding = '10px';
					//this.wrapEl.style.top = '0px';
					//this.wrapEl.style.left = '0px';
					this.wrapEl.style.width = '100%';
					//this.wrapEl.style.height = '0.7 vh';
					this.wrapEl.style.height = '800px';
					this.wrapEl.style.border = '10px solid blue';
					//this.wrapEl.style.zIndex = '99999'
					this.wrapEl.appendChild(title);
					this.wrapEl.appendChild(this.iframe);
					//document.body.appendChild(this.wrapEl);
					document.body.insertBefore(this.wrapEl, document.body.firstChild);
				}
				if (this.iframe === null) {
					this.iframe = this.wrapEl.querySelector('iframe');
				}
				console.log('this', this)
				console.log('wrapEl', this.wrapEl)
				console.log('iframe', this.iframe)
			}


			close() {
				this.wrapEl.remove();
				this.wrapEl = null;
				this.iframe = null;
			}

			async run() {
				let pageIndex;
				while (true) {
					pageIndex = 'number' === typeof (pageIndex) ? pageIndex++ : 0;
					const url = this.searchUrlTemplate.replace('PAGE_INDEX', pageIndex);
					console.log(url);
					console.log(typeof (iframe));
					await new Promise(
						(resolve, reject) => {
							let timeoutHandler;
							this.iframe.onload = () => {
								console.log('after-load')
								this.doGrab();
								clearTimeout(timeoutHandler);
								return resolve();
							}
							this.iframe.src = url;
							timeoutHandler = setTimeout(() => {
								return reject('Превышено время обработки');
							}, 15000)
						}
					)

					break;
				}
			}

			doGrab() {
				console.log('doGrab')
				const res = {};

				const items = this.iframe.contentDocument.querySelectorAll('.ticket-item .ticket-title a')
				//console.log(items);

				items.forEach((item) => {

					//console.log(item);

					//console.log(item.href);
					//console.log(item.innerText);
					res[item.innerText] = res[item.innerText] || []
					res[item.innerText].push({
						href: item.href
					});
				});

				console.log(res);
			}
		}


		const app = new App();
		await app.run();
	}
)()