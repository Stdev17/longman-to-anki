import R from 'ramda';
import cheerify from '../../utils/cheerify/cheerify'
import splitBySelector from '../../utils/splitBySelector/splitBySelector';

const removeGlossary = R.replace(/\(=.*\)/g, '');
const fixNewline = R.replace(/\n/g, ' ');
const fixNbsp = R.replace(/&nbsp;/g, ' ');
const recoursiveFixDoubleSpace = string => {
	const fixedString = R.replace(/\s{2}/g, ' ')(string);

	return fixedString === string
		? fixedString
		: recoursiveFixDoubleSpace(fixedString);
};
const fixSeparatedPeriod = R.replace(/ \./g, '.');

const cleanse = R.pipe(
	removeGlossary,
	fixNewline,
	fixNbsp,
	recoursiveFixDoubleSpace,
	fixSeparatedPeriod,
	R.trim
);

const extractExamples = senseOrExampleGroupMarkup => {
	const examples = R.pipe(
		splitBySelector({ selector: '.EXAMPLE', onlyChildren: true }),
		R.map(R.pipe(
			cheerify,
			R.invoker(0, 'text'),
			cleanse
		))
	)(senseOrExampleGroupMarkup);

	return examples;
}

export default extractExamples;
