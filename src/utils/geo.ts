import { defaultCenter } from './../App';

export const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    if('geoLocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const {latitude: lat, longitude: lng} = pos.coords;
          resolve({lat, lng})
        },
        () => {
          reject(defaultCenter)
        }
      )
    } else {
      reject(defaultCenter)
    }
  })
}
