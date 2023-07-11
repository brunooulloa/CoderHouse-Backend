import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "path";

const app = express();
const PORT = 8080;

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });

app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/contacto", (req, res) => {
    res.render("contact");
});

app.get("/perfil", (req, res) => {
    const user = {
        name: "Pepe",
        lastname: "Argento",
        age: 25,
        location: {
            city: "Buenos Aires"
        }
    }

    res.render("profile", user);
});