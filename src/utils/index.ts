export function getVideoIdByUrl(url: string) {
  if (!url) {
    throw Error('undefined youtube video url');
  }
  const catchVideoId = new RegExp('\\?v\\=(.*)')
  const result = catchVideoId.exec(url)
  return result && result[1]
}