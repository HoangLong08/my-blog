import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
	authDomain: 'web-blog-fcc94.firebaseapp.com',
	projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
	storageBucket: 'web-blog-fcc94.appspot.com',
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
	appId: process.env.REACT_APP_ID_FIREBASE,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID_FIREBASE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = initializeFirestore(app, {
	experimentalForceLongPolling: true,
});

export { auth, db };
