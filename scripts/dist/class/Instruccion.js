export class Instruccion {
    constructor(instruccion, parametros) {
        this.instruccion = instruccion;
        this.parametros = parametros;
        this.instruccionBin = '';
    }
    getInstruccion() {
        return this.instruccion;
    }
    crearHTMLBin(linea) {
        return $('<div>', {
            class: 'instruccion'
        });
    }
}
