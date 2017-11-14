export default ({ tags: allTags, ...data }) => {
  if (allTags) {
    const new_tags = allTags.filter(item => typeof item === 'string')
    const tags = allTags.filter(item => typeof item === 'number')
    return {
      ...data,
      tags,
      new_tags,
    }
  }
  return { ...data }
}
