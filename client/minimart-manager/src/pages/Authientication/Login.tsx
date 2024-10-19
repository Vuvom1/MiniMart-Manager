import { useState } from 'react';
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from '@heroicons/react/16/solid';
import RoundedButton from "../../components/Button/RoundedButton";
import PasswordField from "../../InputField/PasswordField";
import TextField from "../../InputField/TextField";
import MinimartStaffImage from "../../assets/images/minimart_staff.png";
import { useNavigate } from 'react-router-dom';
import ValidationUtil from '../../utils/ValidationUtil';
import { useAuth } from '../../providers/AuthProvider';

function Login() {
    const [enabled, setEnabled] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email: string | null, password: string | null, clientError: string | null }>({
        email: null,
        password: null,
        clientError: null
    });
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        setErrors({
            email: null,
            password: null,
            clientError: null,
          });
        e.preventDefault();
        setLoading(true);

        const emailError = ValidationUtil.validateEmail(email);
        const passwordError = ValidationUtil.validatePassword(password);
    
        if (emailError || passwordError) {
          setErrors({
            email: emailError,
            password: passwordError,
            clientError: null,
          });
          setLoading(false); 
          return;
        }

        try {
            await auth.login(email, password);

            navigate('/');
        } catch (err: any) {
            setError(`Login failed: ${err || "An unknown error occurred"}`);
        } finally {
            setLoading(false);
        }
    };

    function navigateSignup() {
      navigate('/signup')
    }

    return (
        <div className="w-full h-full flex bg-cyan-500">
            <div className='grid w-9/12 place-items-center'>
                <p className='font-light text-white text-3xl px-12 pt-8'>Streamlining Supermarket Success, One Click at a Time</p>
                <img src={MinimartStaffImage} alt="Minimart Staff" />
            </div>

            <div className="flex flex-col w-full bg-white justify-center place-items-center gap-y-2 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Sign in to MINIMART MANAGER</h1>

                <form onSubmit={handleLogin} className="px-2 flex flex-col gap-y-8 w-3/5">
                    <TextField 
                      onChange={(e) => setEmail(e.target.value)} 
                      value={email} 
                      error={errors.email}
                      label="Username or email" 
                      placeholder='Enter username or email...' 
                      prefix={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      } 
                    />
                   

                    <PasswordField 
                      onChange={(e) => setPassword(e.target.value)} 
                      value={password} 
                      label="Password" 
                      error={errors.password}
                      placeholder='Enter password...' 
                      prefix={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                      } 
                    />

                    <div className='flex w-full gap-x-2 place-items-center'>
                        <Checkbox checked={enabled} onChange={setEnabled} className="group block size-4 rounded border bg-white ring-gray-300">
                            <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                        </Checkbox>
                        <p className='text-sm'>Remember Me?</p>
                    </div>

                    <RoundedButton disable={loading} label={loading ? 'Logging in...' : 'Login'} color='bg-cyan-500 text-white' />

                    <div className='text-center'>
                        {error && <p style={{ color: 'red' }}>{error}</p>} 
                    </div>

                    <div className='flex gap-x-2 justify-center'>
                        <p>Don't have any account?</p>
                        <p onClick={navigateSignup} className='cursor-pointer text-cyan-500'>Sign Up</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
