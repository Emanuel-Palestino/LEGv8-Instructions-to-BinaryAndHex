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
		default:
			return '0'
	}
}

export function numABinario(numero: number, tamaño: number): string {
	// Obtener binario
	let binario: string = numero.toString(2)

	// Rellenar de 0 si es necesario
	let ceros = '0'.repeat(tamaño - binario.length)
	binario = ceros + binario

	return binario
}