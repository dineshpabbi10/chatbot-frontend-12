export const env = {
  production: false
};


export interface Environment {
  endPoint: string;
  production: boolean;
  firebase: any,
  mediaEndPoint: string,
  socketBase : string
}


export const DEV: Environment = {
  endPoint: 'http://34.131.3.178:8000/',
  mediaEndPoint: 'http://34.131.3.178:8000',
  socketBase:'wss://34.131.3.178:4444/ws/chatroom/',
  production: true,
  firebase: {
    "type": "service_account",
    "project_id": "elasbotchatbot",
    "private_key_id": "73a9ea7b98e7b5aaae1c1b7f3452078af3c7fd2b",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/KlzTl9fUj3c4\nes5q4hSfJsN5fYGRTFfxkZKgzAYlNc/sEC1li+xI4mHNtvMTv57H3J5UqjCwxvit\nILn4ltLW+tI/nT7zuy7S/Ho9FHGZ8iLDhYW3egJNoiZ1OvW4h+IgtxZirmhWZyK7\nQ+nGr8NDe+zr6d3Dtb1QO0aMYij8X4hMA0PhGywR3tPBlYUTitlmOJbZ97sOeBr2\ntWB+edYrxta3sJTVtrr9neeRmtz6A/D3rRqBnBrW+nfJbv3CuhCpvAofjcTpmx8M\nT6+KJeGfGY4tp4ldg61lPPP3+9PLahUC9/VEvfYPQ7GR1DZqMjwOzPc6z//Iuxsm\nuykrfDcVAgMBAAECggEAJIKd/4CK5WswIS6dQV8kAqB36XpttlcvHbFIoKLO0qkE\nKMkPLouKiYIJHW3BX6ZzmCbb634ktgKOaJxtQFvn8Uyuvp0U8p5vqzayzvsaVkVf\nW9nix7/K9FJRh4bG+uMi7k4hfZ/jSAtDICJwofScNcWTopwEMZaCjXIAv5uYydhN\njnifyKjrYoFs/BsFQVSP+CoPDHoFx9vOWORyjjN9NTSQPpLEkA97KPDPYFLiAZ/+\njvIqA6Z9w8dWNOSb2AlFWPSHihQMW7ByZ/4smp3nu6/+JE+9Yf8z0tu5ZFRabaM5\nViadwurVxGod/CnNe2DsyxxJ51dOZSgUYOYSf2USGQKBgQDhiPqFyYpY26oyGU51\n6fuy4rngE5gcbQ7oQ3eV9Jhr4CxyastDarVPldU3rVibsiFbAEKdcHlIUTKCkJE3\ngO269wxBFV/8l0lXxmtR4G7sCfFAycOeebneNxugR7ae3up/BT0h03aIaOOLrwfQ\nMirsECcQOhxwe2KdiH2FZTNGfQKBgQDY/OFwC1S2xiEW1v8NuTYyLA8/go5uLPZa\nPw3sRaj1K2kHzktBj334qbAbV3pyZcV8/W35/XSVVUfiUbmf76Xi4fsOW0Q3FoPS\n7qZd8X4s/e/CbdZ56PIcFKkd5arDkMU/eq5GY/evW+Za15mRBw028yWbqbej7ejF\n1jCadDZeeQKBgCU31JfFZYY6YcC4umDtBvNDRQc8VIrEWIRttctSPOD4cn1DMF3k\nuxzyDeiNO6Ud5TE+Pr/6cplDhQFU2BH/vbtvz17iJx/o21qXzNgLIGLlVSGq6hQ5\n5DlOgMmXbASVpr7lX2w4mEP0gzBm5vQtgzXHiJq97DmHswNqJcSgqbCFAoGADEpG\nepIpujB+r0x+JcjXyP+13WMHrjXdvj7UCw3nA/vxdv+4Q35dJDh4QRQzW0doaCvy\njrZMZCjwaWE3oldwjek+zxFcS8J6tPfPdIK5ItM/QUP3YfBPxkdlTMw1X95TTcUl\nGdePr98ErSCJEi3UEciz2J1ESYSwKoR3PEhYzAECgYEAngTIVSQQtuCKNeg1Srm5\nANettGW90ouL00OmsmTtrkJgH0bZMMBHxanVXo2TnFbG/123pArVglDtG52Rsv45\nAZpHVcqQFzTauSjMwGm6d88AqOXgVQ5N0FDo/Q6G9YANIuRK0UeSGekqiDr39qvJ\nfFQrjO7FUrU7pN7GMo9N098=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-l9a6d@elasbotchatbot.iam.gserviceaccount.com",
    "client_id": "106354671658916523321",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l9a6d%40elasbotchatbot.iam.gserviceaccount.com"
  }  
}

export const environment: Environment = DEV;