export const userItemPath = 'user_item'

export const userItemMethods = ['find', 'get', 'create', 'patch', 'remove']

export const userItemClient = (client) => {
  const connection = client.get('connection')

  client.use(userItemPath, connection.service(userItemPath), {
    methods: userItemMethods
  })
}
