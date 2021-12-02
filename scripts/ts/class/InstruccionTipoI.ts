import { Instruccion } from "./Instruccion.js";
import { numABinario, instruccionABin } from "../funciones.js";

export class InstruccionTipoI extends Instruccion {
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
		let valor2: number = parseInt(parametrosIndividuales[1].replace(/x|X/, ''))
		this.valores.push(valor2)

		// Valor 3
		let valor3: number = parseInt(parametrosIndividuales[2].replace('#', ''))
		this.valores.push(valor3)
		
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
		let segundoParametro = numABinario(this.valores[2], 12)
		divInstruccion.append(`<span class="valor parametro-2">${segundoParametro}</span>`)
		this.instruccionBin += segundoParametro

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