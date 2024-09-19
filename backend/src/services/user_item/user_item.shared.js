export const userItemStatusPath = 'user_item'

export const userItemStatusMethods = ['find', 'get', 'create', 'patch', 'remove']

export const userItemClient = (client) => {
  const connection = client.get('connection')

  client.use(userItemStatusPath, connection.service(userItemStatusPath), {
    methods: userItemStatusMethods
  })
}
