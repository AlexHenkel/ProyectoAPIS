import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Typography, Button } from 'material-ui'
import { Form } from 'formsy-react-2'

import InputManager from '../../Components/InputElements/InputManager'
import { Container, Background, Header, Body, Link, ToggleItem, ToggleContainer, OptionsContainer } from '../../Components/LoginElements'
import UserActions from '../../Data/Redux/UserRedux'

const loginFields = [
  {
    type: 'textField',
    id: 1,
    name: 'email',
    label: 'Email',
    inputType: 'email',
    required: true,
  },
  {
    type: 'textField',
    id: 2,
    name: 'password',
    label: 'Contraseña',
    inputType: 'password',
    required: true,
  },
]

const registerFields = [
  {
    type: 'textField',
    id: 1,
    name: 'name',
    label: 'Nombre completo',
    required: true,
  },
  {
    type: 'textField',
    id: 2,
    name: 'email',
    label: 'Email',
    inputType: 'email',
    validations: 'isEmail',
    validationErrors: {
      isEmail: 'Ingresa un email válido',
    },
    required: true,
  },
  {
    type: 'textField',
    id: 3,
    name: 'password',
    label: 'Contraseña',
    inputType: 'password',
    validations: 'minLength:6',
    validationErrors: {
      minLength: 'Tu contraseña debe tener al menos 6 caractéres',
    },
    required: true,
  },
]

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: true,
      isTeacher: false,
    }
  }

  componentDidMount() {
    const { userId, goHome } = this.props
    if (userId) {
      goHome()
    }
  }

  componentWillReceiveProps({ userId }) {
    const { goHome } = this.props
    if (userId) {
      goHome()
    }
  }

  submit = (model) => {
    const { login, isTeacher } = this.state
    const { loginRequest, registerRequest } = this.props
    if (login) {
      loginRequest(model, isTeacher)
    } else {
      registerRequest(model, isTeacher)
    }
  }

  toggleLogin = () => this.setState({ login: !this.state.login })

  toggleTeacher = () => this.setState({ isTeacher: !this.state.isTeacher })

  render() {
    const { login, isTeacher } = this.state
    const { loading, error } = this.props
    return (
      <div>
        <Background />
        <Container>
          <Header>
            <Typography type="display1">TecLearn</Typography>
          </Header>
          <Body>
            <ToggleContainer>
              <Typography type="headline">Soy:&nbsp;&nbsp;</Typography>
              <OptionsContainer>
                <ToggleItem active={!isTeacher} onClick={this.toggleTeacher} left>
                  Alumno
                </ToggleItem>
                <ToggleItem active={isTeacher} onClick={this.toggleTeacher} right>
                  Profesor
                </ToggleItem>
              </OptionsContainer>
            </ToggleContainer>
            {error && (
              <Typography type="title" color="primary" gutterBottom>
                Usuario o contraseña incorrecto. Intenta de nuevo
              </Typography>
            )}
            <Form onValidSubmit={this.submit}>
              {login && (
                <div>
                  <Typography type="title" color="accent">Login</Typography>
                  {loginFields.map(({ ...inputProps }, index) => (
                    <InputManager noValue key={index} {...inputProps} />
                  ))}
                  <Button type="submit" raised color="accent" disabled={loading}>Ingresar</Button>
                  <Link onClick={this.toggleLogin}>
                    ¿No tienes cuenta? Registrate ahora
                  </Link>
                </div>
              )}
              {!login && (
                <div>
                  <Typography type="title" color="accent">Registro</Typography>
                  {registerFields.map(({ ...inputProps }, index) => (
                    <InputManager noValue key={index} {...inputProps} />
                  ))}
                  <Button type="submit" raised color="accent" disabled={loading}>Registrarte</Button>
                  <Link onClick={this.toggleLogin}>¿Ya tienes cuenta? Ingresa ahora</Link>
                </div>
              )}
            </Form>
          </Body>
        </Container>
      </div>
    )
  }
}

Login.propTypes = {
  userId: PropTypes.number,
  goHome: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  registerRequest: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}

Login.defaultProps = {
  userId: null,
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  error: !!state.user.error,
  loading: state.user.fetching,
})

const mapDispatchToProps = dispatch => ({
  goHome: () => dispatch(push('/')),
  loginRequest: (data, isTeacher) => dispatch(UserActions.loginRequest(data, isTeacher)),
  registerRequest: (data, isTeacher) => dispatch(UserActions.registerRequest(data, isTeacher)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
