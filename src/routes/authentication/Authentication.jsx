import SignInForm from '../../components/sing-in-form/SingInForm'
import SignUpForm from '../../components/sing-up-form/SingUpForm'
import './Authentication.scss'

const Authentication = () => {
	return (
		<div className='authentication-container'>
			<SignInForm />
			<SignUpForm />
		</div>
	)
}

export default Authentication
