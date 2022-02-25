



const register = async(req, res) => {
   res.send('register user controller');
}

const login = async(req, res) => {
   res.send('login user controller');
}

const updateUser = async(req, res) => {
   res.send('updateUser user controller');
}

export {
   register,
   login,
   updateUser
}