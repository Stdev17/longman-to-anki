import ankifySenseData from './ankifySenseData';

const ankifyExampleData = ({ headword, definition, situation }) => exampleData => `${exampleData} ${situation} ${definition} ${headword}`;
const ankifyNoExampleData = headword => ({ definition, situation }) => `${situation} ${definition} ${headword}`;
const headword = 'headword';
const senseData = {
  definition: 'definition',
  situation: 'situation',
  examples: [
    'example1',
    'example2'
  ]
};

const ankiCards =
  'example1 situation definition headword' +
  '\n' +
  'example2 situation definition headword';

describe('ankifySenseData', () => {
  it('composes correct ankiCards ', () => {
    expect(
      ankifySenseData({ankifyExampleData, ankifyNoExampleData, headword}, senseData)
    ).toBe(ankiCards);
  });
});