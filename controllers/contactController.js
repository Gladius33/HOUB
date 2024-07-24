const nodemailer = require('nodemailer');
const config = require('config');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.get('emailUser'),
        pass: config.get('emailPass'),
    }
});

exports.sendContactMessage = async (req, res) => {
    const { name, email, message } = req.body;

    
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Veuillez remplir tous les champs' });
    }

    try {
    
        const mailOptions = {
            from: email,
            to: config.get('contactEmail'),
            subject: `Message de contact de ${name}`,
            text: message,
            html: `<p>Vous avez reçu un nouveau message de contact de <b>${name}</b> (<a href="mailto:${email}">${email}</a>).</p>
                   <p>Message :</p>
                   <p>${message}</p>`
        };

        await transporter.sendMail(mailOptions);

        res.json({ msg: 'Message envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error.message);
        res.status(500).send('Erreur serveur');
    }
};
