import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import mockdata from "../mockdata/tokens";
chai.use(chaiHttp);
chai.should();



describe("MentorShip Session Request tests", () => {

  it("should not be able to create mentorship session when all data is valid when method is delete ", (done) => {
    chai.request(app).delete(`/api/v2/sessions`)
      .set('auth',mockdata.user1)
      .send({
        mentorId: 1,
        questions: "jsgdsjgsd"
      })
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to create mentorship session when all data is valid when method is patch ", (done) => {
    chai.request(app).patch(`/api/v2/sessions`)
      .set('auth', mockdata.user1)
      .send({
        mentorId: 1,
        questions: "jsgdsjgsd"
      })
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to create mentorship session when all data is valid when method is put ", (done) => {
    chai.request(app).put(`/api/v2/sessions`)
      .set('auth',mockdata.user1)
      .send({
        mentorId: 1,
        questions: "jsgdsjgsd"
      })
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });


  it("should not be able to create mentorship session when no mentorId", (done) => {
    chai.request(app).post(`/api/v2/sessions`)
      .set('auth', mockdata.user1)
      .send({
        mentorId: '',
        questions: "jsgdsjgsd"
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to create mentorship session when no questions ", (done) => {
    chai.request(app).post(`/api/v2/sessions`)
      .set('auth', mockdata.user1)
      .send({
        mentorId: 1,
        questions: ""
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to create mentorship session when token is invalid ", (done) => {
    chai.request(app).post(`/api/v2/sessions`)
      .set('auth', mockdata.invalidToken)
      .send({
        mentorId: 1,
        questions: "What is hshs?"
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to create mentorship session when mentor not found ", (done) => {
    chai.request(app).post(`/api/v2/sessions`)
      .set('auth', mockdata.user1)
      .send({
        mentorId: 0,
        questions: "hhfddfdfxdx"
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to create mentorship session when he is admin ", (done) => {
    chai.request(app).post(`/api/v2/sessions`)
      .set('auth', mockdata.adminUser2)
      .send({
        mentorId: 1,
        questions: "vhvhvhvhvhvh"
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should be able to accept mentorship session request when all data is valid ", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${1}/accept`)
      .set('auth', mockdata.mentorUser4)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should be not able to accept mentorship session request when it is already accepted ", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${2}/accept`)
      .set('auth',mockdata.mentorUser5)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to accept mentorship session request when session not given ", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${100000}/accept`)
      .set('auth',mockdata.mentorUser4)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should not be able to accept mentorship session request when session id is 0 ", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${0}/accept`)
      .set('auth', mockdata.mentorUser4)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to accept mentorship session request when he is not a mentor of that request ", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${1}/accept`)
      .set('auth', mockdata.mentorUser5)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an("object");
        done();
      });
  });


  it("should be able to reject mentorship session request when all data is valid ", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${1}/reject`)
      .set('auth', mockdata.mentorUser4)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should be not able to reject mentorship session request when it is already rejected ", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${3}/reject`)
      .set('auth',mockdata.mentorUser5)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to reject mentorship session request when session id is zero", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${0}/reject`)
      .set('auth', mockdata.mentorUser4)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should not be able to reject mentorship session request when no found", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${100000}/reject`)
      .set('auth', mockdata.mentorUser4)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to reject mentorship session request when he is not a mentor of that request ", (done) => {
    chai.request(app).patch(`/api/v2/sessions/${1}/reject`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should be able to view all mentorship session requested ", (done) => {
    chai.request(app).get(`/api/v2/sessions/`)
      .set('auth', mockdata.user1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should be not able to view all mentorship session requested when no session done against user", (done) => {
    chai.request(app).get(`/api/v2/sessions/`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });
});


