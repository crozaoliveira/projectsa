window.onload = function () {
    buscaContasBD();
    console.log('Aqui beleza');
};

function buscaContasBD() {

    var contas = new XMLHttpRequest();
    contas.open('POST', '/home/contas', true);
    contas.onreadystatechange = function () {

        if (contas.readyState == 4 && contas.status == 200) {
            console.log(contas.responseText);

            var obj = JSON.parse(contas.responseText);

            var tabelaDespesa = '';
            var tabelaReceita = '';
            /*var despesa = [];
            var receita = [];

            for (var x = 0; x < obj.length; x++) {

                var contaDespesa = 0;
                var contaReceita = 0;

                if (obj[x].ID_TIPO == 2) {
                    despesa[contaDespesa] = obj[x];
                    contaDespesa++;
                } else {
                    receita[contaReceita] = obj[x];
                    contaReceita++;
                }

            }*/

            for (var x = 0; x < obj.length; x++) {

                if (obj[x].ID_TIPO == 2) {
                    tabelaDespesa += '<tr>' +
                        '<th scope="row">' + obj[x].NR_CONTA + '</th>' +
                        '<td>' + obj[x].DS_CONTA + '</td>' +
                        '<td>R$ ' + format("#,##0.00", obj[x].VL_CONTA) + '</td>' +
                        '<td>' + obj[x].DT_VENCIMENTO + '</td>' +
                        '<td><a href="#" onclick="updatePg(' + obj[x].NR_CONTA + ')">update</td>' +
                        '<td><a href="#" onclick="deleteById(' + obj[x].NR_CONTA + ')">delete</td>' +
                        '</tr>';
                } else if ((obj[x].ID_TIPO == 3)) {
                    tabelaReceita += '<tr>' +
                        '<th scope="row">' + obj[x].NR_CONTA + '</th>' +
                        '<td>' + obj[x].DS_CONTA + '</td>' +
                        '<td>R$ ' + format("#,##0.00", obj[x].VL_CONTA) + '</td>' +
                        '<td>' + obj[x].DT_VENCIMENTO + '</td>' +
                        '<td><a href="#" onclick="updatePg(' + obj[x].NR_CONTA + ')">update</td>' +
                        '<td><a href="#" onclick="deleteById(' + obj[x].NR_CONTA + ')">delete</td>' +
                        '</tr>';
                }

                /*tabelaDespesa += '<tr>' +
                    '<th scope="row">' + despesa[x].NR_CONTA + '</th>' +
                    '<td>' + despesa[x].NR_CONTA + '</td>' + 
                    '<td>' + despesa[x].NR_CONTA + '</td>' +
                    '<td>' + despesa[x].NR_CONTA + '</td>' +
                    '</tr>';*/
            }
        }

        document.getElementById('CorpoDespesas').innerHTML = tabelaDespesa;
        document.getElementById('CorpoReceitas').innerHTML = tabelaReceita;
    }

    var sumContas = new XMLHttpRequest();
    sumContas.open('POST', '/home/sum', true);
    sumContas.onreadystatechange = function () {

        if (sumContas.readyState == 4 && contas.status == 200) {
            console.log(sumContas.responseText);

            var objSum = JSON.parse(sumContas.responseText);

            var somaDespesa = objSum[0].sum_vl;
            var somaReceita = objSum[1].sum_vl;

            var saldo = somaReceita - somaDespesa;

            document.getElementById('ValorDespesa').innerHTML = format("#,##0.00", somaDespesa);
            document.getElementById('ValorReceita').innerHTML = format("#,##0.00", somaReceita);
            document.getElementById('ValorSaldo').innerHTML = format("#,##0.00", saldo);

            /*var valorReceita = objSum[0].sum_vl;
            var valorDespesa = objSum[1].sum_vl;*/
        }

    }

    contas.send();
    sumContas.send();

};

function updatePg(id_conta) {
    buscaContasBDById(id_conta);
    console.log('Aqui beleza');
    openForm();
};

function buscaContasBDById(id_conta) {

    var url = '/update-select/' + id_conta;

    var conta = new XMLHttpRequest();
    conta.open('POST', url, true);
    conta.onreadystatechange = function () {

        if (conta.readyState == 4 && conta.status == 200) {
            console.log(conta.responseText);

            var obj = JSON.parse(conta.responseText);

            var id_conta = obj[0].NR_CONTA;
            var desc_conta = obj[0].DS_CONTA;
            var tipo_conta = obj[0].ID_TIPO;
            var valor = obj[0].VL_CONTA;
            var vencimento = obj[0].DT_VENCIMENTO;
            var btn_update = '<a onclick="update(' + obj[0].NR_CONTA + ')" href="#">Confirmar</a>';

            document.getElementById('id').innerText = id_conta;
            document.getElementById('descricao').value = desc_conta;
            if (tipo_conta == 2) {
                document.getElementsByName('tipoConta')[0].checked = true;
            } else {
                document.getElementsByName('tipoConta')[1].checked = true;
            }
            document.getElementById('valor').value = valor;
            document.getElementById('vencimento').value = vencimento;
            document.getElementById('cd-btnCadastrar').innerHTML = btn_update;
        }
    }
    conta.send();
};


