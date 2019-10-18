import Model from './Model';

/**
 * User model
 */
class User extends Model {
	id;
	name;
	password;

	constructor(table = 'users', id) {
		super(table, id);
	}
}

export default User;