import { Schema, model, models } from 'mongoose';

const sectionSchema = new Schema({
    sectionTitle: {
        type: String,
    },
    imageCollection: [String]
});

const clientGallerySchema = new Schema({
    clientGalleryTitle: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    sections: [sectionSchema],
});

const ClientGalleries = models.clientGallery || model('clientGallery', clientGallerySchema);

export default ClientGalleries;