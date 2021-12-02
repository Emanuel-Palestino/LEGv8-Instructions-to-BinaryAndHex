import { Instruccion } from "./Instruccion.js";
import { numABinario, instruccionABin } from "../funciones.js";

export class InstruccionTipoCB extends Instruccion {
	private valores: number[] = []
	private etiqueta: string

	constructor(instruccion: string, parametros: string) {
		super(instruccion, parametros)
		// Obtener los valores
		let parametrosAux: string = this.parametros.trim()
		let parametrosIndividuales: string[] = parametrosAux.split(',')

		// Valor 1 (Registro a comparar)
		let valor1: number = parseInt(parametrosIndividuales[0].replace(/x|X/, ''))
		this.valores.push(valor1)

		// Valor 2 (Etiqueta al que saltará)
		this.etiqueta = parametrosIndividuales[1].trim()
		
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

		// Segundo parametro (Valor relativo de la etiqueta)
		divInstruccion.append(`<span class="valor parametro-2">${numABinario(this.valores[1], 19)}</span>`)

		// Primer parametro (Registro a comparar)
		divInstruccion.append(`<span class="valor parametro-1">${numABinario(this.valores[0], 5)}</span>`)

		// Agregar boton para copiar linea
		divInstruccion.append(`<button class="boton-copiar"><span class="material-icons-round">content_copy</span></button>`)

		return divInstruccion
	}

	calcularValorEtiqueta(lineaInstruccion: number, lineaEtiqueta: number) {
		this.valores.push(lineaEtiqueta - lineaInstruccion)
	}
}