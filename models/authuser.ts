import * as mongoose from 'mongoose';

module.exports = () => {
    const authUserSchema = new mongoose.Schema({
        username: { type: String, index: { unique: true } },
        password: String,
        role: String,
    });
    return mongoose.model('AuthUser', authUserSchema);
};