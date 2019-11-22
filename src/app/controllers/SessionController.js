import jwt from 'jsonwebtoken'; // module import precedes model import

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // I get the body's email and password
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } }); // short syntax of { email: email } - The name and value of the variable are the same

    if (!user) {
      return res.status(401).json({ error: `User ${email} not found` });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password is wrong. Try again' });
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
