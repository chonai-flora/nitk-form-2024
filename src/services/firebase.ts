import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "@firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}
if (process.env.NODE_ENV === "development") {
  window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp);
export const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITEKEY ?? ""),
  isTokenAutoRefreshEnabled: true,
});