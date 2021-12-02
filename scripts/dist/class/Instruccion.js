import { numAHexadecimal } from "../funciones.js";
export class Instruccion {
    constructor(instruccion, parametros) {
        this.instruccion = instruccion;
        this.parametros = parametros;
        this.instruccionBin = '';
        this.instruccionHexa = '';
    }
    getInstruccion() {
        return this.instruccion;
    }
    getInstruccionBin() {
        return this.instruccionBin;
    }
    getInstruccionHex() {
        return this.instruccionHexa;
    }
    crearHTMLBin(linea) {
        return $('<div>', {
            class: 'instruccion'
        });
    }
    crearHTMLHex(linea) {
        let divInstruccion = $('<div>', {
            class: 'instruccion'
        });
        // Número de instruccion
        divInstruccion.append(`<span class="numero-instruccion">${linea} -</span>`);
        // Valor en hexadecimal
        this.instruccionHexa = numAHexadecimal(parseInt(this.instruccionBin, 2)).toUpperCase();
        divInstruccion.append(`<span class="valor hexadecimal">${this.instruccionHexa}</span>`);
        // Agregar boton para copiar linea
        divInstruccion.append(`<button class="boton-copiar"><span class="material-icons-round">content_copy</span></button>`);
        return divInstruccion;
    }
}
