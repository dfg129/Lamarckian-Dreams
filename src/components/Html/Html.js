import React, {Component, PropTypes} from 'react';


class Html extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    css: PropTypes.string,
    body: PropTypes.string.required,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    return (
      <html className="no-js" lang="">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>{this.props.title}</title>
          <meta name="description", content="width=device-width, initial-scale-1" />
          <style id="css" dangerouslySetInnerHTML={{__html: this.props.css}} />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML="{{__html: this.props.body}}" />
          <script src="/app.js"></script>
        </body>
      </html>
    )
  }
}

export default Html;
