import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
chai.use(chaiHttp);
chai.should();



describe("Mentee Review Mentor tests", () => {
  
  it("should be able to review a mentorship after session ", (done) => {
    chai.request(app).post(`/api/v1/sessions/${2}/review`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjQ5OTAxMiwiZXhwIjoxNTY4OTE4MjEyfQ.9jrIfmgeLXyZrqyihfoaOa6s32UjH-fXNIfHVrGEVCM')
    .send({
      score: 3,
      remark: 'hgshgdhs sjfgs?'
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });

  it("should be not able to review a mentorship after session when no score ", (done) => {
    chai.request(app).post(`/api/v1/sessions/${2}/review`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjQ5OTAxMiwiZXhwIjoxNTY4OTE4MjEyfQ.9jrIfmgeLXyZrqyihfoaOa6s32UjH-fXNIfHVrGEVCM')
    .send({
      score: '',
      remark: 'hgshgdhs sjfgs?'
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("should be not able to review a mentorship after session when invalid score number ", (done) => {
    chai.request(app).post(`/api/v1/sessions/${2}/review`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjQ5OTAxMiwiZXhwIjoxNTY4OTE4MjEyfQ.9jrIfmgeLXyZrqyihfoaOa6s32UjH-fXNIfHVrGEVCM')
    .send({
      score: 8,
      remark: 'hgshgdhs sjfgs?'
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("should be not able to review a mentorship after session when no remark ", (done) => {
    chai.request(app).post(`/api/v1/sessions/${2}/review`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjQ5OTAxMiwiZXhwIjoxNTY4OTE4MjEyfQ.9jrIfmgeLXyZrqyihfoaOa6s32UjH-fXNIfHVrGEVCM')
    .send({
      score: 3,
      remark: ''
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("should be not able to review a mentorship after session when no session found ", (done) => {
    chai.request(app).post(`/api/v1/sessions/${0}/review`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjQ5OTAxMiwiZXhwIjoxNTY4OTE4MjEyfQ.9jrIfmgeLXyZrqyihfoaOa6s32UjH-fXNIfHVrGEVCM')
    .send({
      score: 4,
      remark: 'hgshgdhs sjfgs?'
    })
    .end((err, res) => {
      res.should.have.status(404);
      res.body.should.be.an("object");
      done();
    });
  });

  it("should be not able to review a mentorship after session when he is not the one accessed it ", (done) => {
    chai.request(app).post(`/api/v1/sessions/${1}/review`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjQ5OTAxMiwiZXhwIjoxNTY4OTE4MjEyfQ.9jrIfmgeLXyZrqyihfoaOa6s32UjH-fXNIfHVrGEVCM')
    .send({
      score: 4,
      remark: 'hgshgdhs sjfgs?'
    })
    .end((err, res) => {
      res.should.have.status(403);
      res.body.should.be.an("object");
      done();
    });
  });

    it("should be not able to review a mentorship after session when he is a mentor ", (done) => {
    chai.request(app).post(`/api/v1/sessions/${2}/review`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtldkBnbWFpbC5jb20iLCJpYXQiOjE1NjY1MDYxMTYsImV4cCI6MTU2ODkyNTMxNn0.HNg0x6NtzXM56UwcP1CA9HXXYX86r0xQLJ-_ccuGxpI')
    .send({
      score: 4,
      remark: 'hgshgdhs sjfgs?'
    })
    .end((err, res) => {
      res.should.have.status(403);
      res.body.should.be.an("object");
      done();
    });
  });
});


