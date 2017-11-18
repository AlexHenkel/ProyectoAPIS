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

const CIframe = styled.iframe`
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

  getEmbedHeight = (url) => {
    const regExp = /height\s*=\s*"([^"]+)"/
    const match = url.match(regExp)

    if (match && match[1]) {
      return match[1]
    }
    return 'error'
  }

  getEmbedSrc = (url) => {
    const regExp = /src\s*=\s*"([^"]+)"/
    const match = url.match(regExp)

    if (match && match[1]) {
      return match[1]
    }
    return 'error'
  }

  getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
      return match[2]
    }
    return 'error'
  }

  getDriveLink = (url) => {
    const regExp = /^.*(drive.google.com\/file\/d\/)([^#&?/]*).*/
    const match = url.match(regExp)
    if (match && match[2].length === 28) {
      return match[2]
    }
    return 'error'
  }

  getHeight = (resourceType, resource) => {
    switch (resourceType) {
      case 'youtube':
      case 'drive-video':
        return '450'
      case 'drive-pdf':
      case 'pdf':
        return '700'
      case 'embed':
        return this.getEmbedHeight(resource)
      default:
        return null
    }
  }

  getLink = (resource, resourceType) => {
    switch (resourceType) {
      case 'youtube':
        return `http://www.youtube.com/embed/${this.getYouTubeId(resource)}`
      case 'drive-video':
      case 'drive-pdf':
        return `http://drive.google.com/file/d/${this.getDriveLink(resource)}/preview`
      case 'pdf':
        return resource
      case 'embed':
        return this.getEmbedSrc(resource)
      default:
        return null
    }
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
                  <Typography type="display2" gutterBottom>Ver recurso - {name}</Typography>
                  <Subtitle type="title" color="primary" gutterBottom>Recuerda que al continuar con las preguntas, ya no podrás volver a ver este recurso</Subtitle>
                  <AlignCenter>
                    <Button raised color="accent" onClick={this.handleMoveForward}>Continuar a las preguntas</Button>
                  </AlignCenter>
                  <CIframe
                    src={this.getLink(resource, resourceType)}
                    width="100%"
                    height={this.getHeight(resourceType, resource)}
                    title="Resource"
                    frameborder="0"
                    allowfullscreen
                  />
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

