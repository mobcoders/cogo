import { SELECTORS } from './selectors';

// Save the user's session to reuse in tests
const login = () => {
  cy.session('user', () => {
    cy.visit('http://localhost:3000/');
    cy.get(SELECTORS.HOME_SIGN_IN_BTN).click();
    cy.get(SELECTORS.SIGN_IN_EMAIL).type(`${'cypress@cypress.com'}`);
    cy.get(SELECTORS.SIGN_IN_PASSWORD).type(`${'pass'}`);
    cy.get(SELECTORS.SIGN_IN_BTN).click();
    cy.url().should('include', '/profile');
    cy.url().should('not.include', 'auth');
  });
};

describe('Logging in and registering', () => {
  it('should navigate to the auth page', () => {
    cy.visit('http://localhost:3000/');
    cy.get(SELECTORS.HOME_SIGN_IN_BTN).click();
    cy.url().should('include', '/auth');
  });

  it("should register the new user and navigate to profile from the homepage's 'Sign In' button", () => {
    cy.visit('http://localhost:3000/');
    cy.get(SELECTORS.HOME_SIGN_IN_BTN).click();
    cy.get(SELECTORS.SIGN_UP_TAB).click();
    cy.get(SELECTORS.SIGN_UP_NAME).type('Simon Press');
    cy.get(SELECTORS.SIGN_UP_EMAIL).type(`${'cypress@cypress.com'}`);
    cy.get(SELECTORS.SIGN_UP_PASSWORD).type(`${'pass'}`);
    cy.get(SELECTORS.SIGN_UP_BTN).click();
    cy.url().should('include', '/profile');
    cy.url().should('not.include', 'auth');
  });

  it("should sign in the user and navigate to profile from the homepage's 'Sign In' button", () => {
    cy.visit('http://localhost:3000/');
    cy.get(SELECTORS.HOME_SIGN_IN_BTN).click();
    cy.get(SELECTORS.SIGN_IN_EMAIL).type(`${'cypress@cypress.com'}`);
    cy.get(SELECTORS.SIGN_IN_PASSWORD).type(`${'pass'}`);
    cy.get(SELECTORS.SIGN_IN_BTN).click();
    cy.url().should('include', '/profile');
    cy.url().should('not.include', 'auth');
  });

  it("should sign in and navigate to profile from the homepage's 'Sign In' button", () => {
    login('user');
  });

  it('should sign out and not allow visit to restricted route after', () => {
    login('user');
    cy.visit('http://localhost:3000/profile');
    cy.get(SELECTORS.PROFILE_SIGN_OUT_BTN).should('be.visible').submit();
    cy.url().should('include', '/auth');
    cy.visit('http://localhost:3000/profile');
    cy.url().should('include', '/auth');
  });
});

describe('Create a group trip from the homepage', () => {
  it("should create a new group trip under the user's name from the homepage's 'Create a Group Trip' button", () => {
    login('user');

    cy.visit('http://localhost:3000/');
    cy.get(SELECTORS.CREATE_GROUP_TRIP_BTN).click();
    cy.get(SELECTORS.GROUP_TRIP_NAME).should('be.visible');
  });
});

describe('Profile', () => {
  beforeEach(() => {
    login('user');
    cy.visit('http://localhost:3000/profile');
  });

  it("should list the user's group trips as trip cards on their profile", () => {
    cy.get(SELECTORS.GROUP_TRIP_CARD).should('be.visible');
  });

  // it('should link to the group trip from the trip card on their profile', () => {
  //   cy.get(SELECTORS.GROUP_TRIP_CARD).click();
  //   cy.get(SELECTORS.GROUP_TRIP_NAME).should('be.visible');
  // });
});

// describe('Group trip - potential destinations', () => {
//   it("should add a new potential destination card when the 'Add a Destination' button is clicked and the form is filled out", () => {});
//   it('should show an image, city and country on each potential destination card', () => {});
//   it('should expand to show activities when the arrow icon on the potential destination card is clicked', () => {});
//   it('should increase the vote count when the heart icon on the potential destination card is clicked', () => {});
//   it('should allow the user to edit the potential destination when the options button on the potential destination card is clicked', () => {});
//   it('should show the updated potential destination card after the edit form is filled out', () => {});
//   it('should allow the user to lock-in the potential destination when the options button on the potential destination card is clicked', () => {});
// });

// describe('Group trip - potential accommodation', () => {
//   it('should add a new potential accommodation card when an Airbnb link is submitted', () => {});
//   it('should show an image and Airbnb title on each potential accommodation card', () => {});
//   it('should link to the Airbnb when the potential accommodation card is clicked', () => {});
//   it('should increase the vote count when the heart icon on the potential accommodation card is clicked', () => {});
//   it('should allow the user to delete the potential accommodation card when the options button on the potential destination card is clicked', () => {});
//   it('should allow the user to lock-in the potential accommodation when the options button on the potential destination card is clicked', () => {});
// });

// describe('Group trip - trip summary', () => {
//   it('should show the chosen destination', () => {});
//   it('should show the chosen accommodation', () => {});
//   it('should show the group members', () => {});
// });

// describe('Group trip - navbar', () => {
//   it('should show the trip members when the members icon is clicked', () => {});
//   it('should allow the user to invite other members to the group trip when the share button in the members modal is clicked', () => {});
//   it('should allow the user to navigate between destination, accommodation and trip summary when the settings icon is clicked', () => {});
//   it("should navigate to the user's profile when the user's avatar is clicked", () => {});
// });

describe('Clean up', () => {
  // it('should allow the user to delete the group trip if the options button on the group trip card on their profile is clicked', () => {});
  it('should allow the user to delete their account if the settings button on their profile is clicked', () => {
    login('user');
    cy.visit('http://localhost:3000/profile');
    cy.get(SELECTORS.PROFILE_DELETE_ACCOUNT_BTN).click();
    cy.url().should('include', 'auth');
  });
});

// TEST ERROR HANDLING OF ALL ACTIONS
