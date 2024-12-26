import { GameStatus } from '@/modules/pokemon/interfaces';

describe('game-status-enum', () => {
  test('should have correct value', () => {
    expect(GameStatus.Playing).toBe('playing');
  });
});
