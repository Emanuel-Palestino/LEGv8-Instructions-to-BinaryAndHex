export class Instruccion {
    constructor(instruccion, parametros) {
        this.instruccion = instruccion;
        this.parametros = parametros;
    }
    getInstruccion() {
        return this.instruccion;
    }
    crearHTML(linea) {
        return $('<div>', {
            class: 'instruccion'
        });
    }
}
