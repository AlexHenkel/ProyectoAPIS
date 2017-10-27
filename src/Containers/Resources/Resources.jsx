import React, { Component } from 'react'
import { Grid } from 'material-ui'
import Quizes from './Quizes'
import Questions from './Questions'

export default class Dashboard extends Component {
  componentDidMount() {
    console.log('load data')
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <Questions />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Quizes />
        </Grid>
      </Grid>
    )
  }
}
