import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Typography,
  Card as OriginalCard,
  CardContent,
  CardActions as OriginalCardActions,
  Button,
  Grid,
  LinearProgress,
} from 'material-ui'
import moment from 'moment'
import { withTheme } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter } from '../../Components/Utils'

const Card = styled(OriginalCard)`
  margin: 15px 0;
  ${({ active, theme }) => !active ? '' : `background-color: ${theme.palette.primary[500]} !important;`}
`

const CardText = styled(Typography)`
  ${({ active }) => !active ? '' : 'color: rgba(255,255,255,0.75) !important;'}
`

const Date = styled(Typography)`
  line-height: 1 !important;
`

const CardActions = styled(OriginalCardActions)`
  justify-content: flex-end;
`

const LimitText = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[500]} !important;
`

const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']

const Exams = ({
  theme,
  exams,
  students,
}) => (
  <div>
    <Typography type="display1" gutterBottom>Mis examenes</Typography>
    {exams.map(({
      id,
      name,
      expiresAt,
      completed,
    }) => (
      <Card key={id}>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={3}>
              <AlignCenter>
                <Date type="display3">{moment(expiresAt).date()}</Date>
              </AlignCenter>
              <AlignCenter>
                <Typography type="subheading">{months[moment(expiresAt).month()]}</Typography>
              </AlignCenter>
              <AlignCenter>
                <LimitText type="body2" theme={theme}>Fecha límite</LimitText>
              </AlignCenter>
            </Grid>
            <Grid item xs={12} sm={9}>
              <CardText type="display1" component="h2" gutterBottom>
                {name}
              </CardText>
              <CardText type="body1" gutterBottom>
                Examenes presentados: <b>{completed} / {students.length}</b>
              </CardText>
              <LinearProgress
                color="accent"
                mode="determinate"
                value={(completed / students.length) * 100}
                valueBuffer={(completed / students.length) * 100}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button dense color="accent" onClick={() => console.log('ver mas')}>Editar</Button>
          <Button raised color="primary" onClick={() => console.log('ver mas')}>Ver Resultados</Button>
        </CardActions>
      </Card>
    ))}
    <AlignCenter>
      <Button color="accent">
        <AddIcon />
        Agregar grupo
      </Button>
    </AlignCenter>
  </div>
)

Exams.propTypes = {
  theme: PropTypes.object.isRequired,
  exams: PropTypes.array,
  students: PropTypes.array,
}

Exams.defaultProps = {
  exams: [
    {
      id: 1,
      name: 'Leyes de Newton',
      expiresAt: 1508811671643,
      completed: 10,
    },
    {
      id: 2,
      name: 'Electricidad',
      expiresAt: 1508811671643,
      completed: 3,
    },
  ],
  students: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
}

export default withTheme()(Exams)
