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
    const { user: { userId, isTeacher } } = this.props
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
            {userId && isTeacher && (
              <div>
                <Button raised color="accent" onClick={() => this.props.navigateTo('/')}>Home</Button>
                <Button raised color="accent" onClick={() => this.props.navigateTo('/recursos')}>Crear quiz</Button>
              </div>
            )}
            {!userId && (
              <Button color="contrast" onClick={() => this.props.navigateTo('/login')}>Login</Button>
            )}
            {userId && (
              <Button color="contrast" onClick={() => null}>Logout</Button>
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
            <List>
              {userId && isTeacher && (
                <div>
                  <ListItem button>
                    <ListItemText primary="Cursos" onClick={() => this.props.navigateTo('/')} />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Quizes" onClick={() => this.props.navigateTo('/recursos')} />
                  </ListItem>
                </div>
              )}
            </List>
            <Divider />
            <List>
              {!userId && (
                <ListItem button>
                  <ListItemIcon>
                    <PowerIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
              )}
              {userId && (
                <ListItem button>
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
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  navigateTo: route => dispatch(push(route)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
