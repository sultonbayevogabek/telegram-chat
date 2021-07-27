const { verifyToken } = require('../modules/jwt')

const dontEnterAuthorized = async (req, res, next) => {
   if (req.user) {
      return res.redirect('/')
   }
   next()
}

const dontEnterNotAuthorized = async (req, res, next) => {
   if (!req.user) {
      return res.redirect('/auth')
   }
   next()
}

const user = async (req, res, next) => {
   const token = req.cookies['token']

   if (token) {
      const { email } = verifyToken(token)

      const candidate = await req.db.users.findOne({
         where: { email }
      })

      if (candidate) {
         req.user = {
            id: candidate.userId,
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            email: candidate.email,
            avatar: candidate.avatar
         }
      } else {
         res.clearCookie('token')
      }
   }

   next()
}

module.exports = { dontEnterAuthorized, dontEnterNotAuthorized, user }