import { inject, injectable } from 'inversify';
import { SearchCityRequestData } from '../../models/city/search-city';
import { CityRepository } from '../../repositories/city/city-repository';

@injectable()
export class CodingtestService {
  constructor(@inject(CityRepository) private readonly cityRepository: CityRepository) {}

  async searchCities(searchCityRequestData: SearchCityRequestData): Promise<boolean> {
    await this.cityRepository.searchCities(searchCityRequestData);
    return true;
  }
}
