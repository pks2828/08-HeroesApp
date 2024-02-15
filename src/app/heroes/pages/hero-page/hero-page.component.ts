import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit { //implementamos el OnInit para que se ejecute el ngOnInit con el servicio de heroes http

  public hero?: Hero;

  constructor(
    private HeroesService: HeroesService,//Inyectamos el servicio de heroes
    private activatedRoute: ActivatedRoute, //Inyectamos el servicio de activatedRoute propio de angular
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.HeroesService.getHeroById(id) ),//Permite tomnar el id del parametro, desestructrurarlo y mandarlo al servicio de heroes
      )
      .subscribe( hero => {

        if ( !hero ) return this.router.navigate([ '/heroes/list' ]) //Si no existe el heroe, redirigimos a la lista de heroes (importar router)

        this.hero = hero;
        return // para solucionar que no todos los path devuelven un valor

      })
  }

}
