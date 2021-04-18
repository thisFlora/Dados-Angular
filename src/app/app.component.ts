import { Component, ElementRef, Renderer2  } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  dadoIzquierda: string = '../assets/img/dice1.png'
  dadoDerecha: string = '../assets/img/dice4.png'
  numero1: number = 0;
  numero2: number = 1;
  sonIguales: boolean = false;
  contador: number = 0;

  tirarDados(): void{
    this.numero1 = Math.round(Math.random() * 5) + 1;
    this.numero2 = Math.round(Math.random() * 5) + 1;
    this.dadoIzquierda = '../assets/img/dice' + this.numero1 + '.png';
    this.dadoDerecha = '../assets/img/dice' + this.numero2 + '.png';

    if (this.numero1 === this.numero2){
      this.sonIguales = true;
      this.surprise();
      this.contador+= 1;

    }else{
      this.sonIguales = false;

    }
  }

  //Prueba confetti
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {}
 
  public surprise(): void {

    const canvas = this.renderer2.createElement('canvas');
 
    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);
    
    const myConfetti = confetti.create(canvas, {
      resize: true // will fit all screen sizes
    });
    
    myConfetti({ 
      particleCount: 300
    });

    (async () => {
      await this.delay(5000);
      this.renderer2.removeChild(this.elementRef.nativeElement, canvas);
    })();
  }
  
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
