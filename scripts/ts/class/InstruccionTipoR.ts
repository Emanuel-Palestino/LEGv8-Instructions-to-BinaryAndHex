import { Instruccion } from "./Instruccion.js";
import { numABinario, instruccionABin } from "../funciones.js";

export class InstruccionTipoR extends Instruccion {
	private valores: number[] = []

	constructor(instruccion: string, parametros: string) {
		super(instruccion, parametros)
		// Obtener los valores
		let parametrosAux: string = this.parametros.trim()
		let parametrosIndividuales: string[] = parametrosAux.split(',')

		// Valor 1
		let valor1: number = parseInt(parametrosIndividuales[0].replace(/x|X/, ''))
		this.valores.push(valor1)

		// Valor 2
		if (parametrosIndividuales[1] != undefined) {
			let valor2: number = parseInt(parametrosIndividuales[1].replace(/x|X/, ''))
			this.valores.push(valor2)
		} else
			this.valores.push(0)

		// Valor 3
		if (parametrosIndividuales[2] != undefined) {
			let valor3: number = parseInt(parametrosIndividuales[2].replace(/x|X/, ''))
			this.valores.push(valor3)
		} else
			this.valores.push(0)

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
		this.instruccionBin += instruccionBin

		// Segundo parametro
		let segundoParametro = numABinario(this.valores[2], 5)
		divInstruccion.append(`<span class="valor parametro-2">${segundoParametro}</span>`)
		this.instruccionBin += segundoParametro

		// Parametro vacio
		divInstruccion.append(`<span class="valor parametro-vacio">000000</span>`)
		this.instruccionBin += '000000'

		// Primer parametro
		let primerParametro = numABinario(this.valores[1], 5)
		divInstruccion.append(`<span class="valor parametro-1">${primerParametro}</span>`)
		this.instruccionBin += primerParametro

		// A donde se irá el resultado
		let destino = numABinario(this.valores[0], 5)
		divInstruccion.append(`<span class="valor parametro-destino">${destino}</span>`)
		this.instruccionBin += destino

		// Agregar boton para copiar linea
		divInstruccion.append(`<button class="boton-copiar"><span class="material-icons-round">content_copy</span></button>`)

		return divInstruccion
	}
}