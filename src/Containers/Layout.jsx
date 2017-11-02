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

import UserActions from '../Data/Redux/UserRedux'

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

  logout = () => {
    const { navigateTo, logout } = this.props
    logout()
    navigateTo('/login')
  }

  render() {
    const { drawerOpened } = this.state
    const { user: { userId, isTeacher }, navigateTo } = this.props
    return (
      <AppBar position="static">
        <Toolbar>
          <Hidden smUp>
            <IconButton onClick={this.handleToggleDrawer(true)} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography type="title" color="inherit" onClick={() => navigateTo('/')}>
            TecLearn
          </Typography>
          <Hidden xsDown>
            {userId && isTeacher && (
              <div>
                <Button raised color="accent" onClick={() => navigateTo('/')}>Home</Button>
                <Button raised color="accent" onClick={() => navigateTo('/recursos')}>Crear quiz</Button>
              </div>
            )}
            {userId && (
              <Button color="contrast" onClick={this.logout}>Logout</Button>
            )}
          </Hidden>
        </Toolbar>
        <Drawer open={drawerOpened} onRequestClose={this.handleToggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleToggleDrawer(false)}
            onKeyDown={this.handleToggleDrawer(false)}
          >
            {userId && isTeacher && (
              <div>
                <List>
                  <ListItem button onClick={() => navigateTo('/')}>
                    <ListItemText primary="Cursos" />
                  </ListItem>
                  <ListItem button onClick={() => navigateTo('/recursos')}>
                    <ListItemText primary="Quizes" />
                  </ListItem>
                </List>
                <Divider />
              </div>
            )}
            <List>
              {userId && (
                <ListItem button onClick={this.logout}>
                  <ListItemIcon>
                    <PowerIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              )}
            </List>
          </div>
        </Drawer>
      </AppBar>
    )
  }
}

Layout.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  navigateTo: route => dispatch(push(route)),
  logout: () => dispatch(UserActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
