import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../../config/auth';

import User from '../models/User';

class UserController {
	async list(req, res) {
		try {
			const users = new User();
			return res.json({users});

		} catch (error) {
			return res.status(400).json({error});
		}

	}

	async store(req, res) {
		try {
			//Email validation
			// const userExists = await User
			//
			// if (userExists) {
			// 	return res.status(400).json({error: 'Email já cadastrado'})
			// }
			//
			// //Insert user
			// const {_id, name, email} = await User.create(req.body);
			//
			// //Load token
			// const token = jwt.sign({_id}, authConfig.secret, {expiresIn: authConfig.expiresIn})
			//
			// return res.json({user: {_id, name, email}, token});

		} catch (error) {
			return res.status(400).json({error});
		}

	}

	async update(req, res) {
		const {_id, email, oldPassword, password, name} = req.body;

		const user = await User.findById({_id}).select('+password');

		//Altera email
		if (email && email != user.email) {
			//Valida email já cadastrado
			const userExists = await User.findOne({email});

			if (userExists) {
				return res.status(400).json({error: 'Email já cadastrado'})
			}
			await User.update({_id}, {$set: {email}});

			return res.json({_id, email});
		}

		//Altera senha
		if (oldPassword && password) {
			//Valida se a senha anterior está correta
			if (!(await bcrypt.compare(oldPassword, user.password))) {
				return res.status(401).json({error: 'Senha anterior inválida'});
			}
			await User.update({_id}, {$set: {password}});

			return res.json({_id});
		}

		//Aletra nome
		if (name && name != user.name) {
			await User.update({_id}, {$set: {name}});

			return res.json({_id, name});
		}

		return res.json({_id});
	}
}

export default new UserController();