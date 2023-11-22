cy.helper = {};

cy.helper.randomID = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};
