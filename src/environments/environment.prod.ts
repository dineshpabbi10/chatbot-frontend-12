export const env = {
  production: false
};


export interface Environment {
  endPoint: string;
  production: boolean;
  firebase: any,
  mediaEndPoint: string,
  socketBase: string,
  scriptUrl: string
}


export const DEV: Environment = {
  scriptUrl: "https://216.48.178.203",
  endPoint: 'https://216.48.178.203/',
  mediaEndPoint: 'https://216.48.178.203',
  socketBase: 'wss://216.48.178.203:4444/ws/chatroom/',
  production: true,
  firebase: {
    apiKey: "AIzaSyD6_cEhjYmGtA5XoW3PhPQaoFqUEEZw99Q",
    authDomain: "elasbotchatbot.firebaseapp.com",
    projectId: "elasbotchatbot",
    storageBucket: "elasbotchatbot.appspot.com",
    messagingSenderId: "742241989692",
    appId: "1:742241989692:web:3cdc0f927256be516b3f39",
    measurementId: "G-C8LYF79RSR"
  }
}

export const environment: Environment = DEV;