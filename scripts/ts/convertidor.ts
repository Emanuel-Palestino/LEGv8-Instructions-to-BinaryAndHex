// CodeMirror variable
declare var myCode: any

// Metodo para convertir
$('#compilar').on('click', () => {
	let contenidoCodigo: String = myCode.getValue()
	let lineasCodigo: String[] = contenidoCodigo.split('\n')

	lineasCodigo.forEach((linea, index) => {
		let divInstruccionesBin = $('#resultado_bin')
		let indexPrimerEspacio = linea.indexOf(' ')
		let instruccion: String = linea.substring(0, indexPrimerEspacio).trim()
		let parametros: String[] = linea.substring(indexPrimerEspacio + 1).split(',')
		let registros: String[] = []

		parametros.forEach(registro => {
			let reg: String = registro.trim()
			reg = reg.replace(/x|X/, '')
			registros.push(reg)
		})

		// Convertir instruccion a binario
		// Número de instruccion
		let numInstruccion: Number = index + 1
		divInstruccionesBin.append(`<span class="numero-instruccion">${numInstruccion} -</span>`)

		// Codigo de operacion
		let bin = instruccionABin(instruccion)
		divInstruccionesBin.append(`<span class="valor codigo-operacion">${bin}</span>`)


		console.log(instruccion, registros)
	})
})

function instruccionABin(instruccion: String): String {
	switch (instruccion) {
		case 'add':
		case 'ADD':
			return '0000111101'
			break
		default:
			return '0'
	}
}