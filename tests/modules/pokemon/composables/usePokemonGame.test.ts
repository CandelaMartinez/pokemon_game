import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { flushPromises } from '@vue/test-utils';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import MockAdapter from 'axios-mock-adapter';

describe('userPokemonGame', async () => {
  //quiero probar un composable que monta un componente dentro
  //el ciclo del vida de un componente solo se va a disparar si estoy dentro del componente, aqui estoy dentro del composable
  const pokemonListFake = [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
    {
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    },
    {
      name: 'charmeleon',
      url: 'https://pokeapi.co/api/v2/pokemon/5/',
    },
    {
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/6/',
    },
    {
      name: 'squirtle',
      url: 'https://pokeapi.co/api/v2/pokemon/7/',
    },
  ];
  const mockPokemonApi = new MockAdapter(pokemonApi);
  mockPokemonApi.onGet('/?limit=151').reply(200, {
    results: pokemonListFake,
  });

  test('should initialize with correct default values', async () => {});
  const [result] = withSetup(usePokemonGame);

  expect(result.gameStatus.value).toBe(GameStatus.Playing);
  expect(result.pokemonOptions.value).toEqual([]);
  expect(result.randonPokemon.value).toEqual(undefined);

  //await new Promise(r => setTimeout(r, 1000)); esto era si no tenia el mock, para darle tiempo a axios a hacer la real peticion http
  //hago que todas las promise del composable se cumplan
  await flushPromises();

  expect(result.pokemonOptions.value.length).toBe(4);
  expect(result.randonPokemon.value).toEqual({
    id: expect.any(Number),
    name: expect.any(String),
  });
});
