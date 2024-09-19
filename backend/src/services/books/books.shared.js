export const bookPath = 'books'

export const bookMethods = ['find', 'get', 'create', 'patch']

export const bookClient = (client) => {
  const connection = client.get('connection')

  client.use(bookPath, connection.service(bookPath), {
    methods: bookMethods
  })
}
