import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Pokemon } from './../model/pokemon.model';
import { ResponsePageable } from './../model/responsePageable.model';

@Injectable({
	providedIn: 'root'
})
export class PokemonService {

	apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':'application/json'
		})
	};

	constructor(
		private HttpClient: HttpClient
	) { }

	public getPokemonList(): Observable<ResponsePageable> {
		return this.HttpClient.get<ResponsePageable>(this.apiUrl)
	}

	public getPokemonByName(name: string): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      this.HttpClient.get<Pokemon>(this.apiUrl + name).subscribe(resolve);
    });
	}
}
