import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import { mount } from '@vue/test-utils';

describe('<PokemonPicture />', () => {
  test('should render the hidden image when showPokemon prop is false', () => {
    const pokemonId = 25;
    const wrapper = mount(PokemonPicture, {
      props: { pokemonId, showPokemon: false },
    });
    const imageAttributes = wrapper.find('img').attributes();
    expect(imageAttributes).toEqual(
      expect.objectContaining({
        class: 'fade-in brightness-0 h-[200px]',
      }),
    );
  });
});
