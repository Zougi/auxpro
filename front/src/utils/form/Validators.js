import CustomValidator from 'utils/form/CustomValidator.js'
import EmailValidator from 'utils/form/EmailValidator.js'
import NonNullValidator from 'utils/form/NonNullValidator.js'
import PhoneValidator from 'utils/form/PhoneValidator.js'
import StringValidator from 'utils/form/StringValidator'

let email = new EmailValidator();
let nestr = new StringValidator({ lengthMin: 1});
let nnull = new NonNullValidator();
let phone = new PhoneValidator();
let ssnum = new CustomValidator({ regSuccess: new RegExp("^[1-2][0-9]{12}$") });
let posta = new CustomValidator({ regSuccess: new RegExp("^[0-9]{5}$") });
let idnum = new CustomValidator({ regSuccess: new RegExp("^[0-9]{12}$") });
let siret = new CustomValidator({ regSuccess: new RegExp("^[0-9]{14}$") });
let tweet = new StringValidator({ lengthMin: 1, lengthMax: 140 });

export default class Validators {

	static get Email() {
		return email;
	}

	static get NonNull() {
		return nnull;
	}

	static get Phone() {
		return phone;
	}

	static get NonEmptyString() {
		return nestr;
	}

	static get SocialNumber() {
		return ssnum;
	}

	static get IDCardNumber() {
		return idnum;
	}

	static get PostalCode() {
		return posta;
	}


	static get SiretNumber() {
		return siret;
	}

	static get Tweet() {
		return tweet;
	}

}