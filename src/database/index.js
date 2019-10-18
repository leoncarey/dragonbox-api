import databaseConfig from '../config/database';

const {Client} = require('pg');

class Database {
	client;

	constructor() {
		this.client = new Client(databaseConfig);
	}

	_exec(action, table, data) {
		this.client.connect()
			.then(() => {
				try {

					switch (action) {
						case 'select':

							if (data) {
								this.select(table, data);
							} else {
								this.select(table);
							}

							break;
						case 'insert':
							this.insert(table, data);
							break;
						case 'update':
							this.update(table, data);
							break;
						case 'delete':
							this._delete(table, data);
							break;
					}

				} catch (ex) {
					console.error('Error ===> ', ex);
				}
			})
			.catch((err) => {
				console.error('Error ===> ', err);
			})
			.finally(() => {
				console.log('Finalizado');
				this.client.end();
			})
	}

	select(table, table_id) {
		console.log('Select', table);

		if (table_id) {
			this.client.query("select * from $1 where id = $2", [table, table_id]);
		} else {
			this.client.query("select * from users");
		}
	}

	insert(table, data) {
		console.log('Insert');
	}


	update(table, data) {
		console.log('Update');
	}

	_delete(table, id_table) {
		console.log('Delete');
	}
}

export default Database;