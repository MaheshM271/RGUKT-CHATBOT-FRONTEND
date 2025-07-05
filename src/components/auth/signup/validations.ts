export const conditions = (value: string) => [
  {
    label: '8 characters - 16 characters',
    condition: value.length >= 8,
  },
  {
    label: 'One upper and lowercase letter',
    condition: value.toUpperCase() !== value && value.toLowerCase() !== value,
  },
  {
    label: 'One number',
    condition: /\d/.test(value),
  },
  {
    label: 'One special character',
    condition: /(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/.test(value),
  },
];

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;
  return re.test(email);
};

const isValidInput = (regexString: string | RegExp, value: string, ignoreCase = false): boolean => {
  let regex = RegExp(regexString);
  if (ignoreCase) {
    regex = RegExp(regexString, 'i');
  }
  return regex.test(value);
};

export const validateForm = (form) => {

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    checked,
  } = form;
  const errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    checked: ''
  };

  if (!firstName) {
    errors.firstName = 'Enter a first name';
  }
  if (!lastName) {
    errors.lastName = 'Enter a last name';
  }
  if (!email) {
    errors.email = 'Enter email id';
  }
  if (!password) {
    errors.password = 'Enter a password';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Enter confirm password';
  }
  if (!checked) {
    errors.checked = 'Please accept terms & conditions';
  }
  const passwordConditions = conditions(password).reduce((acc, item) => acc && item.condition, true);
  if (!passwordConditions) {
    errors.password = 'Enter valid password';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Both passwords should match';
  }
  if (!isValidInput(/^[A-Za-z-_. 0-9]{2,50}$/, firstName)) {
    errors.firstName = 'Enter valid first name';
  }
  if (!isValidInput(/^[A-Za-z-_. 0-9]{1,50}$/, lastName)) {
    errors.lastName = 'Enter valid last name';
  }
  if (!validateEmail(email)) {
    errors.email = 'Enter valid email';
  }
  return errors;
}


export const validateSigninForm = (form) => {
  const errors = {
    email: '',
    password: '',
  }
  if (!form.email) {
    errors.email = "Please enter email";
  }
  if (!validateEmail(form.email)) {
    errors.email = 'Enter valid email';
  }
  if (!form.password) {
    errors.password = "Please enter password";
  }
  return errors;
}