const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  if (!/(?=.*[0-9])/.test(password)) {
    errors.push("Password must contain at least one numeric character.");
  }

  if (!/(?=.*[!@#$%^&*])/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
};

module.exports = {
  validatePassword,
};
