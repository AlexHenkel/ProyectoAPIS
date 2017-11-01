import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Typography, Grid, Button } from 'material-ui'
import { AlignCenter } from '../../Components/Common/Utils'
import Loading from '../../Components/Common/Loading'

import StudentStateActions from '../../Data/Redux/StudentStateRedux'
import ResourceActions from '../../Data/Redux/ResourceRedux'

const CObject = styled.object`
  margin: 30px 0;
`

const Subtitle = styled(Typography)`
  margin-bottom: 30px !important;
`

class Resource extends Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props
    this.props.getResource(id)
    this.props.getState()
  }

  handleMoveForward = () => {
    const { goToExam, setResourceOnState, match: { params: { id } } } = this.props
    setResourceOnState(id)
    goToExam(id)
  }

  render() {
    const { loading, studentState: { state, examId },
      resource: { resource, resourceType }, match: { params: { id } } } = this.props
    const isInvalid = (state === 'onResource' && examId === id) || state === 'inExam'
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={8}>
          {loading && <Loading />}
          {!loading && (
            <div>
              {isInvalid === 'onTest' && (
                <Typography type="display2">Lo sentimos. Tienes abierto otro examen. Es necesario que termines el examen actual para poder responder otro.</Typography>
              )}
              {!isInvalid && (
                <div>
                  <Typography type="display2" gutterBottom>Ver {resourceType}</Typography>
                  <Subtitle type="title" color="primary" gutterBottom>Recuerda que al continuar con las preguntas, ya no podrás volver a ver este recurso</Subtitle>
                  <AlignCenter>
                    <Button raised color="accent" onClick={this.handleMoveForward}>Continuar a las preguntas</Button>
                  </AlignCenter>
                  <CObject data={resource} width="100%" height={resourceType === 'video' ? '450' : '700'} title="Resource" />
                  <AlignCenter>
                    <Button raised color="accent" onClick={this.handleMoveForward}>Continuar a las preguntas</Button>
                  </AlignCenter>
                </div>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    )
  }
}

Resource.propTypes = {
  loading: PropTypes.bool.isRequired,
  studentState: PropTypes.object.isRequired,
  getResource: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  goToExam: PropTypes.func.isRequired,
  setResourceOnState: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  loading: state.studentState.getOne.fetching || state.resource.getOne.fetching,
  studentState: state.studentState.getOne.result,
  resource: state.resource.getOne.result,
})

const mapDispatchToProps = dispatch => ({
  getResource: id => dispatch(ResourceActions.getOneRequest(id)),
  getState: () => dispatch(StudentStateActions.getOneRequest(1)),
  goToExam: id => dispatch(push(`/examen/${id}`)),
  setResourceOnState: id => dispatch(StudentStateActions.updateRequest(1, {
    state: 'onExam',
    examId: id,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Resource)

