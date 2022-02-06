// import axios from 'axios'
import jwtDecode from "jwt-decode";
const key = "ust";
class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem(key, JSON.stringify(token));
  }
  static isExpire(token) {
    try {
      const decode = jwtDecode(token);
      const date = Date.now();
      if (decode.exp < date / 1000) {
        console.log("expired session");
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    try {
      if (localStorage.getItem(key) !== null) {
        if (this.isExpire(localStorage.getItem(key))) {
          this.deauthenticateUser(key);
          return false;
        }
        //   axios.defaults.headers.common[
        //       'Authorization'
        //   ] = `Bearer ${localStorage.getItem(key)}`
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    // delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem(key);
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error(error.message);
      return {};
    }
  }

  static getTokenInfo() {
    const {token} = this.getToken();
    try {
      const decoded = jwtDecode(token);      
      return decoded;
    } catch (error) {
      return {};
    }
  }
}

export default Auth;
