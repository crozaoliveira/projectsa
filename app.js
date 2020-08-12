const express = require('express');
const bodyParser = require('body-Parser');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1meuDB2400',
    port: 3306,
    database: 'webfinance'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));

// Caminhos de Páginas //

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/cadastrocontas', function (req, res) {
    res.sendFile(__dirname + '/Cadastro.html');
});

app.get('/editar-despesa', function (req, res) {
    connection.query("SELECT NR_CONTA, DS_CONTA, VL_CONTA, DATE_FORMAT(DT_VENCIMENTO, '%d/%m/%Y') AS DT_VENCIMENTO, DATE_FORMAT(DT_INCLUSAO, '%d/%m/%Y') AS DT_INCLUSAO, ID_TIPO FROM CONTAS WHERE nr_conta = ?", [req.params.id], function (err, result, field) {
        res.json(result);
    });
});

app.get('/editar-receita', function (req, res) {
    res.sendFile(__dirname + '/Editar.html')
});

app.get('/despesa', function (req, res) {
    res.sendFile(__dirname + '/Despesas.html')
});

app.get('/receita', function (req, res) {
    res.sendFile(__dirname + '/Receitas.html')
});

// Fim Caminhos de Páginas //

// Caminhos Requisições SQL //

app.post('/home/sum/:data?', function (req, res) {
    if (req.params.data) {
        connection.query("SELECT id_tipo, SUM(vl_conta) AS sum_vl FROM contas WHERE MONTH(DT_VENCIMENTO) = MONTH(?) AND YEAR(DT_VENCIMENTO) = YEAR(?) GROUP BY id_tipo",
            [req.params.data, req.params.data], function (err, result, field) {
                console.log(result);
                res.json(result);
            });
    } else {
        connection.query("SELECT id_tipo, SUM(vl_conta) AS sum_vl FROM contas WHERE MONTH(DT_VENCIMENTO) = MONTH(SYSDATE()) AND YEAR(DT_VENCIMENTO) = YEAR(SYSDATE()) GROUP BY id_tipo", function (err, result, field) {
            console.log(result);
            res.json(result);
        });
    }
});

app.post('/home/contas/:data?', function (req, res) {
    if (req.params.data) {
        connection.query("SELECT NR_CONTA, DS_CONTA, VL_CONTA, DATE_FORMAT(DT_VENCIMENTO, '%d/%m/%Y') AS DT_VENCIMENTO, DATE_FORMAT(DT_INCLUSAO, '%d/%m/%Y') AS DT_INCLUSAO, ID_TIPO FROM CONTAS WHERE IE_ATIVO = 'S' AND IE_DELETADO = 'N' AND MONTH(DT_VENCIMENTO) = MONTH(?) AND YEAR(DT_VENCIMENTO) = YEAR(?)",
            [req.params.data, req.params.data], function (err, result, field) {
                res.json(result);
            });
    } else {
        connection.query("SELECT NR_CONTA, DS_CONTA, VL_CONTA, DATE_FORMAT(DT_VENCIMENTO, '%d/%m/%Y') AS DT_VENCIMENTO, DATE_FORMAT(DT_INCLUSAO, '%d/%m/%Y') AS DT_INCLUSAO, ID_TIPO FROM CONTAS WHERE IE_ATIVO = 'S' AND IE_DELETADO = 'N' AND MONTH(DT_VENCIMENTO) = MONTH(SYSDATE()) AND YEAR(DT_VENCIMENTO) = YEAR(SYSDATE())", function (err, result, field) {
            res.json(result);
        });
    }
});

app.post('/receitas/contas/:data?', function (req, res) {
    if (req.params.data) {
        connection.query("SELECT NR_CONTA, DS_CONTA, VL_CONTA, DATE_FORMAT(DT_VENCIMENTO, '%d/%m/%Y') AS DT_VENCIMENTO, DATE_FORMAT(DT_INCLUSAO, '%d/%m/%Y') AS DT_INCLUSAO, ID_TIPO FROM CONTAS WHERE IE_ATIVO = 'S' AND IE_DELETADO = 'N' AND MONTH(DT_VENCIMENTO) = MONTH(?) AND YEAR(DT_VENCIMENTO) = YEAR(?) AND ID_TIPO = 3",
            [req.params.data, req.params.data], function (err, result, field) {
                res.json(result);
            });
    } else {
        connection.query("SELECT NR_CONTA, DS_CONTA, VL_CONTA, DATE_FORMAT(DT_VENCIMENTO, '%d/%m/%Y') AS DT_VENCIMENTO, DATE_FORMAT(DT_INCLUSAO, '%d/%m/%Y') AS DT_INCLUSAO, ID_TIPO FROM CONTAS WHERE IE_ATIVO = 'S' AND IE_DELETADO = 'N' AND MONTH(DT_VENCIMENTO) = MONTH(SYSDATE()) AND YEAR(DT_VENCIMENTO) = YEAR(SYSDATE()) AND ID_TIPO = 3", function (err, result, field) {
            res.json(result);
        });
    }
});

