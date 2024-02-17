// Basic module es6 export default writing today date on the body
function partialScript () {
	console.log('module-child.js is loaded')

	const today = new Date()
	document.body.innerHTML += `<p>Today is ${today.toLocaleDateString()}</p>`
}

export default partialScript
