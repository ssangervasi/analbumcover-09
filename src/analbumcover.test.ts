import { rephrase } from './analbumcover'
import { initNodehun, NodehunSpelling, Spelling } from './spelling'

describe('rephrase', () => {
  let spelling: Spelling

  beforeEach(async () => {
    const nodehun = await initNodehun()
    spelling = new NodehunSpelling(nodehun)
  })

  it('Does not allow a minWordLength less than 1', () => {
    expect(() => rephrase('A phrase', spelling, 0)).toThrow(new Error('minWordLength must be at least 1'))
    expect(() => rephrase('A phrase', spelling, -1)).toThrow(new Error('minWordLength must be at least 1'))
  })

  describe('minWordLength of 1', () => {
    it('Always returns the phrase downcase and stripped', () => {
      const phrase = 'An album cover'
      expect(rephrase(phrase, spelling, 1)).toEqual('analbumcover')
    })

    it('Returns the original phrase regardless of incorrect spelling', () => {
      const phrase = 'Qwe rtyu iop'
      expect(rephrase(phrase, spelling, 1)).toEqual('qwertyuiop')
    })
  })

  describe('minWordLength of 2', () => {
    describe('Phrase can be split into successive words of length 2 or more', () => {
      it('Returns downcase and stripped phrase', () => {
        const phrase = 'An album cover se' // An alb um co verse
        expect(rephrase(phrase, spelling, 2)).toEqual('ohhimyed')
      })
    })

    describe('Phrase cannot be split into successive words of length 2 or more', () => {
      it('Returns null', () => {
        const phrase = 'This one is quite complex' // this on ~eisquitecomplex~
        expect(rephrase(phrase, spelling, 2)).toEqual(null)
      })
    })
  })

  describe('minWordLength of 3', () => {
    describe('Phrase can be split into successive words of length 3 or more', () => {
      it('Returns downcase and stripped phrase', () => {
        const phrase = 'Poor attack' // Poo rat tack
        expect(rephrase(phrase, spelling, 3)).toEqual('poorattack')
      })
    })

    describe('Phrase cannot be split into successive words of length 3 or more', () => {
      it('Returns null', () => {
        const phrase = 'An album cover' // Anal bum cove ~r~
        expect(rephrase(phrase, spelling, 3)).toEqual(null)
      })
    })
  })

  // And so on
})
