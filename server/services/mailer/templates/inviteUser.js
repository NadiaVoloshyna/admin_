const template = (token, role) => `
  <div>
    <p>You were invited to be ${role} in Ukrainian.com</p>
    <p>
      <a href="http://localhost:3001/auth/register?token=${token}">Register</a>
    </p>
    <p>Note, this link will be active only for next 24 hours.</p>
  </div>
`;

const subject = () => {
  return 'You were invited to be a part of Ukrainian.com';
};

module.exports = {
  template,
  subject,
};
