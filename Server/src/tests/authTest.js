import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import mockdata from "../mockdata/tokens";
chai.use(chaiHttp);
chai.should();



describe("Authentication tests", () => {

  it("Any route to my app ", (done) => {
    chai.request(app).get("/").end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });

  it("User should not be able to signup when data are valid when method is get ", (done) => {
    chai.request(app).get("/api/v2/auth/signup").send(mockdata.verify1).end((err, res) => {
      res.should.have.status(405);
      res.body.should.be.an("object");
      done();
    });

  });
  it("User should not be able to signup when data are valid when method is delete ", (done) => {
    chai.request(app).delete("/api/v2/auth/signup").send(mockdata.verify1).end((err, res) => {
      res.should.have.status(405);
      res.body.should.be.an("object");
      done();
    });

  });
  it("User should not be able to signup when data are valid when method is patch ", (done) => {
    chai.request(app).patch("/api/v2/auth/signup").send(mockdata.verify1).end((err, res) => {
      res.should.have.status(405);
      res.body.should.be.an("object");
      done();
    });

  });
  it("User should not be able to signup when data are valid when method is patch ", (done) => {
    chai.request(app).put("/api/v2/auth/signup").send(mockdata.verify1).end((err, res) => {
      res.should.have.status(405);
      res.body.should.be.an("object");
      done();
    });

  });
  it("User should be able to signup when data are valid ", (done) => {
    chai.request(app).post("/api/v2/auth/signup").send(mockdata.verifyNewUser).end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.an("object");
      done();
    });

  });


  it("User should not be able to signup when invalid firstname", (done) => {
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: '',
      lastname: 'willo',
      email: 'siu@gmail.com',
      password: 'Rwanda1!1!',
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
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: 'willo',
      lastname: '',
      email: 'siu@gmail.com',
      password: 'Rwanda1!',
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
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: 'willo',
      lastname: 'willo',
      email: 'siu@gmail',
      password: 'Rwanda1!',
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
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: 'willo',
      lastname: 'willo',
      email: 'willy@gmail.com',
      password: 'Rwanda1!',
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
  it("User should not be able to signup when user already exist from mentor", (done) => {
    chai.request(app).post("/api/v2/auth/signup").send(mockdata.existUser).end((err, res) => {
      res.should.have.status(409);
      res.body.should.be.an("object");
      done();
    });

  });

  it("User should not be able to signup when invalid password", (done) => {
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: 'willo',
      lastname: 'willo',
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
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: 'willo',
      lastname: 'willo',
      email: 'wil@gmail.com',
      password: 'Rwanda1!',
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
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: 'willo',
      lastname: 'willo',
      email: 'will@gmail.com',
      password: 'Rwanda1!',
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
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: 'willo',
      lastname: 'willo',
      email: 'willyryr@gmail.com',
      password: 'Rwanda1!',
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
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: 'willo',
      lastname: 'willo',
      email: 'wiouoooo@gmail.com',
      password: 'Rwanda1!',
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
    chai.request(app).post("/api/v2/auth/signup").send({
      firstname: 'willo',
      lastname: 'willo',
      email: 'willfgfg@gmail.com',
      password: 'Rwanda1!',
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
    chai.request(app).post("/api/v2/auth/signin").send(mockdata.existUser).end((err, res) => {
      res.should.have.status(200);
      done();
    });

  });
  it("User should be able to login when valid data as mentor", (done) => {
    chai.request(app).post("/api/v2/auth/signin").send({
      email: mockdata.verify1.email,
      password: mockdata.existUser.password
    }).end((err, res) => {
      res.should.have.status(200);
      done();
    });

  });

  it("User should not be able to login when valid data when method is get", (done) => {
    chai.request(app).get("/api/v2/auth/signin").send({
      email: mockdata.verify1.email,
      password: mockdata.verify1.password
    }).end((err, res) => {
      res.should.have.status(405);
      done();
    });

  });

  it("User should not be able to login when valid data when method is delete", (done) => {
    chai.request(app).delete("/api/v2/auth/signin").send({
      email: mockdata.verify1.email,
      password: mockdata.verify1.password
    }).end((err, res) => {
      res.should.have.status(405);
      done();
    });

  });
  it("User should not be able to login when valid data when method is patch", (done) => {
    chai.request(app).patch("/api/v2/auth/signin").send({
      email: mockdata.verify1.email,
      password: mockdata.verify1.password
    }).end((err, res) => {
      res.should.have.status(405);
      done();
    });

  });
  it("User should not be able to login when valid data when method is put", (done) => {
    chai.request(app).put("/api/v2/auth/signin").send({
      email: mockdata.verify1.email,
      password: mockdata.verify1.password
    }).end((err, res) => {
      res.should.have.status(405);
      done();
    });

  });
  it("User should not be able to login when invalid email", (done) => {
    chai.request(app).post("/api/v2/auth/signin").send({
      email: 'willy',
      password: mockdata.verify1.password,
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("User should not be able to login when email not exist", (done) => {
    chai.request(app).post("/api/v2/auth/signin").send({
      email: 'willyfegfgbjfj@gmail.com',
      password: mockdata.verify1.password
    }).end((err, res) => {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });

  });

  it("User should not be able to login when invalid password", (done) => {
    chai.request(app).post("/api/v2/auth/signin").send({
      email: mockdata.verify1.email,
      password: 'Rwaa',
    }).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });

  });

  it("User should not be able to login when invalid password", (done) => {
    chai.request(app).post("/api/v2/auth/signin").send({
      email: mockdata.verify1.email,
      password: 'Rwanda1!aahhchvcdh',
    }).end((err, res) => {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });

  });
  it("User should not be able to login when no password", (done) => {
    chai.request(app).post("/api/v2/auth/signin").send({
      email: mockdata.verify1.email,
      password: '',
    }).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });


});


