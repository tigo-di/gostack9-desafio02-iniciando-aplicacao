import jwt from 'jsonwebtoken'; // module import precedes model import

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // I get the body's email and password
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } }); // short syntax of { email: email } - The name and value of the variable are the same

    // Verify if user exists
    // For security, do not tell if email or password is wrong
    if (!user) {
      return res.status(401).json({ error: `Authentication failed. Try again` });
    }

    // Verify if password is correct
    // For security, do not tell if email or password is wrong
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Authentication failed. Try again.' });
    }

    const { id, name } = user;

    return res.status(200).json({
      user: {
        id,
        name,
        email,
      },
      /*
      method sign
      - first param = payload
      - second = text unique
      - third - params extra
      */
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });

    /*
    return res.json({
      message: `It is all right here: ${email} and ${password}`,
    });



    return res.status(200).json({ message: 'User founded' });
 */
  }
}

export default new SessionController();
