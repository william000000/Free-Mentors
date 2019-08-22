import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
chai.use(chaiHttp);
chai.should();



describe("MentorShip Session Request tests", () => {


  it("should be able to create mentorship session when all data is valid ", (done) => {
    chai.request(app).post(`/api/v1/sessions`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2lsbHlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjMyMTQ0MywiZXhwIjoxNTY4NzQwNjQzfQ.ahcHqLQFrMHcEbIyrXLNOdaQRcOoIFSxsfiUtPQ6teA')
      .send({
        mentorId: 1,
        questions: "jsgdsjgsd"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to create mentorship session when its done twice", (done) => {
    chai.request(app).post(`/api/v1/sessions`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2lsbHlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjMyMTQ0MywiZXhwIjoxNTY4NzQwNjQzfQ.ahcHqLQFrMHcEbIyrXLNOdaQRcOoIFSxsfiUtPQ6teA')
      .send({
        mentorId: 1,
        questions: "jsgdsjgsd"
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to create mentorship session when no mentorId", (done) => {
    chai.request(app).post(`/api/v1/sessions`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2lsbHlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjMyMTQ0MywiZXhwIjoxNTY4NzQwNjQzfQ.ahcHqLQFrMHcEbIyrXLNOdaQRcOoIFSxsfiUtPQ6teA')
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

  it("should be able to create mentorship session when no questions ", (done) => {
    chai.request(app).post(`/api/v1/sessions`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2lsbHlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjMyMTQ0MywiZXhwIjoxNTY4NzQwNjQzfQ.ahcHqLQFrMHcEbIyrXLNOdaQRcOoIFSxsfiUtPQ6teA')
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
    chai.request(app).post(`/api/v1/sessions`)
      .set('auth', 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2lsbHlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjMyMTQ0MywiZXhwIjoxNTY4NzQwNjQzfQ.ahcHqLQFrMHcEbIyrXLNOdaQRcOoIFSxsfiUtPQ6teA')
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
    chai.request(app).post(`/api/v1/sessions`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2lsbHlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjMyMTQ0MywiZXhwIjoxNTY4NzQwNjQzfQ.ahcHqLQFrMHcEbIyrXLNOdaQRcOoIFSxsfiUtPQ6teA')
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
    chai.request(app).post(`/api/v1/sessions`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
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
    chai.request(app).patch(`/api/v1/sessions/${1}/accept`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbHBAZ21haWwuY29tIiwiaWF0IjoxNTY2MzkyMTExLCJleHAiOjE1Njg4MTEzMTF9.zYbFG0R6sig1XzhWbA5i56pLtnXE96RwLO0MXXPOndU')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should be not able to accept mentorship session request when it is already accepted ", (done) => {
    chai.request(app).patch(`/api/v1/sessions/${2}/accept`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtldkBnbWFpbC5jb20iLCJpYXQiOjE1NjY0MzA0ODgsImV4cCI6MTU2ODg0OTY4OH0.GVOM_4aRHSbgyoRTtqLRiSx21Mu2mH0odXNdB0om8Ko')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to accept mentorship session request when session not given ", (done) => {
    chai.request(app).patch(`/api/v1/sessions/${0}/accept`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbHBAZ21haWwuY29tIiwiaWF0IjoxNTY2MzkyMTExLCJleHAiOjE1Njg4MTEzMTF9.zYbFG0R6sig1XzhWbA5i56pLtnXE96RwLO0MXXPOndU')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to accept mentorship session request when he is not a mentor of that request ", (done) => {
    chai.request(app).patch(`/api/v1/sessions/${1}/accept`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an("object");
        done();
      });
  });

});


