export const googleBooksPath = 'google-books'

export const googleBooksMethods = ['find', 'get',]

export const googleBooksClient = (client) => {
  const connection = client.get('connection')

  client.use(googleBooksPath, connection.service(googleBooksPath), {
    methods: googleBooksMethods
  })
}
