import Document, {Html, Head, Main, NextScript} from 'next/document';
import useScript from '../static/useScript';
import loadJs from 'loadjs';
class MyDocument extends Document {
  // componentDidMount() {
  //   loadJs(['/static/windowOn.js'], 'bebe');
  //   loadJs.ready('bebe', () => alert('bruh'));
  // }
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <script type='text/javascript' src='/static/windowOn.js' />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
