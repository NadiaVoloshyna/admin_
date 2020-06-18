import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import { Form as FinalForm, Field } from 'react-final-form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import UserAPI from 'pages/Users/api';

const LoginPage = () => {
  // TODO: add spinner to this page
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const loginUser = async (payload) => {
    setIsLoading(true);
    setShowErrorMessage(false);
    try {
      const response = await UserAPI.login(payload);
      if (response.status === 302) {
        window.location = '/';
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = ({ email, password }) => {
    loginUser && loginUser({
      email,
      password
    });
  };

  return (
    <div className="login-page">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FinalForm
        onSubmit={(values) => onSubmit(values)}
        render={({ handleSubmit }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              className="form-signin shadow-lg rounded-lg p-4"
              noValidate
            >
              <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>

              <div className="d-flex flex-column">
                <ButtonGroup>
                  <Link href="/auth/google">
                    <Button variant="outline-danger">Google</Button>
                  </Link>
                  <Button
                    variant="outline-primary"
                  >Facebook</Button>
                </ButtonGroup>
              </div>

              { showErrorMessage
                && <Alert className="mt-3" variant="danger">Your credentials are invalid. Please try again.</Alert>}

              <div className="border-top mb-3 mt-3" />

              <Field name="email">
                {({ input }) => (
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      {...input}
                      type="email"
                    />
                  </Form.Group>
                )}
              </Field>

              <Field name="password">
                {({ input }) => (
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      {...input}
                      type="password"
                    />
                  </Form.Group>
                )}
              </Field>

              <div className="checkbox mb-3">
                <label htmlFor="keep-me-signed-in">
                  <input type="checkbox" value="remember-me" name="keep-me-signed-in" /> Remember me
                </label>
              </div>

              <Button variant="primary" size="block" type="submit">Submit</Button>

              <p className="mt-5 mb-3 text-muted">© 2019</p>
            </Form>
          );
        }}
      />

      <style global jsx>{`
        .login-page {
          height: 100vh;
          display: flex;
        }

        .login-page .form-signin {
          width: 100%;
          max-width: 500px;
          padding: 15px;
          margin: auto;
        }

        .form-signin input[type="email"] {
          margin-bottom: -1px;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }

        .form-signin input[type="password"] {
          margin-bottom: 10px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }

        .form-signin .form-control {
          position: relative;
          box-sizing: border-box;
          height: auto;
          padding: 10px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
