import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    // Save data
    const { name, email, age, height, weight } = await Student.create(req.body);

    return res
      .status('200')
      .json({ message: `${name} ${email} ${age} ${height}  ${weight} ` });
  }
}

export default new StudentController();
