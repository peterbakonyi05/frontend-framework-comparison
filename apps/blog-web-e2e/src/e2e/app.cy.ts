// at least the happy path of the main functionality should be covered in a real application
describe('blog-web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display 3 posts', () => {
    cy.contains('Recents posts');
    cy.get('article').should('have.length', 3);
  });

  it('clicking on a post should redirect to the post detail page', () => {
    cy.get('article')
      .eq(0)
      .find('a') // Find the link elements within the first article
      .first()
      .click();

      cy.url().should('contain', '/posts/1')
  });
});
