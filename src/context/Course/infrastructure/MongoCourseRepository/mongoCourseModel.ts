import mongoose from 'mongoose';

const { Schema } = mongoose;

const CourseSchema = new Schema({
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
  description: {
    type: String,
  },
  imagePath: {
    type: String,
  },
  duration: {
    type: Number,
    default: 0,
  },
  sections: {
    type: [String],
    default: [],
  },
  videos: {
    type: [String],
    default: [],
  },
});

export const CourseMongoModel: mongoose.Model<any, any, any> = mongoose.model(
  'course',
  CourseSchema
);
