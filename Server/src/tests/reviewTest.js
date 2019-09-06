import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
chai.use(chaiHttp);
chai.should();



describe("Mentee Review Mentor tests", () => {

  // it("should be able to review a mentorship after session ", (done) => {
  //   chai.request(app).post(`/api/v2/sessions/${2}/review`)
  //     .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NzUzNTA3NX0.jw1kMtKCgYHK9EUBvvC50Vi0STxH8g6GYepEvENwfU0')
  //     .send({
  //       score: 3,
  //       remark: 'hgshgdhs sjfgs?'
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200);
      
  //       done();
  //     });
  // });

  it("should be not able to review a mentorship after session when no score ", (done) => {
    chai.request(app).post(`/api/v2/sessions/${2}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NzUzNTA3NX0.jw1kMtKCgYHK9EUBvvC50Vi0STxH8g6GYepEvENwfU0')
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
    chai.request(app).post(`/api/v2/sessions/${2}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NzUzNTA3NX0.jw1kMtKCgYHK9EUBvvC50Vi0STxH8g6GYepEvENwfU0')
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
    chai.request(app).post(`/api/v2/sessions/${2}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NzUzNTA3NX0.jw1kMtKCgYHK9EUBvvC50Vi0STxH8g6GYepEvENwfU0')
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
    chai.request(app).post(`/api/v2/sessions/${0}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NzUzNTA3NX0.jw1kMtKCgYHK9EUBvvC50Vi0STxH8g6GYepEvENwfU0')
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
    chai.request(app).post(`/api/v2/sessions/${1}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoid2lsbG9AZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NzUzNTA3NX0.jw1kMtKCgYHK9EUBvvC50Vi0STxH8g6GYepEvENwfU0')
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

  it("should not be able to review a mentorship after session when he is a mentor ", (done) => {
    chai.request(app).post(`/api/v2/sessions/${1}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtldkBnbWFpbC5jb20iLCJpYXQiOjE1Njc1MzcyMzIsImV4cCI6MTU2OTk1NjQzMn0.j2uIOXhv6vGDKEDmmVi3NMQP_tuiUvs6XZ_DiuEGE3A')
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

  it("should be able to delete inappropriate review when is admin and review exist ", (done) => {
    chai.request(app).delete(`/api/v2/sessions/${1}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NzUzNTU3NX0.FMzBboVYhLjpjV22auY5KT6yTFMPa7ZK6e7Hz5S_RUc')
      .send({
        reason: 'hgdfvdf djvf'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });
  it("should not be able to delete inappropriate review when not reason ", (done) => {
    chai.request(app).delete(`/api/v2/sessions/${1}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NzUzNTU3NX0.FMzBboVYhLjpjV22auY5KT6yTFMPa7ZK6e7Hz5S_RUc')
      .send({
        reason: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to delete inappropriate review when review not exist ", (done) => {
    chai.request(app).delete(`/api/v2/sessions/${0}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NzUzNTU3NX0.FMzBboVYhLjpjV22auY5KT6yTFMPa7ZK6e7Hz5S_RUc')
      .send({
        reason: 'hgdfvdf djvf'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to delete inappropriate review when he is not Admin ", (done) => {
    chai.request(app).delete(`/api/v2/sessions/${1}/review`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoid2lsbGlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NzUzNDYzMCwiZXhwIjoxNTY5OTUzODMwfQ.idZNNDCBsnQ9xcfVt80kFb86WUfVM6S-y53fLX5JuI4')
      .send({
        reason: 'hgdfvdf djvf'
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an("object");
        done();
      });
  });
});


