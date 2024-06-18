import { Quote } from '../components/Quote';
import { Header } from '../components/Header';
import InputBox from '../components/InputBox';
import { SigninInput } from '@tarun2599/medium-common';
import { useState } from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Signin = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        "username": "",
        "password": ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", `Bearer ${jwt}`);
            navigate("/blogs");
        } catch (err) {

        }
    }

    return (
        
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div className="h-screen mx-32 md:visible">
                <Header heading="Login" subheading="Don't have an Account" link="Create an account" linkTo="/signup" />
                <div className="grid gap-6 mt-8">
                    {/* <InputBox onChange={(e)=> {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} type="text" placeholder="Enter your Username" label="Username" /> */}
                    <InputBox onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            username: e.target.value
                        }))
                    }} type="text" placeholder="hello@example.com" label="Email" />
                    <InputBox onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} placeholder="123456" label="Password" type="password" />
                    <button onClick = {sendRequest} className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700">Sign In</button>
                </div>
            </div>
            <Quote />
        </div>
    )
}