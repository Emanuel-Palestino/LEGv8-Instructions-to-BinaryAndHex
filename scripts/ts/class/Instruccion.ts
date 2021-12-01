export class Instruccion {
	protected instruccion: string
	protected parametros: string

	constructor(instruccion: string, parametros: string) {
		this.instruccion = instruccion
		this.parametros = parametros
	}

	getInstruccion(): string {
		return this.instruccion
	}

	crearHTML(linea: number): JQuery<HTMLElement> {
		return $('<div>', {
			class: 'instruccion'
		})
	}
}