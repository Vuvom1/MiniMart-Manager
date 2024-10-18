import { useState } from 'react'
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from '@heroicons/react/16/solid'
import RoundedButton from "../../components/Button/RoundedButton";
import PasswordField from "../../InputField/PasswordField";
import TextField from "../../InputField/TextField";
import MinimartStaffImage from "../../assets/images/woman-cashier.png"

function Signup() {
    const [enabled, setEnabled] = useState(true)

    return <div className="w-full h-full flex bg-cyan-500">
        <div className='grid w-9/12 place-items-center'>
            <p className='font-light text-white text-3xl px-12 pt-8'>Streamlining Supermarket Success, One Click at a Time</p>
            <img src={MinimartStaffImage}></img>
        </div>

        <div className="flex flex-col w-full bg-white justify-center place-items-center gap-y-2 shadow-lg rounded-lg">

            <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Get Started - Create Your Free Account</h1>

            <div className="px-2 flex flex-col gap-y-8 w-3/5">
                <TextField label="Username" placeholder='Enter username...' prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                } />
                <TextField label="Email" placeholder='Enter email...' prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                } />
                 <PasswordField label="Password" placeholder='Confirm password...' prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                } />
                <PasswordField label="Confirmed Password" placeholder='Confirm your password...' prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
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
                <p className='text-sm'>Remenber Me ?</p>
                </div>
                    
                <RoundedButton label="Sign In" color='bg-cyan-500 text-white'  />

               <div className='flex gap-x-2 justify-center'>
                <p className=''>Don't have any account?</p>
                <p className='text-cyan-500'>Sign Up</p>
               </div>

            </div>



        </div>
    </div>
}

export default Signup;