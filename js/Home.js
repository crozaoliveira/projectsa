window.onload = function () {
    setMesReferencia()
    buscaContasBD();
};

function buscaContasBD(mesReferencia) {

    if (mesReferencia) {

        var urlConta = '/home/contas/' + mesReferencia;

        var contas = new XMLHttpRequest();
        contas.open('POST', urlConta, true);
        contas.onreadystatechange = function () {

            if (contas.readyState == 4 && contas.status == 200) {

                var obj = JSON.parse(contas.responseText);

                var tabelaDespesa = '';
                var tabelaReceita = '';
                var somaReceita = 0;
                var somaDespesa = 0;
                var saldo = 0;

                for (var x = 0; x < obj.length; x++) {

                    if (obj[x].ID_TIPO == 2) {
                        tabelaDespesa += '<tr>' +
                            '<th scope="row">' + obj[x].NR_CONTA + '</th>' +
                            '<td>' + obj[x].DS_CONTA + '</td>' +
                            '<td>R$ ' + format("#,##0.00", obj[x].VL_CONTA) + '</td>' +
                            '<td>' + obj[x].DT_VENCIMENTO + '</td>' +
                            '<td><a href="#" onclick="updatePg(' + obj[x].NR_CONTA + ', \'H\')"><span class="badge badge-primary">editar</span></td>' +
                            '<td><a href="#" onclick="deleteById(' + obj[x].NR_CONTA + ', \'H\')"><span class="badge badge-danger">excluir</span></td>' +
                            '</tr>';

                        somaDespesa += Number(obj[x].VL_CONTA);

                    } else if ((obj[x].ID_TIPO == 3)) {
                        tabelaReceita += '<tr>' +
                            '<th scope="row">' + obj[x].NR_CONTA + '</th>' +
                            '<td>' + obj[x].DS_CONTA + '</td>' +
                            '<td>R$ ' + format("#,##0.00", obj[x].VL_CONTA) + '</td>' +
                            '<td>' + obj[x].DT_VENCIMENTO + '</td>' +
                            '<td><a href="#" onclick="updatePg(' + obj[x].NR_CONTA + ', \'H\')"><span class="badge badge-primary">editar</span></td>' +
                            '<td><a href="#" onclick="deleteById(' + obj[x].NR_CONTA + ', \'H\')"><span class="badge badge-danger">excluir</span></td>' +
                            '</tr>';

                        somaReceita += Number(obj[x].VL_CONTA);
                    }
                }

                saldo = somaReceita - somaDespesa;
            }

            document.getElementById('CorpoDespesas').innerHTML = tabelaDespesa;
            document.getElementById('CorpoReceitas').innerHTML = tabelaReceita;
            document.getElementById('ValorDespesa').innerHTML = format("#,##0.00", somaDespesa);
            document.getElementById('ValorReceita').innerHTML = format("#,##0.00", somaReceita);
            document.getElementById('ValorSaldo').innerHTML = format("#,##0.00", saldo);
        }

        contas.send();

    } else {

        var contas = new XMLHttpRequest();
        contas.open('POST', '/home/contas', true);
        contas.onreadystatechange = function () {

            if (contas.readyState == 4 && contas.status == 200) {

                var obj = JSON.parse(contas.responseText);

                var tabelaDespesa = '';
                var tabelaReceita = '';
                var somaReceita = 0;
                var somaDespesa = 0;
                var saldo = 0;

                for (var x = 0; x < obj.length; x++) {

                    if (obj[x].ID_TIPO == 2) {
                        tabelaDespesa += '<tr>' +
                            '<th scope="row">' + obj[x].NR_CONTA + '</th>' +
                            '<td>' + obj[x].DS_CONTA + '</td>' +
                            '<td>R$ ' + format("#,##0.00", obj[x].VL_CONTA) + '</td>' +
                            '<td>' + obj[x].DT_VENCIMENTO + '</td>' +
                            '<td><a href="#" onclick="updatePg(' + obj[x].NR_CONTA + ')"><span class="badge badge-primary">editar</span></td>' +
                            '<td><a href="#" onclick="deleteById(' + obj[x].NR_CONTA + ', \'H\')"><span class="badge badge-danger">excluir</span></td>' +
                            '</tr>';

                        somaDespesa += Number(obj[x].VL_CONTA);

                    } else if ((obj[x].ID_TIPO == 3)) {
                        tabelaReceita += '<tr>' +
                            '<th scope="row">' + obj[x].NR_CONTA + '</th>' +
                            '<td>' + obj[x].DS_CONTA + '</td>' +
                            '<td>R$ ' + format("#,##0.00", obj[x].VL_CONTA) + '</td>' +
                            '<td>' + obj[x].DT_VENCIMENTO + '</td>' +
                            '<td><a href="#" onclick="updatePg(' + obj[x].NR_CONTA + ')"><span class="badge badge-primary">editar</span></td>' +
                            '<td><a href="#" onclick="deleteById(' + obj[x].NR_CONTA + ', \'H\')"><span class="badge badge-danger">excluir</span></td>' +
                            '</tr>';

                        somaReceita += Number(obj[x].VL_CONTA);

                    }
                }
                saldo = somaReceita - somaDespesa;
            }

            document.getElementById('CorpoDespesas').innerHTML = tabelaDespesa;
            document.getElementById('CorpoReceitas').innerHTML = tabelaReceita;
            document.getElementById('ValorDespesa').innerHTML = 'R$ ' + format("#,##0.00", somaDespesa);
            document.getElementById('ValorReceita').innerHTML = 'R$ ' +format("#,##0.00", somaReceita);
            document.getElementById('ValorSaldo').innerHTML = 'R$ ' +format("#,##0.00", saldo);
        }

        contas.send();

    }

};

function updatePg(id_conta) {
    buscaContasBDById(id_conta);
    openForm();
};

function buscaContasBDById(id_conta) {

    var url = '/update-select/' + id_conta;

    var conta = new XMLHttpRequest();
    conta.open('POST', url, true);
    conta.onreadystatechange = function () {

        if (conta.readyState == 4 && conta.status == 200) {

            var obj = JSON.parse(conta.responseText);

            var id_conta = obj[0].NR_CONTA;
            var desc_conta = obj[0].DS_CONTA;
            var tipo_conta = obj[0].ID_TIPO;
            var valor = obj[0].VL_CONTA;
            var vencimento = obj[0].DT_VENCIMENTO;
            var btn_update = '<a class="btn btn-secondary" onclick="update(' + obj[0].NR_CONTA + ', \'home\')" href="#">Confirmar</a>';
        
            document.getElementById('id').innerText = id_conta;
            document.getElementById('descricao').value = desc_conta;
            if (tipo_conta == 2) {
                document.getElementsByName('tipoConta')[0].checked = true;
            } else {
                document.getElementsByName('tipoConta')[1].checked = true;
            }
            document.getElementById('valor').value = valor;
            document.getElementById('vencimento').value = vencimento;
            document.getElementById('cd-btnConfirmar').innerHTML = btn_update;
        }
    }
    conta.send();
};


