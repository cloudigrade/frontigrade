import bgImages from '../patternflyConstants';

describe('PatternflyConstants', () => {
  it('Should have specific bg images', () => {
    expect(bgImages).toMatchSnapshot('background image strings');
  });
});
