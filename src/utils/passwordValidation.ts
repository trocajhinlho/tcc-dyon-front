const passwordValidation = (password: string): boolean => {
    return new RegExp("^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\\D*\\d)(?=[^!#%.]*[!#%.])[A-Za-z0-9!#%.]{6,32}$").test(password);
};

export default passwordValidation;