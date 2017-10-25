import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Typography,
  Card as OriginalCard,
  List,
  ListItem,
  ListItemText as OriginalListItemText,
} from 'material-ui'
import { withTheme } from 'material-ui/styles'

const Title = styled(Typography)`
  margin-top: 25px !important;
`

const Card = styled(OriginalCard)`
  background-color: ${({ theme }) => theme.palette.primary[500]} !important;
`

const ListItemText = styled(OriginalListItemText)`
  h3 {
    color: ${({ active }) => !active ? 'rgba(255,255,255,0.75)' : '#fff'} !important;
  }
`

const Top10 = ({ theme, students }) => (
  <div>
    <Title type="display1" gutterBottom>Top 10</Title>
    <Card theme={theme}>
      <List>
        {students.map(({ id, name }, index) => (
          <ListItem key={id}>
            <ListItemText primary={name} theme={theme} active={index === 1 ? 'yes' : ''} />
          </ListItem>
        ))}
      </List>
    </Card>
  </div>
)

Top10.propTypes = {
  theme: PropTypes.object.isRequired,
  students: PropTypes.array,
}

Top10.defaultProps = {
  students: [
    {
      id: 1,
      name: 'Chelsea Otakan',
    },
    {
      id: 2,
      name: 'Eric Hoffman',
    },
    {
      id: 3,
      name: 'Chelsea Otakan',
    },
    {
      id: 4,
      name: 'Eric Hoffman',
    },
  ],
}

export default withTheme()(Top10)
