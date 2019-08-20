import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
chai.use(chaiHttp);
chai.should();



describe("Mentors tests", () => {

  it("should be able to view all mentors when valid token ", (done) => {
    chai.request(app).get(`/api/v1/mentors`)
      .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("should not be able to view all mentors when invalid token ", (done) => {
    chai.request(app).get(`/api/v1/mentors`)
      .set('auth', 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
  });

});


