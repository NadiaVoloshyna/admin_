import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { 
  faTrashAlt, 
  faUserTie, 
  faCalendarAlt,
  faEllipsisV,
  faHome,
  faPhotoVideo,
  faUsers,
  faUserShield,
  faIdCard,
  faFolder,
  faImage,
  faCompactDisc,
  faFileAudio
} from '@fortawesome/free-solid-svg-icons';
import initializeStore from '../client/store';

import 'assets/styles/styles.scss';

library.add(
  faTrashAlt, 
  faUserTie, 
  faCalendarAlt, 
  faEllipsisV, 
  faHome, 
  faPhotoVideo, 
  faUsers,
  faUserShield,
  faIdCard,
  faFolder,
  faImage,
  faCompactDisc,
  faFileAudio
);

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <div className="bg-light">
          <Component {...pageProps} />
        </div>
      </Provider>
    )
  }
}

export default withRedux(initializeStore)(withReduxSaga(MyApp))