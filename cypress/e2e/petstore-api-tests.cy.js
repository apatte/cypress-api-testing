//these tests are based on the below swagger documentation
//https://petstore.swagger.io/

describe("Pet Store API Tests", () => {
  const newPet = {
    id: cy.helper.randomID(),
    name: "Fido",
    status: "available",
    updatedStatus: "sold",
  };
  it.only("Should create a new pet", () => {
    cy.request("POST", `/pet`, newPet).then((response) => {
      expect(response.status).to.equal(200);
      // Check that specific properties match
      expect(response.body.id).to.equal(newPet.id);
      expect(response.body.name).to.equal(newPet.name);
      expect(response.body.status).to.equal(newPet.status);
    });
  });

  it.only("Should get a pet by ID", () => {
    cy.request("GET", `/pet/${newPet.id}`).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(newPet.id);
    });
  });

  it.only("Should update a pet's status", () => {
    cy.request("POST", `/pet`, {
      petId: newPet.id,
      status: newPet.updatedStatus,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal(newPet.updatedStatus);
    });
  });

  it.only("Should delete a pet by ID", () => {
    cy.request("DELETE", `/pet/${newPet.id}`).then((response) => {
      expect(response.status).to.equal(200);
    });
    cy.log("the deleted record should no longer exist");
    cy.request({ url: `/pet/${newPet.id}`, failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.equal(404);
      }
    );
  });
});
