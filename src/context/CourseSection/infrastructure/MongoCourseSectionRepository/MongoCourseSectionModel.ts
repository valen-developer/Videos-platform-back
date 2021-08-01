import mongoose from 'mongoose';

const { Schema } = mongoose;

const CourseSectionSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
    default: 0,
  },
  videos: {
    type: [String],
    default: [],
  },
});

export const CourseSectionMongoModel: mongoose.Model<any, any, any> =
  mongoose.model('course-section', CourseSectionSchema);
