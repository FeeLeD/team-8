import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    token: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date,
        required: true,
        default: Date.now, 
        expires: 43200 //12 hours
    }
});

const VerificationToken = mongoose.model("verificationToken", tokenSchema);

export default VerificationToken;