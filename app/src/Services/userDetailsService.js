import time from './delay';
import { mergeMap,delay, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// export async function validateUser(status, userObj) {
//     try {
//         console.log('status and go through here');
//         const userValidation = new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 const userDetailObj = {
//                     cookie: `FB3D42EF8AD4D`,
//                     isAuthenticated: true,
//                 }
//                 resolve(userDetailObj);
//             },time);
//         });
//         return userValidation;
//     } catch (e) {
//         console.log('error throwing validateUser', e);
//         throw e;
//     }
// }


