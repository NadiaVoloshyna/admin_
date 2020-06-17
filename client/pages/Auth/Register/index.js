import React from 'react';
import Head from 'next/head';
import Form from 'react-bootstrap/Form';
import { Form as FinalForm, Field } from 'react-final-form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import PasswordRequirementsOverlay from './components/passwordRequirementsOverlay';
import validator from './validator';

const RegisterPage = (props) => {
  const { registerUser } = props;

  const onSubmit = ({ firstName, lastName, email, password }) => {
    registerUser && registerUser({
      firstName,
      lastName,
      email,
      password,
      token: props.token
    });
  };

  return (
    <div className="register-page">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FinalForm
        onSubmit={(values) => onSubmit(values)}
        validate={validator}
        render={({ handleSubmit }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              className="form-register shadow-lg rounded-lg p-4"
              noValidate
            >
              <h4 className="h4 mb-3 font-weight-normal">Registration Form</h4>

              <Form.Row>
                <Field name="firstName">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="firstName">
                      <Form.Control
                        {...input}
                        type="text"
                        placeholder="First Name"
                        isInvalid={meta.error && meta.touched}
                      />
                      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>

                <Field name="lastName">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="lastName">
                      <Form.Control
                        {...input}
                        type="text"
                        placeholder="Last Name"
                        isInvalid={meta.error && meta.touched}
                      />
                      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>

              <Form.Row>
                <Field name="email">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="email">
                      <Form.Control
                        {...input}
                        type="email"
                        placeholder="Email Address"
                        isInvalid={meta.error && meta.touched}
                      />
                      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>

                <Field name="emailConfirm">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="emailConfirm">
                      <Form.Control
                        {...input}
                        type="email"
                        placeholder="Confirm email"
                        isInvalid={meta.error && meta.touched}
                      />
                      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>

              <Form.Row>
                <Field name="password">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="password">
                      <OverlayTrigger trigger="focus" placement="left" overlay={PasswordRequirementsOverlay}>
                        <Form.Control
                          {...input}
                          type="password"
                          placeholder="Password"
                          isInvalid={meta.error && meta.touched}
                        />
                      </OverlayTrigger>
                      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>

                <Field name="passwordConfirm">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="passwordConfirm">
                      <Form.Control
                        {...input}
                        type="password"
                        placeholder="Confirm password"
                        isInvalid={meta.error && meta.touched}
                      />
                      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>

              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          );
        }}
      />

      <style global jsx>{`
        .register-page {
          height: 100vh;
          display: flex;
        }

        .register-page .form-register {
          width: 100%;
          max-width: 500px;
          padding: 15px;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
