import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

export const sendEmailNotification = async ({ type, data }) => {
  const sendEmail = httpsCallable(functions, 'sendEmail');
  try {
    await sendEmail({ type, data });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}; 