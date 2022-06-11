/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

const style = css`
  color: hotpink;
`

const SomeComponent = ({ children }: any) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
)

const anotherStyle = css({
  textDecoration: 'underline'
})

const AnotherComponent = () => (
  <div css={anotherStyle}>Some text with an underline.</div>
)

export const testComponent = () => {
  return (
    <SomeComponent>
      <AnotherComponent />
    </SomeComponent>
  )
}

export default testComponent