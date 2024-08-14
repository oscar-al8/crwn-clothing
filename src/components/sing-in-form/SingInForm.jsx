import { useState } from 'react'
import {
	signInAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	signInWithGooglePopUp,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/FormInput'
import Button from '../button/Button'
import './SignInForm.scss'

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopUp()
		await createUserDocumentFromAuth(user)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			const response = await signInAuthUserWithEmailAndPassword(email, password)
			console.log(response)
			resetFormFields()
		} catch (err) {
			switch (err.code) {
				case 'auth/wrong-password':
					alert('Incorrect password for email')
					break
				case 'auth/user-not-found':
					alert('No user associated with this email')
					break
				default:
					console.log(err)
			}
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					required
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
				/>

				<FormInput
					label='Password'
					required
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' onClick={signInWithGoogle} buttonType='google'>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
