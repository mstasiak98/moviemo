// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  theMovieDbApiUrl: 'https://api.themoviedb.org/3',
  theMovieDbApiKey: 'e07998788eb1838e0ced37f04c3b6cd4',
  theMovieDbImgUrl: 'https://image.tmdb.org/t/p/w500',
  theMovieDbImgUrlFullSize: 'https://image.tmdb.org/t/p/original',
  firebaseConfig: {
    apiKey: 'AIzaSyDMGYS--Gx0Y5JamMEPL9eEZ829Q_V3UD4',
    authDomain: 'movemo-8bf41.firebaseapp.com',
    projectId: 'movemo-8bf41',
    storageBucket: 'movemo-8bf41.appspot.com',
    messagingSenderId: '806256906099',
    appId: '1:806256906099:web:5f23960a7e7b262c44ff06',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
