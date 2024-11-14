const validateEmail = (email) => {
  const errors = [];
  const trimmedEmail = email.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(trimmedEmail.toLowerCase())) {
    errors.push("Invalid Email Format");
  }
  return {
    isValid: errors.length === 0,
    errors: errors,
  };
};

module.exports = validateEmail;
