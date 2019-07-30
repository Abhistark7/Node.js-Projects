const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'abhi9122305911@gmail.com',
        subject: 'Welcome to the task manager App!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'abhi9122305911@gmail.com',
        subject: 'Great to serve you!',
        text: `Hi ${name}, It was great to serve you with our task manager app. Hope you liked it. We are waiting for your feedback of our app and if our app has caused you and discomfort, please feel free to write to us about it. We will definitely take you advice  for improving our service. Thank You. You have been a great user.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}