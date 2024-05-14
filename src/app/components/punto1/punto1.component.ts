import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [ CurrencyPipe ],
  templateUrl: './punto1.component.html',
  styleUrl: './punto1.component.css'
})
export class Punto1Component {
  productos = [
    { id: 1, nombre: 'Cable Unipolar 1.5mm Normalizado Trefilcon', descripcion: `Cables Unipolares
    Conductor: Formado a partir del reunido/cableado de alambre de cobre recocido según normas IRAM NM 280 en Clase 4 y 5.`, img: 'cableunipolar.jpg', precio: 9.265},
    { id: 2, nombre: 'Taladro Atornillador Percutor', descripcion: `DATOS TÉCNICOS
    • Alimentación: A batería
    • Voltaje: 12/24V
    • Tiempo de carga: 60 min
    • Velocidad variable: Marcha 1 (0-400 rpm) Marcha 2 (0-1350 rpm)
    • Número de marchas 2
    • Capacidad del mandril: 10mm (3/8")
    • Torque: 25 NM
    • Posiciones de torque: 25+1+1
    • Giro Reversible: SI
    • Luz LED: SI
    • Motor: Carbones
    • Tipo: Atornillador / Taladro Percutor
    • Peso neto 1,5 Kg`, img: 'taladro.jpg', precio: 73.637},
    { id: 3, nombre: 'Llave Termicas Bipolar', descripcion: `TERMICAS BIPOLARES DE 5 - 10 - 15 - 20 - 25 - 32 AMP.`, img: 'termica.jpg', precio: 5.619}
    ]

  carrito: {nombre:String, descripcion:String, precio:number, img:String}[] = []
  total: number = 0

  recuperarCarrito(): void{
    let storage = JSON.parse(sessionStorage.getItem('carrito') || '[]')
    if(storage.length != 0){
      this.carrito = storage
    }
  }

  agregarAlCarrito(producto: any): void{
    if(this.carrito.length < 10){
      this.carrito.push(producto)
      this.total += producto.precio
      sessionStorage.setItem('carrito', JSON.stringify(this.carrito))
    } else {
      alert('Solo puede agregar un máximo de 10 productos al carrito')
    }
  }

  vaciarCarrito(): void{
    const modal = document.querySelector('.modal-body')
    if(modal === null){
      alert('Uy! Parece que ha ocurrido un error')
    } else {
      this.carrito.length = 0
      this.total = 0
      sessionStorage.setItem('carrito', JSON.stringify(this.carrito))
    }
  }
}

