import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from 'material-ui'
import Slide from 'material-ui/transitions/Slide'
import { CardText } from '../Common/Utils'
import Exam from '../Exam'

class TeacherExam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  openConfirmation = () => this.setState({ open: true })

  handleRequestClose = () => this.setState({ open: false })

  handleConfirm = () => {
    this.setState({ open: false })
    this.props.onClickButton()
  }

  render() {
    const { data, theme, noActions } = this.props
    const { open } = this.state
    return (
      <div>
        <Exam
          data={data}
          theme={theme}
          noEdit
          actions={!noActions && <Button raised color="accent" onClick={this.openConfirmation}>Presentar Examen</Button>}
        >
          {(data.highestGrade && data.recentGrade) && (
            <div>
              <CardText type="body1" gutterBottom>
                Calificación más alta: <b>{data.highestGrade}</b>
              </CardText>
              <CardText type="body1" gutterBottom>
                Calificación más reciente: <b>{data.recentGrade}</b>
              </CardText>
            </div>
          )}
          {!(data.highestGrade && data.recentGrade) && (
            <CardText>No presentado</CardText>
          )}
        </Exam>
        <Dialog
          open={open}
          transition={<Slide direction="up" />}
          keepMounted
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>¿Estás seguro?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Recuerda que no podrás presentar otro examen hasta finalizar este intento
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancelar
            </Button>
            <Button raised onClick={this.handleConfirm} color="accent">
              Si, presentar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

TeacherExam.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onClickButton: PropTypes.func,
  noActions: PropTypes.bool,
}

TeacherExam.defaultProps = {
  noActions: false,
  onClickButton: () => null,
}

export default TeacherExam