app.post('/receitas/sum/:data?', function (req, res) {
    if (req.params.data) {
        connection.query("SELECT SUM(vl_conta) AS sum_vl FROM contas WHERE id_tipo = 3 AND MONTH(DT_VENCIMENTO) = MONTH(?) AND YEAR(DT_VENCIMENTO) = YEAR(?)",
            [req.params.data, req.params.data], function (err, result, field) {
                res.json(result);
            });
    } else {
        connection.query("SELECT SUM(vl_conta) AS sum_vl FROM contas WHERE id_tipo = 3 AND MONTH(DT_VENCIMENTO) = MONTH(SYSDATE()) AND YEAR(DT_VENCIMENTO) = YEAR(SYSDATE())", function (err, result, field) {
            res.json(result);
        });
    }
});

app.post('/despesas/contas/:data?', function (req, res) {
    if (req.params.data) {
        connection.query("SELECT NR_CONTA, DS_CONTA, VL_CONTA, DATE_FORMAT(DT_VENCIMENTO, '%d/%m/%Y') AS DT_VENCIMENTO, DATE_FORMAT(DT_INCLUSAO, '%d/%m/%Y') AS DT_INCLUSAO, ID_TIPO FROM CONTAS WHERE IE_ATIVO = 'S' AND IE_DELETADO = 'N' AND MONTH(DT_VENCIMENTO) = MONTH(?) AND YEAR(DT_VENCIMENTO) = YEAR(?) AND ID_TIPO = 2",
            [req.params.data, req.params.data], function (err, result, field) {
                res.json(result);
            });
    } else {
        connection.query("SELECT NR_CONTA, DS_CONTA, VL_CONTA, DATE_FORMAT(DT_VENCIMENTO, '%d/%m/%Y') AS DT_VENCIMENTO, DATE_FORMAT(DT_INCLUSAO, '%d/%m/%Y') AS DT_INCLUSAO, ID_TIPO FROM CONTAS WHERE IE_ATIVO = 'S' AND IE_DELETADO = 'N' AND MONTH(DT_VENCIMENTO) = MONTH(SYSDATE()) AND YEAR(DT_VENCIMENTO) = YEAR(SYSDATE()) AND ID_TIPO = 2", function (err, result, field) {
            res.json(result);
        });
    }
});

app.post('/despesas/sum/:data?', function (req, res) {
    if (req.params.data) {
        connection.query("SELECT SUM(vl_conta) AS sum_vl FROM contas WHERE id_tipo = 2 AND MONTH(DT_VENCIMENTO) = MONTH(?) AND YEAR(DT_VENCIMENTO) = YEAR(?)",
            [req.params.data, req.params.data], function (err, result, field) {
                res.json(result);
            });
    } else {
        connection.query("SELECT SUM(vl_conta) AS sum_vl FROM contas WHERE id_tipo = 2 AND MONTH(DT_VENCIMENTO) = MONTH(SYSDATE()) AND YEAR(DT_VENCIMENTO) = YEAR(SYSDATE())", function (err, result, field) {
            res.json(result);
        });
    }
});

app.post('/add-cadastro', function (req, res) {
    var id_conta = '';

    if (req.body.tipoConta == 'D') {
        id_conta = 2;
    } else {
        id_conta = 3;
    }
    connection.query("INSERT INTO CONTAS (DS_CONTA, VL_CONTA, ID_TIPO, DT_VENCIMENTO, DT_INCLUSAO, IE_ATIVO, IE_DELETADO, ID_USUARIO) VALUES (?, ?, ?, ?, SYSDATE(), ?, ?, ?)",
        [req.body.descricao, req.body.valor, id_conta, req.body.vencimento, 'S', 'N', 1]);
    res.redirect('/Cadastro.html');
});

app.post('/update-select/:id', function (req, res) {
    connection.query("SELECT NR_CONTA, DS_CONTA, VL_CONTA, DATE_FORMAT(DT_VENCIMENTO, '%Y-%m-%d') AS DT_VENCIMENTO, DATE_FORMAT(DT_INCLUSAO, '%Y-%m-%d') AS DT_INCLUSAO, ID_TIPO FROM CONTAS WHERE nr_conta = ?", [req.params.id], function (err, result, field) {
        res.json(result);
    });
});

app.get('/update/:descricao?/:valor?/:vencimento?/:tipoconta?/:id?', function (req, res) {
    connection.query("UPDATE contas SET DS_CONTA = ?, VL_CONTA = ?, DT_VENCIMENTO = ?, ID_TIPO = ?, DT_INCLUSAO = SYSDATE()  WHERE NR_CONTA = ?",
        [req.params.descricao, req.params.valor, req.params.vencimento, req.params.tipoconta, req.params.id], function (err, result, field) {
            res.redirect('/');
        });
});

app.get('/delete/:id?', function (req, res) {
    connection.query("UPDATE contas SET IE_DELETADO = 'S', DT_ATUALIZACAO = SYSDATE() WHERE NR_CONTA = ?",
        [req.params.id], function (err, result, field) {
            res.redirect('/');
            console.log(req.params.id)
            console.log(result);
        });
});

//app.get('/update/:id?/:descricao?/:valor?/:vencimento?/:tipoConta?')

// Fim Caminhos Requisições SQL //

// Servidor //

app.listen(8081, function () {
    console.log("Servidor rodando!");
});

// Fim Servidor //
