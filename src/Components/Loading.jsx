import React from 'react'
import styled from 'styled-components'
import { LinearProgress } from 'material-ui/Progress'

const Container = styled.div`
  width: 100%;
  margin-top: 30px;
`

export default () => (
  <Container>
    <LinearProgress color="accent" />
  </Container>
)
