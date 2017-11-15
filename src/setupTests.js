import Enzyme, { shallow, render, mount } from 'enzyme' //eslint-disable-line
import Adapter from 'enzyme-adapter-react-16' // eslint-disable-line
import renderer from 'react-test-renderer' // eslint-disable-line
import { createShallow } from 'material-ui/test-utils'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })
// Make Enzyme functions available in all test files without importing
global.shallow = createShallow()
global.render = render
global.mount = mount
global.renderer = renderer
