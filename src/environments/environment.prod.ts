export const env = {
  production: false
};


export interface Environment {
  endPoint: string;
  production: boolean;
  firebase: any,
  mediaEndPoint: string
}


export const DEV: Environment = {
  endPoint: 'http://34.131.139.183:8000/',
  mediaEndPoint: 'http://34.131.139.183:8000',
  production: true,
  firebase: {
    apiKey: "AIzaSyB0jFiFcMCEZJiRxfoabVHRo_6yCVAHfWo",
    authDomain: "foodhunt-20680.firebaseapp.com",
    projectId: "foodhunt-20680",
    storageBucket: "foodhunt-20680.appspot.com",
    messagingSenderId: "744761034195",
    appId: "1:744761034195:web:36d35935e5702afc9f1b26",
    measurementId: "G-ZDMMWW0756"
  }
}

export const environment: Environment = DEV;


