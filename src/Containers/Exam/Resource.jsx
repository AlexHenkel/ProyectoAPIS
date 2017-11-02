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
    const { match: { params: { id } }, user: { userId, isTeacher },
      goLogin, getResource, getState } = this.props

    if (!userId || isTeacher) {
      goLogin()
    }
    getResource(id)
    getState(userId)
  }

  handleMoveForward = () => {
    const { goToExam, setResourceOnState, match: { params: { id } }, user: { userId } } = this.props
    setResourceOnState(id, userId)
    goToExam(id)
  }

  render() {
    const { loading, studentState: { state, examId },
      resource: { resource, resourceType, name }, match: { params: { id } } } = this.props
    const isInvalid = (state === 'onResource' && examId !== Number(id)) || state === 'onExam'
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={8}>
          {loading && <Loading />}
          {!loading && (
            <div>
              {isInvalid && (
                <Typography type="display2">Lo sentimos. Tienes abierto otro examen. Es necesario que termines el examen actual para poder responder otro.</Typography>
              )}
              {!isInvalid && (
                <div>
                  <Typography type="display2" gutterBottom>Ver {resourceType} - {name}</Typography>
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
  user: PropTypes.object.isRequired,
  goLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  loading: state.studentState.getOne.fetching || state.resource.getOne.fetching,
  studentState: state.studentState.getOne.result,
  resource: state.resource.getOne.result,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  getResource: id => dispatch(ResourceActions.getOneRequest(id)),
  getState: userId => dispatch(StudentStateActions.getOneRequest(userId)),
  goToExam: id => dispatch(push(`/examen/${id}`)),
  setResourceOnState: (id, userId) => dispatch(StudentStateActions.updateRequest(userId, {
    state: 'onExam',
    examId: id,
  })),
  goLogin: () => dispatch(push('/login')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Resource)

