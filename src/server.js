// Servidor
const express = require('express')
const server = express()
const {pageBack,
  pageLanding,
  pageStudy, 
  pageGiveClasses,
  saveClasses

} = require('./pages')



//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})
// Inicio e configuração do servidor
server
// receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// Arquivos estáticos (css, scripts, imagens)
.use(express.static("public/"))

// rotas da aplicação
.get("/", pageBack)
.get("/landing", pageLanding) 
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// start do servidor
.listen(3100)



