import { orm } from '../db';
import { Game } from '../shared/model/entity/game';

class GameRepository {
  private games = orm?.em.getRepository(Game)!;

  public async getLastGame(): Promise<Game | null> {
    return this.games.findOne({}, { orderBy: { id: 'DESC' } })
  }
}

export default new GameRepository();