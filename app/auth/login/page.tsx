'use client';

import { useState } from 'react';
import {useSession, signIn} from 'next-auth/react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import login_validate from '../../../lib/validate';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import styles from '../../../styles/Form.module.css';

type Props = {}

const LoginPage = (props: Props) => {
    const {data: session} = useSession();
    const [show, setShow] = useState(false);
    const router = useRouter();

    // formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate : login_validate,
        onSubmit
    });

    const handleSignIn = async (provider: string, callbackString: string) => {
        signIn(provider, {callbackUrl: callbackString});
    };
    /**
     * "username": "Julian",
  "email": "julianpechler.zh@gmail.com",
  "password": "Admin_Test2023!?"
     */

    async function onSubmit(values: any){
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/'
        });
        //@ts-ignore
        if(status.ok) router.push(status.url);
        console.log(status);
    }

    return (    
        <div>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                    <p className='w-3/4 mx-auto text-gray-400'>Sign In and bring you photography business one step further</p>
                </div>

                <form className='flex flex-col gap-2' onSubmit={formik.handleSubmit}>
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                        <input 
                            type="email"
                            placeholder='E-Mail'
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
                            type={`${show ? 'text' : 'password'}`}
                            placeholder='Password'
                            className={styles.input_text}
                            {...formik.getFieldProps('password')}
                        />
                        <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                    {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
                    
                    <div className='input-button mt-3'>
                        <button type='submit' className={styles.button}>Login</button>
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

                <p>Don&apos;t have an account yet? <Link href={'/auth/register'} className="text-emerald-600">Sign Up</Link></p>
            </section>
        </div>
    );
    
};

export default LoginPage;