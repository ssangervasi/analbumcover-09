import { Spelling } from './spelling'

const validate = (
	phrase: string,
	spelling: Spelling,
	minWordLength: number = 1
): boolean => {
	if (phrase == '') {
		return true
	}
	let len = minWordLength
	while (len <= phrase.length) {
		if (spelling.isCorrect(phrase.substr(0, len))) {
			return validate(phrase.substr(len), spelling, minWordLength)
		}
		len += 1
	}
	return false
}

const rephrase = (
	phrase: string,
	spelling: Spelling,
	minWordLength: number = 1
): string | null => {
	if (minWordLength < 1) {
		throw new Error('minWordLength must be at least 1')
	}
	const normalizedPhrase = phrase.toLowerCase( ).replace(/[^a-z]/g, '')
	if (normalizedPhrase == '') {
		return null
	}
	if (validate(normalizedPhrase, spelling, minWordLength)) {
		return normalizedPhrase
	}
	return null
}

export {
	rephrase
}
