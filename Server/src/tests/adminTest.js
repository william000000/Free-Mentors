import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
chai.use(chaiHttp);
chai.should();



describe("Admin tests", () => {
  
  it("Admin should not be able to change user to mentor when is admin ", (done) => {
    const userId = 2;
    chai.request(app).patch(`/api/v2/user/${userId}`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
    .end((err, res) => {
      res.should.have.status(403);
      res.body.should.be.an("object");
      done();
    });
  });

  it("Admin should be able to change user to mentor ", (done) => {
    const userId = 3;
    chai.request(app).patch(`/api/v2/user/${userId}`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });

  it("Admin should not be able to change user to mentor when invalid token", (done) => {
    const userId = 1;
    chai.request(app).patch(`/api/v2/user/${userId}`)
    .set('auth', 'yJhbGciOiJIVySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
    .end((err, res) => {
      res.should.have.status(401);
      res.body.should.be.an("object");
      done();
    });
  });

  it("Admin should not be able to change user to mentor when no token", (done) => {
    const userId = 1;
    chai.request(app).patch(`/api/v2/user/${userId}`)
    .set('auth', '')
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });

  it("Admin should not be able to change user to mentor when user not found", (done) => {
    const userId = -1;
    chai.request(app).patch(`/api/v2/user/${userId}`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2NjIzNTEzMywiZXhwIjoxNTY4NjU0MzMzfQ.TwpjQovDnBU3axadqjuaLAUDVPWybj1mAMhxeyCy4p0')
    .end((err, res) => {
      res.should.have.status(404);
      res.body.should.be.an("object");
      done();
    });
  });

  it("Admin should not be able to change user to mentor when he is not an admin ", (done) => {
    const userId = 1;
    chai.request(app).patch(`/api/v2/user/${userId}`)
    .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoid2lsbHlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2NjI0MjI5NCwiZXhwIjoxNTY4NjYxNDk0fQ.LDGXyaecz-q-7dG-O71nt3ZK_eh_vS-XJLGyUeZEmz4')
    .end((err, res) => {
      res.should.have.status(403);
      res.body.should.be.an("object");
      done();
    });
  });

});


