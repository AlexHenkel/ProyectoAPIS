import React from 'react'
import { Groups } from './Groups'
import Loading from '../../Components/Common/Loading'
import Group from '../../Components/Group'
import NoResults from '../../Components/Common/NoResults'

describe('Groups component', () => {
  const groupsRender = ({
    loading = false,
    groups = [],
    selectActiveGroup = jest.fn(),
    userId = 1,
  }) => shallow(<Groups
    loading={loading}
    groups={groups}
    selectActiveGroup={selectActiveGroup}
    userId={userId}
  />)

  it('renders correctly', () => {
    const tree = groupsRender({})
    expect(tree).toMatchSnapshot()
  })

  it('loading bar shown on loading', () => {
    const tree = groupsRender({ loading: true })
    expect(tree.find(Loading).length).toBe(1)
  })

  it('loading bar hide on not loading', () => {
    const tree = groupsRender({ loading: false })
    expect(tree.find(Loading).length).toBe(0)
  })

  it('groups not showing when loading', () => {
    const tree = groupsRender({ loading: true, groups: [1, 2, 3] })
    expect(tree.find(Loading).length).toBe(1)
    expect(tree.find(Group).length).toBe(0)
  })

  it('group results shown correctly', () => {
    const tree = groupsRender({ loading: false, groups: [1, 2, 3] })
    expect(tree.find(Loading).length).toBe(0)
    expect(tree.find(Group).length).toBe(3)
  })

  it('not results message on empty results', () => {
    const tree = groupsRender({ loading: false, groups: [] })
    expect(tree.find(Loading).length).toBe(0)
    expect(tree.find(Group).length).toBe(0)
    expect(tree.find(NoResults).length).toBe(1)
  })
})
