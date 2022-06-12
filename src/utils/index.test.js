import { describe, expect, it } from 'vitest'
import { getVideoIdByUrl } from './index'

describe('test utils func', () => {
  it('should getVideoIdByUrl return false while url empty', () => {
    expect(getVideoIdByUrl('')).toEqual(false)
    expect(getVideoIdByUrl()).toEqual(false)
    expect(getVideoIdByUrl(null)).toEqual(false)
    expect(getVideoIdByUrl(undefined)).toEqual(false)
  })

  it('should getVideoIdByUrl return same videoId', () => {
    const urlExampleOne = 'https://www.youtube.com/watch?v=AnSNRzMEmCU'
    const urlExampleTwo = 'https://youtu.be/AnSNRzMEmCU'

    expect(getVideoIdByUrl(urlExampleOne)).toEqual('AnSNRzMEmCU')
    expect(getVideoIdByUrl(urlExampleOne)).toEqual(getVideoIdByUrl(urlExampleTwo))
  })
})