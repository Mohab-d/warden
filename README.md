<img src="./public/images/wardenLogo.png" alt="Warden logo" width="200"/>

# Warden

This is an authentication API project that is built to be extensible, scalable, and maintainable.
I made this project mainly to see how design patterns help achieve a decoupled, easy to test system.

# Security practices

- Warden authentication human clients with `accessTokens` (short lived tokens) and `refreshTokens`(long lived tokens).
- Warden hashes the passwords and generated API keys using the Argon hashing algorithm.
- Warden stores all secrets and Database connection parameters in a `.env` file.

# Architecture

It consist of several components implemented with popular design patterns:

- Authentication manager
- Error handler
- Database layer
- Hash manager
- Schema validator

# Core components

We use the following objects mainly to add handling strategies

- `AuthStragetyRegistry`: use to store and retrieve authentication strategies
- `ErrorHandlingStrategyRegistry`: use to store and retrieve error handling strategies
- `SchemaValidatorFactory`: use to get a schema validator which implement the ISchemvaValidator interface
- `HashAlgorithmFactory`: use to get a hashing algorithm factory through and identifier or by the hash
- `RepoFactory`: use to get a repository to access data on the database

---

### Authentication Manager

> _Registry, Singleton, Strategy_

Authenticate clients using JWT tokens for human clients and API keys for bot client (apps and bots).

We create a new authentication strategy that implement the interface `IAuthStrategy` then we register
the strategy to the `AuthStrategyRegistry` with an identifier to retrieve it later.
Warden currently implement two strategies: `CustomerAuthStrategy` and `ThirdPartyAppAuthStrategy`.

The authentication manager is the **core** of warden, by using the Registry and strategy pattern, we
make warden largely scalable and we reduce bad code written to be only inside the strategies. This
is also very helpful when wanting to implement testing because you can unit test all the authentication
logic of a client by testing the strategy involved.

---

### Error Handler

> _Registry, Singleton, Strategy_

Define a consistent error structure and handling logic for the entire app.

We define `AbstractAppError` class that implements the `IAppError` interface, we define an abstract method
`getFormat()` to get a consistent error structure, We can now implement many type of errors. We implement
the concrete class `WardenError` which provide a set of static methods that construct a `WardenError`
to ensure a consistent error structure.

Each `IAppError` should choose a type from the `ErrorType` enum, For each value in the enum, we implement
a concrete strategy implementing `IErrorHandlingStrategy` interface then we register a function that
construct this strategy with the error type it's meant to handle.

We can now use the express centralized error handler middleware to write error handling logic, that
can handle the error and return a useful response to the client.

This architecture enable us to handle errors and the write logic to handle more errors as the project
grow in size and more errors are thrown, this also makes it easy to add logging since we can add the
logging logic in the handle() method of the handling strategies.

---

### Database Layer

> _Factory, Repository_

Define an abstract layer to interact with the database decoupling the business logic from the storage logic
and enabling us to swap the database or to use a new ORM technology anytime.

It's best to implement an interface for every repository implementation we write.

We define `RepoFactory` and some concrete implementations of the repos interfaces (see src/interface/repos)

---

### Hash manager

> _Factory, Chain of responsibility, Strategy_

Hashing algorithms evolve continuously, hash manager enable us to use any hashing algorithm.

We define an interface `IHashStrategy` and write a concrete implementation for a given strategy, Warden
support **Bcrypt** and **Argon**.

The `HashFactory` can create a hashing strategy to be used to hash passwords and API keys.
If the caller did not specify what algorithm they want, we return the preferred one, but what if a
client tried to login with a password hashed with the previous algorithm?. We provide a
`getAlgorithmFromHash()` method which will detect which algorithm is used for a given hash.

We use the **Chain of responsibility** pattern to chain parsers of the hashing algorithms. Now the
`HashFactory.getAlgorithmFromHash()` can call the head of the chain to now which algorithm is used to
hash the given hash. This ensures a seamless login experience and a convenient way to rehash the client password with the new algorithm.

---

- Schema validator

> _Factory, Adapter_

Protect the API from unsafe data sent by the clients.

The `SchemaValidatorFactory` enable us to use any schema validator we want, I used **Joi** in Warden.

We define an interface `ISchemvaValidator` which is used by Warden code to validate schemas, now we
implement `JoiSchemaValidator` which is an adapter that adapts the Joi error to `WardenError`.

---

### API response

> _Builder_

To assure a consistent response structure, we define an interface `IAPIAuthResponse` and use the builder
pattern to create our API response.

---

# Usage

Now, we can write few express end points that can handle all types of clients be delegating the work
to our authentication manager components.

---

# Testing

While not present yet, the current architecture was built to be easily tested, tests are coming in future
improvements

---

# Future plans

- Logging: With this architecture, adding logging is very easy.
- Rate limiting: Warden is a project to learn about Design patterns, so I will leave this for another day.
