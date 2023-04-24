import { ApplicationError } from '@/protocols';

export function paymentRequiredError(): ApplicationError {
  return {
    name: 'PaymentRequired',
    message: 'You must pay the ticket or not be remote or to have it include a hotel',
  };
}
