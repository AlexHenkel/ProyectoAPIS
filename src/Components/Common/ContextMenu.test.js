import React from 'react'
import ContextMenu from './ContextMenu'

describe('Context menu component', () => {
  let component

  beforeEach(() => {
    component = (
      <ContextMenu
        handleEdit={jest.fn()}
        handleRemove={jest.fn()}
        value={1}
      />
    )
  })

  it('renders correctly', () => {
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render prop', () => {
    const contextMenu = mount(component)
    expect(contextMenu.props().handleEdit).toBeDefined()
    expect(contextMenu.props().handleRemove).toBeDefined()
    expect(contextMenu.props().value).toBeDefined()
  })

  it('should open on click and closed on requestClose', () => {
    const contextMenu = shallow(component)
    expect(contextMenu).toMatchSnapshot()
    contextMenu.find('withStyles(IconButton)').simulate('click', { currentTarget: <div /> })
    expect(contextMenu.state().open).toEqual(true)
    contextMenu.instance().handleRequestClose()
    expect(contextMenu.state().open).toEqual(false)
  })

  it('should pass value to handleEdit on click in first context menu item', () => {
    const handleEdit = jest.fn()
    const value = 1
    const customComponent = (
      <ContextMenu handleEdit={handleEdit} handleRemove={jest.fn()} value={value} />
    )
    const contextMenu = shallow(customComponent)
    expect(contextMenu).toMatchSnapshot()
    contextMenu.find('withStyles(IconButton)').simulate('click', { currentTarget: <div /> })
    expect(contextMenu).toMatchSnapshot()
    contextMenu.find('withStyles(MenuItem)').first().simulate('click')
    expect(handleEdit).toBeCalledWith(value)
  })

  it('should pass value to handleRemove on click in last context menu item', () => {
    const handleRemove = jest.fn()
    const value = 1
    const customComponent = (
      <ContextMenu handleEdit={jest.fn()} handleRemove={handleRemove} value={value} />
    )
    const contextMenu = shallow(customComponent)
    expect(contextMenu).toMatchSnapshot()
    contextMenu.find('withStyles(IconButton)').simulate('click', { currentTarget: <div /> })
    expect(contextMenu).toMatchSnapshot()
    contextMenu.find('withStyles(MenuItem)').last().simulate('click')
    expect(handleRemove).toBeCalledWith(value)
  })
})
