import { useState } from 'react'
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/FormInput'
import Button from '../button/Button'
import './SignUpForm.scss'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { displayName, email, password, confirmPassword } = formFields

	console.log(formFields)

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (password !== confirmPassword) {
			alert('Passwords do not match')
			return
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password)
			await createUserDocumentFromAuth(user, { displayName })
			resetFormFields()
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('Email is already in use for another user')
			}
			console.log('user creation encountered and error', err)
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sig-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display name'
					required
					type='text'
					name='displayName'
					value={displayName}
					onChange={handleChange}
				/>

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

				<FormInput
					label='Confirm Password'
					required
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
				/>
				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	)
}

export default SignUpForm
