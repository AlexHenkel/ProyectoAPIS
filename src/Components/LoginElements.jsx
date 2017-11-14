import styled from 'styled-components'
import bgImage from '../Assets/bg3.jpg'

export const Background = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${bgImage});
  top: 0;
  left: 0;
`

export const Container = styled.div`
  width: calc(100% - 20px);
  max-width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%)translateY(-50%);
  text-align: center
`

export const Header = styled.div`
  background-color: #512DA8;
  padding: 30px 0;
  
  h1 {
    color: #fff !important;
  }
`

export const Body = styled.div`
  background-color: #fff;
  padding: 20px;
`

export const Link = styled.div`
  color: #009688;
  cursor: pointer;
  margin-top: 25px;

  &:hover {
    color: #014e47;
  }
`

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`

export const OptionsContainer = styled.div`
  display: flex;
`

export const ToggleItem = styled.div`
  cursor: ${({ active }) => active ? 'inherit' : 'pointer'};
  background-color: ${({ active }) => active ? '#512DA8' : '#D1C4E9'};
  padding: 20px;
  border-top-left-radius: ${({ left }) => left ? '11px' : '0'};
  border-bottom-left-radius: ${({ left }) => left ? '11px' : '0'};
  border-top-right-radius: ${({ right }) => right ? '11px' : '0'};
  border-bottom-right-radius: ${({ right }) => right ? '11px' : '0'};
  color: ${({ active }) => active ? 'white' : 'black'};
  font-weight: ${({ active }) => active ? '700' : '300'};
`
