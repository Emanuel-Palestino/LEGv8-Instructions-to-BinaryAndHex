// CodeMirror variable
declare var myCode: any

// Metodo para convertir
$('#compilar').on('click', () => {
	let contenidoCodigo: String = myCode.getValue()
	let lineasCodigo: String[] = contenidoCodigo.split('\n')

	lineasCodigo.forEach(linea => {
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

		console.log(instruccion, registros)
	})
})