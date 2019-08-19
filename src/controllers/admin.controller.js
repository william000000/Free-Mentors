import users from '../models/users.model';
import mentors from '../models/mentor.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class AdminController {
  static changeUserToMentor(req, res) {

    const findUser = users.find(m => m.userId == parseInt(req.params.userId));

    if (!findUser) {
      return res.status(404).json({
        status: 404,
        error: 'User Not Found'
      });
    }

    if (findUser.isAdmin == true) {
      return res.status(403).json({
        status: 403,
        error: 'Admin not allowed!'
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        message: "User changed to mentor successfully",
        mentorId: mentors.length + 1,
        email: findUser.email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        address: findUser.address,
        bio: findUser.bio,
        occupation: findUser.occupation,
        expertise: findUser.expertise
      }
    });
  }
}
export default AdminController;