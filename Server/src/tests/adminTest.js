import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import mockdata from "../mockdata/tokens";
chai.use(chaiHttp);
chai.should();

describe("Admin tests", () => {

  it("Admin should not be able to change user to mentor when is admin ", (done) => {
    chai.request(app).patch(`/api/v2/user/${mockdata.verifyAdmin.id}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an("object");
        done();
      });
  });
  it("Admin should not be able to change user to mentor when method id put", (done) => {
    chai.request(app).put(`/api/v2/user/${mockdata.verify3.id}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });
  it("Admin should not be able to change user to mentor when method is delete ", (done) => {
    chai.request(app).delete(`/api/v2/user/${mockdata.verify3.id}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });
  it("Admin should not be able to change user to mentor when method is get ", (done) => {
    chai.request(app).get(`/api/v2/user/${mockdata.verify3.id}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });

  it("Admin should not be able to change user to mentor when method is post ", (done) => {
    chai.request(app).post(`/api/v2/user/${mockdata.verify3.id}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an("object");
        done();
      });
  });

  it("Admin should be able to change user to mentor ", (done) => {
    chai.request(app).patch(`/api/v2/user/${mockdata.verify3.id}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });
  it("Admin should not be able to change user to mentor when already changed", (done) => {
    chai.request(app).patch(`/api/v2/user/${mockdata.verify3.id}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an("object");
        done();
      });
  });

  it("Admin should not be able to change user to mentor when invalid token", (done) => {
    chai.request(app).patch(`/api/v2/user/${mockdata.verify1.id}`)
      .set('auth', mockdata.invalidToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
  });

  it("Admin should not be able to change user to mentor when no token", (done) => {
    chai.request(app).patch(`/api/v2/user/${mockdata.verify1.id}`)
      .set('auth', '')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
  });

  it("Admin should not be able to change user to mentor when user not found", (done) => {
    chai.request(app).patch(`/api/v2/user/${100000000}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });
  it("Admin should not be able to change user to mentor when user not found", (done) => {
    const userId = 0;
    chai.request(app).patch(`/api/v2/user/${userId}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

  it("Admin should not be able to change user to mentor when params not integer", (done) => {
    const userId = 'hd';
    chai.request(app).patch(`/api/v2/user/${userId}`)
      .set('auth', mockdata.adminUser2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

});


