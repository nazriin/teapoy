// controllers/contactUsController.js
import sendEmail from '../utils/sendEmail.js';

const handleAppointmentSubmission = async (req, res) => { // Funksiya adı dəyişdirildi
    const { fullName, email, phoneNumber, petName, date, serviceRequest, message } = req.body;

    // Basic validation
    if (!fullName || !email || !phoneNumber || !petName || !date || !serviceRequest) {
        res.status(400);
        throw new Error('Please fill in all required fields.');
    }

    const emailMessage = `
        <h2>New Appointment Request</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Pet Name:</strong> ${petName}</p>
        <p><strong>Requested Date:</strong> ${date}</p>
        <p><strong>Service Requested:</strong> ${serviceRequest}</p>
        ${message ? `<p><strong>Additional Message:</strong> ${message}</p>` : ''}
    `;

    try {
        await sendEmail({
            email: process.env.EMAIL_USER, // This should be the recipient email (e.g., your clinic's email)
            subject: `New Appointment Request from ${fullName}`,
            message: emailMessage,
        });

        res.status(200).json({ success: true, message: 'Appointment request sent successfully!' });
    } catch (error) {
        console.error(`Error sending appointment email to ${process.env.EMAIL_USER}:`, error);
        res.status(500);
        throw new Error('Appointment request could not be sent. Please try again later.');
    }
};

export { handleAppointmentSubmission }; // Export adı dəyişdirildi