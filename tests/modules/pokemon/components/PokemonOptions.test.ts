import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { mount } from '@vue/test-utils';

describe('<PokemonOptions />', () => {
  const options = [
    { id: 1, name: 'Nul' },
    { id: 2, name: 'Other' },
    { id: 3, name: 'Nul' },
    { id: 4, name: 'Other' },
  ];
  const wrapper = mount(PokemonOptions, {
    props: { options, blockSelection: false, correctAnswer: 1 },
  });

  test('should emit selectedOption event when is clicked', async () => {
    const [b1, b2, ,] = wrapper.findAll('button');

    await b1.trigger('click');
    await b2.trigger('click');

    expect(wrapper.emitted().selectedOption[0]).toEqual([1]);
  });
});
