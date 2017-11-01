import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography as OriginalTypography,
  Button as OriginalButton,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import PowerIcon from 'material-ui-icons/PowerSettingsNew'

const Typography = styled(OriginalTypography)`
  flex: 1;
`

const Button = styled(OriginalButton)`
  margin-left: 5px;
  margin-right: 5px;
`

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpened: false,
    }
  }

  toggleDrawer = state => this.setState({ drawerOpened: state })

  handleToggleDrawer = state => () => this.toggleDrawer(state)

  render() {
    const { drawerOpened } = this.state
    return (
      <AppBar position="static">
        <Toolbar>
          <Hidden smUp>
            <IconButton onClick={this.handleToggleDrawer(true)} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography type="title" color="inherit" onClick={() => this.props.navigateTo('/')}>
            TecLearn
          </Typography>
          <Hidden xsDown>
            <Button raised color="accent" onClick={() => this.props.navigateTo('/')}>Cursos</Button>
            <Button raised color="accent" onClick={() => this.props.navigateTo('/recursos')}>Quizes</Button>
            <Button raised color="accent" onClick={() => this.props.navigateTo('/estudiante')}>Estudiante</Button>
            <Button color="contrast">Login</Button>
          </Hidden>
        </Toolbar>
        <Drawer open={drawerOpened} onRequestClose={this.handleToggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleToggleDrawer(false)}
            onKeyDown={this.handleToggleDrawer(false)}
          >
            <List>
              <ListItem button>
                <ListItemText primary="Cursos" onClick={() => this.props.navigateTo('/')} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Quizes" onClick={() => this.props.navigateTo('/recursos')} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Estudiante" onClick={() => this.props.navigateTo('/estudiante')} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <PowerIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </AppBar>
    )
  }
}

Layout.propTypes = {
  navigateTo: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
  // TODO: Get isTeacher from state to show/hide nav buttons
})

const mapDispatchToProps = dispatch => ({
  navigateTo: route => dispatch(push(route)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
