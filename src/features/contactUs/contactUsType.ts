export interface ContactUsForm {
  name?: string;
  email?: string;
  subject: string;
  message: string;
}

export interface ContactResponse 

  {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: null;
    user: null;
    guestId: null;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    response: null;
    respondedBy: null;
    respondedAt: null
  }

