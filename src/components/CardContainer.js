import styled from 'styled-components'

const CardContainerComponent = styled.div`
  display: flex;
  ${(({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`)}
  ${(({ alignItems }) => alignItems && `align-items: ${alignItems};`)}
  ${(({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`)}
  height: ${(({ height }) => 'fit-content')};
  max-height: 60vh;
  width: ${(({ width }) => '100%')};
  margin: ${(({ margin }) => margin || '0')};
  padding: ${(({ padding }) => padding || '0.5rem 1rem')};
  background: #fff;
  overflow-y: auto;
  display: block;
`

export default CardContainerComponent