const email = /^\S+@[\w\-]+\.[A-Za-z ]{2,}$/;
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
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
  
       
      if (!email.test(req.body.email) || !(req.body.email)) throw new Error('insert email, use ex: willy@gmail.com');
      if (!password.test((req.body.password))|| !(req.body.password)) throw new Error('invalid password, ex: Ethiopia1!');
      if (!names.test(req.body.firstname)||!(req.body.firstname)) throw new Error('invalid first name');
      if (!names.test(req.body.lastname) || !(req.body.lastname)) throw new Error('insert valid lastname');
      if (!address.test(req.body.address) || !(req.body.address)) throw new Error('invalid address');
      if (!bio.test(req.body.bio) || !(req.body.bio)) throw new Error('insert your bio at least more than 5 characters');
      if (!occupation.test(req.body.occupation) || !(req.body.occupation)) throw new Error('enter your occupation');
      if (!expertise.test(req.body.expertise) || !(req.body.expertise)) throw new Error('enter your expertise');
      next();
    } catch (err) {
      res.status(400).json({ status: 400, error: err.message });
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
      if (!email.test(req.body.email)) throw new Error('insert valid email, ex: willy@gmail.com');
      if (!password.test((req.body.password))) throw new Error('insert valid password');
      next();
    } catch (err) {
      res.status(400).json({ status: 400, error: err.message });
    }
  }
}

export default UserValidations;
