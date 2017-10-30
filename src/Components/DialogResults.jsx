import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog'
import OriginalAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'

const AppBar = styled(OriginalAppBar)`
  position: relative !important;
`

const BarTitle = styled(Typography)`
  flex: 1;
`

const Container = styled.div`
  margin-top: 40px;
`

class DialogResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleClickOpen = () => {
    this.props.onOpen()
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { title, buttonText, children } = this.props
    const { open } = this.state
    return (
      <div>
        <Button raised color="primary" onClick={this.handleClickOpen}>{buttonText}</Button>
        <Dialog
          fullScreen
          open={open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}
        >
          <AppBar>
            <Toolbar>
              <IconButton color="contrast" onClick={this.handleRequestClose}>
                <CloseIcon />
              </IconButton>
              <BarTitle type="title" color="inherit">
                {title}
              </BarTitle>
            </Toolbar>
          </AppBar>
          <Container>
            {children}
          </Container>
        </Dialog>
      </div>
    )
  }
}

DialogResults.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onOpen: PropTypes.func.isRequired,
}

export default DialogResults
