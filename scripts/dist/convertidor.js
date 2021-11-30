"use strict";
// Metodo para convertir
$('#compilar').on('click', () => {
    let contenidoCodigo = myCode.getValue();
    let lineasCodigo = contenidoCodigo.split('\n');
    lineasCodigo.forEach(linea => {
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
        console.log(instruccion, registros);
    });
});
