import mongoose, { Schema, model, Document } from 'mongoose';

interface IQuestion extends Document {
  questionText: string;
  cycle: number;
  region: mongoose.Schema.Types.ObjectId;
}

const QuestionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  cycle: {
    type: Number,
    required: true,
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: true,
  },
});

const Question = model<IQuestion>('Question', QuestionSchema);

export { Question, IQuestion };
