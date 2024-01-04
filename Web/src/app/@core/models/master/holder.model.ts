import { Base } from '../base/base.model';

interface Holder extends Base {
  holderNumber: string;
  fullName: string;
  firstName: string;
  lastName: string;

  telephone: string;
  email: string;
}

export { Holder };

