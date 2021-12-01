import { InstruccionTipoD } from './class/InstruccionTipoD.js';
import { InstruccionTipoR } from './class/InstruccionTipoR.js';
import { InstruccionTipoI } from './class/InstruccionTipoI.js';
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
    let divInstruccionesBin = $('#resultado_bin');
    divInstruccionesBin.empty();
    lineasCodigo.forEach((linea, index) => {
        let indexPrimerEspacio = linea.indexOf(' ');
        let instruccion = linea.substring(0, indexPrimerEspacio).trim().toLowerCase();
        let parametros = linea.substring(indexPrimerEspacio + 1);
        switch (tipoDeInstruccion(instruccion)) {
            case tipoInstruccion.DTYPE:
                instrucciones.push(new InstruccionTipoD(instruccion, parametros));
                divInstruccionesBin.append(instrucciones[index].crearHTML(index + 1));
                break;
            case tipoInstruccion.RTYPE:
                instrucciones.push(new InstruccionTipoR(instruccion, parametros));
                divInstruccionesBin.append(instrucciones[index].crearHTML(index + 1));
                break;
            case tipoInstruccion.ITYPE:
                instrucciones.push(new InstruccionTipoI(instruccion, parametros));
                divInstruccionesBin.append(instrucciones[index].crearHTML(index + 1));
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
