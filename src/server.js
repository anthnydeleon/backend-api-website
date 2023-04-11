import app from "./app";

app.listen(process.env.APP_PORT || 3001);

console.log("server rodando!");
