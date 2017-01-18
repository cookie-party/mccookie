/* global APP_PROPS */
import Twit from 'twit';

export default class TwitWrapper {
  constructor(){
    this.T = new Twit({
      consumer_key: APP_PROPS.CONSUMER_KEY,
      consumer_secret: APP_PROPS.CONSUMER_SECRET,
      access_token: APP_PROPS.ACCESS_TOKEN,
      access_token_secret: APP_PROPS.ACCESS_TOKEN_SECRET,
      timeout_ms: 60*1000,
    });

  }
}
