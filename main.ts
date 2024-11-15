//importação de biblioteca express para requisições HTTP
import express from "express";
// importação de biblioteca pg-promise para uso no banco de dados postgres
import pgp from "pg-promise";


const app = express();
app.use(express.json());

const hostname = '159.89.46.66'
const user = 'postgres'
const password = 'dev@123'
const name = 'pizzaria'
const port = 5432

const conexaoBanco = pgp()({
     host: hostname,
     database: name,
     user: user,
     password: password,
     port: port 

})

// função para evitar bloqueio (CROSS)
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//requisição HTTP para obter tudo  da  tabela sabores_pizza
app.get('/sabores_pizza', async (req, res) => {
    const sabores_pizza = await conexaoBanco.query('select * from sabores_pizza order by id');
    res.json(sabores_pizza);
})

//requisição HTTP para inserir na tabela sabores_pizza
app.post('/sabores_pizza', async (req, res) => {
    await conexaoBanco.query('insert into sabores_pizza (nome, preco) values($1,$2)',
        [req.body.nome, req.body.preco]
    );
    res.json({mesagem: 'salvou'});
})

// função HTTP que atualiza tabela sabores_pizza
app.put('/sabores_pizza', async (req, res) => {
    await conexaoBanco.query('update sabores_pizza set nome = $1, preco = $2 where id = $3',
        [req.body.nome, req.body.preco, req.body.id]
    );
    res.json({mesagem: 'atualizou'});
})

// --------------   ----------

//requisição HTTP para obter tudo  da  tabela acompanhamentos
app.get('/acompanhamentos', async (req, res) => {
    const acompanhamentos = await conexaoBanco.query('select * from acompanhamentos order by id');
    res.json(acompanhamentos);
})

//requisição HTTP para inserir na tabela bebidas
app.post('/acompanhamentos', async (req, res) => {
    await conexaoBanco.query('insert into acompanhamentos (nome, preco) values($1,$2)',
        [req.body.nome, req.body.preco]
    );
    res.json({mesagem: 'salvou'});
})

// função HTTP que atualiza acompanhamentos 
app.put('/acompanhamentos', async (req, res) => {
    await conexaoBanco.query('update acompanhamentos set nome = $1, preco = $2 where id = $3',
        [req.body.nome, req.body.preco, req.body.id]
    );
    res.json({mesagem: 'atualizou'});
})

// --------------   ----------

//requisição HTTP para obter tudo  da  tabela bebidas
app.get('/bebidas', async (req, res) => {
    const bebidas = await conexaoBanco.query('select * from bebidas order by id');
    res.json(bebidas);
})
//requisição HTTP para inserir na tabela bebidas
app.post('/acompanhamentos', async (req, res) => {
    await conexaoBanco.query('insert into bebidas (nome, preco, marca) values($1,$2,$3)',
        [req.body.nome, req.body.preco, req.body.marca]
    );
    res.json({mesagem: 'salvou'});
})

// função HTTP que atualiza bebidas 
app.put('/acompanhamentos', async (req, res) => {
    await conexaoBanco.query('update  set nome = $1, preco = $2, marca = $3 where id = $4',
        [req.body.nome, req.body.preco,req.body.marca, req.body.id]
    );
    res.json({mesagem: 'atualizou'});

})

app.listen(5000, () => {

    console.log("servidor iniciado na porta 5000")

})




