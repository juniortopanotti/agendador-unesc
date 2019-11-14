import * as Yup from 'yup';

class UsuarioValidator {
  async create(req, res, next) {
    const schema = Yup.object().shape({
      celular: Yup.string()
        .max(12, 'O celular não pode exceder 12 caracteres.')
        .required('É obrigatório informar o celular.'),
      dt_nascimento: Yup.date().required(),
      email: Yup.string()
        .max(100, 'O email não pode exceder 100 caracteres.')
        .email('Email inválido')
        .required('É obrigatório informar o email.'),
      fase: Yup.number()
        .positive('O número informado deve ser positivo.')
        .lessThan(20, 'A fase não pode exceder de 20.')
        .required('É obrigatório informar a fase.'),
      nome: Yup.string()
        .max(100, 'O nome não pode exceder 12 caracteres.')
        .required('É obrigatório informar o nome'),
      orientador: Yup.string()
        .max(100, 'O orientador não pode exceder 100 caracteres.')
        .required('É obrigatório informar o orientador.'),
      sexo: Yup.string()
        .max(1, 'O campo sexo não pode exceder 1 caracter.')
        .oneOf(['M', 'F'], 'Sexo só pode receber valores F ou M.')
        .required('É obrigatório informar o sexo.'),
      trabalho: Yup.string()
        .max(150, 'O campo trabalho não pode exceder 150 caracteres.')
        .required('É obrigatório informar o trabalho'),
      password: Yup.string()
        .min(6, 'O campo password deve conter 6 caracteres.')
        .max(6, 'O campo password deve conter 6 caracteres.')
        .required('É obrigatório informar o campo password.'),
      id_curso: Yup.number().required('É obrigatório informar o curso.'),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      const { path, errors, message } = err;
      return res.status(400).json({ path, errors, message });
    }
    return next();
  }

  async update(req, res, next) {
    const maxMinMessage = 'A senha deve conter no máximo 6 caracteres.';

    const schema = Yup.object().shape({
      name: Yup.string(),
      oldPassword: Yup.string()
        .max(6, maxMinMessage)
        .min(6, maxMinMessage),
      password: Yup.string()
        .max(6, maxMinMessage)
        .min(6, maxMinMessage)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword
            ? field.required('É obrigatório informar a nova senha.')
            : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .oneOf(
                [Yup.ref('password')],
                'Nova senha e senha de confirmação não são iguais.'
              )
          : field
      ),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      const { path, errors, message } = err;
      return res.status(400).json({ path, errors, message });
    }

    return next();
  }
}

export default new UsuarioValidator();
