import * as Yup from 'yup'; // schema validation
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    // method object because req is a object
    // shape defines format

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

    // return res.status(200).json({ message: 'Validation ok' });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
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
