express = require('express');
const route = express.Router();
require('dotenv').config();


const Student = require('../models/student');

// endpoint to create a new student document
// This endpoint creates a new student document in the database
route.post(`/all_student`, async ( req, res) => {
  const { name, age, level } = req.body;
  if (!name || !age || !level) {
    return res.status(400).send({ error: 'Name, age, and level are required' });
  }
    try {
    const newStudent = new Student();
    newStudent.name = name;
    newStudent.age = age;
    newStudent.level = level;
    
    const savedStudent = await newStudent.save();
    return(res.send({ message: 'student saved successfully', student: savedStudent }));
  } catch (err) {
    res.status(500).send({ error: err.message });
    }
});

// endpoint to get all students
// This endpoint retrieves all student documents from the database
route.get('/students', async (req, res) => {
  try {
    const students = await Student.find().lean();
    return(res.send(students));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// endpoint to get a student by ID
// This endpoint retrieves a single student document by its ID
route.put('/students', async (req, res) => {
  try {
    const { name, level, id } = req.body;

    if (!id) {
      return res.status(400).send({ error: 'ID is required' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name: name, level: level },
      { new: true }
    );
    res.send(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// endpoint to delete a student by ID
// This endpoint deletes a student document by its ID
route.delete('/students', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ error: 'ID is required' });
  }
  try {
    await Student.findByIdAndDelete(id);
    res.send({ message: 'student deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = route;