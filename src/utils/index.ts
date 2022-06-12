export function getVideoIdByUrl(url: string) {
  if (!url) {
    console.error('undefined youtube video url');
    return false
  }
  const testVideoUrl = new RegExp('youtu\.be\/(.*)')
  const testResult = testVideoUrl.exec(url)
  if (testResult && testResult[1]) {
    return testResult[1]
  }
  const catchVideoId = new RegExp('\\?v\\=(.*)')
  const result = catchVideoId.exec(url)
  return result && result[1]
}