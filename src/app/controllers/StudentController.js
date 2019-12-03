import * as Yup from 'yup'; // schema validation
import Student from '../models/Student';

const heightMax = 2.40;
const weightMax = 200;

class StudentController {
  // STORE
  async store(req, res) {

    // BEGINGS - Yup Schema Validation.
    // yup object method because req is a object.
    // shape method defines format.

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
        .max(heightMax)
        .required(),
      weight: Yup.number()
        .positive()
        .max(weightMax)
        .required(),
    });

    // STOPS the flow - if user Validation fails
    // Yup Schema Validation req.body
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verify if student exists
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    // STOPS the flow - if user email already exists in database
    if (studentExists) {
      return res.status(400).json({ error: `Student with email ${req.body.email} already exists. Verify or try new register with another email` });
    }


    // Save data
    const { name, email, age, height, weight } = await Student.create(req.body);


    return res.status(200).json({
      name,
      email,
      age,
      height,
      weight,
    });

  } // END STORE method

  // UPDATE method
  async update(req, res) {
    // BEGINGS - Yup Schema Validation.
    // yup object method because req is a object.
    // shape method defines format.

    const schema = Yup.object().shape({
      name: Yup.string().trim(),
      email: Yup.string()
        .trim()
        .email(),
      age: Yup.number()
        .positive()
        .integer(),
      height: Yup.number().positive().max(heightMax),
      weight: Yup.number().positive().max(weightMax),
      id: Yup.number().positive(),
    });


    // STOPS the flow - if student Validation fails
    // Yup Schema Validation for req.body
    await schema.validate(req.body).catch(function(err) {

      //err.name; // => 'ValidationError'
      err.errors; // => ['Must be greater than 18']

      return res.status(400)
      .json({ error: `Validation fails - ${err.errors}` });

    })


    // GET route parameter id (student id)
    const userId = req.params.id;


    // STOPS the flow - if Student id Validation fails
    // Yup Schema Validation for req.params
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails - Student ID is wrong' });
    }


    // GET the student from the database
    const student = await Student.findByPk(userId);

    // Verify if student id exists
    if(!(student)) {
      return res.json({ error: `Student id ${userId} does not exists. Please, contact the support`})
    }

    //  GET email to verify for duplicate data before update
    const { email } = req.body;

    // Test for email update
    if (email !== student.email) {

      const studentExists = await Student.findOne({ where: { email } });

      // STOP the flow - if new student email already exists in database
      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists. Try again with another email' });
      }

    }


    const { name, age, height, weight } = await student.update(req.body);

    return res.status(200).json({
      userId,
      name,
      email,
      age,
      height,
      weight,
    });
  }
}

export default new StudentController();
