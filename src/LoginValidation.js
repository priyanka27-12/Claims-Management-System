function Validation(values) {
    let errors = {};
    const username_pattern = /^[a-zA-Z0-9_]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@#$]{8,}$/;

    if (!values.username.trim()) {
        errors.username = "Username should not be empty";
    } else if (!username_pattern.test(values.username)) {
        errors.username = "Username should contain only letters, numbers, or underscores";
    } else {
        errors.username = "";
    }

    if (!values.password.trim()) {
        errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Password format is incorrect";
    } else {
        errors.password = "";
    }

    return errors;
}

export default Validation;
