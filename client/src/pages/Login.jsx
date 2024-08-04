import React from 'react';
import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import { Logo, FormRow } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Logged in!');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form
        method='post'
        className='form'
      >
        <Logo />
        <h4>login</h4>
        <FormRow
          type='email'
          name='email'
          defaultValue='papa@papa.com'
        />
        <FormRow
          type='password'
          name='password'
          defaultValue='secret123'
        />
        <button
          type='submit'
          className='btn btn-block'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button
          type='button'
          className='btn btn-block'
        >
          explore the app
        </button>
        <p>
          Not a member yet? Register
          <Link
            to='/register'
            className='member-btn'
          >
            here
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
