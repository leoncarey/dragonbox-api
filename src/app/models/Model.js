import Database from '../../database';

/**
 * Model Main
 *
 */
export default class Model {
	constructor(table, id) {
		let db = new Database();

		if (id) {
			return db._exec('select', table, id);
		} else {
			return db._exec('select', table);
		}
	}
}