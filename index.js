require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

//database connection
mongoose.connect(`mongodb+srv://${process.env.MONGODB}@cluster0.szsdpic.mongodb.net/Notes?retryWrites=true&w=majority`)

//create schema
const notesSchema ={
  title :{
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}
//create Model
const Note = mongoose.model("Note", notesSchema)


// const note = new Note({
//   title: "This is Title",
//   content: "This is Content"
// })





// Create new note
app.post("/newNote", function(req, res){
 const title = req.body.title;
 const content = req.body.content;
 let newNote = new Note({
  title: title,
  content: content
 })

 newNote.save()
 res.json({message: "Note added sucessfully"})
}) 

// Get all notes
app.get("/notes", function(req, res){
  Note.find({}).then(data =>{
    res.json(data)
  }).catch(err =>{
    console.error(err)
    res.status(500).send("Internal Error Status")
  })
})

// Delete note by id
app.delete("/delete", function(req,res){
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  Note.deleteOne({ _id: id })
    .then(() => res.json({ message: "Note successfully deleted." }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error." });
    });
})

// update by id
app.patch("/update", function(req, res) {
  const id = req.body.id;
  const updatedNote = req.body.updatedNote; // Assuming you're passing the updated note as a parameter
  
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  Note.findByIdAndUpdate(id, updatedNote, { new: true })
    .then(updatedNote => {
      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found." });
      }
      res.json({ message: "Note successfully updated.", updatedNote });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error." });
    });
});



const PORT = process.env.PORT
app.listen(PORT, () => console.log("Server started at " + PORT) )
