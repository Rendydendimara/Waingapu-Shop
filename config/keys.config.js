module.exports = {
	MONGODB_URL: 'mongodb+srv://Rendy:R3ndycoder433@coder433project-nadvl.mongodb.net/waingapushop?retryWrites=true&w=majority', // process.env.MONGODB_URL || 'mongodb://localhost/amazona',
	JWT_SECRET: process.env.JWT_SECRET || 'somethingsecretwaingapushopsecret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'AWCyHe1c91627pK3awaG4GbaFUO_ibgAoYjAaacuX0_TJpM2hkpJIiX-A3DcuWGlgGnSXf8aFREsdzvh',
	PORT: process.env.PORT || 5000,
}