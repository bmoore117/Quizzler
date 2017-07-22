import { QuizzlerPage } from './app.po';

describe('quizzler App', () => {
  let page: QuizzlerPage;

  beforeEach(() => {
    page = new QuizzlerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
