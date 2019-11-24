import * as Yup from 'yup'; // schema validation
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    // BEGINGS - Yup Schema Validation
    // yup object method  because req is a object
    // shape method defines format

    const schema = Yup.object().shape({
      name: Yup.string()
        .trim()
        .required(),
      email: Yup.string()
        .trim()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .integer()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
    });

    // STOPS the flow - if user Validation fails
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // ^ENDED: Yup Schema Validation

    // Verify if User exists
    const userExists = await Student.findOne({
      where: { email: req.body.email },
    });

    // STOPS the flow - if user email already exists in database
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Save data
    const { name, email, age, height, weight } = await Student.create(req.body);

    // const { name, email, age, height, weight } = req.body;

    return res
      .status(200)
      .json({ message: `${name} ${email} ${age} ${height}  ${weight} ` });
  }
}

export default new StudentController();
