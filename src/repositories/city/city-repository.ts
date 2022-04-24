import { injectable } from 'inversify';
import { CityModel, ICity } from '../../models/city/city-model';
// import { SearchCityRequestData } from '../../models/city/search-city';

@injectable()
export class CityRepository {
  /**
   *
   * @param sCRD search request data
   * @returns Promise<IAirport[]>
   */
  async searchCities(): Promise<ICity[]> {
    // sCRD: SearchCityRequestData const totalLimit = sCRD.limit ? sCRD.limit : 15;
    // console.log('totalLimit', totalLimit);
    return [];
  }

  async getCities(cityName: string): Promise<ICity> {
    const suggestionsData = await CityModel.findOne({
      $or: [{ city: new RegExp(cityName, 'gi') }],
      city: { $ne: '' }
    }).sort('name');
    return suggestionsData as ICity;
  }
}
