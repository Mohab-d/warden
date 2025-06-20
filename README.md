![project logo](./public/images/wardenLogo.png)

# Warden

This project provides a robust and extensible framework for handling authentication, error management, and data persistence in a TypeScript application. It leverages abstract classes, factories, and registries to promote a modular and maintainable design.

# Core Components

The system is built around several key abstract classes and their concrete implementations:

- **AbstractAppError**: A custom error class for standardized error handling. It provides detailed error information, including a type, a isWardenError flag (for safe client exposure), and a context object.
- **AuthStrategyRegistry**: A registry that stores factory functions that return a new instance
  of a pre-defined authentication strategy.
- **ErrorHandlingStrategyRegistry**: A registry that stores factory functions that return a new instance
  of a pre-defined error handling strategy.-
- **APIResBuilder**: A builder object used to construct a response to ensure a unified structure
  for the app response.
- **SchemaValidatorFactory**: An factory object that return an adapter object which adapt the error
  response of 3rd party schema validation libraries (zod, joi) to the AbstractAppError.

# Key Features

### Authentication Management

The **AuthStrategyRegistry** manages various authentication strategies. The **CustomerAuthStrategy** is a prime example, handling customer signup and login. It incorporates bcrypt for password hashing and generates JWT access and refresh tokens.

### Error Handling

A centralized errorHandler middleware processes **AbstractAppError** instances. It differentiates between trusted and untrusted errors, providing detailed responses for the former and generic messages for the latter. The **ErrorHandlingStrategyRegistry** allows you to register specific strategies for different ErrorTypes.

### Data Persistence

The **RepoFactory** creates repository instances based on your configured database (e.g., **PGCustomerRepo** for **PostgreSQL**). Repositories like **PGCustomerRepo** encapsulate database interactions, including transaction management and data duplication checks.

### Input Validation

The **SchemaValidatorFactory** creates schema validators, such as **JoiSchemaValidator**, which integrates Joi for request body validation. The **validateBody** middleware uses this to ensure incoming data conforms to defined schemas.

# Configuration

The **appConfigs** file centralizes essential application settings, including the server port, JWT secret and refresh keys, and the chosen database type.

# Usage Example

The **signupController** (found in /src/routes/auth/controllers/signupController.ts) illustrates how these components work together:

- It determines the client type from the request parameters.
- It retrieves the appropriate authentication strategy using authStrategiesRegistry.
- It calls the signup method of the selected strategy.
- Finally, it uses the APIResBuilder to construct a standardized API response.

This modular structure makes it easy to extend the application with new authentication methods, database types, or validation schemas.
