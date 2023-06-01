import { IErrorResponse, IValidatePinResponse } from "../utils/types";

export const validatePin = async (pin: string): Promise<IValidatePinResponse | Error | undefined> => {
  try {
    const response = await fetch('https://verification-code-wf2c.onrender.com/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: pin })
    });

    if (response.ok) {
      const data: IValidatePinResponse = await response.json();
      return data;
    } else {
      const errorData: IErrorResponse = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      console.error('An unknown error occurred.');
    }
  }

  return undefined; //ending return statement for cases where no other return statement is reached.
};
