import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} lang='fr'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <link
          type='application/opensearchdescription+xml'
          rel='search'
          href='opensearch.xml'
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id='___gatsby'
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <form name='contact' netlify-honeypot='bot-field' hidden>
          <input type='text' name='nom' />
          <input type='email' name='email' />
          <input type='text' name='objet' />
          <textarea name='message'></textarea>
        </form>
        <form name='bug' netlify-honeypot='bot-field' hidden>
          <input type='text' name='nom' />
          <input type='email' name='email' />
          <input type='text' name='objet' />
          <textarea name='message'></textarea>
        </form>
        <script
          src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.contentWindow.js'
          integrity='sha512-5+HBQlT1izP2UxL213/uqaO9tIpPso52TedvIsOevDs6w/HNt0/KNlkYLgi8Ona7lPCBjMEWybiR/qqs2MgyEg=='
          crossOrigin='anonymous'
        ></script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
