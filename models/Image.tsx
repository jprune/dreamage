import { Schema, model, models } from 'mongoose';

const imageSchema = new Schema({
    imageUuid: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    imageName: {
        type: String,
        required: true,
    },
    imageSize: {
        type: Number,
        required: true
    },
    imageType: {
        type: String,
        required: true
    }
});

const Images = models.image || model('image', imageSchema);

export default Images;