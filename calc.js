console.log("calc.js cargado correctamente");

function sumar () {
   let num1 =  document.getElementById('num1').value;
   let num2 =  document.getElementById('num2').value;

   let numero1 = Number(num1)
   let numero2 = Number(num2)

    resultado = numero1 + numero2;
    console.log(resultado);

    document.getElementById('resultado').innerHTML = resultado;
}

function restar () {
    let num1 =  document.getElementById('num1').value;
    let num2 =  document.getElementById('num2').value;

   let numero1 = Number(num1)
   let numero2 = Number(num2)

    resultado = numero1 - numero2;
    console.log(resultado);

    document.getElementById('resultado').innerHTML = resultado;
}

function multiplicar () {
    let num1 =  document.getElementById('num1').value;
    let num2 =  document.getElementById('num2').value;

   let numero1 = Number(num1)
   let numero2 = Number(num2)

    resultado = numero1 * numero2;
    console.log(resultado);

    document.getElementById('resultado').innerHTML = resultado;
}

function dividir () {
    let num1 =  document.getElementById('num1').value;
    let num2 =  document.getElementById('num2').value;

   let numero1 = Number(num1)
   let numero2 = Number(num2)

   if (numero2 == 0) {
        document.getElementById('resultado').innerHTML ="Math error";o;
        return;
    }

    resultado = numero1 / numero2;
    console.log(resultado);

    document.getElementById('resultado').innerHTML = resultado;o;
}