const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
export default async function main( clientEmail: string, galleryName: string, route: string ) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    console.log('from email client', clientEmail, galleryName, route);
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: `${clientEmail}`, // list of receivers
        subject: 'Access to your photos from our shooting', // Subject line
        text: 'Hi, thank you for this special day. Please follow the link to see your pictures', // plain text body
        html: `
            <h1>Hi, thank you for this special day.</h1>
            <p>Please follow the link to see your pictures</p>
            <a href="http://localhost:3000/client/${route}">${galleryName}</a>
        `, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);