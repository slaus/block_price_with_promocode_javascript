window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	const tarif = {
			mini: 990,
			standart: 1290,
			maxi: 1490
		},
		discount = {
			percent: 10,
			promocode: 'MASTER10',
			text: 'Введите промокод здесь'
		},
		frames = {
			url: 'https://yoomoney.ru/quickpay/button-widget',
			targets: '%D0%9A%D1%83%D1%80%D1%81%20%C2%AB%D0%A1%D0%B0%D0%BC%D0%B0%20%D1%81%D0%B5%D0%B1%D0%B5%20%D0%BC%D0%B0%D1%81%D1%82%D0%B5%D1%80%20%D0%BC%D0%B0%D0%BD%D0%B8%D0%BA%D1%8E%D1%80%D0%B0%C2%BB',
			account: '4100116346312966'
		};

	const setPrice = (percent = 0) => {

		const dataPrice = document.querySelectorAll('.data-price');

		const createIframe = (parent, payType, price) => {
			let div = parent.querySelector('.pay-variant'),
				frame = document.createElement('iframe');
	
			frame.setAttribute('src', `${frames.url}?targets=${frames.targets}&default-sum=${price}&button-text=11&${payType}=on&button-size=s&button-color=orange&fio=on&phone=on&mail=on&successURL=https%3A%2F%2Fmama-manicura.ru%2F&quickpay=small&account=${frames.account}&`);
			div.appendChild(frame);
		}

		dataPrice.forEach(item => {
			let attribute = item.getAttribute('data-price');
	
			for(var i in tarif){
				if (attribute === i) {
					item.querySelector('.price').innerText = tarif[i] - tarif[i] * percent / 100;

					if (item.querySelector('.pay-variant')) {
						createIframe(item, 'yoomoney-payment-type', tarif[i] - tarif[i] * percent / 100);
						createIframe(item, 'any-card-payment-type', tarif[i] - tarif[i] * percent / 100);
					}
				}
			}
		});
	}

	setPrice();

	const removeIframe = () => {
		const dataPrice = document.querySelectorAll('.data-price');

		dataPrice.forEach(item => {
			item.querySelectorAll('iframe').forEach(frame => {
				frame.remove();
			});
		});
	}

	document.querySelectorAll('.pay-block a').forEach(item => {
		item.addEventListener('click', (e) => e.preventDefault())
	});

	const promocode = () => {

		const discountCode = document.getElementById('discount-code');

		const loadText = (text = '') => {
			discountCode.value = text;
		}

		loadText(discount.text);

		discountCode.addEventListener('focus', () => {
			loadText();
		});

		discountCode.addEventListener('blur', () => {
			loadText(discount.text);
		});

		discountCode.addEventListener('input', () => {
			if (discountCode.value.toUpperCase() === discount.promocode) {

				discountCode.setAttribute('disabled', true);
				removeIframe();
				setPrice(discount.percent);
				return loadText(`У Вас скидка ${discount.percent}% по промокоду ${discount.promocode}`);
			}
		});


	}

	promocode();

});
