/// <reference types="cypress" />

describe("Update Booking", () => {
  var token = "";
  var bookingId = "";

  before("Login", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      body: {
        username: "admin",
        password: "password123",
      },
    }).then((response) => {
      token = response.body.token;
    });
  });

  beforeEach("Create a booking", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/booking",
      failOnStatusCode: false,
      body: {
        firstname: "Ana",
        lastname: "Teste",
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-12-01",
          checkout: "2024-12-15",
        },
        additionalneeds: "Breakfast",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object")
      expect(response.body.bookingid).to.be.a("number");
      bookingId = response.body.bookingid;
    });
  });
  it("Update a booking", () => {
    cy.request({
      method: "PUT",
      url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      failOnStatusCode: false,
      body: {
        firstname: "Ana",
        lastname: "Teste",
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-12-01",
          checkout: "2024-12-15",
        },
        additionalneeds: "Breakfast",
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.totalprice).to.equal(5000);
    });
  });
});
