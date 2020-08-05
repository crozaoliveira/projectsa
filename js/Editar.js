function updatePg(id_conta){
    buscaContasBDById(id_conta);
    console.log('Aqui beleza');
    openForm();
};

function openForm(){
    document.getElementById("myForm").style.display = "block";
}

function closeForm(){
    document.getElementById("myForm").style.display = "none";
}

function buscaContasBDById(id_conta) {

    var url = '/update-select/' + id_conta;

    var conta = new XMLHttpRequest();
    conta.open('POST', url, true);
    conta.onreadystatechange = function () {

        if (contas.readyState == 4 && contas.status == 200) {
            console.log(contas.responseText);

            var obj = JSON.parse(contas.responseText);

            var fomulario = '<div id="cd-cabecalho">' +
            '<h1>Cadastro de Contas</h1>' +
                '</div>' +
                '<div id="cd-id">' +
                    '<label for="identificacao">ID da Conta:</label>' +
                    '<input type="number" name="identificacao" id="id">' +
                '</div>' +
                '<div id="cd-descricao">' +
                    '<label for="descricao">Descrição</label>' +
                    '<input type="text" name="descricao" id="descricao">' +
                '</div>' +
                '<div id="cd-tipovl">' +
                    '<div class="">' +
                        '<p>Tipo de Conta:</p>' +
                        '<div>' +
                            '<input type="radio" name="tipoConta" id="despesa" value="D">' +
                            '<label for="despesa">Despesa</label>' +
                        '</div>' +
                        '<div>' +
                            '<input type="radio" name="tipoConta" id="receita" value="R">' +
                            '<label for="receita">Receita</label>' +
                        '</div>' +
                    '</div>' +
                    '<div>' +
                        '<label for="valor">Valor:</label>' +
                        '<input name="valor" id="valor">' +
                    '</div>' +
                '</div>' +
                '<div id="cd-vencimento">' +
                    '<label for="vencimento">Vencimento:</label>' +
                    '<input type="date" name="vencimento" id="vencimento">' +
                '</div>' +
                '<div id="cd-btnCadastrar">' +
                    '<input type="submit" onclick="update()" value="Confirmar">' +
                    '<input type="submit" onclick="closeForm()" value="Fechar">' +
                '</div>'
        }

        document.getElementById('CorpoContas').innerHTML = tabela;
    }
    conta.send();
};

