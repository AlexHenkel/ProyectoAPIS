const getEmbedHeight = (url) => {
  const regExp = /height\s*=\s*"([^"]+)"/
  const match = url.match(regExp)

  if (match && match[1]) {
    return match[1]
  }
  return 'error'
}

const getEmbedSrc = (url) => {
  const regExp = /src\s*=\s*"([^"]+)"/
  const match = url.match(regExp)

  if (match && match[1]) {
    return match[1]
  }
  return 'error'
}

const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  if (match && match[2].length === 11) {
    return match[2]
  }
  return 'error'
}

const getDriveLink = (url) => {
  const regExp = /^.*(drive.google.com\/file\/d\/)([^#&?/]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 28) {
    return match[2]
  }
  return 'error'
}

export const getHeight = (resourceType, resource) => {
  switch (resourceType) {
    case 'youtube':
    case 'drive-video':
      return '450'
    case 'drive-pdf':
    case 'pdf':
      return '700'
    case 'embed':
      return getEmbedHeight(resource)
    default:
      return null
  }
}

export const getLink = (resource, resourceType) => {
  switch (resourceType) {
    case 'youtube':
      return `http://www.youtube.com/embed/${getYouTubeId(resource)}`
    case 'drive-video':
    case 'drive-pdf':
      return `http://drive.google.com/file/d/${getDriveLink(resource)}/preview`
    case 'pdf':
      return resource
    case 'embed':
      return getEmbedSrc(resource)
    default:
      return null
  }
}
