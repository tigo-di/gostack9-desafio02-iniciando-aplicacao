import User from '../models/User';

class SessionController {
  async store(req, res) {
    // I get the body's email and password
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } }); // short syntax of { email: email }

    if (!user) {
      return res.status(401).json({ error: `User ${email} not found` });
    }

    return res.status(200).json({ message: 'User found' });

    /*
    return res.json({
      message: `It is all right here: ${email} and ${password}`,
    });



    return res.status(200).json({ message: 'User founded' });
 */
  }
}

export default new SessionController();
