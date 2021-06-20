export default function validateInfo(values) {
  let errors = {};

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.fullname) {
    errors.fullname = 'fullname required';
  } else if (values.fullname.length < 3) {
    errors.fullname = 'Name is invalid';
  }
  if (!values.taxID) {
    errors.taxID = 'TaxID required';
  } else if (values.taxID.length < 6) {
    errors.taxID = 'TaxID is invalid';
  }
  if (!values.address) {
    errors.address = 'Address required';
  } else if (values.address.length < 3) {
    errors.address = 'Address is invalid';
  }
  if (!values.city) {
    errors.city = 'City required';
  } else if (values.city.length < 3) {
    errors.city = 'City is invalid';
  }
  if (!values.country) {
    errors.country = 'Email required';
  } else if (values.country.length < 3) {
    errors.country = 'Country is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  if (!values.password2) {
    errors.password2 = 'Password is required';
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Passwords do not match';
  }
  return errors;
}
