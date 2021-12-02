import { numAHexadecimal } from "../funciones.js"
export class Instruccion {
	protected instruccion: string
	protected parametros: string
	protected instruccionBin: string
	protected instruccionHexa: string

	constructor(instruccion: string, parametros: string) {
		this.instruccion = instruccion
		this.parametros = parametros
		this.instruccionBin = ''
		this.instruccionHexa = ''
	}

	getInstruccion(): string {
		return this.instruccion
	}

	getInstruccionesBin(): string {
		return this.instruccionBin
	}

	getInstruccionesHex(): string {
		return this.instruccionHexa
	}

	crearHTMLBin(linea: number): JQuery<HTMLElement> {
		return $('<div>', {
			class: 'instruccion'
		})
	}

	crearHTMLHex(linea: number): JQuery<HTMLElement> {
		let divInstruccion = $('<div>', {
			class: 'instruccion'
		})

		// Número de instruccion
		divInstruccion.append(`<span class="numero-instruccion">${linea} -</span>`)

		// Valor en hexadecimal
		this.instruccionHexa = numAHexadecimal(parseInt(this.instruccionBin, 2)).toUpperCase()
		divInstruccion.append(`<span class="valor hexadecimal">${this.instruccionHexa}</span>`)

		// Agregar boton para copiar linea
		divInstruccion.append(`<button class="boton-copiar"><span class="material-icons-round">content_copy</span></button>`)

		return divInstruccion

	}

}