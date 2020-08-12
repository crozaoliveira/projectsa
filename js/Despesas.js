window.onload = function () {
    setMesReferencia()
    buscaContasBD();
    console.log('Aqui beleza');
};

function buscaContasBD(mesReferencia) {

    if (mesReferencia) {

        var urlConta = '/despesas/contas/' + mesReferencia;

        var contas = new XMLHttpRequest();
        contas.open('POST', urlConta, true);
        contas.onreadystatechange = function () {

            if (contas.readyState == 4 && contas.status == 200) {
                console.log(contas.responseText);

                var obj = JSON.parse(contas.responseText);

                var tabela = '';

                for (var x = 0; x < obj.length; x++) {

                    tabela += '<tr>' +
                        '<th scope="row">' + obj[x].NR_CONTA + '</th>' +
                        '<td>' + obj[x].DS_CONTA + '</td>' +
                        '<td>R$ ' + format("#,##0.00", obj[x].VL_CONTA) + '</td>' +
                        '<td>' + obj[x].DT_VENCIMENTO + '</td>' +
                        '<td>' + obj[x].DT_INCLUSAO + '</td>' +
                        '</tr>';
                }

                var soma = 0;

                for (var x = 0; x < obj.length; x++) {
                    soma += Number(obj[x].VL_CONTA);
                }

            }
            document.getElementById('CorpoContas').innerHTML = tabela;
            document.getElementById('ValorSoma').innerHTML = format("#,##0.00", soma);

        }

        contas.send();
        sumContas.send();

    } else {
        var contas = new XMLHttpRequest();
        contas.open('POST', '/despesas/contas', true);
        contas.onreadystatechange = function () {

            if (contas.readyState == 4 && contas.status == 200) {
                console.log(contas.responseText);

                var obj = JSON.parse(contas.responseText);

                var tabela = '';

                for (var x = 0; x < obj.length; x++) {

                    tabela += '<tr>' +
                        '<th scope="row">' + obj[x].NR_CONTA + '</th>' +
                        '<td>' + obj[x].DS_CONTA + '</td>' +
                        '<td>R$ ' + format("#,##0.00", obj[x].VL_CONTA) + '</td>' +
                        '<td>' + obj[x].DT_VENCIMENTO + '</td>' +
                        '<td>' + obj[x].DT_INCLUSAO + '</td>' +
                        '</tr>';
                }

                var soma = 0;

                for (var x = 0; x < obj.length; x++) {
                    soma += Number(obj[x].VL_CONTA);
                }
            }

            document.getElementById('CorpoContas').innerHTML = tabela;
            document.getElementById('ValorSoma').innerHTML = format("#,##0.00", soma);
        }

        contas.send();
        sumContas.send();
    }

};

