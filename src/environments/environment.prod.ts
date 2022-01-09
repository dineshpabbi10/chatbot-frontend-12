export const env = {
  production: false
};


export interface Environment {
  endPoint: string;
}


export const DEV: Environment = {
  endPoint: 'http://49.50.97.8:8000/'
}

export const environment: Environment = DEV;


