// controllers/adoptionController.js
import sendEmail from '../utils/sendEmail.js'; // Adjust path as needed

const sendAdoptionInquiry = (async (req, res) => {
    const { fullName, email, phoneNumber, petName, message } = req.body;

    // Basic validation
    if (!fullName || !email || !phoneNumber || !petName) {
        res.status(400);
        throw new Error('Please fill in all required fields: Full Name, Email, Phone Number, and Pet Name.');
    }

    const emailMessage = `
        <h2>New Adoption Inquiry for ${petName}</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Pet Name:</strong> ${petName}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
    `;

    try {
        await sendEmail({
            email: process.env.EMAIL_USER, // Send to your administrative email
            subject: `New Adoption Inquiry for ${petName} from ${fullName}`,
            message: emailMessage,
        });

        res.status(200).json({ success: true, message: 'Adoption inquiry sent successfully!' });
    } catch (error) {
        console.error(`Error sending adoption inquiry email for ${petName} to ${email}:`, error);
        res.status(500);
        throw new Error('Adoption inquiry could not be sent. Please try again later.');
    }
});

export { sendAdoptionInquiry };