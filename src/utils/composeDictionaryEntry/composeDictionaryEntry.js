import cheerio from 'cheerio';

export default function composeDictionaryEntry(body) {
  let $ = cheerio.load(body);

  function getExample(exampleNumber) {
    return $('.EXAMPLE')
      .eq(exampleNumber)
      .text()
      .trim();
  }

  function getForm(exampleNumber) {
    const lexUnit = $('.EXAMPLE')
      .eq(exampleNumber)
      .parent()
      .prevAll('h2')
      .children('.LEXUNIT')
      .text()
      .trim()
      + $('.EXAMPLE')
      .eq(exampleNumber)
      .parent()
      .prevAll('strong')
      .text()
      .trim();

    const phrasalVerb = $('.EXAMPLE')
      .eq(exampleNumber)
      .parents('.PhrVbEntry')
      .find('.phrvbhwdsel')
      .text()
      .trim();

    if (lexUnit.length !== 0 && phrasalVerb.length !== 0) {
      return lexUnit + '<br>' + phrasalVerb;
    } else
      return lexUnit + phrasalVerb;
  }

  function getTerm() {
    return $('.HWD')
      .text()
      .trim();
  }

  function getGeography(exampleNumber) {
    return $('.EXAMPLE')
      .eq(exampleNumber)
      .parent()
      .prevAll('.GEO')
      .text()
      .trim();
  }

  function getUsage(exampleNumber) {
    return $('.EXAMPLE')
      .eq(exampleNumber)
      .parent()
      .prevAll('.REGISTERLAB')
      .text()
      .trim();
  }

  function getDefinition(exampleNumber) {
    return $('.EXAMPLE')
      .eq(exampleNumber)
      .parent()
      .prevAll('ftdef')
      .children('.DEF')
      .text()
      .trim()
      + $('.EXAMPLE')
      .eq(exampleNumber)
      .parent()
      .parent()
      .prevAll('ftdef')
      .children('.DEF')
      .text()
      .trim();
  }

  function composeCard(exampleNumber) {
    /*
      a typical card looks like this:


      FRONT SIDE

      She seemed rather struck on Vincent                    <-- example

      be struck on somebody/something                        <-- form

      struck                                                 <-- term


      BACK SIDE

      British English informal                               <-- geography and usage

      to think that someone or something is very good        <-- definition

    */

    const example = `<span class="example">${getExample(exampleNumber)}</span><br><br>`;

    const form = getForm(exampleNumber).length
      ? `<span class="form">${getForm(exampleNumber)}</span><br><br>`
      : ``;

    const term = `<span class="term">${getTerm()}</span>`;

    const geography = getGeography(exampleNumber).length
      ? `<span class="term">${getGeography(exampleNumber)}</span> `
      : ``;

    const usage = getUsage(exampleNumber).length
      ? `<span class="usage">${getUsage(exampleNumber)}</span><br>`
      : ``;

    const definition = `<span class="definition">${getDefinition(exampleNumber)}</span>`;


    return (example + form + term + ';' + geography + usage + definition + '\n');
  }

  function composeDictionaryEntry() {
    let dictionaryEntry = '';

    for (let i = 0; i < $('.EXAMPLE').length; i++) {
      dictionaryEntry += composeCard(i);
    };

    return dictionaryEntry;
  }

  return composeDictionaryEntry();
}
