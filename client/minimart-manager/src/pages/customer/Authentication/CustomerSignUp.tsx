import { useState } from 'react'
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from '@heroicons/react/16/solid'
import RoundedButton from "../../../components/Button/RoundedButton";
import PasswordField from "../../../components/InputField/PasswordField";
import TextField from "../../../components/InputField/TextField";
import MinimartStaffImage from "../../../assets/images/woman-cashier.png"
import { useNavigate } from 'react-router-dom';
import DateField from '../../../components/InputField/DateField';
import ValidationUtil from '../../../utils/ValidationUtil';
import { useAuth } from '../../../providers/AuthProvider';
import toast from 'react-hot-toast';
import CustomErrorToast from '../../../components/Toast/ErrorToast';
import SuccessToast from '../../../components/Toast/SuccessToast';
import { Role } from '../../../constant/enum';


function CustomerSignup() {
    const [enabled, setEnabled] = useState(true)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSingup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await auth.signup(firstname, lastname, username, email, password, Role.CUSTOMER, dateOfBirth, phone, address)
            toast.custom((t) => (
                <SuccessToast
                    message="Register user success!"
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
            navigate('../');
        } catch (err: any) {
            toast.custom((t) => (
                <CustomErrorToast
                    message= {err || "Error sign up"}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } finally {
            setLoading(false);
        }
    };

    const handleValidationChange = (isValid: boolean) => {
        setIsValid(isValid);
      };

    function navigateLogin() {
        navigate('../login')
    }

    return <div className="w-full h-full flex bg-cyan-500 my-10">
        <div className='grid w-9/12 place-items-center'>
            <p className='font-light text-white text-3xl px-12 pt-8'>Streamlining Supermarket Success, One Click at a Time</p>
            <img src={MinimartStaffImage}></img>
        </div>

        <div className="flex flex-col w-full bg-white justify-center place-items-center gap-y-2 shadow-lg rounded-lg">

            <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Get Started - Create Your Free Account And Be Our Valuable Customer</h1>

            <form onSubmit={handleSingup} className="px-2 flex flex-col gap-y-4 w-3/5">

                <div className='flex gap-x-4'>
                    <TextField
                        onChange={(e) => setFirstname(e.target.value)}
                        label="First name"
                        value={firstname}
                        placeholder='Enter your firstname...'
                        validations={[ValidationUtil.validateRequired("First name")]}
                        validationPassed={handleValidationChange}
                        prefix={<svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        } />
                    <TextField
                        onChange={(e) => setLastname(e.target.value)}
                        label="Last name"
                        validations={[ValidationUtil.validateRequired("Last name")]}
                        validationPassed={handleValidationChange}
                        value={lastname}
                        placeholder='Enter your lastname...'
                        prefix={<svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        } />
                </div>
                <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    label="Username"
                    value={username}
                    placeholder='Enter username...'
                    validations={[ValidationUtil.validateRequired("Username"), ValidationUtil.validateUsername]}
                    validationPassed={handleValidationChange}
                    prefix={<svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    } />
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    value={email}
                    placeholder='Enter email...'
                    validations={[ValidationUtil.validateRequired("Email"), ValidationUtil.validateEmail]}
                    validationPassed={handleValidationChange}
                    prefix={<svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    } />

                <PasswordField
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    value={password}
                    validations={[ValidationUtil.validateRequired("Password"), ValidationUtil.validatePassword]}
                    validationPassed={handleValidationChange}
                    placeholder='Confirm password...'
                    prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    } />
                <PasswordField
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirmed Password"
                    value={confirmPassword}
                    confirmValue={password}
                    isConfirmField={true}
                    validationPassed={handleValidationChange}
                    placeholder='Confirm your password...' 
                    prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    } />



                <div className='flex gap-x-4'>
                    <DateField
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        value={dateOfBirth}
                        validations={[ValidationUtil.validateRequired("Date of birth"), ValidationUtil.validateDateOfBirth]}
                        validationPassed={handleValidationChange}
                        label="Date of Birth"
                        placeholder='Enter your date of birth'
                    />
                    <TextField
                        onChange={(e) => setPhone(e.target.value)}
                        label="Phone number"
                        value={phone}
                        validations={[ValidationUtil.validateRequired("Phone number"), ValidationUtil.validatePhoneNumber]}
                        validationPassed={handleValidationChange}
                        placeholder='Enter your phone number...'
                        prefix={<svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        } />


                </div>
                <TextField
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    label="Address"
                    validations={[ValidationUtil.validateRequired("Address")]}
                    validationPassed={handleValidationChange}
                    placeholder='Enter your address...'
                    prefix={<svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    } />

                <div className='flex w-full gap-x-2 place-items-center'>
                    <Checkbox
                        checked={enabled}
                        onChange={setEnabled}
                        className="group block size-4 rounded border bg-white ring-gray-300"
                    >
                        <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                    </Checkbox>
                    <p className='text-sm'>Agree to Term of Use and Policy</p>
                </div>

                <RoundedButton onClick={() => handleSingup} disable={loading || !isValid} label={loading ? 'Signing Up...' : 'Sign Up'} color='bg-cyan-500 text-white' />

                <div className='flex gap-x-2 justify-center'>
                    <p className=''>Already have an account?</p>
                    <p onClick={navigateLogin} className='cursor-pointer text-cyan-500'>Login</p>
                    </div>

            </form>



        </div>
    </div>
}

export default CustomerSignup;