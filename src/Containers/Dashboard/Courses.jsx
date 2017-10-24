import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Typography,
  Card as OriginalCard,
  CardContent,
  CardActions,
  Button,
} from 'material-ui'
import { withTheme } from 'material-ui/styles'

const Card = styled(OriginalCard)`
  margin: 15px 0;
  ${({ active, theme }) => !active ? '' : `background-color: ${theme.palette.primary[500]} !important;`}
`

const CardText = styled(Typography)`
  ${({ active }) => !active ? '' : 'color: rgba(255,255,255,0.75) !important;'}
`

const DisabledButton = styled(Button)`
  color: rgba(255,255,255,0.75) !important;
`

const Courses = ({
  theme,
  groups,
  selectActiveGroup,
  activeGroup,
}) => (
  <div>
    <Typography type="display1" gutterBottom>Mis cursos</Typography>
    {groups.map(({ id, name, activeQuizes }) => (
      <Card key={id} active={activeGroup === id ? 'yes' : ''} theme={theme}>
        <CardContent>
          <CardText type="headline" component="h2" gutterBottom active={activeGroup === id ? 'yes' : ''}>
            {name}
          </CardText>
          <CardText type="body1" gutterBottom active={activeGroup === id ? 'yes' : ''}>
            Quizes activos: <b>{activeQuizes}</b>
          </CardText>
        </CardContent>
        <CardActions>
          {activeGroup === id && (
            <DisabledButton disabled>Seleccionado</DisabledButton>
          )}
          {activeGroup !== id && (
            <Button dense color="accent" onClick={selectActiveGroup(id)}>Ver Más</Button>
          )}
        </CardActions>
      </Card>
    ))}
  </div>
)

Courses.propTypes = {
  theme: PropTypes.object.isRequired,
  groups: PropTypes.array,
  activeGroup: PropTypes.number,
  selectActiveGroup: PropTypes.func,
}

Courses.defaultProps = {
  groups: [
    {
      id: 1,
      name: 'Física 1 - ENE/DIC 17',
      activeQuizes: 1,
    },
    {
      id: 2,
      name: 'Física 2 - ENE/DIC 17',
      activeQuizes: 1,
    },
  ],
  activeGroup: 1,
  selectActiveGroup: id => console.log('change group', id),
}

export default withTheme()(Courses)
