window.onload = function () {
    buscaContasBD();
    console.log('Aqui beleza');
};

function buscaContasBD() {

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
        }

        document.getElementById('CorpoContas').innerHTML = tabela;
    }

    var sumContas = new XMLHttpRequest();
    sumContas.open('POST', '/despesas/sum', true);
    sumContas.onreadystatechange = function () {

        if (sumContas.readyState == 4 && contas.status == 200) {
            console.log(sumContas.responseText);

            var objSum = JSON.parse(sumContas.responseText);

            var somaDespesa = objSum[0].sum_vl;

            document.getElementById('ValorSoma').innerHTML = format("#,##0.00", somaDespesa);

            /*var valorReceita = objSum[0].sum_vl;
            var valorDespesa = objSum[1].sum_vl;*/
        }

    }

    contas.send();
    sumContas.send();

};

