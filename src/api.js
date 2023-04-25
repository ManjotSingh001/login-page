export const generateRequest = async (studentId, requestDetails) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Request generated:', { studentId, requestDetails });
        resolve({ success: true });
      }, 1000);
    });
  };
  