import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Typography,
  Card as OriginalCard,
  List,
  ListItem,
  ListItemText as OriginalListItemText,
} from 'material-ui'
import { withTheme } from 'material-ui/styles'
import Loading from './Common/Loading'

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

const Top10 = ({ theme, loading, students, userId }) => (
  <div>
    <Title type="display1" gutterBottom>Top 10</Title>
    {loading && <Loading />}
    {!loading && (
      <Card theme={theme}>
        <List>
          {students.map(({ id, name }) => (
            <ListItem key={id}>
              <ListItemText primary={name} theme={theme} active={userId === id ? 'yes' : ''} />
            </ListItem>
          ))}
        </List>
      </Card>
    )}
  </div>
)

Top10.propTypes = {
  theme: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  students: PropTypes.array.isRequired,
  userId: PropTypes.number,
}

Top10.defaultProps = {
  userId: -1,
}

const mapStateToProps = state => ({
  loading: state.overview.getOne.fetching,
  students: state.overview.getOne.result.top10,
})

export default connect(mapStateToProps)(withTheme()(Top10))
