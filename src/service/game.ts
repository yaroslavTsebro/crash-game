import { ServiceHelper } from './service-helper';
import gameRepository from "../repository/game";
import appConfig from '../utils/config/app';
import { generateHashBasedOnPreviousHash } from '../utils/system/get-hash';

class GameService extends ServiceHelper {
  private async generateGame() {
    const lastGame = await gameRepository.getLastGame();
    const prevHash = lastGame ? lastGame.hash : appConfig.FIRST_HASH;
    const hash = generateHashBasedOnPreviousHash(prevHash);
    
  }
}