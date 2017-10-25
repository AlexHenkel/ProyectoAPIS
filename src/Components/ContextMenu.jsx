import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import EditIcon from 'material-ui-icons/Edit'
import RemoveIcon from 'material-ui-icons/Delete'
import { ListItemIcon } from 'material-ui'

export const ContextContainer = styled.div`
  position: absolute;
  right: 0;
  top: 7px;
`

class ContextMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      open: false,
    }
  }

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleClickItem = cb => () => {
    const { value } = this.props
    cb(value)
    this.handleRequestClose()
  }

  render() {
    const { anchorEl, open } = this.state
    const { handleEdit, handleRemove } = this.props
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={this.state.open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleClickItem(handleEdit)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            Editar
          </MenuItem>
          <MenuItem onClick={this.handleClickItem(handleRemove)}>
            <ListItemIcon>
              <RemoveIcon />
            </ListItemIcon>
            Eliminar
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

ContextMenu.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
}

export default ContextMenu
