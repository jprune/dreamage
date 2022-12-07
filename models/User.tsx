import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    initQuestionary: {type: Boolean, required: true, default: false},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    userImage: {type: String},
});

const Users = models.user || model('user', userSchema);

export default Users;