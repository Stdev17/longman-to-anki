import cheerify from '../../helpers/cheerify/cheerify';

export default function getSituation(senseMarkup) {
  const $ = cheerify(senseMarkup);

  return $('.REGISTERLAB').text().trim();
}
