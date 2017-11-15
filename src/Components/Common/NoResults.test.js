import React from 'react'
import NoResults from './NoResults'

describe('NoResults component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NoResults />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
