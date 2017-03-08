import cheerify from '../../helpers/cheerify/cheerify';

export default function getDefinition(senseMarkup) {
  const $ = cheerify(senseMarkup);

  const defs = $('.DEF');

  const definition = defs.length < 2
    ? defs.text().trim()
    : defs.toArray().map(
      (def, i) => `${i+1}) ${$(def).text().trim()}`
    ).join('<br>');

  return definition;
}
