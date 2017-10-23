import React, { Component } from 'react'
import styled from 'styled-components'
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

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpened: false,
    }
  }

  toggleDrawer = state => this.setState({ drawerOpened: state })

  handleToggleDrawer = (state) => () => this.toggleDrawer(state)

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Hidden smUp>
            <IconButton onClick={this.handleToggleDrawer(true)} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography type="title" color="inherit">
            TecLearn
          </Typography>
          <Hidden xsDown>
            <Button raised color="accent">Cursos</Button>
            <Button raised color="accent">Quizes</Button>
          </Hidden>
          <Button color="contrast">Login</Button>
        </Toolbar>
        <Drawer open={this.state.drawerOpened} onRequestClose={this.handleToggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleToggleDrawer(false)}
            onKeyDown={this.handleToggleDrawer(false)}
          >
            <List>
              <ListItem button>
                <ListItemText primary="Cursos" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Quizes" />
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
