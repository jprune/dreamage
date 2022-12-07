import { Schema, model, models } from 'mongoose';

const sectionSchema = new Schema({
    sectionTitle: {
        type: String,
        required: true
    },
    imageCollection: [String]
});

const clientGallerySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    sections: [sectionSchema],
});

const ClientGalleries = models.clientGallery || model('clientGallery', clientGallerySchema);

export default ClientGalleries;