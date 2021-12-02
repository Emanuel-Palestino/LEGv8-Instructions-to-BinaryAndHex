import { Instruccion } from "./Instruccion.js";
import { numABinario, instruccionABin } from "../funciones.js";

export class InstruccionTipoB extends Instruccion {
	private valores: number[] = []
	private etiqueta: string

	constructor(instruccion: string, parametros: string) {
		super(instruccion, parametros)
		// Obtener los valores
		let parametrosAux: string = this.parametros.trim()
		let parametrosIndividuales: string[] = parametrosAux.split(',')

		// Valor 2 (Etiqueta al que saltará)
		this.etiqueta = parametrosIndividuales[0].trim()

		
	}

	getEtiqueta(): string {
		return this.etiqueta
	}

	crearHTMLBin(linea: number): JQuery<HTMLElement> {
		let divInstruccion = $('<div>', {
			class: 'instruccion'
		})

		// Número de instruccion
		divInstruccion.append(`<span class="numero-instruccion">${linea} -</span>`)

		// Codigo de operacion
		let instruccionBin = instruccionABin(this.instruccion)
		divInstruccion.append(`<span class="valor codigo-operacion">${instruccionBin}</span>`)

		// A donde saltará
		divInstruccion.append(`<span class="valor parametro-destino">${numABinario(this.valores[0], 26)}</span>`)

		// Agregar boton para copiar linea
		divInstruccion.append(`<button class="boton-copiar"><span class="material-icons-round">content_copy</span></button>`)

		return divInstruccion
	}

	calcularValorEtiqueta(lineaInstruccion: number, lineaEtiqueta: number) {
		this.valores.push(lineaEtiqueta - lineaInstruccion)
	}
}