
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Verifica se o servidor está funcionando
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    message: "Servidor da loja online funcionando!"
  });
});

// Localiza a pasta que contém o site
const pastas = [
  path.join(__dirname, "public"),
  path.join(__dirname, "loja-online"),
  __dirname
];

const pastaSite = pastas.find((pasta) =>
  fs.existsSync(path.join(pasta, "index.html"))
);

if (pastaSite) {
  app.use(express.static(pastaSite));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(pastaSite, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).send(
      "Servidor online! Configure a pasta dos arquivos da loja."
    );
  });
}

// Inicializa o servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
