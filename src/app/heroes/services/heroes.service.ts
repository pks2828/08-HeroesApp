import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService { //Verificar siempre el nombre

  private baseUrl: string = enviroments.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getHeroes():Observable<Hero[]> {

    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroById( id: string ): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${ id }`)
      .pipe(
        catchError( error => of(undefined) )//Dependiendo del error es lo que se regresda, por ejemplo aqui con el of se regresa un observable
      );
  }

}

//Si sale el error Type 'Observable<Hero[]>' is not assignable to type 'Observable<Hero[]>'.
//utilizar backticks en el argumento de la funcion para llamar al endpoint
