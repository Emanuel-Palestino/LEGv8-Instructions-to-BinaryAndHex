export class Instruccion {
	protected instruccion: string
	protected parametros: string
	protected instruccionBin: string

	constructor(instruccion: string, parametros: string) {
		this.instruccion = instruccion
		this.parametros = parametros
		this.instruccionBin = ''
	}

	getInstruccion(): string {
		return this.instruccion
	}

	crearHTMLBin(linea: number): JQuery<HTMLElement> {
		return $('<div>', {
			class: 'instruccion'
		})
	}
}