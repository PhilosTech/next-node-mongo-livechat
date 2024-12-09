import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
  filename: string;
  url: string;
  owner: string;
  uploadedAt: Date;
}

const FileSchema = new Schema<IFile>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  owner: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export const File = mongoose.model<IFile>('File', FileSchema);
