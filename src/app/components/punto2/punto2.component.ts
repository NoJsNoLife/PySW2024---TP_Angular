import { Component } from '@angular/core';

enum Valores {
  MAX_PALABRAS = 8,
  MAX_OPCIONES = 8
}

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [],
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css'
})
export class Punto2Component {
  respuesta: any
  opcionesElegidas: String[] = []
  mostrarModal: boolean = false
  mostrarJuego: boolean = false
  juegoTerminado: boolean = false
  contPalabras: number = 0
  contAciertos: number = 0
  contErrores: number = 0
  contOpcion: number = 0
  palabras = [
    'Hacer','Escuchar','Compartir','Realizar','Comprobar','Elefante',
    'Perro','Hipopótamo','Juego','Escuela'
  ]
  opciones = ["sílabas","letras","vocales","consonantes"]
  juego: String[] = []

  mezclarPalabras(): void{
    this.contPalabras = 0
    this.contAciertos = 0
    this.contErrores = 0
    this.contOpcion = 0
    this.mostrarJuego = true
    this.juego.length = 0
    let palabra: String = ""
    while(this.juego.length < Valores.MAX_PALABRAS){
      palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)]
      if(!this.juego.includes(palabra)){
        this.juego.push(palabra)
      }
    }
  }

  elegirOpciones(): void{
    this.opcionesElegidas.length = 0
    while(this.opcionesElegidas.length < Valores.MAX_OPCIONES){
      this.opcionesElegidas.push(this.opciones[Math.floor(Math.random() * this.opciones.length)])
    }
  }

  contarSilabas(palabra: String): number {
    palabra = palabra.toLowerCase().replace(/[^aeiouyáéíóú]/g, ' '); // Eliminar letras que no son vocales y convertir a minúsculas
    let contador = palabra.match(/[aeiouyáéíóú]{1,2}/g); // Contar grupos de una o dos vocales
    return contador ? contador.length : 0; // Devolver la cantidad de grupos de vocales encontrados
  }

  contarVocales(palabra: String): number{
    let cont: number = 0
    let vocales = ["a","e","i","o","u","á","é","í","ó","ú","ü"]
    for(let i=0; i<palabra.length; i++){
      if(vocales.includes(palabra.charAt(i).toLowerCase())){
        cont++
      }
    }
    return cont
  }

  contarConsonantes(palabra: String): number{
    let cont: number = 0
    let consonantes = ["q","w","r","t","y","p","s","d","f",
    "g","h","j","k","l","ñ","z","x","c","v","b","n","m"]
    for(let i=0; i<palabra.length; i++){
      if(consonantes.includes(palabra.charAt(i).toLowerCase())){
        cont++
      }
    }
    return cont
  }
  
  comprobarRespuesta(respuestaElegida: number){
    switch (this.opcionesElegidas[this.contOpcion]){
      case "sílabas":
        this.respuesta = this.contarSilabas(this.juego[this.contPalabras])
        break
      case "letras":
        this.respuesta = this.juego[this.contPalabras].length
        break
      case "vocales":
        this.respuesta = this.contarVocales(this.juego[this.contPalabras])
        break
      case "consonantes":
        this.respuesta = this.contarConsonantes(this.juego[this.contPalabras])
        break
    }
    if(this.respuesta == respuestaElegida){
      this.contAciertos++
    } else {
      this.contErrores++
    }
    this.contPalabras++
    this.contOpcion++
    if(this.contPalabras == 8){
      this.mostrarModal = true
    }
  }

  hideModal(){
    this.mostrarModal = false
  }
}