module.exports.validateRegister = (username, email, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }
  if (username.length < 3) {
    errors.username = "Username length should be more than 3";
  }

  if (username.length > 20) {
    errors.username = "Username length should not be more than 20";
  }

  if (email.trim() === "") {
    errors.email = "Email is required";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Please enter a valid email";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password cannot be empty";
  }
  if (password.length < 5) {
    errors.password = "Password length should be more than 5";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLogin = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email is required";
  }

  if (password.trim() === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
