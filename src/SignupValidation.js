function Validation(values) {
    let errors = {};
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@#$]{8,}$/;

    if (!values.username.trim()) {
        errors.username = "Username should not be empty";
    } else {
        errors.username = "";
    }

    if (!values.password.trim()) {
        errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
    } else {
        errors.password = "";
    }

    if (!values.dob.trim()) {
        errors.dob = "Date of Birth should not be empty";
    } else {
        errors.dob = "";
    }

    return errors;
}

export default Validation;