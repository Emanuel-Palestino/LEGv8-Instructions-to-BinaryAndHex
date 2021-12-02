export function instruccionABin(instruccion: string): string {
	switch (instruccion) {
		case 'add':
			return '10001011000'
			break
		case 'sub':
			return '11001011000'
			break
		case 'addi':
			return '1001000100'
			break
		case 'subi':
			return '1101000100'
			break
		case 'ldur':
			return '11111000010'
			break
		case 'stur':
			return '11111000000'
			break
		case 'lsl':
			return '11010011011'
		case 'lsr':
			return '11010011010'
		case 'b':
			return '000101'
		case 'bl':
			return '100101'
		case 'br':
			return '11010110000'
		case 'cbnz':
			return '10110101'
		case 'cbz':
			return '10110100'
		default:
			return '0'
	}
}

export function numABinario(numero: number, tamaño: number): string {
	let binario: string = ''

	// Saber si es negativo o positivo
	if (Math.sign(numero) >= 0) {	// positivo
		// Obtener binario
		binario = numero.toString(2)
		// Rellenar de 0 si es necesario
		let ceros = '0'.repeat(tamaño - binario.length)
		binario = ceros + binario

	} else {	// negativo
		let numPositivo: number = numero * -1
		let binarioAux: string = numPositivo.toString(2)
		let ceros: string = '0'.repeat(tamaño - binarioAux.length)
		binarioAux = ceros + binarioAux

		// Complemento a 2
		for(let i = 0; i < tamaño; i++) { // Negar todo
			if (binarioAux.charAt(i) == '1')
				binario += '0'
			else
				binario += '1'
		}

		// sumarle 1
		let numNegado: number = parseInt(binario, 2)
		numNegado += 1

		// Obtener binario
		binario = numNegado.toString(2)
	}

	return binario
}

export function numAHexadecimal(numero: number): string {
	return numero.toString(16)
}