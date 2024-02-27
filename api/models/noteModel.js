import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        noteTitle: {
            type: String,
            required: true,
        },
        noteContent: {
            type: String,
            required: true,
        },
        NotePicture: {
            type: String,
        },

    },
    { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
