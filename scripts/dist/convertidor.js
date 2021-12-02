import { InstruccionTipoD } from './class/InstruccionTipoD.js';
import { InstruccionTipoR } from './class/InstruccionTipoR.js';
import { InstruccionTipoI } from './class/InstruccionTipoI.js';
import { InstruccionTipoB } from './class/InstruccionTipoB.js';
import { InstruccionTipoCB } from './class/InstruccionTipoCB.js';
// enums
var tipoInstruccion;
(function (tipoInstruccion) {
    tipoInstruccion[tipoInstruccion["BTYPE"] = 1] = "BTYPE";
    tipoInstruccion[tipoInstruccion["CBTYPE"] = 2] = "CBTYPE";
    tipoInstruccion[tipoInstruccion["RTYPE"] = 3] = "RTYPE";
    tipoInstruccion[tipoInstruccion["DTYPE"] = 4] = "DTYPE";
    tipoInstruccion[tipoInstruccion["ITYPE"] = 5] = "ITYPE";
})(tipoInstruccion || (tipoInstruccion = {}));
// Metodo para convertir
$('#compilar').on('click', () => {
    let instrucciones = [];
    let contenidoCodigo = myCode.getValue();
    let lineasCodigo = contenidoCodigo.split('\n');
    let etiquetas = [];
    let divInstruccionesBin = $('#resultado_bin');
    divInstruccionesBin.empty();
    // Encontrar etiquetas
    for (let index = 0; index < lineasCodigo.length; index++) {
        // saber si existe una etiqueta
        lineasCodigo[index] = lineasCodigo[index].trim();
        let indexDosPuntos = lineasCodigo[index].indexOf(':');
        if (indexDosPuntos >= 0) {
            let etiqueta = lineasCodigo[index].substring(0, indexDosPuntos).trim();
            // Quitar la etiqueta de la instruccion
            lineasCodigo[index] = lineasCodigo[index].substring(indexDosPuntos + 1).trim();
            // Guardar la etiqueta
            etiquetas.push({
                id: etiqueta,
                linea: index
            });
            // Eliminar linea si es que solo se encontraba una etiqueta
            if (lineasCodigo[index] == '')
                lineasCodigo.splice(index, 1);
        }
    }
    // Obtener instrucciones
    lineasCodigo.forEach((linea, index) => {
        let indexPrimerEspacio = linea.indexOf(' ');
        let instruccion = linea.substring(0, indexPrimerEspacio).trim().toLowerCase();
        let parametros = linea.substring(indexPrimerEspacio + 1);
        switch (tipoDeInstruccion(instruccion)) {
            case tipoInstruccion.DTYPE:
                instrucciones.push(new InstruccionTipoD(instruccion, parametros));
                divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1));
                break;
            case tipoInstruccion.RTYPE:
                instrucciones.push(new InstruccionTipoR(instruccion, parametros));
                divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1));
                break;
            case tipoInstruccion.ITYPE:
                instrucciones.push(new InstruccionTipoI(instruccion, parametros));
                divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1));
                break;
            case tipoInstruccion.CBTYPE:
                let instruc = new InstruccionTipoCB(instruccion, parametros);
                // valor de la etiqueta
                let etiqueta = instruc.getEtiqueta();
                let lineaEtiqueta = -1;
                etiquetas.forEach(e => {
                    if (e.id == etiqueta)
                        lineaEtiqueta = e.linea;
                });
                instruc.calcularValorEtiqueta(index, lineaEtiqueta);
                instrucciones.push(instruc);
                divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1));
                break;
            case tipoInstruccion.BTYPE:
                let instrucB = new InstruccionTipoB(instruccion, parametros);
                // valor de la etiqueta
                let etiquetaB = instrucB.getEtiqueta();
                let lineaEtiquetaB = -1;
                etiquetas.forEach(e => {
                    if (e.id == etiquetaB)
                        lineaEtiquetaB = e.linea;
                });
                instrucB.calcularValorEtiqueta(index, lineaEtiquetaB);
                instrucciones.push(instrucB);
                divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1));
                break;
        }
    });
});
function tipoDeInstruccion(instruccion) {
    switch (instruccion) {
        case 'add':
        case 'sub':
        case 'lsl':
        case 'lsr':
        case 'br':
            return tipoInstruccion.RTYPE;
            break;
        case 'stur':
        case 'ldur':
            return tipoInstruccion.DTYPE;
            break;
        case 'addi':
        case 'subi':
            return tipoInstruccion.ITYPE;
            break;
        case 'b':
        case 'bl':
            return tipoInstruccion.BTYPE;
            break;
        case 'cbz':
        case 'cbnz':
            return tipoInstruccion.CBTYPE;
            break;
        default:
            return 0;
    }
}
