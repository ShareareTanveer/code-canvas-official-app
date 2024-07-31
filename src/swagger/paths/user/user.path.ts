
/**
 * @swagger
 * paths:
 *   /user/me:
 *     get:
 *       summary: Get current user details
 *       tags: [User]
 *       responses:
 *         200:
 *           description: User details retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SimpleUserResponseDTO'
 *     patch:
 *       summary: Update current user details
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserDTO'
 *       responses:
 *         202:
 *           description: User details updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SimpleUserResponseDTO'
 *   /user:
 *     get:
 *       summary: List all users
 *       tags: [User]
 *       parameters:
 *         - in: query
 *           name: keyword
 *           schema:
 *             type: string
 *           description: Search keyword to filter users by email, phone, or user name.
 *         - in: query
 *           name: pagination
 *           schema:
 *             type: string
 *           description: Set pagination to true if you want to use pagination.
 *         - in: query
 *           name: user
 *           schema:
 *             type: string
 *           description: Filter users by user name.
 *         - in: query
 *           name: sortBy
 *           schema:
 *             type: string
 *             enum:
 *               - email
 *               - firstName
 *               - phone
 *           description: Field to sort users by.
 *           examples:
 *             email:
 *               summary: Sort by email
 *               value: email
 *             firstName:
 *               summary: Sort by firstName
 *               value: firstName
 *             phone:
 *               summary: Sort by phone
 *               value: phone
 *         - in: query
 *           name: sortOrder
 *           schema:
 *             type: string
 *             enum:
 *               - ASC
 *               - DESC
 *           description: Sort order.
 *           examples:
 *             ASC:
 *               summary: Sort in ascending order
 *               value: ASC
 *             DESC:
 *               summary: Sort in descending order
 *               value: DESC
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *             example: 10
 *           description: Number of users to return.
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *             example: 1
 *           description: Page number for pagination.
 *       responses:
 *         200:
 *           description: Users retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/SimpleUserResponseDTO'
 *     post:
 *       summary: Create a new user
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserDTO'
 *       responses:
 *         201:
 *           description: User created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SimpleUserResponseDTO'
 *   /user/{id}:
 *     get:
 *       summary: Get user details by ID
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *           required: true
 *           description: User ID
 *       responses:
 *         200:
 *           description: User details retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SimpleUserResponseDTO'
 *     patch:
 *       summary: Update user details by ID
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *           required: true
 *           description: User ID
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserByAdminDTO'
 *       responses:
 *         200:
 *           description: User details updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SimpleUserResponseDTO'
 *     delete:
 *       summary: Delete user by ID
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *           required: true
 *           description: User ID
 *       responses:
 *         200:
 *           description: User deleted successfully
 */