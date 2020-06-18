import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import matches from 'validator/lib/matches';

const validate = (values) => {
  const errors = {};

  /**
   * First Name
   * Rules:
   * 1. Required
   * 2. Min length 3 symbols
   * 3. Max length 20 symbols
   */
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (!isLength(values.firstName, { min: 3 })) {
    errors.firstName = 'Must be at least 3 characters long';
  } else if (!isLength(values.firstName, { max: 20 })) {
    errors.firstName = 'Must be at most 20 characters long';
  }

  /**
   * Last Name
   * Rules:
   * 1. Required
   * 2. Min length 3 symbols
   * 3. Max length 20 symbols
   */
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (!isLength(values.lastName, { min: 3 })) {
    errors.lastName = 'Must be at least 3 characters long';
  } else if (!isLength(values.lastName, { max: 20 })) {
    errors.lastName = 'Must be at most 20 characters long';
  }

  /**
   * Email
   * Rules:
   * 1. Required
   * 2. Valid email address
   */
  if (!values.email) {
    errors.email = 'Required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email';
  }

  /**
   * Email Confirm
   * Rules:
   * 1. Required
   * 3. Must be equal to email field
   */
  if (!values.emailConfirm) {
    errors.emailConfirm = 'Required';
  } else if (values.emailConfirm !== values.email) {
    errors.emailConfirm = 'Must match';
  }

  /**
   * Password
   * Rules:
   * 1. Required
   * 2. At least 8 characters long
   * 3. At most 18 characters long
   * 4. Have at least one upper case letter
   * 5. Have at least one lowercase letter
   * 6. Have at least one integer
   * 7. Have at least one of next symbols (@ % + ' ! # $ & * ^ ? : . ( ) { } ~ - _ .)
   */
  if (!values.password) {
    errors.password = 'Required';
  } else if (!isLength(values.password, { min: 8 })) {
    errors.password = 'Must be at least 8 characters long';
  } else if (!isLength(values.password, { max: 18 })) {
    errors.password = 'Must be at most 18 characters long';
  } else if (!matches(values.password, /.*[A-Z]/)) {
    errors.password = 'Must have at least one upper case letter';
  } else if (!matches(values.password, /.*[a-z]/)) {
    errors.password = 'Must have at least one lower case letter';
  } else if (!matches(values.password, /.*\d/)) {
    errors.password = 'Must have at least one integer';
  } else if (!matches(values.password, /.*[@%+'!#$&*^?:.(){}~\-_.]/)) {
    errors.password = 'Must contain allowed special characters';
  }

  /**
   * Password Confirm
   * Rules:
   * 1. Required
   * 2. Must match password field
   */
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Must match';
  }

  return errors;
};

export default validate;
