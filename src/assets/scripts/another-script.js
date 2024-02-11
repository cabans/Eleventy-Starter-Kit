console.info('Another script is loaded')

// Print tomorrod's date
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.body.innerHTML += `<p>Tomorrow is ${tomorrow.toLocaleDateString()}</p>`;
