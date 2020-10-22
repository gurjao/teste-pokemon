import { Component, OnInit } from '@angular/core';
import { PokemonService } from './../../../shared/service/pokemon.service';
import { Pokemon } from './../../../shared/model/pokemon.model';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.css']
})
export class ListaPokemonComponent implements OnInit {

  pokemon: Pokemon[];
  pokemons: any;
  listaPokemons: Pokemon[];
  listaPokemonsClick: Pokemon[];
  pokemonId: any;
  pokemonName: string;
  pokemonBaseExperience: any;
  pokemonHeight: any;
  pokemonIsDefault: any;
  pokemonOrder: any;
  pokemonWeight: string;
  pokemonSpecie: any[];

  inputPesquisar = 'Digite aqui';
  listaPokemonsEstado = false;

  constructor(
    public pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getPokemonList();
    this.listaPokemons = [];
    this.listaPokemonsClick = [];

    console.log(this.listaPokemonsClick);
  }

  getPokemonList(){
    this.pokemonService.getPokemonList().subscribe(async data => {
      this.pokemon = data.results;
      for (const item of data.results) {
        await this.getPokemonByName(item.name);
      }
    })
  }

  async getPokemonByName(pokemonName) {
  const pokemon = await this.pokemonService.getPokemonByName(pokemonName);
    this.listaPokemons.push(pokemon);
  }

  async getPokemonByNameClick(pokemonName) {
    const pokemon = await this.pokemonService.getPokemonByName(pokemonName);
      this.listaPokemonsClick.push(pokemon);
      if (pokemon){
        console.log(pokemon);
        this.listaPokemonsEstado = true;
      }
      this.pokemonId = pokemon.id;
      this.pokemonName = pokemon.name;
      this.pokemonBaseExperience = pokemon.base_experience;
      this.pokemonHeight = pokemon.height;
      this.pokemonIsDefault = pokemon.is_default;
      this.pokemonOrder = pokemon.order;
      this.pokemonWeight = pokemon.weight;
    }

}
