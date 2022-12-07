/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

// eslint-disable-next-line consistent-return
const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI as string);

        if(connection.readyState == 1){
            return Promise.resolve(true);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export default connectMongo;