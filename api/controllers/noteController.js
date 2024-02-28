import Note from "../models/noteModel.js";

export const AddNote = async (req, res, next) => {

    try {
        const { userId, noteTitle, noteContent, NotePicture } = req.body;
        const newNote = new Note({
            userId,
            noteTitle,
            noteContent,
            NotePicture,
        });
        // Save the new note to the database
        await newNote.save();
        res.status(200).json({message: "Note Add Successfull !" })
    } catch (error) {
        next(error);
    }
};


export const getNotebyUser = async (req, res, next) => {
    const userId = req.user.id;  // Directly access req.user.id
    try {
        const notes = await Note.find({userId:userId}).sort({ createdAt: -1 });
        res.status(200).json({ notes });
    } catch (error) {
        next(error);
    }
};



export const deleteNoteByid = async (req, res, next) => {
    const { id } = req.params;
    try {
        const note = await Note.findByIdAndDelete({ _id: id });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ message:"Note Deleted Successfull !" });
    } catch (error) {
        next(error);
    }
};
