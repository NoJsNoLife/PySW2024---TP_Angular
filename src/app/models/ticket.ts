import { TipoEspectador } from "../utils/tipo-espectador.String"

export class Ticket {
    public _dni: String
    public _precioReal: number
    public _tipoEspectador: TipoEspectador
    public _fechaCobro: Date
    public _precioCobrado: number
    
    constructor(dni: String, precioReal: number, tipoEpectador: TipoEspectador, fechaCobro: Date, precioCobrado: number){
        this._dni = dni
        this._tipoEspectador = tipoEpectador
        this._fechaCobro = fechaCobro
        this._precioCobrado = precioCobrado
        this._precioReal = precioReal
    }
}
