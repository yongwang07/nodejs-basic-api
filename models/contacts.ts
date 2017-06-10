import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

module.exports = () => {
    const contactSchema = new mongoose.Schema({
        primarycontactnumber: { type: String, index: { unique: true } },
        firstname: String,
        lastname: String,
        title: String,
        company: String,
        jobtitle: String,
        othercontactnumbers: [String],
        primaryemailaddress: String,
        emailaddresses: [String],
        groups: [String],
    });
    contactSchema.plugin(mongoosePaginate);
    return mongoose.model('Contact', contactSchema);
};