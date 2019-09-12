import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import mockdata from "../mockdata/tokens";
chai.use(chaiHttp);
chai.should();



describe("Mentors tests", () => {

  it("should be able to view all mentors when valid token ", (done) => {
    chai.request(app).get(`/api/v2/mentors`)
      .set('auth',mockdata.user1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to view all mentors when valid token when method is post ", (done) => {
    chai.request(app).post(`/api/v2/mentors`)
      .set('auth', mockdata.user1)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to view all mentors when valid token when method is patch ", (done) => {
    chai.request(app).patch(`/api/v2/mentors`)
      .set('auth',mockdata.user1)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to view all mentors when valid token when method is put ", (done) => {
    chai.request(app).put(`/api/v2/mentors`)
      .set('auth', mockdata.user1)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should not be able to view all mentors when valid token when method is delete ", (done) => {
    chai.request(app).delete(`/api/v2/mentors`)
      .set('auth', mockdata.user1)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should be able to view all mentors when no both variable and value of token ", (done) => {
    chai.request(app).get(`/api/v2/mentors`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to view all mentors when invalid token ", (done) => {
    chai.request(app).get(`/api/v2/mentors`)
      .set('auth', mockdata.invalidToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should be able to view mentor when valid token and mentor exist ", (done) => {

    chai.request(app).get(`/api/v2/mentors/${3}`)
      .set('auth',mockdata.user1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should be able to view mentor when valid token and mentor exist when method is post", (done) => {

    chai.request(app).post(`/api/v2/mentors/${3}`)
      .set('auth', mockdata.user1)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should be able to view mentor when valid token and mentor exist when method is delete", (done) => {

    chai.request(app).delete(`/api/v2/mentors/${3}`)
      .set('auth',mockdata.user1)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should be able to view mentor when valid token and mentor exist when method is patch", (done) => {

    chai.request(app).patch(`/api/v2/mentors/${3}`)
      .set('auth',mockdata.user1)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should be able to view mentor when valid token and mentor exist when method is put", (done) => {

    chai.request(app).put(`/api/v2/mentors/${3}`)
      .set('auth', mockdata.user1)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should not be able to view mentor when params is not integer ", (done) => {
    const userId = 'fvv';
    chai.request(app).get(`/api/v2/mentors/${userId}`)
      .set('auth', mockdata.user1)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should be not able to view a mentor when invalid token ", (done) => {
    const mentorId = 1;
    chai.request(app).get(`/api/v2/mentors/${mentorId}`)
      .set('auth', mockdata.invalidToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should be not able to view a mentor when no token ", (done) => {
    const mentorId = 1;
    chai.request(app).get(`/api/v2/mentors/${mentorId}`)
      .set('auth', '')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should be not able to view a mentor when mentor id is not found ", (done) => {
    chai.request(app).get(`/api/v2/mentors/${1999999990}`)
      .set('auth', mockdata.user1)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should be not able to view a mentor when mentor id iz zero ", (done) => {
    chai.request(app).get(`/api/v2/mentors/${0}`)
      .set('auth',mockdata.user1)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should be not able to view a mentor when mentor id is character", (done) => {
    chai.request(app).get(`/api/v2/mentors/${'hhh'}`)
      .set('auth',mockdata.user1)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

});


