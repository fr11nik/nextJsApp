import React, {Component} from 'react';
import Router from 'next/router';
import AuthService from './AuthService';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from '../components/Layouts/MainLayout';
import CookieController from '../private/CookieController';
export default function withAuth(AuthComponent, roleName) {
  return class Authenticated extends React.Component {
    static async getInitialProps(ctx) {
      // Ensures material-ui renders the correct css prefixes server-side
      const Auth = new AuthService(ctx.req.cookies);
      var isLoggedIn = await Auth.loggedIn(roleName);
      var isRefresh = false;
      const tokens = {};
      if (Auth.message == 'jwt expired') {
        isRefresh = await Auth.refereshToken();

        if (isRefresh) {
          tokens.token = Auth.state;
          tokens.ssid = Auth.ssid;
          ctx.req.cookies.jwt = Auth.state;
          ctx.req.cookies.ssid = Auth.ssid;
        }
      }
      const userData = await Auth.getUser();
      var userAgent = '';
      if (process.browser) {
        userAgent = navigator.userAgent;
      } else {
        userAgent = ctx.req.headers['user-agent'];
      }
      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps =
        AuthComponent.getInitialProps && (await AuthComponent.getInitialProps(ctx));
      // Return props.
      return {...pageProps, userAgent, tokens, isRefresh, isLoggedIn, userData};
    }
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        isLoggedIn: props.isLoggedIn,
        tokens: props.tokens,
        isRefresh: props.isRefresh,
      };
    }
    componentDidMount() {
      if (this.state.isRefresh) {
        CookieController.createCookie('jwt', this.state.tokens.token);
        CookieController.createCookie('ssid', this.state.tokens.ssid);
        this.state.isLoggedIn = true;
      }
      if (!this.state.isLoggedIn) {
        Router.push('/');
        return;
      }
      this.setState({isLoading: false});
    }

    render() {
      return (
        <div>
          {this.state.isLoading ? (
            <MainLayout>
              <CircularProgress />
            </MainLayout>
          ) : (
            <AuthComponent {...this.props} />
          )}
        </div>
      );
    }
  };
}
