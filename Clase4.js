const fs = require('fs');

const d = new Date().toLocaleDateString();
const t = new Date().toLocaleTimeString();

fs.writeFileSync('fecha.txt', `Hoy es ${d} y son las ${t}`, (err) => {
    fs.readFileSync('fecha.txt', 'utf-8', (err, data) => err ? console.log(err) : console.log(data));
});