const emailRegex = /^[\w.-]+@[a-z]+\.[a-z]{2,3}$/;
console.log(emailRegex.test("user@example.com"));

const phoneRegex = /^\d{11}$/;
console.log(phoneRegex.test("08012345678"));