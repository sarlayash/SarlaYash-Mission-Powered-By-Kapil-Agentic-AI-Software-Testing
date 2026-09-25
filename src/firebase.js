import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// Official SarlaYash Mission Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKKtFqwKDpHTZwbUc5AUAClDRpg7nEaT4",
  authDomain: "sarlayashagenticaiswtesting.firebaseapp.com",
  projectId: "sarlayashagenticaiswtesting",
  storageBucket: "sarlayashagenticaiswtesting.firebasestorage.app",
  messagingSenderId: "203621701765",
  appId: "1:203621701765:web:9c613365dec4fec50231ec",
  measurementId: "G-15J52BLJT5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { signInWithPopup, signOut, onAuthStateChanged };
export default app;
