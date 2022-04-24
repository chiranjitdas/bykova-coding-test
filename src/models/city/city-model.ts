import { model, Schema, Model, Document, ObjectId } from 'mongoose';
export interface ICity {
  id: number;
  name: ObjectId;
  ascii: string;
  alt_name: string;
  lat: string;
  long: string;
  feat_class: string;
  feat_code: string;
  country: string;
  cc2: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
  population: string;
  elevation: string;
  dem: string;
  tz: string;
  modified_at: string;
}
export interface ICityModel extends Document {
  id: number;
  name: ObjectId;
  ascii: string;
  alt_name: string;
  lat: string;
  long: string;
  feat_class: string;
  feat_code: string;
  country: string;
  cc2: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
  population: string;
  elevation: string;
  dem: string;
  tz: string;
  modified_at: string;
}

const CitySchema: Schema = new Schema(
  {
    id: Number,
    name: String,
    ascii: String,
    alt_name: String,
    lat: String,
    long: String,
    feat_class: String,
    feat_code: String,
    country: String,
    cc2: String,
    admin1: String,
    admin2: String,
    admin3: String,
    admin4: String,
    population: String,
    elevation: String,
    dem: String,
    tz: String,
    modified_at: String
  },
  {
    timestamps: true
  }
);

export const CityModel: Model<ICityModel> = model('City', CitySchema);
