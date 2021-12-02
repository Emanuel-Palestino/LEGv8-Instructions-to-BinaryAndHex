import { InstruccionTipoD } from './class/InstruccionTipoD.js'
import { InstruccionTipoR } from './class/InstruccionTipoR.js'
import { InstruccionTipoI } from './class/InstruccionTipoI.js'
import { InstruccionTipoB } from './class/InstruccionTipoB.js'
import { InstruccionTipoCB } from './class/InstruccionTipoCB.js'
import { Instruccion } from './class/Instruccion.js'

// CodeMirror variable
declare var myCode: any

// enums
enum tipoInstruccion {
	BTYPE = 1,
	CBTYPE,
	RTYPE,
	DTYPE,
	ITYPE
}

let divInstruccionesBin = $('#resultado_bin')
let divInstruccionesHex = $('#resultado_hex')
let botonGuardarBin = $('#guardar_binario')
let botonGuardarHex = $('#guardar_hexadecimal')

// Contenido para los archivos
let contenidoArchivoBin = ''
let contenidoArchivoHex = ''

let instrucciones: Instruccion[] = []


// Metodo para convertir
$('#compilar').on('click', () => {

	instrucciones = []
	let contenidoCodigo: string = myCode.getValue()

	let lineasCodigo: string[] = contenidoCodigo.split('\n')
	let etiquetas: { id: string; linea: number }[] = []

	divInstruccionesBin.empty()
	divInstruccionesHex.empty()

	// Encontrar etiquetas
	for (let index = 0; index < lineasCodigo.length; index++) {
		// saber si existe una etiqueta
		lineasCodigo[index] = lineasCodigo[index].trim()
		let indexDosPuntos = lineasCodigo[index].indexOf(':')
		if (indexDosPuntos >= 0) {
			let etiqueta = lineasCodigo[index].substring(0, indexDosPuntos).trim()
			// Quitar la etiqueta de la instruccion
			lineasCodigo[index] = lineasCodigo[index].substring(indexDosPuntos + 1).trim()

			// Guardar la etiqueta
			etiquetas.push({
				id: etiqueta,
				linea: index
			})

			// Eliminar linea si es que solo se encontraba una etiqueta
			if (lineasCodigo[index] == '')
				lineasCodigo.splice(index, 1)
		}
	}

	// Obtener instrucciones
	lineasCodigo.forEach((linea, index) => {
		let indexPrimerEspacio = linea.indexOf(' ')
		let instruccion: string = linea.substring(0, indexPrimerEspacio).trim().toLowerCase()
		let parametros: string = linea.substring(indexPrimerEspacio + 1)

		// Mostrar instruciones
		switch (tipoDeInstruccion(instruccion)) {
			case tipoInstruccion.DTYPE:
				instrucciones.push(new InstruccionTipoD(instruccion, parametros))
				divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1))
				divInstruccionesHex.append(instrucciones[index].crearHTMLHex(index + 1))
				break
			case tipoInstruccion.RTYPE:
				instrucciones.push(new InstruccionTipoR(instruccion, parametros))
				divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1))
				divInstruccionesHex.append(instrucciones[index].crearHTMLHex(index + 1))
				break
			case tipoInstruccion.ITYPE:
				instrucciones.push(new InstruccionTipoI(instruccion, parametros))
				divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1))
				divInstruccionesHex.append(instrucciones[index].crearHTMLHex(index + 1))
				break
			case tipoInstruccion.CBTYPE:
				let instruc: InstruccionTipoCB = new InstruccionTipoCB(instruccion, parametros)
				// valor de la etiqueta
				let etiqueta: string = instruc.getEtiqueta()
				let lineaEtiqueta: number = -1
				etiquetas.forEach(e => {
					if (e.id == etiqueta)
						lineaEtiqueta = e.linea
				})
				instruc.calcularValorEtiqueta(index, lineaEtiqueta)

				instrucciones.push(instruc)
				divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1))
				divInstruccionesHex.append(instrucciones[index].crearHTMLHex(index + 1))
				break
			case tipoInstruccion.BTYPE:
				let instrucB: InstruccionTipoB = new InstruccionTipoB(instruccion, parametros)
				// valor de la etiqueta
				let etiquetaB: string = instrucB.getEtiqueta()
				let lineaEtiquetaB: number = -1
				etiquetas.forEach(e => {
					if (e.id == etiquetaB)
						lineaEtiquetaB = e.linea
				})
				instrucB.calcularValorEtiqueta(index, lineaEtiquetaB)

				instrucciones.push(instrucB)
				divInstruccionesBin.append(instrucciones[index].crearHTMLBin(index + 1))
				divInstruccionesHex.append(instrucciones[index].crearHTMLHex(index + 1))
				break
		}

		// Concatenar contenido del Archivo en codigo VHDL
		contenidoArchivoBin += `"${instrucciones[index].getInstruccionBin()}",\t--${instruccion} ${parametros}\n`
		contenidoArchivoHex += `x"${instrucciones[index].getInstruccionHex()}",\t--${instruccion} ${parametros}\n`

	})

	// Crear fichero con instrucciones bin
	let fileBin = new File([contenidoArchivoBin], 'InstruccionesBinarioVHDL.txt', { type: 'text/plain;charset=utf-8' })
	let urlBin = window.URL.createObjectURL(fileBin)
	botonGuardarBin.attr('href', urlBin)
	botonGuardarBin.attr('download', fileBin.name)

	// Crear fichero con instrucciones bin
	let fileHex = new File([contenidoArchivoHex], 'InstruccionesHexadecimalVHDL.txt', { type: 'text/plain;charset=utf-8' })
	let urlHex = window.URL.createObjectURL(fileHex)
	botonGuardarHex.attr('href', urlHex)
	botonGuardarHex.attr('download', fileHex.name)

})

function tipoDeInstruccion(instruccion: string): tipoInstruccion {
	switch (instruccion) {
		case 'add':
		case 'sub':
		case 'lsl':
		case 'lsr':
		case 'br':
			return tipoInstruccion.RTYPE
			break;
		case 'stur':
		case 'ldur':
			return tipoInstruccion.DTYPE
			break
		case 'addi':
		case 'subi':
			return tipoInstruccion.ITYPE
			break
		case 'b':
		case 'bl':
			return tipoInstruccion.BTYPE
			break
		case 'cbz':
		case 'cbnz':
			return tipoInstruccion.CBTYPE
			break
		default:
			return 0
	}
}


// Copiar contenido Individuamente Binarios
$('#resultado_bin').on('click', '.boton-copiar', (element) => {
	let boton = $(element.currentTarget)
	let divInstruccion = boton.parent()
	let indexInstruccion = $('#resultado_bin .instruccion').index(divInstruccion[0])
	navigator.clipboard.writeText(instrucciones[indexInstruccion].getInstruccionBin())
	.then(() => {
		console.log('Copiado')
	}).catch(error => {
		console.log('Error al copiar')
	})
})

// Copiar contenido Individuamente Hexadecimal
$('#resultado_hex').on('click', '.boton-copiar', (element) => {
	let boton = $(element.currentTarget)
	let divInstruccion = boton.parent()
	let indexInstruccion = $('#resultado_hex .instruccion').index(divInstruccion[0])
	navigator.clipboard.writeText(instrucciones[indexInstruccion].getInstruccionHex())
	.then(() => {
		console.log('Copiado')
	}).catch(error => {
		console.log('Error al copiar')
	})
})
