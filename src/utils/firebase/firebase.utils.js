import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyAHDzf-hicZ4B3MCm6XGDIrpZTvxB4S29Y',
	authDomain: 'crwn-clothing-db-45a58.firebaseapp.com',
	projectId: 'crwn-clothing-db-45a58',
	storageBucket: 'crwn-clothing-db-45a58.appspot.com',
	messagingSenderId: '444378680307',
	appId: '1:444378680307:web:1234a1a831eae65029a086',
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return

	const userDocRef = doc(db, 'users', userAuth.uid)

	const userSnapshot = await getDoc(userDocRef)

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			})
		} catch (err) {
			console.log('Error creating the user', err.message)
		}
	}

	return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return
	return await createUserWithEmailAndPassword(auth, email, password)
}
