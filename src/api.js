import axios from 'axios';

export const generateRequest = async (studentId, requestDetails, fatherName, URN, CRN) => {
  try {
    const response = await axios.post('http://localhost:3001/api/generate-request', { studentId, requestDetails, fatherName, URN, CRN });

    if (response.data.success) {
      console.log('Request generated:', { studentId, requestDetails, fatherName, URN, CRN });
      return { success: true };
    } else {
      console.error('Failed to generate request');
      return { success: false };
    }
  } catch (error) {
    console.error('Error generating request:', error);
    return { success: false };
  }
};
