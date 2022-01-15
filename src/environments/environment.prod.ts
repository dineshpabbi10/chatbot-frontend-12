export const env = {
  production: false
};


export interface Environment {
  endPoint: string;
}


export const DEV: Environment = {
  endPoint: 'http://34.131.139.183:8000/'
}

export const environment: Environment = DEV;


