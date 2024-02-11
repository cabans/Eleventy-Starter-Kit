// Basic module es6 export default writing today date on the body
// export default function () {
// 	const today = new Date();
// 	document.body.innerHTML += `<p>Today is ${today.toLocaleDateString()}</p>`;
// }

const anotherSelectors = {
	nav: '.js-nav',
	toggleNav: '.js-toggle-nav'
}

const mainNav = () => {
	const nav = document.querySelector(anotherSelectors.nav);
	const toggleNav = document.querySelector(anotherSelectors.toggleNav);

	toggleNav.addEventListener('click', () => {
		nav.classList.toggle('is-open');
	});

	console.log('mainNav loaded');
}

if(document.querySelector(anotherSelectors.nav)) {
	mainNav();
}

