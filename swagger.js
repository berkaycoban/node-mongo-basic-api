export default {
  swagger: '2.0',
  info: {
    description: 'This is a sample server.',
    version: '1.0.0',
    title: 'Basic User API',
  },
  host: 'localhost:3000',
  basePath: '/',
  tags: [
    {
      name: 'users',
      description: 'Operations about user',
    },
  ],
  schemes: ['http'],
  paths: {
    '/users': {
      get: {
        tags: ['users'],
        summary: 'Get all users',
        description: 'This can only be done get all users',
        operationId: 'getAllUsers',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          404: {
            description: 'Users not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
      post: {
        tags: ['users'],
        summary: 'Create user',
        description: 'This can only be done create a new user',
        operationId: 'createUser',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Created user object',
            required: true,
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
    '/users/{username}': {
      get: {
        tags: ['users'],
        summary: 'Get user by user name',
        description: 'This can only be done get user with matched username',
        operationId: 'getUserByUsername',
        produces: ['application/json'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description:
              'The name that needs to be fetched. Use user1 for testing. ',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          404: {
            description: 'User not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
      put: {
        tags: ['users'],
        summary: 'Updated user',
        description: 'This can only be done update user with matched username.',
        operationId: 'updateUser',
        produces: ['application/json'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'name that need to be updated',
            required: true,
            type: 'string',
          },
          {
            in: 'body',
            name: 'body',
            description: 'Updated user object',
            required: true,
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        responses: {
          400: {
            description: 'Invalid user supplied',
          },
          404: {
            description: 'User not found',
          },
        },
      },
      delete: {
        tags: ['users'],
        summary: 'Delete user',
        description:
          'This can only be done delete a user with mathced username.',
        operationId: 'deleteUser',
        produces: ['application/json'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'The name that needs to be deleted',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
          },
          404: {
            description: 'User not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
  },
  definitions: {
    User: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        name: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            first: {
              type: 'string',
            },
            last: {
              type: 'string',
            },
          },
        },
        email: {
          type: 'string',
        },
        gender: {
          type: 'string',
        },
        fullName: {
          type: 'string',
        },
      },
    },
  },
};
