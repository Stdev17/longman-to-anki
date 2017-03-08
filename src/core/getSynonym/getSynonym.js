import cheerify from '../../helpers/cheerify/cheerify';

const getSynonym = senseMarkup => {
    const $ = cheerify(senseMarkup);

    return $('.SYN').contents().not('.synopp').text().trim();
}

export default getSynonym;
