import styled from 'styled-components'

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`

const Td = styled.td`
  border-bottom: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`

const Th = styled(Td)``

export {
    Table,
    Td,
    Th
}