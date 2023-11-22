//Swagger documentation: https://petstore.swagger.io/
//baseUrl: "https://petstore.swagger.io/v2" (stored in cypress.config.js)

describe("Pet Store API Tests", () => {
  const newPet = {
    id: cy.helper.randomID(),
    name: "Fido",
    status: "available",
    updatedStatus: "sold",
  };
  it("Should create a new pet", () => {
    cy.request("POST", `/pet`, newPet).then((response) => {
      expect(response.status).to.equal(200);
      // Check that specific properties match
      expect(response.body.id).to.equal(newPet.id);
      expect(response.body.name).to.equal(newPet.name);
      expect(response.body.status).to.equal(newPet.status);
    });
  });

  it("Should get a pet by ID", () => {
    cy.request("GET", `/pet/${newPet.id}`).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(newPet.id);
    });
  });

  it("Should update a pet's status", () => {
    cy.request("POST", `/pet`, {
      petId: newPet.id,
      status: newPet.updatedStatus,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal(newPet.updatedStatus);
    });
  });

  it("Should delete a pet by ID", () => {
    cy.request("DELETE", `/pet/${newPet.id}`).then((response) => {
      expect(response.status).to.equal(200);
    });
    //check that the deleted record no longer exists
    cy.request({ url: `/pet/${newPet.id}`, failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.equal(404);
      }
    );
  });
});
