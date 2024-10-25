import { Schema, model, Document } from 'mongoose';

interface IRegion extends Document {
  regionName: string;
  cycleDuration: number;
}

const RegionSchema = new Schema({
  regionName: { type: String, required: true },
  cycleDuration: { type: Number, required: true },
});

export const Region = model<IRegion>('Region', RegionSchema);
