"use strict";
// Metodo para convertir
$('#compilar').on('click', () => {
    let contenidoCodigo = myCode.getValue();
    let lineasCodigo = contenidoCodigo.split('\n');
    lineasCodigo.forEach((linea, index) => {
        let divInstruccionesBin = $('#resultado_bin');
        let indexPrimerEspacio = linea.indexOf(' ');
        let instruccion = linea.substring(0, indexPrimerEspacio).trim();
        let parametros = linea.substring(indexPrimerEspacio + 1).split(',');
        let registros = [];
        parametros.forEach(registro => {
            let reg = registro.trim();
            reg = reg.replace(/x|X/, '');
            registros.push(reg);
        });
        // Convertir instruccion a binario
        // Número de instruccion
        let numInstruccion = index + 1;
        divInstruccionesBin.append(`<span class="numero-instruccion">${numInstruccion} -</span>`);
        // Codigo de operacion
        let bin = instruccionABin(instruccion);
        divInstruccionesBin.append(`<span class="valor codigo-operacion">${bin}</span>`);
        console.log(instruccion, registros);
    });
});
function instruccionABin(instruccion) {
    switch (instruccion) {
        case 'add':
        case 'ADD':
            return '0000111101';
            break;
        default:
            return '0';
    }
}
