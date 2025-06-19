express = require('express');
const route = express.Router();
require('dotenv').config();


const Student = require('../models/student');

route.post(`/student`, async ( req, res) => {
  const { name, age, level } = req.body;
    try {
    const newStudent = new Student();
    newStudent.name = name;
    newStudent.age = age;
    newStudent.level = level;
    
    const savedStudent = await newStudent.save();
    return(res.send({ message: 'student saved successfully', student: savedStudent }));
  } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

route.get('/students', async (req, res) => {
  try {
    const students = await Student.find().lean();
    return(res.send(students));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


route.put('/students/:id', async (req, res) => {
  try {
    const { name, level } = req.body;
    const updatedstudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, level },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


route.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = route;