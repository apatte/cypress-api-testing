cy.helper = {};

//Returns a random 6-digit number, e.g. 123456
cy.helper.randomID = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};
