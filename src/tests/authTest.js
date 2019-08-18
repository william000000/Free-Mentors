import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
chai.use(chaiHttp);
chai.should();



describe("Authentication tests", () => {

  it("User should be able to signup when data are valid ", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willy',
      lastName: 'willo',
      email: 'siu@gmail.com',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: 'Kigali',
      bio: 'something',
      occupation: 'nurse',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid firstname", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: '',
      lastName: 'willo',
      email: 'siu@gmail.com',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: 'Kigali',
      bio: 'something',
      occupation: 'nurse',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid lastname", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willo',
      lastName: '',
      email: 'siu@gmail.com',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: 'Kigali',
      bio: 'something',
      occupation: 'nurse',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid email", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willo',
      lastName: 'willo',
      email: 'siu@gmail',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: 'Kigali',
      bio: 'something',
      occupation: 'nurse',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when user already exist", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willo',
      lastName: 'willo',
      email: 'willy@gmail.com',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: 'Kigali',
      bio: 'something',
      occupation: 'nurse',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(409);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid password", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willo',
      lastName: 'willo',
      email: 'wiy@gmail.com',
      password: 'ki',
      address: 'Kigali',
      bio: 'something',
      occupation: 'nurse',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid address", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willo',
      lastName: 'willo',
      email: 'wil@gmail.com',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: '',
      bio: 'something',
      occupation: 'nurse',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid bio", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willo',
      lastName: 'willo',
      email: 'will@gmail.com',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: 'Kigali',
      bio: '',
      occupation: 'nurse',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid bio", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willo',
      lastName: 'willo',
      email: 'willyryr@gmail.com',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: 'Kigali',
      bio: '',
      occupation: 'jdjdjdjd',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid occupation", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willo',
      lastName: 'willo',
      email: 'wiouoooo@gmail.com',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: 'Kigali',
      bio: 'something',
      occupation: '',
      expertise: 'nurse'
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to signup when invalid expertise", (done) => {
    chai.request(app).post("/api/v1/auth/signup").send({
      firstName: 'willo',
      lastName: 'willo',
      email: 'willfgfg@gmail.com',
      password: '$2b$10$NUw1zBqr.iyt.dX2T7y5hOxy8C83KlZXF/v8HmMlPC0Xwq6CmxTyi',
      address: 'Kigali',
      bio: 'something',
      occupation: 'jdfjbdjbfd',
      expertise: ''
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should be able to login when valid data", (done) => {
    chai.request(app).post("/api/v1/auth/signin").send({
      email: 'willy@gmail.com',
      password: 'rwanda',
    }).end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

    it("User should not be able to login when invalid email", (done) => {
      chai.request(app).post("/api/v1/auth/signin").send({
        email: 'willy',
        password: 'rwanda',
      }).end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
    });

    it("User should not be able to login when email not exist", (done) => {
      chai.request(app).post("/api/v1/auth/signin").send({
        email: 'willyfegfgbjfj@gmail.com',
        password: 'rwanda',
      }).end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });

    it("User should not be able to login when invalid password", (done) => {
      chai.request(app).post("/api/v1/auth/signin").send({
        email: 'willy@gmail.com',
        password: 'rwandaaa',
      }).end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
    it("User should not be able to login when no password", (done) => {
      chai.request(app).post("/api/v1/auth/signin").send({
        email: 'willy@gmail.com',
        password: '',
      }).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });


});


