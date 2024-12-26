<template>
  <section
    v-if="isLoading || randonPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Wait, please</h1>
    <h3 class="animate-pulse">Working on it...</h3>
  </section>
  <section
    v-else
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="m-5">Guess which Pokemon is it</h1>

    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Play again
      </button>
    </div>
    <br />
    <!--Pokemon image-->
    <PokemonPicture
      :pokemon-id="randonPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!--Pokemon radio with options, envio la lista de opciones a mostrar, recibo la opcion clickeada por el user, y al recibirla, llamo a onSelectedOption-->
    <PokemonOptions
      :options="options"
      @selected-option="onSelectedOption"
      :correct-answer="randonPokemon.id"
      :block-selection="gameStatus !== GameStatus.Playing"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  gameStatus,
  randonPokemon,
  isLoading,
  pokemonOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();

const onSelectedOption = (value: number) => {
  checkAnswer(value);
};
</script>
