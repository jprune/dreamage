'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../../../lib/validate';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

import styles from '../../../styles/Form.module.css';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

type Props = {}

const Register = (props: Props) => {
    const [show, setShow] = useState({ password: false, cpassword: false });
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username : '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    });

    async function onSubmit(values: any){
        const options = {
            method: 'POST',
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        };

        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('http://localhost:3000/auth/login');
            });
    }

    const handleSignIn = async (provider: string, callbackString: string) => {
        signIn(provider, {callbackUrl: callbackString});
    };

    return (
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Let us help you to bring your business to the next level</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username ? 'border-rose-600' : ''}`}>
                    <input 
                        type="text"
                        placeholder='Username'
                        className={styles.input_text}
                        {...formik.getFieldProps('username')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>
                {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>}
                <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                        type="email"
                        placeholder='Email'
                        className={styles.input_text}
                        {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}
                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                        type={`${show.password ? 'text' : 'password'}`}
                        placeholder='password'
                        className={styles.input_text}
                        {...formik.getFieldProps('password')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}

                <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                    <input 
                        type={`${show.cpassword ? 'text' : 'password'}`}
                        placeholder='Confirm Password'
                        className={styles.input_text}
                        {...formik.getFieldProps('cpassword')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Sign Up
                    </button>
                </div>
                <div className='input-button'>
                    <button 
                        type='button' 
                        onClick={() => handleSignIn('google', 'http://localhost:3000')}
                        className={styles.button_custom}
                    >
                        <span className='flex justify-center items-center gap-3'>
                                Log In with Google <FcGoogle className='text-xl' />
                        </span>
                    </button>
                </div>
                <div className='input-button'>
                    <button 
                        type="button" 
                        onClick={() => handleSignIn('apple', 'http://localhost:3000')}
                        className={styles.button_custom}
                    >Log In with Apple</button>
                </div>
                <div className='input-button'>
                    <button 
                        type="button"
                        onClick={() => handleSignIn('facebook', 'http://localhost:3000')}
                        className={styles.button_custom}
                    >Log In with Facebook</button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                Have an account? <Link href={'/auth/login'} className="text-emerald-600">Log In</Link>
            </p>
        </section>
    );
};

export default Register;