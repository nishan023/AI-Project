import mongoose,{Schema} from "mongoose";
import { FieldCannotBeEmpty } from "../../helpers/fieldSchema";
import Mail from "nodemailer/lib/mailer";


const gmailUserSchema = new mongoose.Schema({
    gMail:{
        type: String,
        required: [true, FieldCannotBeEmpty("G-mail")]
    },
    username:{
        type: String,
        required: [true, FieldCannotBeEmpty("Username")]
    },
    image:{
        type: String,
        required: [true, FieldCannotBeEmpty("image_url")]
    },
    isActive:{type: Boolean,default:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const GmailUser = mongoose.model("GmailUser",gmailUserSchema);

export default GmailUser;