function sizeOfThings() {
    //var windowHeight = window.innerHeight;
    //var screenHeight = screen.height;
    document.querySelector('#Body').style.height = window.innerHeight + 'px';
};

sizeOfThings();

window.addEventListener('resize', function () {
    sizeOfThings();
});

function update(nr_conta){
    var descricao = document.getElementById('descricao').value;
    var valor = document.getElementById('valor').value;
    var vencimento = document.getElementById('vencimento').value;
    var tipoConta = document.getElementsByName('tipoConta')[0].checked;

    if(tipoConta){
        tipoConta = 2;
    } else {
        tipoConta = 3;
    }

    console.log('/update/' + descricao + '/' + valor + '/' + vencimento + '/' + tipoConta + '/' + nr_conta );

    window.location.href = '/update/' + descricao + '/' + valor + '/' + vencimento + '/' + tipoConta + '/' + nr_conta ;
};

function openForm(){
    document.getElementById("myForm").style.display = "block";
}

function closeForm(){
    document.getElementById("myForm").style.display = "none";
}

function deleteById(nr_conta){
    if(confirm('Deseja deletar esta conta?')){
        window.location.href = '/delete/' + nr_conta;
    }
    window.location.href = '/';
};

function moeda(valor) {
    var v = valor.toString();
    console.log(v);
    v = v.replace(/\D/g, "") // permite digitar apenas numero
    console.log(v);
    v = v.replace(/(\d{3})(\d)$/, "$1.$2") // coloca ponto antes dos ultimos digitos
    console.log(v);
    v = v.replace(/(\d{3})(\d)$/, "$1.$2") // coloca ponto antes dos ultimos 13 digitos
    console.log(v);
    v = v.replace(/(\d{3})(\d)$/, "$1.$2") // coloca ponto antes dos ultimos 10 digitos
    console.log(v);
    v = v.replace(/(\d{3})(\d)$/, "$1.$2") // coloca ponto antes dos ultimos 7 digitos
    console.log(v);
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1,$2") // coloca virgula antes dos ultimos 4 digitos
    console.log(v);
    return v
}

function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}
