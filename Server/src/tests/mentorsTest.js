import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
chai.use(chaiHttp);
chai.should();



describe("Mentors tests", () => {

  it("should be able to view all mentors when valid token ", (done) => {
    chai.request(app).get(`/api/v2/mentors`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
      .end((err, res) => {
        res.should.have.status(200);
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
      .set('auth', 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
  });
  
  it("should be able to view mentor when valid token and mentor exist ", (done) => {
  
    chai.request(app).get(`/api/v2/mentors/${3}`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxseXlAZ21haWwuY29tIiwiaXNBZG1pbiI6ImZhbHNlIiwiaXNNZW50b3IiOiJmYWxzZSIsImlhdCI6MTU2Nzk0MzUyMH0.EvQ2n7JifsWaFrI76FPec3kEjcdLf3FK6a5CgEOWU68')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  // it("should be not able to view a mentor when invalid token ", (done) => {
  //   const mentorId = 1;
  //   chai.request(app).get(`/api/v2/mentors/${mentorId}`)
  //     .set('auth', 'OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
  //     .end((err, res) => {
  //       res.should.have.status(401);
  //       res.body.should.be.an("object");
  //       done();
  //     });
  // });
  // it("should be not able to view a mentor when no token ", (done) => {
  //   const mentorId = 1;
  //   chai.request(app).get(`/api/v2/mentors/${mentorId}`)
  //     .set('auth', '')
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       res.body.should.be.an("object");
  //       done();
  //     });
  // });
  // it("should be not able to view a mentor when mentor not found ", (done) => {
  //   chai.request(app).get(`/api/v2/mentors/${0}`)
  //     .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aWxseXlAZ21haWwuY29tIiwiaXNBZG1pbiI6ImZhbHNlIiwiaXNNZW50b3IiOiJmYWxzZSIsImlhdCI6MTU2Nzk0MzUyMH0.EvQ2n7JifsWaFrI76FPec3kEjcdLf3FK6a5CgEOWU68')
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       res.body.should.be.an("object");
  //       done();
  //     });
  // });

});


