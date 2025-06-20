export const sendtokan = (user, statuscode, message, res) => {
    const token = user.generatetoken();
    res.status(statuscode).cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true, // Must be true for HTTPS
        sameSite: "None", // Must be 'None' for cross-site cookies
        // domain: ".kishore-library.netlify.app" // Uncomment and set if needed for subdomains
    })
    .json({
        success: true,
        message,
        user,
        token, // Optionally return token for debugging
    });
}