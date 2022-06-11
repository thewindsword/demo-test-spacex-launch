/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

let TitleStyle = styled.div`
  display: inline-block;
  color: #888;
  label: title;
  font-size: 2rem;
`

export default () => {
  return (
    <div className='flex justify-center items-center'>
      <TitleStyle>Home</TitleStyle>
    </div>
  )
}