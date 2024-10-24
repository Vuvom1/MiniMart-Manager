import validator from 'validator';

class ValidationUtil {
  static validateEmail(email: string) {
    if (!email) {
      return "Email is required.";
    }
    if (!validator.isEmail(email)) {
      return "Invalid email format.";
    }
    return null;
  }

  static validatePassword(password: string) {
    if (!password) {
      return "Password is required.";
    }
    if (!validator.isLength(password, { min: 6 })) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  }

  static validateConfirmPassword(password: string, confirmPassword: string) {
    if (!confirmPassword) {
        return 'Please confirm your password.';
    }

    if (password !== confirmPassword) {
        return 'Passwords do not match.';
    }

    return null;
}

  static validateUsername(username: string) {
    const minLength = 3;
    const maxLength = 20;
    const regex = /^[a-zA-Z0-9_-]+$/;

    if (!username) {
      return 'Username is required.';
    }
    if (username.length < minLength || username.length > maxLength) {
      return `Username must be between ${minLength} and ${maxLength} characters.`;
    }
    if (!regex.test(username)) {
      return 'Username can only contain letters, numbers, underscores, and hyphens.';
    }
    return null;


  }

  static validateDateOfBirth(dob: string) {
    if (!dob) {
        return 'Date of birth is required.';
    }

    const date = new Date(dob);
    const today = new Date();

    if (isNaN(date.getTime())) {
        return 'Invalid date format. Please enter a valid date.';
    }

  
    if (date > today) {
        return 'Date of birth cannot be in the future.';
    }

    
    var age = today.getFullYear() - date.getFullYear();
    const monthDifference = today.getMonth() - date.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < date.getDate())) {
        age--;
    }

    if (age < 18) {
        return 'You must be at least 18 years old.';
    }

    return null; 
}


  static validatePhoneNumber(phoneNumber: string) {
  
    const regex = /^\+?[1-9]\d{1,14}$/;
    const minLength = 7;
    const maxLength = 15; 

    if (!phoneNumber) {
      return 'Phone number is required.';
    }
    if (phoneNumber.length < minLength || phoneNumber.length > maxLength) {
      return `Phone number must be between ${minLength} and ${maxLength} digits.`;
    }
    if (!regex.test(phoneNumber)) {
      return 'Phone number is not valid. It should include only numbers, and may start with +.';
    }
    return null;
  }


  static validateRequired(field: string, fieldName: string) {
    if (validator.isEmpty(field)) {
      return `${fieldName} is required.`;
    }
    return null;
  }
}

export default ValidationUtil;

