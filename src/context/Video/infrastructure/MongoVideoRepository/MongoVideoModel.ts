import mongoose from 'mongoose';

const { Schema } = mongoose;

const VideoSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

export const VideoMongoModel: mongoose.Model<any, any, any> = mongoose.model(
  'video',
  VideoSchema
);
