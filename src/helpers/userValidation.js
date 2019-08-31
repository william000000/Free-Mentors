const email = /^\S+@[\w\-]+\.[A-Za-z ]{2,}$/;
const password = /^[A-Za-z0-9]{6,}$/;
const names = /^[A-Za-z]{1,}$/;
const address = /^[A-Za-z0-9]{2,}$/;
const bio = /^\w+(\s+\w+)*$/;
const occupation = /^[a-zA-Z_ ]{3,}$/;
const expertise = /^[a-zA-Z_ ]{3,}$/;

class UserValidations {
  /**
  * Validate User in SignUp process
  * @param {object} req
  * @param {object} res
  * @param {object} next
  */
  static validateSignup(req, res, next) {
    try {
      req.body.firstName = req.body.firstName.trim();
      req.body.lastName = req.body.lastName.trim();
      req.body.email = req.body.email.trim();
      req.body.password = req.body.password.trim();
      req.body.address = req.body.address.trim();
      req.body.expertise = req.body.expertise.trim();
      req.body.occupation = req.body.occupation.trim();

      if (!email.test(req.body.email)) throw new Error('invalid email');
      if (!((req.body.password).length > 5)) throw new Error('invalid password');
      if (!names.test(req.body.firstName)) throw new Error('invalid name');
      if (!names.test(req.body.lastName)) throw new Error('invalid names');
      if (!address.test(req.body.address)) throw new Error('invalid address');
      if (!bio.test(req.body.bio)) throw new Error('insert your bio at least more than 5 characters');
      if (!occupation.test(req.body.occupation)) throw new Error('enter your occupation');
      if (!expertise.test(req.body.expertise)) throw new Error('enter your expertise');
      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: err.message
      });
    }
  }
  /**
  * Validate User when Login
  * @param {object} req
  * @param {object} res
  * @param {object} next
  */
  static validateSignin(req, res, next) {
    try {

      req.body.email = req.body.email.trim();
      req.body.password = req.body.password.trim();

      if (!email.test(req.body.email)) throw new Error('please, insert and make sure it\'s valid email');
      if (!((req.body.password).length > 5)) throw new Error('please, insert and make sure it\'s valid password');

      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: err.message
      });
    }
  }
}

export default UserValidations;
