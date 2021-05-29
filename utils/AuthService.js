export default class AuthService {
  serverUrl = 'https://powerful-fortress-91385.herokuapp.com';
  message;
  ssid;
  constructor(token) {
    this.state = token.jwt;
    this.ssid = token.ssid;
  }
  async loggedIn(roleName) {
    const link = this.serverUrl + '/' + roleName + 'panel';
    const response = await fetch(link, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': this.state,
      },
    });
    const res = await response.json();
    console.log(res);
    if (response.status != 200) {
      this.message = res.message;
      return false;
    } else return true;
  }
  async refereshToken() {
    const response = await fetch(this.serverUrl + '/api/user/refresh-tokens', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: this.ssid,
      }),
    });
    if (response.ok) {
      const res = await response.json();
      this.state = res.accessToken;
      this.ssid = res.refreshToken;
      return true;
    } else {
      this.ssid = '';
      return false;
    }
  }
  async getUser() {
    const response = await fetch(this.serverUrl + '/node-cm/user', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': this.state,
      },
    });
    return await response.json();
  }
}
