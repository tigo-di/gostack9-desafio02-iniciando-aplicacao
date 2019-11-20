class SessionController {
  store(req, res) {
    return res.json({ message: 'It is all right here' });
  }
}

export default new SessionController();
