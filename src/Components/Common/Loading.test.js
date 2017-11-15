import React from 'react'
import Loading from './Loading'

describe('Loading component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Loading />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
