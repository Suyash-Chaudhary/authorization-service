import { Logger } from "../common/logger";

export class Seeder {
  public seed = async () => {
    try {
    } catch (error) {
      Logger.error("Error seeding.", error);
    }
  };
}
