export default {
  jwt: {
    secret: `${process.env.TOKEN_SECRET}` as string,
    expiresIn: '1d'
  }
}
