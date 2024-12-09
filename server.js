require("dotenv").config();

const methodOverride = require("method-override");
const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;

const favicon = require("serve-favicon");
const path = require("path");
const app = express();

const cors = require("cors");
app.use(cors({
  origin: 'https://my-e-commerce-front-z1ae.vercel.app', // Cambia esto al dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Si necesitas enviar cookies o headers de autenticación
}));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cors());

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});

