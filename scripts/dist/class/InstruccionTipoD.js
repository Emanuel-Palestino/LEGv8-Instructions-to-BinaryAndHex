import { Instruccion } from "./Instruccion.js";
import { numABinario, instruccionABin } from "../funciones.js";
export class InstruccionTipoD extends Instruccion {
    constructor(instruccion, parametros) {
        super(instruccion, parametros);
        this.valores = [];
        // Obtener los valores
        let parametrosAux = this.parametros.trim();
        let parametrosIndividuales = parametrosAux.split(',');
        // Valor 1
        let valor1 = parseInt(parametrosIndividuales[0].replace(/x|X/, ''));
        this.valores.push(valor1);
        // Valor 2
        let valor2 = parseInt(parametrosIndividuales[1].replace(/x|X/, '').replace('[', ''));
        this.valores.push(valor2);
        // Valor 3
        let valor3 = parseInt(parametrosIndividuales[2].replace(/#|]/, ''));
        this.valores.push(valor3);
    }
    crearHTML(linea) {
        let divInstruccion = $('<div>', {
            class: 'instruccion'
        });
        // Número de instruccion
        divInstruccion.append(`<span class="numero-instruccion">${linea} -</span>`);
        // Codigo de operacion
        let instruccionBin = instruccionABin(this.instruccion);
        divInstruccion.append(`<span class="valor codigo-operacion">${instruccionBin}</span>`);
        // Segundo parametro
        divInstruccion.append(`<span class="valor parametro-2">${numABinario(this.valores[2], 9)}</span>`);
        // Parametro vacio
        divInstruccion.append(`<span class="valor parametro-vacio">00</span>`);
        // Primer parametro
        divInstruccion.append(`<span class="valor parametro-1">${numABinario(this.valores[1], 5)}</span>`);
        // A donde se irá el resultado
        divInstruccion.append(`<span class="valor parametro-destino">${numABinario(this.valores[0], 5)}</span>`);
        // Agregar boton para copiar linea
        divInstruccion.append(`<button class="boton-copiar"><span class="material-icons-round">content_copy</span></button>`);
        return divInstruccion;
    }
}
