import { Instruccion } from "./Instruccion.js";
import { numABinario, instruccionABin } from "../funciones.js";
export class InstruccionTipoB extends Instruccion {
    constructor(instruccion, parametros) {
        super(instruccion, parametros);
        this.valores = [];
        // Obtener los valores
        let parametrosAux = this.parametros.trim();
        let parametrosIndividuales = parametrosAux.split(',');
        // Valor 2 (Etiqueta al que saltará)
        this.etiqueta = parametrosIndividuales[0].trim();
    }
    getEtiqueta() {
        return this.etiqueta;
    }
    crearHTMLBin(linea) {
        let divInstruccion = $('<div>', {
            class: 'instruccion'
        });
        // Número de instruccion
        divInstruccion.append(`<span class="numero-instruccion">${linea} -</span>`);
        // Codigo de operacion
        let instruccionBin = instruccionABin(this.instruccion);
        divInstruccion.append(`<span class="valor codigo-operacion">${instruccionBin}</span>`);
        // A donde saltará
        divInstruccion.append(`<span class="valor parametro-destino">${numABinario(this.valores[0], 26)}</span>`);
        // Agregar boton para copiar linea
        divInstruccion.append(`<button class="boton-copiar"><span class="material-icons-round">content_copy</span></button>`);
        return divInstruccion;
    }
    calcularValorEtiqueta(lineaInstruccion, lineaEtiqueta) {
        this.valores.push(lineaEtiqueta - lineaInstruccion);
    }
}
