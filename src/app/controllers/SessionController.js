import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
	async store(req, res) {
		try {
			const {email, password} = req.body;

			const user = await User.findOne({email}).select('+password');

			if (!user) {
				return res.status(401).json({error: 'Usuário não existe'});
			}

			//Valida se a senha está correta
			if (!(await bcrypt.compare(password, user.password))) {
				return res.status(401).json({error: 'Senha inválida'});
			}

			//Gera token
			const token = jwt.sign({_id: user._id}, authConfig.secret, {expiresIn: authConfig.expiresIn})

			//Remove campos desnecessários
			user.password = undefined;
			user.createdAt = undefined;
			user.updatedAt = undefined;

			return res.json({user, token});

		} catch (error) {
			return res.status(401).json({error: error.message});
		}
	}
}

export default new SessionController();

