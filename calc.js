function sumar () {
    n1 =  document.getElementById('num1').value;
    num2 =  document.getElementById('num2').value;

    resultado = parseInt(num1) + parseInt(num2);
    console.log(resultado);

    document.getElementById('resultado').innerHTML = resultado;
}

function restar () {
    num1 =  document.getElementById('num1').value;
    num2 =  document.getElementById('num2').value;

    resultado = parseInt(num1) - parseInt(num2);
    console.log(resultado);

    document.getElementById('resultado').innerHTML = resultado;
}

function multiplicar () {
    num1 =  document.getElementById('num1').value;
    num2 =  document.getElementById('num2').value;

    resultado = parseInt(num1) * parseInt(num2);
    console.log(resultado);

    document.getElementById('resultado').innerHTML = resultado;
}

function dividir () {
    num1 =  document.getElementById('num1').value;
    num2 =  document.getElementById('num2').value;

    resultado = parseInt(num1) / parseInt(num2);
    console.log(resultado);

    document.getElementById('resultado').innerHTML = resultado;
}