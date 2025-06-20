export const sendtokan = (user,statuscode,message, res) => {
    const token = user.generatetoken();
    res.status(statuscode).cookie("token", token,{
        expires: new Date(Date.now() +process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true,
        secure: false,
        sameSite: "Lax",
        domain: ".kishore-library.netlify.app"
    })
    .json({
        success:true,
        message,
        user,
    })
}