
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Tutor
 * 
 */
export type Tutor = $Result.DefaultSelection<Prisma.$TutorPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model IntakeData
 * 
 */
export type IntakeData = $Result.DefaultSelection<Prisma.$IntakeDataPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model RehabRoutine
 * 
 */
export type RehabRoutine = $Result.DefaultSelection<Prisma.$RehabRoutinePayload>
/**
 * Model PatientRoutine
 * 
 */
export type PatientRoutine = $Result.DefaultSelection<Prisma.$PatientRoutinePayload>
/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.tutor`: Exposes CRUD operations for the **Tutor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tutors
    * const tutors = await prisma.tutor.findMany()
    * ```
    */
  get tutor(): Prisma.TutorDelegate<ExtArgs>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs>;

  /**
   * `prisma.intakeData`: Exposes CRUD operations for the **IntakeData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IntakeData
    * const intakeData = await prisma.intakeData.findMany()
    * ```
    */
  get intakeData(): Prisma.IntakeDataDelegate<ExtArgs>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs>;

  /**
   * `prisma.rehabRoutine`: Exposes CRUD operations for the **RehabRoutine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RehabRoutines
    * const rehabRoutines = await prisma.rehabRoutine.findMany()
    * ```
    */
  get rehabRoutine(): Prisma.RehabRoutineDelegate<ExtArgs>;

  /**
   * `prisma.patientRoutine`: Exposes CRUD operations for the **PatientRoutine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientRoutines
    * const patientRoutines = await prisma.patientRoutine.findMany()
    * ```
    */
  get patientRoutine(): Prisma.PatientRoutineDelegate<ExtArgs>;

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Tutor: 'Tutor',
    Patient: 'Patient',
    IntakeData: 'IntakeData',
    Appointment: 'Appointment',
    RehabRoutine: 'RehabRoutine',
    PatientRoutine: 'PatientRoutine',
    Plan: 'Plan',
    Message: 'Message'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "tutor" | "patient" | "intakeData" | "appointment" | "rehabRoutine" | "patientRoutine" | "plan" | "message"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Tutor: {
        payload: Prisma.$TutorPayload<ExtArgs>
        fields: Prisma.TutorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TutorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TutorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload>
          }
          findFirst: {
            args: Prisma.TutorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TutorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload>
          }
          findMany: {
            args: Prisma.TutorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload>[]
          }
          create: {
            args: Prisma.TutorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload>
          }
          createMany: {
            args: Prisma.TutorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TutorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload>[]
          }
          delete: {
            args: Prisma.TutorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload>
          }
          update: {
            args: Prisma.TutorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload>
          }
          deleteMany: {
            args: Prisma.TutorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TutorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TutorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorPayload>
          }
          aggregate: {
            args: Prisma.TutorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTutor>
          }
          groupBy: {
            args: Prisma.TutorGroupByArgs<ExtArgs>
            result: $Utils.Optional<TutorGroupByOutputType>[]
          }
          count: {
            args: Prisma.TutorCountArgs<ExtArgs>
            result: $Utils.Optional<TutorCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      IntakeData: {
        payload: Prisma.$IntakeDataPayload<ExtArgs>
        fields: Prisma.IntakeDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IntakeDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IntakeDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload>
          }
          findFirst: {
            args: Prisma.IntakeDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IntakeDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload>
          }
          findMany: {
            args: Prisma.IntakeDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload>[]
          }
          create: {
            args: Prisma.IntakeDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload>
          }
          createMany: {
            args: Prisma.IntakeDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IntakeDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload>[]
          }
          delete: {
            args: Prisma.IntakeDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload>
          }
          update: {
            args: Prisma.IntakeDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload>
          }
          deleteMany: {
            args: Prisma.IntakeDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IntakeDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.IntakeDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntakeDataPayload>
          }
          aggregate: {
            args: Prisma.IntakeDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIntakeData>
          }
          groupBy: {
            args: Prisma.IntakeDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<IntakeDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.IntakeDataCountArgs<ExtArgs>
            result: $Utils.Optional<IntakeDataCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      RehabRoutine: {
        payload: Prisma.$RehabRoutinePayload<ExtArgs>
        fields: Prisma.RehabRoutineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RehabRoutineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RehabRoutineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload>
          }
          findFirst: {
            args: Prisma.RehabRoutineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RehabRoutineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload>
          }
          findMany: {
            args: Prisma.RehabRoutineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload>[]
          }
          create: {
            args: Prisma.RehabRoutineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload>
          }
          createMany: {
            args: Prisma.RehabRoutineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RehabRoutineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload>[]
          }
          delete: {
            args: Prisma.RehabRoutineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload>
          }
          update: {
            args: Prisma.RehabRoutineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload>
          }
          deleteMany: {
            args: Prisma.RehabRoutineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RehabRoutineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RehabRoutineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RehabRoutinePayload>
          }
          aggregate: {
            args: Prisma.RehabRoutineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRehabRoutine>
          }
          groupBy: {
            args: Prisma.RehabRoutineGroupByArgs<ExtArgs>
            result: $Utils.Optional<RehabRoutineGroupByOutputType>[]
          }
          count: {
            args: Prisma.RehabRoutineCountArgs<ExtArgs>
            result: $Utils.Optional<RehabRoutineCountAggregateOutputType> | number
          }
        }
      }
      PatientRoutine: {
        payload: Prisma.$PatientRoutinePayload<ExtArgs>
        fields: Prisma.PatientRoutineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientRoutineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientRoutineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload>
          }
          findFirst: {
            args: Prisma.PatientRoutineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientRoutineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload>
          }
          findMany: {
            args: Prisma.PatientRoutineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload>[]
          }
          create: {
            args: Prisma.PatientRoutineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload>
          }
          createMany: {
            args: Prisma.PatientRoutineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientRoutineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload>[]
          }
          delete: {
            args: Prisma.PatientRoutineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload>
          }
          update: {
            args: Prisma.PatientRoutineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload>
          }
          deleteMany: {
            args: Prisma.PatientRoutineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientRoutineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientRoutineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientRoutinePayload>
          }
          aggregate: {
            args: Prisma.PatientRoutineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientRoutine>
          }
          groupBy: {
            args: Prisma.PatientRoutineGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientRoutineGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientRoutineCountArgs<ExtArgs>
            result: $Utils.Optional<PatientRoutineCountAggregateOutputType> | number
          }
        }
      }
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    messages: number
    appointments: number
    plans: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | UserCountOutputTypeCountMessagesArgs
    appointments?: boolean | UserCountOutputTypeCountAppointmentsArgs
    plans?: boolean | UserCountOutputTypeCountPlansArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
  }


  /**
   * Count Type TutorCountOutputType
   */

  export type TutorCountOutputType = {
    patients: number
    messages: number
  }

  export type TutorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patients?: boolean | TutorCountOutputTypeCountPatientsArgs
    messages?: boolean | TutorCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * TutorCountOutputType without action
   */
  export type TutorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorCountOutputType
     */
    select?: TutorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TutorCountOutputType without action
   */
  export type TutorCountOutputTypeCountPatientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
  }

  /**
   * TutorCountOutputType without action
   */
  export type TutorCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    appointments: number
    rehabRoutines: number
    plans: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | PatientCountOutputTypeCountAppointmentsArgs
    rehabRoutines?: boolean | PatientCountOutputTypeCountRehabRoutinesArgs
    plans?: boolean | PatientCountOutputTypeCountPlansArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountRehabRoutinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientRoutineWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
  }


  /**
   * Count Type RehabRoutineCountOutputType
   */

  export type RehabRoutineCountOutputType = {
    patientRoutines: number
  }

  export type RehabRoutineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patientRoutines?: boolean | RehabRoutineCountOutputTypeCountPatientRoutinesArgs
  }

  // Custom InputTypes
  /**
   * RehabRoutineCountOutputType without action
   */
  export type RehabRoutineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutineCountOutputType
     */
    select?: RehabRoutineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RehabRoutineCountOutputType without action
   */
  export type RehabRoutineCountOutputTypeCountPatientRoutinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientRoutineWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | User$messagesArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    plans?: boolean | User$plansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | User$messagesArgs<ExtArgs>
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    plans?: boolean | User$plansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      plans: Prisma.$PlanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends User$messagesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    appointments<T extends User$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany"> | Null>
    plans<T extends User$plansArgs<ExtArgs> = {}>(args?: Subset<T, User$plansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.messages
   */
  export type User$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.appointments
   */
  export type User$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User.plans
   */
  export type User$plansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    cursor?: PlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Tutor
   */

  export type AggregateTutor = {
    _count: TutorCountAggregateOutputType | null
    _avg: TutorAvgAggregateOutputType | null
    _sum: TutorSumAggregateOutputType | null
    _min: TutorMinAggregateOutputType | null
    _max: TutorMaxAggregateOutputType | null
  }

  export type TutorAvgAggregateOutputType = {
    id: number | null
  }

  export type TutorSumAggregateOutputType = {
    id: number | null
  }

  export type TutorMinAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    email: string | null
    howFoundUs: string | null
    portalEmail: string | null
    portalPassword: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TutorMaxAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    email: string | null
    howFoundUs: string | null
    portalEmail: string | null
    portalPassword: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TutorCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    howFoundUs: number
    portalEmail: number
    portalPassword: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TutorAvgAggregateInputType = {
    id?: true
  }

  export type TutorSumAggregateInputType = {
    id?: true
  }

  export type TutorMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    howFoundUs?: true
    portalEmail?: true
    portalPassword?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TutorMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    howFoundUs?: true
    portalEmail?: true
    portalPassword?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TutorCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    howFoundUs?: true
    portalEmail?: true
    portalPassword?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TutorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tutor to aggregate.
     */
    where?: TutorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tutors to fetch.
     */
    orderBy?: TutorOrderByWithRelationInput | TutorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TutorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tutors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tutors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tutors
    **/
    _count?: true | TutorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TutorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TutorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TutorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TutorMaxAggregateInputType
  }

  export type GetTutorAggregateType<T extends TutorAggregateArgs> = {
        [P in keyof T & keyof AggregateTutor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTutor[P]>
      : GetScalarType<T[P], AggregateTutor[P]>
  }




  export type TutorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TutorWhereInput
    orderBy?: TutorOrderByWithAggregationInput | TutorOrderByWithAggregationInput[]
    by: TutorScalarFieldEnum[] | TutorScalarFieldEnum
    having?: TutorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TutorCountAggregateInputType | true
    _avg?: TutorAvgAggregateInputType
    _sum?: TutorSumAggregateInputType
    _min?: TutorMinAggregateInputType
    _max?: TutorMaxAggregateInputType
  }

  export type TutorGroupByOutputType = {
    id: number
    name: string
    phone: string
    email: string | null
    howFoundUs: string | null
    portalEmail: string | null
    portalPassword: string | null
    createdAt: Date
    updatedAt: Date
    _count: TutorCountAggregateOutputType | null
    _avg: TutorAvgAggregateOutputType | null
    _sum: TutorSumAggregateOutputType | null
    _min: TutorMinAggregateOutputType | null
    _max: TutorMaxAggregateOutputType | null
  }

  type GetTutorGroupByPayload<T extends TutorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TutorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TutorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TutorGroupByOutputType[P]>
            : GetScalarType<T[P], TutorGroupByOutputType[P]>
        }
      >
    >


  export type TutorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    howFoundUs?: boolean
    portalEmail?: boolean
    portalPassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patients?: boolean | Tutor$patientsArgs<ExtArgs>
    messages?: boolean | Tutor$messagesArgs<ExtArgs>
    _count?: boolean | TutorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tutor"]>

  export type TutorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    howFoundUs?: boolean
    portalEmail?: boolean
    portalPassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tutor"]>

  export type TutorSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    howFoundUs?: boolean
    portalEmail?: boolean
    portalPassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TutorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patients?: boolean | Tutor$patientsArgs<ExtArgs>
    messages?: boolean | Tutor$messagesArgs<ExtArgs>
    _count?: boolean | TutorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TutorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TutorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tutor"
    objects: {
      patients: Prisma.$PatientPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      phone: string
      email: string | null
      howFoundUs: string | null
      portalEmail: string | null
      portalPassword: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tutor"]>
    composites: {}
  }

  type TutorGetPayload<S extends boolean | null | undefined | TutorDefaultArgs> = $Result.GetResult<Prisma.$TutorPayload, S>

  type TutorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TutorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TutorCountAggregateInputType | true
    }

  export interface TutorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tutor'], meta: { name: 'Tutor' } }
    /**
     * Find zero or one Tutor that matches the filter.
     * @param {TutorFindUniqueArgs} args - Arguments to find a Tutor
     * @example
     * // Get one Tutor
     * const tutor = await prisma.tutor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TutorFindUniqueArgs>(args: SelectSubset<T, TutorFindUniqueArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tutor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TutorFindUniqueOrThrowArgs} args - Arguments to find a Tutor
     * @example
     * // Get one Tutor
     * const tutor = await prisma.tutor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TutorFindUniqueOrThrowArgs>(args: SelectSubset<T, TutorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tutor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorFindFirstArgs} args - Arguments to find a Tutor
     * @example
     * // Get one Tutor
     * const tutor = await prisma.tutor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TutorFindFirstArgs>(args?: SelectSubset<T, TutorFindFirstArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tutor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorFindFirstOrThrowArgs} args - Arguments to find a Tutor
     * @example
     * // Get one Tutor
     * const tutor = await prisma.tutor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TutorFindFirstOrThrowArgs>(args?: SelectSubset<T, TutorFindFirstOrThrowArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tutors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tutors
     * const tutors = await prisma.tutor.findMany()
     * 
     * // Get first 10 Tutors
     * const tutors = await prisma.tutor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tutorWithIdOnly = await prisma.tutor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TutorFindManyArgs>(args?: SelectSubset<T, TutorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tutor.
     * @param {TutorCreateArgs} args - Arguments to create a Tutor.
     * @example
     * // Create one Tutor
     * const Tutor = await prisma.tutor.create({
     *   data: {
     *     // ... data to create a Tutor
     *   }
     * })
     * 
     */
    create<T extends TutorCreateArgs>(args: SelectSubset<T, TutorCreateArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tutors.
     * @param {TutorCreateManyArgs} args - Arguments to create many Tutors.
     * @example
     * // Create many Tutors
     * const tutor = await prisma.tutor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TutorCreateManyArgs>(args?: SelectSubset<T, TutorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tutors and returns the data saved in the database.
     * @param {TutorCreateManyAndReturnArgs} args - Arguments to create many Tutors.
     * @example
     * // Create many Tutors
     * const tutor = await prisma.tutor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tutors and only return the `id`
     * const tutorWithIdOnly = await prisma.tutor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TutorCreateManyAndReturnArgs>(args?: SelectSubset<T, TutorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tutor.
     * @param {TutorDeleteArgs} args - Arguments to delete one Tutor.
     * @example
     * // Delete one Tutor
     * const Tutor = await prisma.tutor.delete({
     *   where: {
     *     // ... filter to delete one Tutor
     *   }
     * })
     * 
     */
    delete<T extends TutorDeleteArgs>(args: SelectSubset<T, TutorDeleteArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tutor.
     * @param {TutorUpdateArgs} args - Arguments to update one Tutor.
     * @example
     * // Update one Tutor
     * const tutor = await prisma.tutor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TutorUpdateArgs>(args: SelectSubset<T, TutorUpdateArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tutors.
     * @param {TutorDeleteManyArgs} args - Arguments to filter Tutors to delete.
     * @example
     * // Delete a few Tutors
     * const { count } = await prisma.tutor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TutorDeleteManyArgs>(args?: SelectSubset<T, TutorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tutors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tutors
     * const tutor = await prisma.tutor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TutorUpdateManyArgs>(args: SelectSubset<T, TutorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tutor.
     * @param {TutorUpsertArgs} args - Arguments to update or create a Tutor.
     * @example
     * // Update or create a Tutor
     * const tutor = await prisma.tutor.upsert({
     *   create: {
     *     // ... data to create a Tutor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tutor we want to update
     *   }
     * })
     */
    upsert<T extends TutorUpsertArgs>(args: SelectSubset<T, TutorUpsertArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tutors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorCountArgs} args - Arguments to filter Tutors to count.
     * @example
     * // Count the number of Tutors
     * const count = await prisma.tutor.count({
     *   where: {
     *     // ... the filter for the Tutors we want to count
     *   }
     * })
    **/
    count<T extends TutorCountArgs>(
      args?: Subset<T, TutorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TutorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tutor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TutorAggregateArgs>(args: Subset<T, TutorAggregateArgs>): Prisma.PrismaPromise<GetTutorAggregateType<T>>

    /**
     * Group by Tutor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TutorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TutorGroupByArgs['orderBy'] }
        : { orderBy?: TutorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TutorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTutorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tutor model
   */
  readonly fields: TutorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tutor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TutorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patients<T extends Tutor$patientsArgs<ExtArgs> = {}>(args?: Subset<T, Tutor$patientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany"> | Null>
    messages<T extends Tutor$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Tutor$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tutor model
   */ 
  interface TutorFieldRefs {
    readonly id: FieldRef<"Tutor", 'Int'>
    readonly name: FieldRef<"Tutor", 'String'>
    readonly phone: FieldRef<"Tutor", 'String'>
    readonly email: FieldRef<"Tutor", 'String'>
    readonly howFoundUs: FieldRef<"Tutor", 'String'>
    readonly portalEmail: FieldRef<"Tutor", 'String'>
    readonly portalPassword: FieldRef<"Tutor", 'String'>
    readonly createdAt: FieldRef<"Tutor", 'DateTime'>
    readonly updatedAt: FieldRef<"Tutor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tutor findUnique
   */
  export type TutorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    /**
     * Filter, which Tutor to fetch.
     */
    where: TutorWhereUniqueInput
  }

  /**
   * Tutor findUniqueOrThrow
   */
  export type TutorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    /**
     * Filter, which Tutor to fetch.
     */
    where: TutorWhereUniqueInput
  }

  /**
   * Tutor findFirst
   */
  export type TutorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    /**
     * Filter, which Tutor to fetch.
     */
    where?: TutorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tutors to fetch.
     */
    orderBy?: TutorOrderByWithRelationInput | TutorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tutors.
     */
    cursor?: TutorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tutors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tutors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tutors.
     */
    distinct?: TutorScalarFieldEnum | TutorScalarFieldEnum[]
  }

  /**
   * Tutor findFirstOrThrow
   */
  export type TutorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    /**
     * Filter, which Tutor to fetch.
     */
    where?: TutorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tutors to fetch.
     */
    orderBy?: TutorOrderByWithRelationInput | TutorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tutors.
     */
    cursor?: TutorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tutors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tutors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tutors.
     */
    distinct?: TutorScalarFieldEnum | TutorScalarFieldEnum[]
  }

  /**
   * Tutor findMany
   */
  export type TutorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    /**
     * Filter, which Tutors to fetch.
     */
    where?: TutorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tutors to fetch.
     */
    orderBy?: TutorOrderByWithRelationInput | TutorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tutors.
     */
    cursor?: TutorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tutors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tutors.
     */
    skip?: number
    distinct?: TutorScalarFieldEnum | TutorScalarFieldEnum[]
  }

  /**
   * Tutor create
   */
  export type TutorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    /**
     * The data needed to create a Tutor.
     */
    data: XOR<TutorCreateInput, TutorUncheckedCreateInput>
  }

  /**
   * Tutor createMany
   */
  export type TutorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tutors.
     */
    data: TutorCreateManyInput | TutorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tutor createManyAndReturn
   */
  export type TutorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tutors.
     */
    data: TutorCreateManyInput | TutorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tutor update
   */
  export type TutorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    /**
     * The data needed to update a Tutor.
     */
    data: XOR<TutorUpdateInput, TutorUncheckedUpdateInput>
    /**
     * Choose, which Tutor to update.
     */
    where: TutorWhereUniqueInput
  }

  /**
   * Tutor updateMany
   */
  export type TutorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tutors.
     */
    data: XOR<TutorUpdateManyMutationInput, TutorUncheckedUpdateManyInput>
    /**
     * Filter which Tutors to update
     */
    where?: TutorWhereInput
  }

  /**
   * Tutor upsert
   */
  export type TutorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    /**
     * The filter to search for the Tutor to update in case it exists.
     */
    where: TutorWhereUniqueInput
    /**
     * In case the Tutor found by the `where` argument doesn't exist, create a new Tutor with this data.
     */
    create: XOR<TutorCreateInput, TutorUncheckedCreateInput>
    /**
     * In case the Tutor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TutorUpdateInput, TutorUncheckedUpdateInput>
  }

  /**
   * Tutor delete
   */
  export type TutorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    /**
     * Filter which Tutor to delete.
     */
    where: TutorWhereUniqueInput
  }

  /**
   * Tutor deleteMany
   */
  export type TutorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tutors to delete
     */
    where?: TutorWhereInput
  }

  /**
   * Tutor.patients
   */
  export type Tutor$patientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    cursor?: PatientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Tutor.messages
   */
  export type Tutor$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Tutor without action
   */
  export type TutorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientAvgAggregateOutputType = {
    id: number | null
    tutorId: number | null
  }

  export type PatientSumAggregateOutputType = {
    id: number | null
    tutorId: number | null
  }

  export type PatientMinAggregateOutputType = {
    id: number | null
    name: string | null
    species: string | null
    breed: string | null
    birthDate: string | null
    weight: string | null
    sex: string | null
    neutered: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    tutorId: number | null
  }

  export type PatientMaxAggregateOutputType = {
    id: number | null
    name: string | null
    species: string | null
    breed: string | null
    birthDate: string | null
    weight: string | null
    sex: string | null
    neutered: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    tutorId: number | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    name: number
    species: number
    breed: number
    birthDate: number
    weight: number
    sex: number
    neutered: number
    active: number
    createdAt: number
    updatedAt: number
    tutorId: number
    _all: number
  }


  export type PatientAvgAggregateInputType = {
    id?: true
    tutorId?: true
  }

  export type PatientSumAggregateInputType = {
    id?: true
    tutorId?: true
  }

  export type PatientMinAggregateInputType = {
    id?: true
    name?: true
    species?: true
    breed?: true
    birthDate?: true
    weight?: true
    sex?: true
    neutered?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    tutorId?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    name?: true
    species?: true
    breed?: true
    birthDate?: true
    weight?: true
    sex?: true
    neutered?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    tutorId?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    name?: true
    species?: true
    breed?: true
    birthDate?: true
    weight?: true
    sex?: true
    neutered?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    tutorId?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _avg?: PatientAvgAggregateInputType
    _sum?: PatientSumAggregateInputType
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: number
    name: string
    species: string
    breed: string | null
    birthDate: string | null
    weight: string | null
    sex: string | null
    neutered: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    tutorId: number
    _count: PatientCountAggregateOutputType | null
    _avg: PatientAvgAggregateOutputType | null
    _sum: PatientSumAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    species?: boolean
    breed?: boolean
    birthDate?: boolean
    weight?: boolean
    sex?: boolean
    neutered?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tutorId?: boolean
    tutor?: boolean | TutorDefaultArgs<ExtArgs>
    intakeData?: boolean | Patient$intakeDataArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    rehabRoutines?: boolean | Patient$rehabRoutinesArgs<ExtArgs>
    plans?: boolean | Patient$plansArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    species?: boolean
    breed?: boolean
    birthDate?: boolean
    weight?: boolean
    sex?: boolean
    neutered?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tutorId?: boolean
    tutor?: boolean | TutorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    name?: boolean
    species?: boolean
    breed?: boolean
    birthDate?: boolean
    weight?: boolean
    sex?: boolean
    neutered?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tutorId?: boolean
  }

  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutor?: boolean | TutorDefaultArgs<ExtArgs>
    intakeData?: boolean | Patient$intakeDataArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    rehabRoutines?: boolean | Patient$rehabRoutinesArgs<ExtArgs>
    plans?: boolean | Patient$plansArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutor?: boolean | TutorDefaultArgs<ExtArgs>
  }

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      tutor: Prisma.$TutorPayload<ExtArgs>
      intakeData: Prisma.$IntakeDataPayload<ExtArgs> | null
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      rehabRoutines: Prisma.$PatientRoutinePayload<ExtArgs>[]
      plans: Prisma.$PlanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      species: string
      breed: string | null
      birthDate: string | null
      weight: string | null
      sex: string | null
      neutered: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
      tutorId: number
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tutor<T extends TutorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TutorDefaultArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    intakeData<T extends Patient$intakeDataArgs<ExtArgs> = {}>(args?: Subset<T, Patient$intakeDataArgs<ExtArgs>>): Prisma__IntakeDataClient<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    appointments<T extends Patient$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany"> | Null>
    rehabRoutines<T extends Patient$rehabRoutinesArgs<ExtArgs> = {}>(args?: Subset<T, Patient$rehabRoutinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "findMany"> | Null>
    plans<T extends Patient$plansArgs<ExtArgs> = {}>(args?: Subset<T, Patient$plansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */ 
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'Int'>
    readonly name: FieldRef<"Patient", 'String'>
    readonly species: FieldRef<"Patient", 'String'>
    readonly breed: FieldRef<"Patient", 'String'>
    readonly birthDate: FieldRef<"Patient", 'String'>
    readonly weight: FieldRef<"Patient", 'String'>
    readonly sex: FieldRef<"Patient", 'String'>
    readonly neutered: FieldRef<"Patient", 'String'>
    readonly active: FieldRef<"Patient", 'Boolean'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
    readonly tutorId: FieldRef<"Patient", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
  }

  /**
   * Patient.intakeData
   */
  export type Patient$intakeDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    where?: IntakeDataWhereInput
  }

  /**
   * Patient.appointments
   */
  export type Patient$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Patient.rehabRoutines
   */
  export type Patient$rehabRoutinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    where?: PatientRoutineWhereInput
    orderBy?: PatientRoutineOrderByWithRelationInput | PatientRoutineOrderByWithRelationInput[]
    cursor?: PatientRoutineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientRoutineScalarFieldEnum | PatientRoutineScalarFieldEnum[]
  }

  /**
   * Patient.plans
   */
  export type Patient$plansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    cursor?: PlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model IntakeData
   */

  export type AggregateIntakeData = {
    _count: IntakeDataCountAggregateOutputType | null
    _avg: IntakeDataAvgAggregateOutputType | null
    _sum: IntakeDataSumAggregateOutputType | null
    _min: IntakeDataMinAggregateOutputType | null
    _max: IntakeDataMaxAggregateOutputType | null
  }

  export type IntakeDataAvgAggregateOutputType = {
    id: number | null
    patientId: number | null
  }

  export type IntakeDataSumAggregateOutputType = {
    id: number | null
    patientId: number | null
  }

  export type IntakeDataMinAggregateOutputType = {
    id: number | null
    patientId: number | null
    motivoConsulta: string | null
    desdeCuando: string | null
    inicioSintomas: string | null
    momentosPeorMejor: string | null
    sintomasObservados: string | null
    dolorAlComer: string | null
    lesionesPrevias: string | null
    cirugiaPrevia: string | null
    cirugiaDetalle: string | null
    diagnosticoPrevio: string | null
    medicacion: string | null
    medicacionDetalle: string | null
    fisioterapiaPrevia: string | null
    fisioterapiaDetalle: string | null
    mejoriaCon: string | null
    veterinarioRef: string | null
    nivelActividad: string | null
    tipoPaseos: string | null
    dondeDuerme: string | null
    escaleras: string | null
    observaciones: string | null
    objetivos: string | null
    createdAt: Date | null
  }

  export type IntakeDataMaxAggregateOutputType = {
    id: number | null
    patientId: number | null
    motivoConsulta: string | null
    desdeCuando: string | null
    inicioSintomas: string | null
    momentosPeorMejor: string | null
    sintomasObservados: string | null
    dolorAlComer: string | null
    lesionesPrevias: string | null
    cirugiaPrevia: string | null
    cirugiaDetalle: string | null
    diagnosticoPrevio: string | null
    medicacion: string | null
    medicacionDetalle: string | null
    fisioterapiaPrevia: string | null
    fisioterapiaDetalle: string | null
    mejoriaCon: string | null
    veterinarioRef: string | null
    nivelActividad: string | null
    tipoPaseos: string | null
    dondeDuerme: string | null
    escaleras: string | null
    observaciones: string | null
    objetivos: string | null
    createdAt: Date | null
  }

  export type IntakeDataCountAggregateOutputType = {
    id: number
    patientId: number
    motivoConsulta: number
    desdeCuando: number
    inicioSintomas: number
    momentosPeorMejor: number
    sintomasObservados: number
    dolorAlComer: number
    lesionesPrevias: number
    cirugiaPrevia: number
    cirugiaDetalle: number
    diagnosticoPrevio: number
    medicacion: number
    medicacionDetalle: number
    fisioterapiaPrevia: number
    fisioterapiaDetalle: number
    mejoriaCon: number
    veterinarioRef: number
    nivelActividad: number
    tipoPaseos: number
    dondeDuerme: number
    escaleras: number
    observaciones: number
    objetivos: number
    createdAt: number
    _all: number
  }


  export type IntakeDataAvgAggregateInputType = {
    id?: true
    patientId?: true
  }

  export type IntakeDataSumAggregateInputType = {
    id?: true
    patientId?: true
  }

  export type IntakeDataMinAggregateInputType = {
    id?: true
    patientId?: true
    motivoConsulta?: true
    desdeCuando?: true
    inicioSintomas?: true
    momentosPeorMejor?: true
    sintomasObservados?: true
    dolorAlComer?: true
    lesionesPrevias?: true
    cirugiaPrevia?: true
    cirugiaDetalle?: true
    diagnosticoPrevio?: true
    medicacion?: true
    medicacionDetalle?: true
    fisioterapiaPrevia?: true
    fisioterapiaDetalle?: true
    mejoriaCon?: true
    veterinarioRef?: true
    nivelActividad?: true
    tipoPaseos?: true
    dondeDuerme?: true
    escaleras?: true
    observaciones?: true
    objetivos?: true
    createdAt?: true
  }

  export type IntakeDataMaxAggregateInputType = {
    id?: true
    patientId?: true
    motivoConsulta?: true
    desdeCuando?: true
    inicioSintomas?: true
    momentosPeorMejor?: true
    sintomasObservados?: true
    dolorAlComer?: true
    lesionesPrevias?: true
    cirugiaPrevia?: true
    cirugiaDetalle?: true
    diagnosticoPrevio?: true
    medicacion?: true
    medicacionDetalle?: true
    fisioterapiaPrevia?: true
    fisioterapiaDetalle?: true
    mejoriaCon?: true
    veterinarioRef?: true
    nivelActividad?: true
    tipoPaseos?: true
    dondeDuerme?: true
    escaleras?: true
    observaciones?: true
    objetivos?: true
    createdAt?: true
  }

  export type IntakeDataCountAggregateInputType = {
    id?: true
    patientId?: true
    motivoConsulta?: true
    desdeCuando?: true
    inicioSintomas?: true
    momentosPeorMejor?: true
    sintomasObservados?: true
    dolorAlComer?: true
    lesionesPrevias?: true
    cirugiaPrevia?: true
    cirugiaDetalle?: true
    diagnosticoPrevio?: true
    medicacion?: true
    medicacionDetalle?: true
    fisioterapiaPrevia?: true
    fisioterapiaDetalle?: true
    mejoriaCon?: true
    veterinarioRef?: true
    nivelActividad?: true
    tipoPaseos?: true
    dondeDuerme?: true
    escaleras?: true
    observaciones?: true
    objetivos?: true
    createdAt?: true
    _all?: true
  }

  export type IntakeDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IntakeData to aggregate.
     */
    where?: IntakeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntakeData to fetch.
     */
    orderBy?: IntakeDataOrderByWithRelationInput | IntakeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IntakeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntakeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntakeData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IntakeData
    **/
    _count?: true | IntakeDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IntakeDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IntakeDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IntakeDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IntakeDataMaxAggregateInputType
  }

  export type GetIntakeDataAggregateType<T extends IntakeDataAggregateArgs> = {
        [P in keyof T & keyof AggregateIntakeData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIntakeData[P]>
      : GetScalarType<T[P], AggregateIntakeData[P]>
  }




  export type IntakeDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IntakeDataWhereInput
    orderBy?: IntakeDataOrderByWithAggregationInput | IntakeDataOrderByWithAggregationInput[]
    by: IntakeDataScalarFieldEnum[] | IntakeDataScalarFieldEnum
    having?: IntakeDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IntakeDataCountAggregateInputType | true
    _avg?: IntakeDataAvgAggregateInputType
    _sum?: IntakeDataSumAggregateInputType
    _min?: IntakeDataMinAggregateInputType
    _max?: IntakeDataMaxAggregateInputType
  }

  export type IntakeDataGroupByOutputType = {
    id: number
    patientId: number
    motivoConsulta: string | null
    desdeCuando: string | null
    inicioSintomas: string | null
    momentosPeorMejor: string | null
    sintomasObservados: string | null
    dolorAlComer: string | null
    lesionesPrevias: string | null
    cirugiaPrevia: string | null
    cirugiaDetalle: string | null
    diagnosticoPrevio: string | null
    medicacion: string | null
    medicacionDetalle: string | null
    fisioterapiaPrevia: string | null
    fisioterapiaDetalle: string | null
    mejoriaCon: string | null
    veterinarioRef: string | null
    nivelActividad: string | null
    tipoPaseos: string | null
    dondeDuerme: string | null
    escaleras: string | null
    observaciones: string | null
    objetivos: string | null
    createdAt: Date
    _count: IntakeDataCountAggregateOutputType | null
    _avg: IntakeDataAvgAggregateOutputType | null
    _sum: IntakeDataSumAggregateOutputType | null
    _min: IntakeDataMinAggregateOutputType | null
    _max: IntakeDataMaxAggregateOutputType | null
  }

  type GetIntakeDataGroupByPayload<T extends IntakeDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IntakeDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IntakeDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IntakeDataGroupByOutputType[P]>
            : GetScalarType<T[P], IntakeDataGroupByOutputType[P]>
        }
      >
    >


  export type IntakeDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    motivoConsulta?: boolean
    desdeCuando?: boolean
    inicioSintomas?: boolean
    momentosPeorMejor?: boolean
    sintomasObservados?: boolean
    dolorAlComer?: boolean
    lesionesPrevias?: boolean
    cirugiaPrevia?: boolean
    cirugiaDetalle?: boolean
    diagnosticoPrevio?: boolean
    medicacion?: boolean
    medicacionDetalle?: boolean
    fisioterapiaPrevia?: boolean
    fisioterapiaDetalle?: boolean
    mejoriaCon?: boolean
    veterinarioRef?: boolean
    nivelActividad?: boolean
    tipoPaseos?: boolean
    dondeDuerme?: boolean
    escaleras?: boolean
    observaciones?: boolean
    objetivos?: boolean
    createdAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["intakeData"]>

  export type IntakeDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    motivoConsulta?: boolean
    desdeCuando?: boolean
    inicioSintomas?: boolean
    momentosPeorMejor?: boolean
    sintomasObservados?: boolean
    dolorAlComer?: boolean
    lesionesPrevias?: boolean
    cirugiaPrevia?: boolean
    cirugiaDetalle?: boolean
    diagnosticoPrevio?: boolean
    medicacion?: boolean
    medicacionDetalle?: boolean
    fisioterapiaPrevia?: boolean
    fisioterapiaDetalle?: boolean
    mejoriaCon?: boolean
    veterinarioRef?: boolean
    nivelActividad?: boolean
    tipoPaseos?: boolean
    dondeDuerme?: boolean
    escaleras?: boolean
    observaciones?: boolean
    objetivos?: boolean
    createdAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["intakeData"]>

  export type IntakeDataSelectScalar = {
    id?: boolean
    patientId?: boolean
    motivoConsulta?: boolean
    desdeCuando?: boolean
    inicioSintomas?: boolean
    momentosPeorMejor?: boolean
    sintomasObservados?: boolean
    dolorAlComer?: boolean
    lesionesPrevias?: boolean
    cirugiaPrevia?: boolean
    cirugiaDetalle?: boolean
    diagnosticoPrevio?: boolean
    medicacion?: boolean
    medicacionDetalle?: boolean
    fisioterapiaPrevia?: boolean
    fisioterapiaDetalle?: boolean
    mejoriaCon?: boolean
    veterinarioRef?: boolean
    nivelActividad?: boolean
    tipoPaseos?: boolean
    dondeDuerme?: boolean
    escaleras?: boolean
    observaciones?: boolean
    objetivos?: boolean
    createdAt?: boolean
  }

  export type IntakeDataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type IntakeDataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $IntakeDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IntakeData"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patientId: number
      motivoConsulta: string | null
      desdeCuando: string | null
      inicioSintomas: string | null
      momentosPeorMejor: string | null
      sintomasObservados: string | null
      dolorAlComer: string | null
      lesionesPrevias: string | null
      cirugiaPrevia: string | null
      cirugiaDetalle: string | null
      diagnosticoPrevio: string | null
      medicacion: string | null
      medicacionDetalle: string | null
      fisioterapiaPrevia: string | null
      fisioterapiaDetalle: string | null
      mejoriaCon: string | null
      veterinarioRef: string | null
      nivelActividad: string | null
      tipoPaseos: string | null
      dondeDuerme: string | null
      escaleras: string | null
      observaciones: string | null
      objetivos: string | null
      createdAt: Date
    }, ExtArgs["result"]["intakeData"]>
    composites: {}
  }

  type IntakeDataGetPayload<S extends boolean | null | undefined | IntakeDataDefaultArgs> = $Result.GetResult<Prisma.$IntakeDataPayload, S>

  type IntakeDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<IntakeDataFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: IntakeDataCountAggregateInputType | true
    }

  export interface IntakeDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IntakeData'], meta: { name: 'IntakeData' } }
    /**
     * Find zero or one IntakeData that matches the filter.
     * @param {IntakeDataFindUniqueArgs} args - Arguments to find a IntakeData
     * @example
     * // Get one IntakeData
     * const intakeData = await prisma.intakeData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IntakeDataFindUniqueArgs>(args: SelectSubset<T, IntakeDataFindUniqueArgs<ExtArgs>>): Prisma__IntakeDataClient<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one IntakeData that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {IntakeDataFindUniqueOrThrowArgs} args - Arguments to find a IntakeData
     * @example
     * // Get one IntakeData
     * const intakeData = await prisma.intakeData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IntakeDataFindUniqueOrThrowArgs>(args: SelectSubset<T, IntakeDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IntakeDataClient<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first IntakeData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntakeDataFindFirstArgs} args - Arguments to find a IntakeData
     * @example
     * // Get one IntakeData
     * const intakeData = await prisma.intakeData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IntakeDataFindFirstArgs>(args?: SelectSubset<T, IntakeDataFindFirstArgs<ExtArgs>>): Prisma__IntakeDataClient<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first IntakeData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntakeDataFindFirstOrThrowArgs} args - Arguments to find a IntakeData
     * @example
     * // Get one IntakeData
     * const intakeData = await prisma.intakeData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IntakeDataFindFirstOrThrowArgs>(args?: SelectSubset<T, IntakeDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__IntakeDataClient<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more IntakeData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntakeDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IntakeData
     * const intakeData = await prisma.intakeData.findMany()
     * 
     * // Get first 10 IntakeData
     * const intakeData = await prisma.intakeData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const intakeDataWithIdOnly = await prisma.intakeData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IntakeDataFindManyArgs>(args?: SelectSubset<T, IntakeDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a IntakeData.
     * @param {IntakeDataCreateArgs} args - Arguments to create a IntakeData.
     * @example
     * // Create one IntakeData
     * const IntakeData = await prisma.intakeData.create({
     *   data: {
     *     // ... data to create a IntakeData
     *   }
     * })
     * 
     */
    create<T extends IntakeDataCreateArgs>(args: SelectSubset<T, IntakeDataCreateArgs<ExtArgs>>): Prisma__IntakeDataClient<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many IntakeData.
     * @param {IntakeDataCreateManyArgs} args - Arguments to create many IntakeData.
     * @example
     * // Create many IntakeData
     * const intakeData = await prisma.intakeData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IntakeDataCreateManyArgs>(args?: SelectSubset<T, IntakeDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IntakeData and returns the data saved in the database.
     * @param {IntakeDataCreateManyAndReturnArgs} args - Arguments to create many IntakeData.
     * @example
     * // Create many IntakeData
     * const intakeData = await prisma.intakeData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IntakeData and only return the `id`
     * const intakeDataWithIdOnly = await prisma.intakeData.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IntakeDataCreateManyAndReturnArgs>(args?: SelectSubset<T, IntakeDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a IntakeData.
     * @param {IntakeDataDeleteArgs} args - Arguments to delete one IntakeData.
     * @example
     * // Delete one IntakeData
     * const IntakeData = await prisma.intakeData.delete({
     *   where: {
     *     // ... filter to delete one IntakeData
     *   }
     * })
     * 
     */
    delete<T extends IntakeDataDeleteArgs>(args: SelectSubset<T, IntakeDataDeleteArgs<ExtArgs>>): Prisma__IntakeDataClient<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one IntakeData.
     * @param {IntakeDataUpdateArgs} args - Arguments to update one IntakeData.
     * @example
     * // Update one IntakeData
     * const intakeData = await prisma.intakeData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IntakeDataUpdateArgs>(args: SelectSubset<T, IntakeDataUpdateArgs<ExtArgs>>): Prisma__IntakeDataClient<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more IntakeData.
     * @param {IntakeDataDeleteManyArgs} args - Arguments to filter IntakeData to delete.
     * @example
     * // Delete a few IntakeData
     * const { count } = await prisma.intakeData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IntakeDataDeleteManyArgs>(args?: SelectSubset<T, IntakeDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IntakeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntakeDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IntakeData
     * const intakeData = await prisma.intakeData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IntakeDataUpdateManyArgs>(args: SelectSubset<T, IntakeDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one IntakeData.
     * @param {IntakeDataUpsertArgs} args - Arguments to update or create a IntakeData.
     * @example
     * // Update or create a IntakeData
     * const intakeData = await prisma.intakeData.upsert({
     *   create: {
     *     // ... data to create a IntakeData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IntakeData we want to update
     *   }
     * })
     */
    upsert<T extends IntakeDataUpsertArgs>(args: SelectSubset<T, IntakeDataUpsertArgs<ExtArgs>>): Prisma__IntakeDataClient<$Result.GetResult<Prisma.$IntakeDataPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of IntakeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntakeDataCountArgs} args - Arguments to filter IntakeData to count.
     * @example
     * // Count the number of IntakeData
     * const count = await prisma.intakeData.count({
     *   where: {
     *     // ... the filter for the IntakeData we want to count
     *   }
     * })
    **/
    count<T extends IntakeDataCountArgs>(
      args?: Subset<T, IntakeDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IntakeDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IntakeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntakeDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IntakeDataAggregateArgs>(args: Subset<T, IntakeDataAggregateArgs>): Prisma.PrismaPromise<GetIntakeDataAggregateType<T>>

    /**
     * Group by IntakeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntakeDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IntakeDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IntakeDataGroupByArgs['orderBy'] }
        : { orderBy?: IntakeDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IntakeDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIntakeDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IntakeData model
   */
  readonly fields: IntakeDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IntakeData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IntakeDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IntakeData model
   */ 
  interface IntakeDataFieldRefs {
    readonly id: FieldRef<"IntakeData", 'Int'>
    readonly patientId: FieldRef<"IntakeData", 'Int'>
    readonly motivoConsulta: FieldRef<"IntakeData", 'String'>
    readonly desdeCuando: FieldRef<"IntakeData", 'String'>
    readonly inicioSintomas: FieldRef<"IntakeData", 'String'>
    readonly momentosPeorMejor: FieldRef<"IntakeData", 'String'>
    readonly sintomasObservados: FieldRef<"IntakeData", 'String'>
    readonly dolorAlComer: FieldRef<"IntakeData", 'String'>
    readonly lesionesPrevias: FieldRef<"IntakeData", 'String'>
    readonly cirugiaPrevia: FieldRef<"IntakeData", 'String'>
    readonly cirugiaDetalle: FieldRef<"IntakeData", 'String'>
    readonly diagnosticoPrevio: FieldRef<"IntakeData", 'String'>
    readonly medicacion: FieldRef<"IntakeData", 'String'>
    readonly medicacionDetalle: FieldRef<"IntakeData", 'String'>
    readonly fisioterapiaPrevia: FieldRef<"IntakeData", 'String'>
    readonly fisioterapiaDetalle: FieldRef<"IntakeData", 'String'>
    readonly mejoriaCon: FieldRef<"IntakeData", 'String'>
    readonly veterinarioRef: FieldRef<"IntakeData", 'String'>
    readonly nivelActividad: FieldRef<"IntakeData", 'String'>
    readonly tipoPaseos: FieldRef<"IntakeData", 'String'>
    readonly dondeDuerme: FieldRef<"IntakeData", 'String'>
    readonly escaleras: FieldRef<"IntakeData", 'String'>
    readonly observaciones: FieldRef<"IntakeData", 'String'>
    readonly objetivos: FieldRef<"IntakeData", 'String'>
    readonly createdAt: FieldRef<"IntakeData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IntakeData findUnique
   */
  export type IntakeDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    /**
     * Filter, which IntakeData to fetch.
     */
    where: IntakeDataWhereUniqueInput
  }

  /**
   * IntakeData findUniqueOrThrow
   */
  export type IntakeDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    /**
     * Filter, which IntakeData to fetch.
     */
    where: IntakeDataWhereUniqueInput
  }

  /**
   * IntakeData findFirst
   */
  export type IntakeDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    /**
     * Filter, which IntakeData to fetch.
     */
    where?: IntakeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntakeData to fetch.
     */
    orderBy?: IntakeDataOrderByWithRelationInput | IntakeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IntakeData.
     */
    cursor?: IntakeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntakeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntakeData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IntakeData.
     */
    distinct?: IntakeDataScalarFieldEnum | IntakeDataScalarFieldEnum[]
  }

  /**
   * IntakeData findFirstOrThrow
   */
  export type IntakeDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    /**
     * Filter, which IntakeData to fetch.
     */
    where?: IntakeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntakeData to fetch.
     */
    orderBy?: IntakeDataOrderByWithRelationInput | IntakeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IntakeData.
     */
    cursor?: IntakeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntakeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntakeData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IntakeData.
     */
    distinct?: IntakeDataScalarFieldEnum | IntakeDataScalarFieldEnum[]
  }

  /**
   * IntakeData findMany
   */
  export type IntakeDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    /**
     * Filter, which IntakeData to fetch.
     */
    where?: IntakeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntakeData to fetch.
     */
    orderBy?: IntakeDataOrderByWithRelationInput | IntakeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IntakeData.
     */
    cursor?: IntakeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntakeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntakeData.
     */
    skip?: number
    distinct?: IntakeDataScalarFieldEnum | IntakeDataScalarFieldEnum[]
  }

  /**
   * IntakeData create
   */
  export type IntakeDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    /**
     * The data needed to create a IntakeData.
     */
    data: XOR<IntakeDataCreateInput, IntakeDataUncheckedCreateInput>
  }

  /**
   * IntakeData createMany
   */
  export type IntakeDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IntakeData.
     */
    data: IntakeDataCreateManyInput | IntakeDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IntakeData createManyAndReturn
   */
  export type IntakeDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many IntakeData.
     */
    data: IntakeDataCreateManyInput | IntakeDataCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IntakeData update
   */
  export type IntakeDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    /**
     * The data needed to update a IntakeData.
     */
    data: XOR<IntakeDataUpdateInput, IntakeDataUncheckedUpdateInput>
    /**
     * Choose, which IntakeData to update.
     */
    where: IntakeDataWhereUniqueInput
  }

  /**
   * IntakeData updateMany
   */
  export type IntakeDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IntakeData.
     */
    data: XOR<IntakeDataUpdateManyMutationInput, IntakeDataUncheckedUpdateManyInput>
    /**
     * Filter which IntakeData to update
     */
    where?: IntakeDataWhereInput
  }

  /**
   * IntakeData upsert
   */
  export type IntakeDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    /**
     * The filter to search for the IntakeData to update in case it exists.
     */
    where: IntakeDataWhereUniqueInput
    /**
     * In case the IntakeData found by the `where` argument doesn't exist, create a new IntakeData with this data.
     */
    create: XOR<IntakeDataCreateInput, IntakeDataUncheckedCreateInput>
    /**
     * In case the IntakeData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IntakeDataUpdateInput, IntakeDataUncheckedUpdateInput>
  }

  /**
   * IntakeData delete
   */
  export type IntakeDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
    /**
     * Filter which IntakeData to delete.
     */
    where: IntakeDataWhereUniqueInput
  }

  /**
   * IntakeData deleteMany
   */
  export type IntakeDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IntakeData to delete
     */
    where?: IntakeDataWhereInput
  }

  /**
   * IntakeData without action
   */
  export type IntakeDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntakeData
     */
    select?: IntakeDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntakeDataInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    id: number | null
    duration: number | null
    patientId: number | null
    fisioId: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    id: number | null
    duration: number | null
    patientId: number | null
    fisioId: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: number | null
    date: Date | null
    duration: number | null
    notes: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: number | null
    fisioId: number | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    duration: number | null
    notes: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: number | null
    fisioId: number | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    date: number
    duration: number
    notes: number
    status: number
    createdAt: number
    updatedAt: number
    patientId: number
    fisioId: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    id?: true
    duration?: true
    patientId?: true
    fisioId?: true
  }

  export type AppointmentSumAggregateInputType = {
    id?: true
    duration?: true
    patientId?: true
    fisioId?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    date?: true
    duration?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    fisioId?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    date?: true
    duration?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    fisioId?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    date?: true
    duration?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    fisioId?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: number
    date: Date
    duration: number
    notes: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    patientId: number
    fisioId: number
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    duration?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    fisioId?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    fisio?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    duration?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    fisioId?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    fisio?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    date?: boolean
    duration?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    fisioId?: boolean
  }

  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    fisio?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    fisio?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      fisio: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      duration: number
      notes: string | null
      status: string
      createdAt: Date
      updatedAt: Date
      patientId: number
      fisioId: number
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    fisio<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */ 
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'Int'>
    readonly date: FieldRef<"Appointment", 'DateTime'>
    readonly duration: FieldRef<"Appointment", 'Int'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
    readonly patientId: FieldRef<"Appointment", 'Int'>
    readonly fisioId: FieldRef<"Appointment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model RehabRoutine
   */

  export type AggregateRehabRoutine = {
    _count: RehabRoutineCountAggregateOutputType | null
    _avg: RehabRoutineAvgAggregateOutputType | null
    _sum: RehabRoutineSumAggregateOutputType | null
    _min: RehabRoutineMinAggregateOutputType | null
    _max: RehabRoutineMaxAggregateOutputType | null
  }

  export type RehabRoutineAvgAggregateOutputType = {
    id: number | null
    duration: number | null
  }

  export type RehabRoutineSumAggregateOutputType = {
    id: number | null
    duration: number | null
  }

  export type RehabRoutineMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    videoUrl: string | null
    duration: number | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RehabRoutineMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    videoUrl: string | null
    duration: number | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RehabRoutineCountAggregateOutputType = {
    id: number
    name: number
    description: number
    videoUrl: number
    duration: number
    category: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RehabRoutineAvgAggregateInputType = {
    id?: true
    duration?: true
  }

  export type RehabRoutineSumAggregateInputType = {
    id?: true
    duration?: true
  }

  export type RehabRoutineMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    videoUrl?: true
    duration?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RehabRoutineMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    videoUrl?: true
    duration?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RehabRoutineCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    videoUrl?: true
    duration?: true
    category?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RehabRoutineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RehabRoutine to aggregate.
     */
    where?: RehabRoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RehabRoutines to fetch.
     */
    orderBy?: RehabRoutineOrderByWithRelationInput | RehabRoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RehabRoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RehabRoutines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RehabRoutines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RehabRoutines
    **/
    _count?: true | RehabRoutineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RehabRoutineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RehabRoutineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RehabRoutineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RehabRoutineMaxAggregateInputType
  }

  export type GetRehabRoutineAggregateType<T extends RehabRoutineAggregateArgs> = {
        [P in keyof T & keyof AggregateRehabRoutine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRehabRoutine[P]>
      : GetScalarType<T[P], AggregateRehabRoutine[P]>
  }




  export type RehabRoutineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RehabRoutineWhereInput
    orderBy?: RehabRoutineOrderByWithAggregationInput | RehabRoutineOrderByWithAggregationInput[]
    by: RehabRoutineScalarFieldEnum[] | RehabRoutineScalarFieldEnum
    having?: RehabRoutineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RehabRoutineCountAggregateInputType | true
    _avg?: RehabRoutineAvgAggregateInputType
    _sum?: RehabRoutineSumAggregateInputType
    _min?: RehabRoutineMinAggregateInputType
    _max?: RehabRoutineMaxAggregateInputType
  }

  export type RehabRoutineGroupByOutputType = {
    id: number
    name: string
    description: string | null
    videoUrl: string | null
    duration: number | null
    category: string | null
    createdAt: Date
    updatedAt: Date
    _count: RehabRoutineCountAggregateOutputType | null
    _avg: RehabRoutineAvgAggregateOutputType | null
    _sum: RehabRoutineSumAggregateOutputType | null
    _min: RehabRoutineMinAggregateOutputType | null
    _max: RehabRoutineMaxAggregateOutputType | null
  }

  type GetRehabRoutineGroupByPayload<T extends RehabRoutineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RehabRoutineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RehabRoutineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RehabRoutineGroupByOutputType[P]>
            : GetScalarType<T[P], RehabRoutineGroupByOutputType[P]>
        }
      >
    >


  export type RehabRoutineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    videoUrl?: boolean
    duration?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientRoutines?: boolean | RehabRoutine$patientRoutinesArgs<ExtArgs>
    _count?: boolean | RehabRoutineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rehabRoutine"]>

  export type RehabRoutineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    videoUrl?: boolean
    duration?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rehabRoutine"]>

  export type RehabRoutineSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    videoUrl?: boolean
    duration?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RehabRoutineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patientRoutines?: boolean | RehabRoutine$patientRoutinesArgs<ExtArgs>
    _count?: boolean | RehabRoutineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RehabRoutineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RehabRoutinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RehabRoutine"
    objects: {
      patientRoutines: Prisma.$PatientRoutinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      videoUrl: string | null
      duration: number | null
      category: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rehabRoutine"]>
    composites: {}
  }

  type RehabRoutineGetPayload<S extends boolean | null | undefined | RehabRoutineDefaultArgs> = $Result.GetResult<Prisma.$RehabRoutinePayload, S>

  type RehabRoutineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RehabRoutineFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RehabRoutineCountAggregateInputType | true
    }

  export interface RehabRoutineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RehabRoutine'], meta: { name: 'RehabRoutine' } }
    /**
     * Find zero or one RehabRoutine that matches the filter.
     * @param {RehabRoutineFindUniqueArgs} args - Arguments to find a RehabRoutine
     * @example
     * // Get one RehabRoutine
     * const rehabRoutine = await prisma.rehabRoutine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RehabRoutineFindUniqueArgs>(args: SelectSubset<T, RehabRoutineFindUniqueArgs<ExtArgs>>): Prisma__RehabRoutineClient<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RehabRoutine that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RehabRoutineFindUniqueOrThrowArgs} args - Arguments to find a RehabRoutine
     * @example
     * // Get one RehabRoutine
     * const rehabRoutine = await prisma.rehabRoutine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RehabRoutineFindUniqueOrThrowArgs>(args: SelectSubset<T, RehabRoutineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RehabRoutineClient<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RehabRoutine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RehabRoutineFindFirstArgs} args - Arguments to find a RehabRoutine
     * @example
     * // Get one RehabRoutine
     * const rehabRoutine = await prisma.rehabRoutine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RehabRoutineFindFirstArgs>(args?: SelectSubset<T, RehabRoutineFindFirstArgs<ExtArgs>>): Prisma__RehabRoutineClient<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RehabRoutine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RehabRoutineFindFirstOrThrowArgs} args - Arguments to find a RehabRoutine
     * @example
     * // Get one RehabRoutine
     * const rehabRoutine = await prisma.rehabRoutine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RehabRoutineFindFirstOrThrowArgs>(args?: SelectSubset<T, RehabRoutineFindFirstOrThrowArgs<ExtArgs>>): Prisma__RehabRoutineClient<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RehabRoutines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RehabRoutineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RehabRoutines
     * const rehabRoutines = await prisma.rehabRoutine.findMany()
     * 
     * // Get first 10 RehabRoutines
     * const rehabRoutines = await prisma.rehabRoutine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rehabRoutineWithIdOnly = await prisma.rehabRoutine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RehabRoutineFindManyArgs>(args?: SelectSubset<T, RehabRoutineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RehabRoutine.
     * @param {RehabRoutineCreateArgs} args - Arguments to create a RehabRoutine.
     * @example
     * // Create one RehabRoutine
     * const RehabRoutine = await prisma.rehabRoutine.create({
     *   data: {
     *     // ... data to create a RehabRoutine
     *   }
     * })
     * 
     */
    create<T extends RehabRoutineCreateArgs>(args: SelectSubset<T, RehabRoutineCreateArgs<ExtArgs>>): Prisma__RehabRoutineClient<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RehabRoutines.
     * @param {RehabRoutineCreateManyArgs} args - Arguments to create many RehabRoutines.
     * @example
     * // Create many RehabRoutines
     * const rehabRoutine = await prisma.rehabRoutine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RehabRoutineCreateManyArgs>(args?: SelectSubset<T, RehabRoutineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RehabRoutines and returns the data saved in the database.
     * @param {RehabRoutineCreateManyAndReturnArgs} args - Arguments to create many RehabRoutines.
     * @example
     * // Create many RehabRoutines
     * const rehabRoutine = await prisma.rehabRoutine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RehabRoutines and only return the `id`
     * const rehabRoutineWithIdOnly = await prisma.rehabRoutine.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RehabRoutineCreateManyAndReturnArgs>(args?: SelectSubset<T, RehabRoutineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RehabRoutine.
     * @param {RehabRoutineDeleteArgs} args - Arguments to delete one RehabRoutine.
     * @example
     * // Delete one RehabRoutine
     * const RehabRoutine = await prisma.rehabRoutine.delete({
     *   where: {
     *     // ... filter to delete one RehabRoutine
     *   }
     * })
     * 
     */
    delete<T extends RehabRoutineDeleteArgs>(args: SelectSubset<T, RehabRoutineDeleteArgs<ExtArgs>>): Prisma__RehabRoutineClient<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RehabRoutine.
     * @param {RehabRoutineUpdateArgs} args - Arguments to update one RehabRoutine.
     * @example
     * // Update one RehabRoutine
     * const rehabRoutine = await prisma.rehabRoutine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RehabRoutineUpdateArgs>(args: SelectSubset<T, RehabRoutineUpdateArgs<ExtArgs>>): Prisma__RehabRoutineClient<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RehabRoutines.
     * @param {RehabRoutineDeleteManyArgs} args - Arguments to filter RehabRoutines to delete.
     * @example
     * // Delete a few RehabRoutines
     * const { count } = await prisma.rehabRoutine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RehabRoutineDeleteManyArgs>(args?: SelectSubset<T, RehabRoutineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RehabRoutines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RehabRoutineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RehabRoutines
     * const rehabRoutine = await prisma.rehabRoutine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RehabRoutineUpdateManyArgs>(args: SelectSubset<T, RehabRoutineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RehabRoutine.
     * @param {RehabRoutineUpsertArgs} args - Arguments to update or create a RehabRoutine.
     * @example
     * // Update or create a RehabRoutine
     * const rehabRoutine = await prisma.rehabRoutine.upsert({
     *   create: {
     *     // ... data to create a RehabRoutine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RehabRoutine we want to update
     *   }
     * })
     */
    upsert<T extends RehabRoutineUpsertArgs>(args: SelectSubset<T, RehabRoutineUpsertArgs<ExtArgs>>): Prisma__RehabRoutineClient<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RehabRoutines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RehabRoutineCountArgs} args - Arguments to filter RehabRoutines to count.
     * @example
     * // Count the number of RehabRoutines
     * const count = await prisma.rehabRoutine.count({
     *   where: {
     *     // ... the filter for the RehabRoutines we want to count
     *   }
     * })
    **/
    count<T extends RehabRoutineCountArgs>(
      args?: Subset<T, RehabRoutineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RehabRoutineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RehabRoutine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RehabRoutineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RehabRoutineAggregateArgs>(args: Subset<T, RehabRoutineAggregateArgs>): Prisma.PrismaPromise<GetRehabRoutineAggregateType<T>>

    /**
     * Group by RehabRoutine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RehabRoutineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RehabRoutineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RehabRoutineGroupByArgs['orderBy'] }
        : { orderBy?: RehabRoutineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RehabRoutineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRehabRoutineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RehabRoutine model
   */
  readonly fields: RehabRoutineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RehabRoutine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RehabRoutineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patientRoutines<T extends RehabRoutine$patientRoutinesArgs<ExtArgs> = {}>(args?: Subset<T, RehabRoutine$patientRoutinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RehabRoutine model
   */ 
  interface RehabRoutineFieldRefs {
    readonly id: FieldRef<"RehabRoutine", 'Int'>
    readonly name: FieldRef<"RehabRoutine", 'String'>
    readonly description: FieldRef<"RehabRoutine", 'String'>
    readonly videoUrl: FieldRef<"RehabRoutine", 'String'>
    readonly duration: FieldRef<"RehabRoutine", 'Int'>
    readonly category: FieldRef<"RehabRoutine", 'String'>
    readonly createdAt: FieldRef<"RehabRoutine", 'DateTime'>
    readonly updatedAt: FieldRef<"RehabRoutine", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RehabRoutine findUnique
   */
  export type RehabRoutineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
    /**
     * Filter, which RehabRoutine to fetch.
     */
    where: RehabRoutineWhereUniqueInput
  }

  /**
   * RehabRoutine findUniqueOrThrow
   */
  export type RehabRoutineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
    /**
     * Filter, which RehabRoutine to fetch.
     */
    where: RehabRoutineWhereUniqueInput
  }

  /**
   * RehabRoutine findFirst
   */
  export type RehabRoutineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
    /**
     * Filter, which RehabRoutine to fetch.
     */
    where?: RehabRoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RehabRoutines to fetch.
     */
    orderBy?: RehabRoutineOrderByWithRelationInput | RehabRoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RehabRoutines.
     */
    cursor?: RehabRoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RehabRoutines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RehabRoutines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RehabRoutines.
     */
    distinct?: RehabRoutineScalarFieldEnum | RehabRoutineScalarFieldEnum[]
  }

  /**
   * RehabRoutine findFirstOrThrow
   */
  export type RehabRoutineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
    /**
     * Filter, which RehabRoutine to fetch.
     */
    where?: RehabRoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RehabRoutines to fetch.
     */
    orderBy?: RehabRoutineOrderByWithRelationInput | RehabRoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RehabRoutines.
     */
    cursor?: RehabRoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RehabRoutines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RehabRoutines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RehabRoutines.
     */
    distinct?: RehabRoutineScalarFieldEnum | RehabRoutineScalarFieldEnum[]
  }

  /**
   * RehabRoutine findMany
   */
  export type RehabRoutineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
    /**
     * Filter, which RehabRoutines to fetch.
     */
    where?: RehabRoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RehabRoutines to fetch.
     */
    orderBy?: RehabRoutineOrderByWithRelationInput | RehabRoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RehabRoutines.
     */
    cursor?: RehabRoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RehabRoutines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RehabRoutines.
     */
    skip?: number
    distinct?: RehabRoutineScalarFieldEnum | RehabRoutineScalarFieldEnum[]
  }

  /**
   * RehabRoutine create
   */
  export type RehabRoutineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
    /**
     * The data needed to create a RehabRoutine.
     */
    data: XOR<RehabRoutineCreateInput, RehabRoutineUncheckedCreateInput>
  }

  /**
   * RehabRoutine createMany
   */
  export type RehabRoutineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RehabRoutines.
     */
    data: RehabRoutineCreateManyInput | RehabRoutineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RehabRoutine createManyAndReturn
   */
  export type RehabRoutineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RehabRoutines.
     */
    data: RehabRoutineCreateManyInput | RehabRoutineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RehabRoutine update
   */
  export type RehabRoutineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
    /**
     * The data needed to update a RehabRoutine.
     */
    data: XOR<RehabRoutineUpdateInput, RehabRoutineUncheckedUpdateInput>
    /**
     * Choose, which RehabRoutine to update.
     */
    where: RehabRoutineWhereUniqueInput
  }

  /**
   * RehabRoutine updateMany
   */
  export type RehabRoutineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RehabRoutines.
     */
    data: XOR<RehabRoutineUpdateManyMutationInput, RehabRoutineUncheckedUpdateManyInput>
    /**
     * Filter which RehabRoutines to update
     */
    where?: RehabRoutineWhereInput
  }

  /**
   * RehabRoutine upsert
   */
  export type RehabRoutineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
    /**
     * The filter to search for the RehabRoutine to update in case it exists.
     */
    where: RehabRoutineWhereUniqueInput
    /**
     * In case the RehabRoutine found by the `where` argument doesn't exist, create a new RehabRoutine with this data.
     */
    create: XOR<RehabRoutineCreateInput, RehabRoutineUncheckedCreateInput>
    /**
     * In case the RehabRoutine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RehabRoutineUpdateInput, RehabRoutineUncheckedUpdateInput>
  }

  /**
   * RehabRoutine delete
   */
  export type RehabRoutineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
    /**
     * Filter which RehabRoutine to delete.
     */
    where: RehabRoutineWhereUniqueInput
  }

  /**
   * RehabRoutine deleteMany
   */
  export type RehabRoutineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RehabRoutines to delete
     */
    where?: RehabRoutineWhereInput
  }

  /**
   * RehabRoutine.patientRoutines
   */
  export type RehabRoutine$patientRoutinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    where?: PatientRoutineWhereInput
    orderBy?: PatientRoutineOrderByWithRelationInput | PatientRoutineOrderByWithRelationInput[]
    cursor?: PatientRoutineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientRoutineScalarFieldEnum | PatientRoutineScalarFieldEnum[]
  }

  /**
   * RehabRoutine without action
   */
  export type RehabRoutineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RehabRoutine
     */
    select?: RehabRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RehabRoutineInclude<ExtArgs> | null
  }


  /**
   * Model PatientRoutine
   */

  export type AggregatePatientRoutine = {
    _count: PatientRoutineCountAggregateOutputType | null
    _avg: PatientRoutineAvgAggregateOutputType | null
    _sum: PatientRoutineSumAggregateOutputType | null
    _min: PatientRoutineMinAggregateOutputType | null
    _max: PatientRoutineMaxAggregateOutputType | null
  }

  export type PatientRoutineAvgAggregateOutputType = {
    id: number | null
    patientId: number | null
    routineId: number | null
  }

  export type PatientRoutineSumAggregateOutputType = {
    id: number | null
    patientId: number | null
    routineId: number | null
  }

  export type PatientRoutineMinAggregateOutputType = {
    id: number | null
    patientId: number | null
    routineId: number | null
    assignedAt: Date | null
    notes: string | null
  }

  export type PatientRoutineMaxAggregateOutputType = {
    id: number | null
    patientId: number | null
    routineId: number | null
    assignedAt: Date | null
    notes: string | null
  }

  export type PatientRoutineCountAggregateOutputType = {
    id: number
    patientId: number
    routineId: number
    assignedAt: number
    notes: number
    _all: number
  }


  export type PatientRoutineAvgAggregateInputType = {
    id?: true
    patientId?: true
    routineId?: true
  }

  export type PatientRoutineSumAggregateInputType = {
    id?: true
    patientId?: true
    routineId?: true
  }

  export type PatientRoutineMinAggregateInputType = {
    id?: true
    patientId?: true
    routineId?: true
    assignedAt?: true
    notes?: true
  }

  export type PatientRoutineMaxAggregateInputType = {
    id?: true
    patientId?: true
    routineId?: true
    assignedAt?: true
    notes?: true
  }

  export type PatientRoutineCountAggregateInputType = {
    id?: true
    patientId?: true
    routineId?: true
    assignedAt?: true
    notes?: true
    _all?: true
  }

  export type PatientRoutineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientRoutine to aggregate.
     */
    where?: PatientRoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientRoutines to fetch.
     */
    orderBy?: PatientRoutineOrderByWithRelationInput | PatientRoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientRoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientRoutines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientRoutines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientRoutines
    **/
    _count?: true | PatientRoutineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientRoutineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientRoutineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientRoutineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientRoutineMaxAggregateInputType
  }

  export type GetPatientRoutineAggregateType<T extends PatientRoutineAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientRoutine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientRoutine[P]>
      : GetScalarType<T[P], AggregatePatientRoutine[P]>
  }




  export type PatientRoutineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientRoutineWhereInput
    orderBy?: PatientRoutineOrderByWithAggregationInput | PatientRoutineOrderByWithAggregationInput[]
    by: PatientRoutineScalarFieldEnum[] | PatientRoutineScalarFieldEnum
    having?: PatientRoutineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientRoutineCountAggregateInputType | true
    _avg?: PatientRoutineAvgAggregateInputType
    _sum?: PatientRoutineSumAggregateInputType
    _min?: PatientRoutineMinAggregateInputType
    _max?: PatientRoutineMaxAggregateInputType
  }

  export type PatientRoutineGroupByOutputType = {
    id: number
    patientId: number
    routineId: number
    assignedAt: Date
    notes: string | null
    _count: PatientRoutineCountAggregateOutputType | null
    _avg: PatientRoutineAvgAggregateOutputType | null
    _sum: PatientRoutineSumAggregateOutputType | null
    _min: PatientRoutineMinAggregateOutputType | null
    _max: PatientRoutineMaxAggregateOutputType | null
  }

  type GetPatientRoutineGroupByPayload<T extends PatientRoutineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientRoutineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientRoutineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientRoutineGroupByOutputType[P]>
            : GetScalarType<T[P], PatientRoutineGroupByOutputType[P]>
        }
      >
    >


  export type PatientRoutineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    routineId?: boolean
    assignedAt?: boolean
    notes?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    routine?: boolean | RehabRoutineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientRoutine"]>

  export type PatientRoutineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    routineId?: boolean
    assignedAt?: boolean
    notes?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    routine?: boolean | RehabRoutineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientRoutine"]>

  export type PatientRoutineSelectScalar = {
    id?: boolean
    patientId?: boolean
    routineId?: boolean
    assignedAt?: boolean
    notes?: boolean
  }

  export type PatientRoutineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    routine?: boolean | RehabRoutineDefaultArgs<ExtArgs>
  }
  export type PatientRoutineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    routine?: boolean | RehabRoutineDefaultArgs<ExtArgs>
  }

  export type $PatientRoutinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientRoutine"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      routine: Prisma.$RehabRoutinePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patientId: number
      routineId: number
      assignedAt: Date
      notes: string | null
    }, ExtArgs["result"]["patientRoutine"]>
    composites: {}
  }

  type PatientRoutineGetPayload<S extends boolean | null | undefined | PatientRoutineDefaultArgs> = $Result.GetResult<Prisma.$PatientRoutinePayload, S>

  type PatientRoutineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PatientRoutineFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PatientRoutineCountAggregateInputType | true
    }

  export interface PatientRoutineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientRoutine'], meta: { name: 'PatientRoutine' } }
    /**
     * Find zero or one PatientRoutine that matches the filter.
     * @param {PatientRoutineFindUniqueArgs} args - Arguments to find a PatientRoutine
     * @example
     * // Get one PatientRoutine
     * const patientRoutine = await prisma.patientRoutine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientRoutineFindUniqueArgs>(args: SelectSubset<T, PatientRoutineFindUniqueArgs<ExtArgs>>): Prisma__PatientRoutineClient<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PatientRoutine that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PatientRoutineFindUniqueOrThrowArgs} args - Arguments to find a PatientRoutine
     * @example
     * // Get one PatientRoutine
     * const patientRoutine = await prisma.patientRoutine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientRoutineFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientRoutineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientRoutineClient<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PatientRoutine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientRoutineFindFirstArgs} args - Arguments to find a PatientRoutine
     * @example
     * // Get one PatientRoutine
     * const patientRoutine = await prisma.patientRoutine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientRoutineFindFirstArgs>(args?: SelectSubset<T, PatientRoutineFindFirstArgs<ExtArgs>>): Prisma__PatientRoutineClient<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PatientRoutine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientRoutineFindFirstOrThrowArgs} args - Arguments to find a PatientRoutine
     * @example
     * // Get one PatientRoutine
     * const patientRoutine = await prisma.patientRoutine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientRoutineFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientRoutineFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientRoutineClient<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PatientRoutines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientRoutineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientRoutines
     * const patientRoutines = await prisma.patientRoutine.findMany()
     * 
     * // Get first 10 PatientRoutines
     * const patientRoutines = await prisma.patientRoutine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientRoutineWithIdOnly = await prisma.patientRoutine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientRoutineFindManyArgs>(args?: SelectSubset<T, PatientRoutineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PatientRoutine.
     * @param {PatientRoutineCreateArgs} args - Arguments to create a PatientRoutine.
     * @example
     * // Create one PatientRoutine
     * const PatientRoutine = await prisma.patientRoutine.create({
     *   data: {
     *     // ... data to create a PatientRoutine
     *   }
     * })
     * 
     */
    create<T extends PatientRoutineCreateArgs>(args: SelectSubset<T, PatientRoutineCreateArgs<ExtArgs>>): Prisma__PatientRoutineClient<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PatientRoutines.
     * @param {PatientRoutineCreateManyArgs} args - Arguments to create many PatientRoutines.
     * @example
     * // Create many PatientRoutines
     * const patientRoutine = await prisma.patientRoutine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientRoutineCreateManyArgs>(args?: SelectSubset<T, PatientRoutineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatientRoutines and returns the data saved in the database.
     * @param {PatientRoutineCreateManyAndReturnArgs} args - Arguments to create many PatientRoutines.
     * @example
     * // Create many PatientRoutines
     * const patientRoutine = await prisma.patientRoutine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatientRoutines and only return the `id`
     * const patientRoutineWithIdOnly = await prisma.patientRoutine.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientRoutineCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientRoutineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PatientRoutine.
     * @param {PatientRoutineDeleteArgs} args - Arguments to delete one PatientRoutine.
     * @example
     * // Delete one PatientRoutine
     * const PatientRoutine = await prisma.patientRoutine.delete({
     *   where: {
     *     // ... filter to delete one PatientRoutine
     *   }
     * })
     * 
     */
    delete<T extends PatientRoutineDeleteArgs>(args: SelectSubset<T, PatientRoutineDeleteArgs<ExtArgs>>): Prisma__PatientRoutineClient<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PatientRoutine.
     * @param {PatientRoutineUpdateArgs} args - Arguments to update one PatientRoutine.
     * @example
     * // Update one PatientRoutine
     * const patientRoutine = await prisma.patientRoutine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientRoutineUpdateArgs>(args: SelectSubset<T, PatientRoutineUpdateArgs<ExtArgs>>): Prisma__PatientRoutineClient<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PatientRoutines.
     * @param {PatientRoutineDeleteManyArgs} args - Arguments to filter PatientRoutines to delete.
     * @example
     * // Delete a few PatientRoutines
     * const { count } = await prisma.patientRoutine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientRoutineDeleteManyArgs>(args?: SelectSubset<T, PatientRoutineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientRoutines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientRoutineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientRoutines
     * const patientRoutine = await prisma.patientRoutine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientRoutineUpdateManyArgs>(args: SelectSubset<T, PatientRoutineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PatientRoutine.
     * @param {PatientRoutineUpsertArgs} args - Arguments to update or create a PatientRoutine.
     * @example
     * // Update or create a PatientRoutine
     * const patientRoutine = await prisma.patientRoutine.upsert({
     *   create: {
     *     // ... data to create a PatientRoutine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientRoutine we want to update
     *   }
     * })
     */
    upsert<T extends PatientRoutineUpsertArgs>(args: SelectSubset<T, PatientRoutineUpsertArgs<ExtArgs>>): Prisma__PatientRoutineClient<$Result.GetResult<Prisma.$PatientRoutinePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PatientRoutines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientRoutineCountArgs} args - Arguments to filter PatientRoutines to count.
     * @example
     * // Count the number of PatientRoutines
     * const count = await prisma.patientRoutine.count({
     *   where: {
     *     // ... the filter for the PatientRoutines we want to count
     *   }
     * })
    **/
    count<T extends PatientRoutineCountArgs>(
      args?: Subset<T, PatientRoutineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientRoutineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientRoutine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientRoutineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientRoutineAggregateArgs>(args: Subset<T, PatientRoutineAggregateArgs>): Prisma.PrismaPromise<GetPatientRoutineAggregateType<T>>

    /**
     * Group by PatientRoutine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientRoutineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientRoutineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientRoutineGroupByArgs['orderBy'] }
        : { orderBy?: PatientRoutineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientRoutineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientRoutineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientRoutine model
   */
  readonly fields: PatientRoutineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientRoutine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientRoutineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    routine<T extends RehabRoutineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RehabRoutineDefaultArgs<ExtArgs>>): Prisma__RehabRoutineClient<$Result.GetResult<Prisma.$RehabRoutinePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatientRoutine model
   */ 
  interface PatientRoutineFieldRefs {
    readonly id: FieldRef<"PatientRoutine", 'Int'>
    readonly patientId: FieldRef<"PatientRoutine", 'Int'>
    readonly routineId: FieldRef<"PatientRoutine", 'Int'>
    readonly assignedAt: FieldRef<"PatientRoutine", 'DateTime'>
    readonly notes: FieldRef<"PatientRoutine", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PatientRoutine findUnique
   */
  export type PatientRoutineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    /**
     * Filter, which PatientRoutine to fetch.
     */
    where: PatientRoutineWhereUniqueInput
  }

  /**
   * PatientRoutine findUniqueOrThrow
   */
  export type PatientRoutineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    /**
     * Filter, which PatientRoutine to fetch.
     */
    where: PatientRoutineWhereUniqueInput
  }

  /**
   * PatientRoutine findFirst
   */
  export type PatientRoutineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    /**
     * Filter, which PatientRoutine to fetch.
     */
    where?: PatientRoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientRoutines to fetch.
     */
    orderBy?: PatientRoutineOrderByWithRelationInput | PatientRoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientRoutines.
     */
    cursor?: PatientRoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientRoutines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientRoutines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientRoutines.
     */
    distinct?: PatientRoutineScalarFieldEnum | PatientRoutineScalarFieldEnum[]
  }

  /**
   * PatientRoutine findFirstOrThrow
   */
  export type PatientRoutineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    /**
     * Filter, which PatientRoutine to fetch.
     */
    where?: PatientRoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientRoutines to fetch.
     */
    orderBy?: PatientRoutineOrderByWithRelationInput | PatientRoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientRoutines.
     */
    cursor?: PatientRoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientRoutines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientRoutines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientRoutines.
     */
    distinct?: PatientRoutineScalarFieldEnum | PatientRoutineScalarFieldEnum[]
  }

  /**
   * PatientRoutine findMany
   */
  export type PatientRoutineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    /**
     * Filter, which PatientRoutines to fetch.
     */
    where?: PatientRoutineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientRoutines to fetch.
     */
    orderBy?: PatientRoutineOrderByWithRelationInput | PatientRoutineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientRoutines.
     */
    cursor?: PatientRoutineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientRoutines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientRoutines.
     */
    skip?: number
    distinct?: PatientRoutineScalarFieldEnum | PatientRoutineScalarFieldEnum[]
  }

  /**
   * PatientRoutine create
   */
  export type PatientRoutineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientRoutine.
     */
    data: XOR<PatientRoutineCreateInput, PatientRoutineUncheckedCreateInput>
  }

  /**
   * PatientRoutine createMany
   */
  export type PatientRoutineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientRoutines.
     */
    data: PatientRoutineCreateManyInput | PatientRoutineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientRoutine createManyAndReturn
   */
  export type PatientRoutineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PatientRoutines.
     */
    data: PatientRoutineCreateManyInput | PatientRoutineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientRoutine update
   */
  export type PatientRoutineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientRoutine.
     */
    data: XOR<PatientRoutineUpdateInput, PatientRoutineUncheckedUpdateInput>
    /**
     * Choose, which PatientRoutine to update.
     */
    where: PatientRoutineWhereUniqueInput
  }

  /**
   * PatientRoutine updateMany
   */
  export type PatientRoutineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientRoutines.
     */
    data: XOR<PatientRoutineUpdateManyMutationInput, PatientRoutineUncheckedUpdateManyInput>
    /**
     * Filter which PatientRoutines to update
     */
    where?: PatientRoutineWhereInput
  }

  /**
   * PatientRoutine upsert
   */
  export type PatientRoutineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientRoutine to update in case it exists.
     */
    where: PatientRoutineWhereUniqueInput
    /**
     * In case the PatientRoutine found by the `where` argument doesn't exist, create a new PatientRoutine with this data.
     */
    create: XOR<PatientRoutineCreateInput, PatientRoutineUncheckedCreateInput>
    /**
     * In case the PatientRoutine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientRoutineUpdateInput, PatientRoutineUncheckedUpdateInput>
  }

  /**
   * PatientRoutine delete
   */
  export type PatientRoutineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
    /**
     * Filter which PatientRoutine to delete.
     */
    where: PatientRoutineWhereUniqueInput
  }

  /**
   * PatientRoutine deleteMany
   */
  export type PatientRoutineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientRoutines to delete
     */
    where?: PatientRoutineWhereInput
  }

  /**
   * PatientRoutine without action
   */
  export type PatientRoutineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientRoutine
     */
    select?: PatientRoutineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientRoutineInclude<ExtArgs> | null
  }


  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    id: number | null
    patientId: number | null
    createdById: number | null
  }

  export type PlanSumAggregateOutputType = {
    id: number | null
    patientId: number | null
    createdById: number | null
  }

  export type PlanMinAggregateOutputType = {
    id: number | null
    title: string | null
    type: string | null
    content: string | null
    patientId: number | null
    createdById: number | null
    pinned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    id: number | null
    title: string | null
    type: string | null
    content: string | null
    patientId: number | null
    createdById: number | null
    pinned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    title: number
    type: number
    content: number
    patientId: number
    createdById: number
    pinned: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    id?: true
    patientId?: true
    createdById?: true
  }

  export type PlanSumAggregateInputType = {
    id?: true
    patientId?: true
    createdById?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    title?: true
    type?: true
    content?: true
    patientId?: true
    createdById?: true
    pinned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    title?: true
    type?: true
    content?: true
    patientId?: true
    createdById?: true
    pinned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    title?: true
    type?: true
    content?: true
    patientId?: true
    createdById?: true
    pinned?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: number
    title: string
    type: string
    content: string
    patientId: number
    createdById: number
    pinned: boolean
    createdAt: Date
    updatedAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    content?: boolean
    patientId?: boolean
    createdById?: boolean
    pinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    content?: boolean
    patientId?: boolean
    createdById?: boolean
    pinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    title?: boolean
    type?: boolean
    content?: boolean
    patientId?: boolean
    createdById?: boolean
    pinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      type: string
      content: string
      patientId: number
      createdById: number
      pinned: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */ 
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'Int'>
    readonly title: FieldRef<"Plan", 'String'>
    readonly type: FieldRef<"Plan", 'String'>
    readonly content: FieldRef<"Plan", 'String'>
    readonly patientId: FieldRef<"Plan", 'Int'>
    readonly createdById: FieldRef<"Plan", 'Int'>
    readonly pinned: FieldRef<"Plan", 'Boolean'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
    readonly updatedAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    id: number | null
    fisioId: number | null
    tutorId: number | null
  }

  export type MessageSumAggregateOutputType = {
    id: number | null
    fisioId: number | null
    tutorId: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: number | null
    body: string | null
    createdAt: Date | null
    fisioId: number | null
    tutorId: number | null
    fromTutor: boolean | null
  }

  export type MessageMaxAggregateOutputType = {
    id: number | null
    body: string | null
    createdAt: Date | null
    fisioId: number | null
    tutorId: number | null
    fromTutor: boolean | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    body: number
    createdAt: number
    fisioId: number
    tutorId: number
    fromTutor: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    id?: true
    fisioId?: true
    tutorId?: true
  }

  export type MessageSumAggregateInputType = {
    id?: true
    fisioId?: true
    tutorId?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    body?: true
    createdAt?: true
    fisioId?: true
    tutorId?: true
    fromTutor?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    body?: true
    createdAt?: true
    fisioId?: true
    tutorId?: true
    fromTutor?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    body?: true
    createdAt?: true
    fisioId?: true
    tutorId?: true
    fromTutor?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: number
    body: string
    createdAt: Date
    fisioId: number | null
    tutorId: number | null
    fromTutor: boolean
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    createdAt?: boolean
    fisioId?: boolean
    tutorId?: boolean
    fromTutor?: boolean
    fisio?: boolean | Message$fisioArgs<ExtArgs>
    tutor?: boolean | Message$tutorArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    createdAt?: boolean
    fisioId?: boolean
    tutorId?: boolean
    fromTutor?: boolean
    fisio?: boolean | Message$fisioArgs<ExtArgs>
    tutor?: boolean | Message$tutorArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    body?: boolean
    createdAt?: boolean
    fisioId?: boolean
    tutorId?: boolean
    fromTutor?: boolean
  }

  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fisio?: boolean | Message$fisioArgs<ExtArgs>
    tutor?: boolean | Message$tutorArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fisio?: boolean | Message$fisioArgs<ExtArgs>
    tutor?: boolean | Message$tutorArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      fisio: Prisma.$UserPayload<ExtArgs> | null
      tutor: Prisma.$TutorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      body: string
      createdAt: Date
      fisioId: number | null
      tutorId: number | null
      fromTutor: boolean
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fisio<T extends Message$fisioArgs<ExtArgs> = {}>(args?: Subset<T, Message$fisioArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    tutor<T extends Message$tutorArgs<ExtArgs> = {}>(args?: Subset<T, Message$tutorArgs<ExtArgs>>): Prisma__TutorClient<$Result.GetResult<Prisma.$TutorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */ 
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'Int'>
    readonly body: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly fisioId: FieldRef<"Message", 'Int'>
    readonly tutorId: FieldRef<"Message", 'Int'>
    readonly fromTutor: FieldRef<"Message", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }

  /**
   * Message.fisio
   */
  export type Message$fisioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Message.tutor
   */
  export type Message$tutorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutor
     */
    select?: TutorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorInclude<ExtArgs> | null
    where?: TutorWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TutorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    howFoundUs: 'howFoundUs',
    portalEmail: 'portalEmail',
    portalPassword: 'portalPassword',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TutorScalarFieldEnum = (typeof TutorScalarFieldEnum)[keyof typeof TutorScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    species: 'species',
    breed: 'breed',
    birthDate: 'birthDate',
    weight: 'weight',
    sex: 'sex',
    neutered: 'neutered',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tutorId: 'tutorId'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const IntakeDataScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    motivoConsulta: 'motivoConsulta',
    desdeCuando: 'desdeCuando',
    inicioSintomas: 'inicioSintomas',
    momentosPeorMejor: 'momentosPeorMejor',
    sintomasObservados: 'sintomasObservados',
    dolorAlComer: 'dolorAlComer',
    lesionesPrevias: 'lesionesPrevias',
    cirugiaPrevia: 'cirugiaPrevia',
    cirugiaDetalle: 'cirugiaDetalle',
    diagnosticoPrevio: 'diagnosticoPrevio',
    medicacion: 'medicacion',
    medicacionDetalle: 'medicacionDetalle',
    fisioterapiaPrevia: 'fisioterapiaPrevia',
    fisioterapiaDetalle: 'fisioterapiaDetalle',
    mejoriaCon: 'mejoriaCon',
    veterinarioRef: 'veterinarioRef',
    nivelActividad: 'nivelActividad',
    tipoPaseos: 'tipoPaseos',
    dondeDuerme: 'dondeDuerme',
    escaleras: 'escaleras',
    observaciones: 'observaciones',
    objetivos: 'objetivos',
    createdAt: 'createdAt'
  };

  export type IntakeDataScalarFieldEnum = (typeof IntakeDataScalarFieldEnum)[keyof typeof IntakeDataScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    date: 'date',
    duration: 'duration',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    patientId: 'patientId',
    fisioId: 'fisioId'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const RehabRoutineScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    videoUrl: 'videoUrl',
    duration: 'duration',
    category: 'category',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RehabRoutineScalarFieldEnum = (typeof RehabRoutineScalarFieldEnum)[keyof typeof RehabRoutineScalarFieldEnum]


  export const PatientRoutineScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    routineId: 'routineId',
    assignedAt: 'assignedAt',
    notes: 'notes'
  };

  export type PatientRoutineScalarFieldEnum = (typeof PatientRoutineScalarFieldEnum)[keyof typeof PatientRoutineScalarFieldEnum]


  export const PlanScalarFieldEnum: {
    id: 'id',
    title: 'title',
    type: 'type',
    content: 'content',
    patientId: 'patientId',
    createdById: 'createdById',
    pinned: 'pinned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    body: 'body',
    createdAt: 'createdAt',
    fisioId: 'fisioId',
    tutorId: 'tutorId',
    fromTutor: 'fromTutor'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    messages?: MessageListRelationFilter
    appointments?: AppointmentListRelationFilter
    plans?: PlanListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: MessageOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    plans?: PlanOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    messages?: MessageListRelationFilter
    appointments?: AppointmentListRelationFilter
    plans?: PlanListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TutorWhereInput = {
    AND?: TutorWhereInput | TutorWhereInput[]
    OR?: TutorWhereInput[]
    NOT?: TutorWhereInput | TutorWhereInput[]
    id?: IntFilter<"Tutor"> | number
    name?: StringFilter<"Tutor"> | string
    phone?: StringFilter<"Tutor"> | string
    email?: StringNullableFilter<"Tutor"> | string | null
    howFoundUs?: StringNullableFilter<"Tutor"> | string | null
    portalEmail?: StringNullableFilter<"Tutor"> | string | null
    portalPassword?: StringNullableFilter<"Tutor"> | string | null
    createdAt?: DateTimeFilter<"Tutor"> | Date | string
    updatedAt?: DateTimeFilter<"Tutor"> | Date | string
    patients?: PatientListRelationFilter
    messages?: MessageListRelationFilter
  }

  export type TutorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    howFoundUs?: SortOrderInput | SortOrder
    portalEmail?: SortOrderInput | SortOrder
    portalPassword?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patients?: PatientOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type TutorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    portalEmail?: string
    AND?: TutorWhereInput | TutorWhereInput[]
    OR?: TutorWhereInput[]
    NOT?: TutorWhereInput | TutorWhereInput[]
    name?: StringFilter<"Tutor"> | string
    phone?: StringFilter<"Tutor"> | string
    email?: StringNullableFilter<"Tutor"> | string | null
    howFoundUs?: StringNullableFilter<"Tutor"> | string | null
    portalPassword?: StringNullableFilter<"Tutor"> | string | null
    createdAt?: DateTimeFilter<"Tutor"> | Date | string
    updatedAt?: DateTimeFilter<"Tutor"> | Date | string
    patients?: PatientListRelationFilter
    messages?: MessageListRelationFilter
  }, "id" | "portalEmail">

  export type TutorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    howFoundUs?: SortOrderInput | SortOrder
    portalEmail?: SortOrderInput | SortOrder
    portalPassword?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TutorCountOrderByAggregateInput
    _avg?: TutorAvgOrderByAggregateInput
    _max?: TutorMaxOrderByAggregateInput
    _min?: TutorMinOrderByAggregateInput
    _sum?: TutorSumOrderByAggregateInput
  }

  export type TutorScalarWhereWithAggregatesInput = {
    AND?: TutorScalarWhereWithAggregatesInput | TutorScalarWhereWithAggregatesInput[]
    OR?: TutorScalarWhereWithAggregatesInput[]
    NOT?: TutorScalarWhereWithAggregatesInput | TutorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tutor"> | number
    name?: StringWithAggregatesFilter<"Tutor"> | string
    phone?: StringWithAggregatesFilter<"Tutor"> | string
    email?: StringNullableWithAggregatesFilter<"Tutor"> | string | null
    howFoundUs?: StringNullableWithAggregatesFilter<"Tutor"> | string | null
    portalEmail?: StringNullableWithAggregatesFilter<"Tutor"> | string | null
    portalPassword?: StringNullableWithAggregatesFilter<"Tutor"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tutor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tutor"> | Date | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: IntFilter<"Patient"> | number
    name?: StringFilter<"Patient"> | string
    species?: StringFilter<"Patient"> | string
    breed?: StringNullableFilter<"Patient"> | string | null
    birthDate?: StringNullableFilter<"Patient"> | string | null
    weight?: StringNullableFilter<"Patient"> | string | null
    sex?: StringNullableFilter<"Patient"> | string | null
    neutered?: StringNullableFilter<"Patient"> | string | null
    active?: BoolFilter<"Patient"> | boolean
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    tutorId?: IntFilter<"Patient"> | number
    tutor?: XOR<TutorRelationFilter, TutorWhereInput>
    intakeData?: XOR<IntakeDataNullableRelationFilter, IntakeDataWhereInput> | null
    appointments?: AppointmentListRelationFilter
    rehabRoutines?: PatientRoutineListRelationFilter
    plans?: PlanListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    neutered?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tutorId?: SortOrder
    tutor?: TutorOrderByWithRelationInput
    intakeData?: IntakeDataOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
    rehabRoutines?: PatientRoutineOrderByRelationAggregateInput
    plans?: PlanOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    name?: StringFilter<"Patient"> | string
    species?: StringFilter<"Patient"> | string
    breed?: StringNullableFilter<"Patient"> | string | null
    birthDate?: StringNullableFilter<"Patient"> | string | null
    weight?: StringNullableFilter<"Patient"> | string | null
    sex?: StringNullableFilter<"Patient"> | string | null
    neutered?: StringNullableFilter<"Patient"> | string | null
    active?: BoolFilter<"Patient"> | boolean
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    tutorId?: IntFilter<"Patient"> | number
    tutor?: XOR<TutorRelationFilter, TutorWhereInput>
    intakeData?: XOR<IntakeDataNullableRelationFilter, IntakeDataWhereInput> | null
    appointments?: AppointmentListRelationFilter
    rehabRoutines?: PatientRoutineListRelationFilter
    plans?: PlanListRelationFilter
  }, "id">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    neutered?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tutorId?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _avg?: PatientAvgOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
    _sum?: PatientSumOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Patient"> | number
    name?: StringWithAggregatesFilter<"Patient"> | string
    species?: StringWithAggregatesFilter<"Patient"> | string
    breed?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    birthDate?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    weight?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    sex?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    neutered?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    active?: BoolWithAggregatesFilter<"Patient"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    tutorId?: IntWithAggregatesFilter<"Patient"> | number
  }

  export type IntakeDataWhereInput = {
    AND?: IntakeDataWhereInput | IntakeDataWhereInput[]
    OR?: IntakeDataWhereInput[]
    NOT?: IntakeDataWhereInput | IntakeDataWhereInput[]
    id?: IntFilter<"IntakeData"> | number
    patientId?: IntFilter<"IntakeData"> | number
    motivoConsulta?: StringNullableFilter<"IntakeData"> | string | null
    desdeCuando?: StringNullableFilter<"IntakeData"> | string | null
    inicioSintomas?: StringNullableFilter<"IntakeData"> | string | null
    momentosPeorMejor?: StringNullableFilter<"IntakeData"> | string | null
    sintomasObservados?: StringNullableFilter<"IntakeData"> | string | null
    dolorAlComer?: StringNullableFilter<"IntakeData"> | string | null
    lesionesPrevias?: StringNullableFilter<"IntakeData"> | string | null
    cirugiaPrevia?: StringNullableFilter<"IntakeData"> | string | null
    cirugiaDetalle?: StringNullableFilter<"IntakeData"> | string | null
    diagnosticoPrevio?: StringNullableFilter<"IntakeData"> | string | null
    medicacion?: StringNullableFilter<"IntakeData"> | string | null
    medicacionDetalle?: StringNullableFilter<"IntakeData"> | string | null
    fisioterapiaPrevia?: StringNullableFilter<"IntakeData"> | string | null
    fisioterapiaDetalle?: StringNullableFilter<"IntakeData"> | string | null
    mejoriaCon?: StringNullableFilter<"IntakeData"> | string | null
    veterinarioRef?: StringNullableFilter<"IntakeData"> | string | null
    nivelActividad?: StringNullableFilter<"IntakeData"> | string | null
    tipoPaseos?: StringNullableFilter<"IntakeData"> | string | null
    dondeDuerme?: StringNullableFilter<"IntakeData"> | string | null
    escaleras?: StringNullableFilter<"IntakeData"> | string | null
    observaciones?: StringNullableFilter<"IntakeData"> | string | null
    objetivos?: StringNullableFilter<"IntakeData"> | string | null
    createdAt?: DateTimeFilter<"IntakeData"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
  }

  export type IntakeDataOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    motivoConsulta?: SortOrderInput | SortOrder
    desdeCuando?: SortOrderInput | SortOrder
    inicioSintomas?: SortOrderInput | SortOrder
    momentosPeorMejor?: SortOrderInput | SortOrder
    sintomasObservados?: SortOrderInput | SortOrder
    dolorAlComer?: SortOrderInput | SortOrder
    lesionesPrevias?: SortOrderInput | SortOrder
    cirugiaPrevia?: SortOrderInput | SortOrder
    cirugiaDetalle?: SortOrderInput | SortOrder
    diagnosticoPrevio?: SortOrderInput | SortOrder
    medicacion?: SortOrderInput | SortOrder
    medicacionDetalle?: SortOrderInput | SortOrder
    fisioterapiaPrevia?: SortOrderInput | SortOrder
    fisioterapiaDetalle?: SortOrderInput | SortOrder
    mejoriaCon?: SortOrderInput | SortOrder
    veterinarioRef?: SortOrderInput | SortOrder
    nivelActividad?: SortOrderInput | SortOrder
    tipoPaseos?: SortOrderInput | SortOrder
    dondeDuerme?: SortOrderInput | SortOrder
    escaleras?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    objetivos?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type IntakeDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    patientId?: number
    AND?: IntakeDataWhereInput | IntakeDataWhereInput[]
    OR?: IntakeDataWhereInput[]
    NOT?: IntakeDataWhereInput | IntakeDataWhereInput[]
    motivoConsulta?: StringNullableFilter<"IntakeData"> | string | null
    desdeCuando?: StringNullableFilter<"IntakeData"> | string | null
    inicioSintomas?: StringNullableFilter<"IntakeData"> | string | null
    momentosPeorMejor?: StringNullableFilter<"IntakeData"> | string | null
    sintomasObservados?: StringNullableFilter<"IntakeData"> | string | null
    dolorAlComer?: StringNullableFilter<"IntakeData"> | string | null
    lesionesPrevias?: StringNullableFilter<"IntakeData"> | string | null
    cirugiaPrevia?: StringNullableFilter<"IntakeData"> | string | null
    cirugiaDetalle?: StringNullableFilter<"IntakeData"> | string | null
    diagnosticoPrevio?: StringNullableFilter<"IntakeData"> | string | null
    medicacion?: StringNullableFilter<"IntakeData"> | string | null
    medicacionDetalle?: StringNullableFilter<"IntakeData"> | string | null
    fisioterapiaPrevia?: StringNullableFilter<"IntakeData"> | string | null
    fisioterapiaDetalle?: StringNullableFilter<"IntakeData"> | string | null
    mejoriaCon?: StringNullableFilter<"IntakeData"> | string | null
    veterinarioRef?: StringNullableFilter<"IntakeData"> | string | null
    nivelActividad?: StringNullableFilter<"IntakeData"> | string | null
    tipoPaseos?: StringNullableFilter<"IntakeData"> | string | null
    dondeDuerme?: StringNullableFilter<"IntakeData"> | string | null
    escaleras?: StringNullableFilter<"IntakeData"> | string | null
    observaciones?: StringNullableFilter<"IntakeData"> | string | null
    objetivos?: StringNullableFilter<"IntakeData"> | string | null
    createdAt?: DateTimeFilter<"IntakeData"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
  }, "id" | "patientId">

  export type IntakeDataOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    motivoConsulta?: SortOrderInput | SortOrder
    desdeCuando?: SortOrderInput | SortOrder
    inicioSintomas?: SortOrderInput | SortOrder
    momentosPeorMejor?: SortOrderInput | SortOrder
    sintomasObservados?: SortOrderInput | SortOrder
    dolorAlComer?: SortOrderInput | SortOrder
    lesionesPrevias?: SortOrderInput | SortOrder
    cirugiaPrevia?: SortOrderInput | SortOrder
    cirugiaDetalle?: SortOrderInput | SortOrder
    diagnosticoPrevio?: SortOrderInput | SortOrder
    medicacion?: SortOrderInput | SortOrder
    medicacionDetalle?: SortOrderInput | SortOrder
    fisioterapiaPrevia?: SortOrderInput | SortOrder
    fisioterapiaDetalle?: SortOrderInput | SortOrder
    mejoriaCon?: SortOrderInput | SortOrder
    veterinarioRef?: SortOrderInput | SortOrder
    nivelActividad?: SortOrderInput | SortOrder
    tipoPaseos?: SortOrderInput | SortOrder
    dondeDuerme?: SortOrderInput | SortOrder
    escaleras?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    objetivos?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: IntakeDataCountOrderByAggregateInput
    _avg?: IntakeDataAvgOrderByAggregateInput
    _max?: IntakeDataMaxOrderByAggregateInput
    _min?: IntakeDataMinOrderByAggregateInput
    _sum?: IntakeDataSumOrderByAggregateInput
  }

  export type IntakeDataScalarWhereWithAggregatesInput = {
    AND?: IntakeDataScalarWhereWithAggregatesInput | IntakeDataScalarWhereWithAggregatesInput[]
    OR?: IntakeDataScalarWhereWithAggregatesInput[]
    NOT?: IntakeDataScalarWhereWithAggregatesInput | IntakeDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"IntakeData"> | number
    patientId?: IntWithAggregatesFilter<"IntakeData"> | number
    motivoConsulta?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    desdeCuando?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    inicioSintomas?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    momentosPeorMejor?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    sintomasObservados?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    dolorAlComer?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    lesionesPrevias?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    cirugiaPrevia?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    cirugiaDetalle?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    diagnosticoPrevio?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    medicacion?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    medicacionDetalle?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    fisioterapiaPrevia?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    fisioterapiaDetalle?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    mejoriaCon?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    veterinarioRef?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    nivelActividad?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    tipoPaseos?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    dondeDuerme?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    escaleras?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    observaciones?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    objetivos?: StringNullableWithAggregatesFilter<"IntakeData"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"IntakeData"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: IntFilter<"Appointment"> | number
    date?: DateTimeFilter<"Appointment"> | Date | string
    duration?: IntFilter<"Appointment"> | number
    notes?: StringNullableFilter<"Appointment"> | string | null
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    patientId?: IntFilter<"Appointment"> | number
    fisioId?: IntFilter<"Appointment"> | number
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    fisio?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    fisioId?: SortOrder
    patient?: PatientOrderByWithRelationInput
    fisio?: UserOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    date?: DateTimeFilter<"Appointment"> | Date | string
    duration?: IntFilter<"Appointment"> | number
    notes?: StringNullableFilter<"Appointment"> | string | null
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    patientId?: IntFilter<"Appointment"> | number
    fisioId?: IntFilter<"Appointment"> | number
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    fisio?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    fisioId?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Appointment"> | number
    date?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    duration?: IntWithAggregatesFilter<"Appointment"> | number
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    status?: StringWithAggregatesFilter<"Appointment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    patientId?: IntWithAggregatesFilter<"Appointment"> | number
    fisioId?: IntWithAggregatesFilter<"Appointment"> | number
  }

  export type RehabRoutineWhereInput = {
    AND?: RehabRoutineWhereInput | RehabRoutineWhereInput[]
    OR?: RehabRoutineWhereInput[]
    NOT?: RehabRoutineWhereInput | RehabRoutineWhereInput[]
    id?: IntFilter<"RehabRoutine"> | number
    name?: StringFilter<"RehabRoutine"> | string
    description?: StringNullableFilter<"RehabRoutine"> | string | null
    videoUrl?: StringNullableFilter<"RehabRoutine"> | string | null
    duration?: IntNullableFilter<"RehabRoutine"> | number | null
    category?: StringNullableFilter<"RehabRoutine"> | string | null
    createdAt?: DateTimeFilter<"RehabRoutine"> | Date | string
    updatedAt?: DateTimeFilter<"RehabRoutine"> | Date | string
    patientRoutines?: PatientRoutineListRelationFilter
  }

  export type RehabRoutineOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientRoutines?: PatientRoutineOrderByRelationAggregateInput
  }

  export type RehabRoutineWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RehabRoutineWhereInput | RehabRoutineWhereInput[]
    OR?: RehabRoutineWhereInput[]
    NOT?: RehabRoutineWhereInput | RehabRoutineWhereInput[]
    name?: StringFilter<"RehabRoutine"> | string
    description?: StringNullableFilter<"RehabRoutine"> | string | null
    videoUrl?: StringNullableFilter<"RehabRoutine"> | string | null
    duration?: IntNullableFilter<"RehabRoutine"> | number | null
    category?: StringNullableFilter<"RehabRoutine"> | string | null
    createdAt?: DateTimeFilter<"RehabRoutine"> | Date | string
    updatedAt?: DateTimeFilter<"RehabRoutine"> | Date | string
    patientRoutines?: PatientRoutineListRelationFilter
  }, "id">

  export type RehabRoutineOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RehabRoutineCountOrderByAggregateInput
    _avg?: RehabRoutineAvgOrderByAggregateInput
    _max?: RehabRoutineMaxOrderByAggregateInput
    _min?: RehabRoutineMinOrderByAggregateInput
    _sum?: RehabRoutineSumOrderByAggregateInput
  }

  export type RehabRoutineScalarWhereWithAggregatesInput = {
    AND?: RehabRoutineScalarWhereWithAggregatesInput | RehabRoutineScalarWhereWithAggregatesInput[]
    OR?: RehabRoutineScalarWhereWithAggregatesInput[]
    NOT?: RehabRoutineScalarWhereWithAggregatesInput | RehabRoutineScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RehabRoutine"> | number
    name?: StringWithAggregatesFilter<"RehabRoutine"> | string
    description?: StringNullableWithAggregatesFilter<"RehabRoutine"> | string | null
    videoUrl?: StringNullableWithAggregatesFilter<"RehabRoutine"> | string | null
    duration?: IntNullableWithAggregatesFilter<"RehabRoutine"> | number | null
    category?: StringNullableWithAggregatesFilter<"RehabRoutine"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RehabRoutine"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RehabRoutine"> | Date | string
  }

  export type PatientRoutineWhereInput = {
    AND?: PatientRoutineWhereInput | PatientRoutineWhereInput[]
    OR?: PatientRoutineWhereInput[]
    NOT?: PatientRoutineWhereInput | PatientRoutineWhereInput[]
    id?: IntFilter<"PatientRoutine"> | number
    patientId?: IntFilter<"PatientRoutine"> | number
    routineId?: IntFilter<"PatientRoutine"> | number
    assignedAt?: DateTimeFilter<"PatientRoutine"> | Date | string
    notes?: StringNullableFilter<"PatientRoutine"> | string | null
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    routine?: XOR<RehabRoutineRelationFilter, RehabRoutineWhereInput>
  }

  export type PatientRoutineOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    routineId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    patient?: PatientOrderByWithRelationInput
    routine?: RehabRoutineOrderByWithRelationInput
  }

  export type PatientRoutineWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    patientId_routineId?: PatientRoutinePatientIdRoutineIdCompoundUniqueInput
    AND?: PatientRoutineWhereInput | PatientRoutineWhereInput[]
    OR?: PatientRoutineWhereInput[]
    NOT?: PatientRoutineWhereInput | PatientRoutineWhereInput[]
    patientId?: IntFilter<"PatientRoutine"> | number
    routineId?: IntFilter<"PatientRoutine"> | number
    assignedAt?: DateTimeFilter<"PatientRoutine"> | Date | string
    notes?: StringNullableFilter<"PatientRoutine"> | string | null
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    routine?: XOR<RehabRoutineRelationFilter, RehabRoutineWhereInput>
  }, "id" | "patientId_routineId">

  export type PatientRoutineOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    routineId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: PatientRoutineCountOrderByAggregateInput
    _avg?: PatientRoutineAvgOrderByAggregateInput
    _max?: PatientRoutineMaxOrderByAggregateInput
    _min?: PatientRoutineMinOrderByAggregateInput
    _sum?: PatientRoutineSumOrderByAggregateInput
  }

  export type PatientRoutineScalarWhereWithAggregatesInput = {
    AND?: PatientRoutineScalarWhereWithAggregatesInput | PatientRoutineScalarWhereWithAggregatesInput[]
    OR?: PatientRoutineScalarWhereWithAggregatesInput[]
    NOT?: PatientRoutineScalarWhereWithAggregatesInput | PatientRoutineScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PatientRoutine"> | number
    patientId?: IntWithAggregatesFilter<"PatientRoutine"> | number
    routineId?: IntWithAggregatesFilter<"PatientRoutine"> | number
    assignedAt?: DateTimeWithAggregatesFilter<"PatientRoutine"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"PatientRoutine"> | string | null
  }

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: IntFilter<"Plan"> | number
    title?: StringFilter<"Plan"> | string
    type?: StringFilter<"Plan"> | string
    content?: StringFilter<"Plan"> | string
    patientId?: IntFilter<"Plan"> | number
    createdById?: IntFilter<"Plan"> | number
    pinned?: BoolFilter<"Plan"> | boolean
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    content?: SortOrder
    patientId?: SortOrder
    createdById?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    title?: StringFilter<"Plan"> | string
    type?: StringFilter<"Plan"> | string
    content?: StringFilter<"Plan"> | string
    patientId?: IntFilter<"Plan"> | number
    createdById?: IntFilter<"Plan"> | number
    pinned?: BoolFilter<"Plan"> | boolean
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    content?: SortOrder
    patientId?: SortOrder
    createdById?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Plan"> | number
    title?: StringWithAggregatesFilter<"Plan"> | string
    type?: StringWithAggregatesFilter<"Plan"> | string
    content?: StringWithAggregatesFilter<"Plan"> | string
    patientId?: IntWithAggregatesFilter<"Plan"> | number
    createdById?: IntWithAggregatesFilter<"Plan"> | number
    pinned?: BoolWithAggregatesFilter<"Plan"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: IntFilter<"Message"> | number
    body?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    fisioId?: IntNullableFilter<"Message"> | number | null
    tutorId?: IntNullableFilter<"Message"> | number | null
    fromTutor?: BoolFilter<"Message"> | boolean
    fisio?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    tutor?: XOR<TutorNullableRelationFilter, TutorWhereInput> | null
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    fisioId?: SortOrderInput | SortOrder
    tutorId?: SortOrderInput | SortOrder
    fromTutor?: SortOrder
    fisio?: UserOrderByWithRelationInput
    tutor?: TutorOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    body?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    fisioId?: IntNullableFilter<"Message"> | number | null
    tutorId?: IntNullableFilter<"Message"> | number | null
    fromTutor?: BoolFilter<"Message"> | boolean
    fisio?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    tutor?: XOR<TutorNullableRelationFilter, TutorWhereInput> | null
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    fisioId?: SortOrderInput | SortOrder
    tutorId?: SortOrderInput | SortOrder
    fromTutor?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Message"> | number
    body?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    fisioId?: IntNullableWithAggregatesFilter<"Message"> | number | null
    tutorId?: IntNullableWithAggregatesFilter<"Message"> | number | null
    fromTutor?: BoolWithAggregatesFilter<"Message"> | boolean
  }

  export type UserCreateInput = {
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutFisioInput
    appointments?: AppointmentCreateNestedManyWithoutFisioInput
    plans?: PlanCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutFisioInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutFisioInput
    plans?: PlanUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutFisioNestedInput
    appointments?: AppointmentUpdateManyWithoutFisioNestedInput
    plans?: PlanUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutFisioNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutFisioNestedInput
    plans?: PlanUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorCreateInput = {
    name: string
    phone: string
    email?: string | null
    howFoundUs?: string | null
    portalEmail?: string | null
    portalPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patients?: PatientCreateNestedManyWithoutTutorInput
    messages?: MessageCreateNestedManyWithoutTutorInput
  }

  export type TutorUncheckedCreateInput = {
    id?: number
    name: string
    phone: string
    email?: string | null
    howFoundUs?: string | null
    portalEmail?: string | null
    portalPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patients?: PatientUncheckedCreateNestedManyWithoutTutorInput
    messages?: MessageUncheckedCreateNestedManyWithoutTutorInput
  }

  export type TutorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    howFoundUs?: NullableStringFieldUpdateOperationsInput | string | null
    portalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    portalPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patients?: PatientUpdateManyWithoutTutorNestedInput
    messages?: MessageUpdateManyWithoutTutorNestedInput
  }

  export type TutorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    howFoundUs?: NullableStringFieldUpdateOperationsInput | string | null
    portalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    portalPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patients?: PatientUncheckedUpdateManyWithoutTutorNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTutorNestedInput
  }

  export type TutorCreateManyInput = {
    id?: number
    name: string
    phone: string
    email?: string | null
    howFoundUs?: string | null
    portalEmail?: string | null
    portalPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TutorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    howFoundUs?: NullableStringFieldUpdateOperationsInput | string | null
    portalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    portalPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    howFoundUs?: NullableStringFieldUpdateOperationsInput | string | null
    portalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    portalPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientCreateInput = {
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutor: TutorCreateNestedOneWithoutPatientsInput
    intakeData?: IntakeDataCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    rehabRoutines?: PatientRoutineCreateNestedManyWithoutPatientInput
    plans?: PlanCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutorId: number
    intakeData?: IntakeDataUncheckedCreateNestedOneWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    rehabRoutines?: PatientRoutineUncheckedCreateNestedManyWithoutPatientInput
    plans?: PlanUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutor?: TutorUpdateOneRequiredWithoutPatientsNestedInput
    intakeData?: IntakeDataUpdateOneWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUpdateManyWithoutPatientNestedInput
    plans?: PlanUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorId?: IntFieldUpdateOperationsInput | number
    intakeData?: IntakeDataUncheckedUpdateOneWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUncheckedUpdateManyWithoutPatientNestedInput
    plans?: PlanUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutorId: number
  }

  export type PatientUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorId?: IntFieldUpdateOperationsInput | number
  }

  export type IntakeDataCreateInput = {
    motivoConsulta?: string | null
    desdeCuando?: string | null
    inicioSintomas?: string | null
    momentosPeorMejor?: string | null
    sintomasObservados?: string | null
    dolorAlComer?: string | null
    lesionesPrevias?: string | null
    cirugiaPrevia?: string | null
    cirugiaDetalle?: string | null
    diagnosticoPrevio?: string | null
    medicacion?: string | null
    medicacionDetalle?: string | null
    fisioterapiaPrevia?: string | null
    fisioterapiaDetalle?: string | null
    mejoriaCon?: string | null
    veterinarioRef?: string | null
    nivelActividad?: string | null
    tipoPaseos?: string | null
    dondeDuerme?: string | null
    escaleras?: string | null
    observaciones?: string | null
    objetivos?: string | null
    createdAt?: Date | string
    patient: PatientCreateNestedOneWithoutIntakeDataInput
  }

  export type IntakeDataUncheckedCreateInput = {
    id?: number
    patientId: number
    motivoConsulta?: string | null
    desdeCuando?: string | null
    inicioSintomas?: string | null
    momentosPeorMejor?: string | null
    sintomasObservados?: string | null
    dolorAlComer?: string | null
    lesionesPrevias?: string | null
    cirugiaPrevia?: string | null
    cirugiaDetalle?: string | null
    diagnosticoPrevio?: string | null
    medicacion?: string | null
    medicacionDetalle?: string | null
    fisioterapiaPrevia?: string | null
    fisioterapiaDetalle?: string | null
    mejoriaCon?: string | null
    veterinarioRef?: string | null
    nivelActividad?: string | null
    tipoPaseos?: string | null
    dondeDuerme?: string | null
    escaleras?: string | null
    observaciones?: string | null
    objetivos?: string | null
    createdAt?: Date | string
  }

  export type IntakeDataUpdateInput = {
    motivoConsulta?: NullableStringFieldUpdateOperationsInput | string | null
    desdeCuando?: NullableStringFieldUpdateOperationsInput | string | null
    inicioSintomas?: NullableStringFieldUpdateOperationsInput | string | null
    momentosPeorMejor?: NullableStringFieldUpdateOperationsInput | string | null
    sintomasObservados?: NullableStringFieldUpdateOperationsInput | string | null
    dolorAlComer?: NullableStringFieldUpdateOperationsInput | string | null
    lesionesPrevias?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticoPrevio?: NullableStringFieldUpdateOperationsInput | string | null
    medicacion?: NullableStringFieldUpdateOperationsInput | string | null
    medicacionDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    mejoriaCon?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarioRef?: NullableStringFieldUpdateOperationsInput | string | null
    nivelActividad?: NullableStringFieldUpdateOperationsInput | string | null
    tipoPaseos?: NullableStringFieldUpdateOperationsInput | string | null
    dondeDuerme?: NullableStringFieldUpdateOperationsInput | string | null
    escaleras?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    objetivos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutIntakeDataNestedInput
  }

  export type IntakeDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    motivoConsulta?: NullableStringFieldUpdateOperationsInput | string | null
    desdeCuando?: NullableStringFieldUpdateOperationsInput | string | null
    inicioSintomas?: NullableStringFieldUpdateOperationsInput | string | null
    momentosPeorMejor?: NullableStringFieldUpdateOperationsInput | string | null
    sintomasObservados?: NullableStringFieldUpdateOperationsInput | string | null
    dolorAlComer?: NullableStringFieldUpdateOperationsInput | string | null
    lesionesPrevias?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticoPrevio?: NullableStringFieldUpdateOperationsInput | string | null
    medicacion?: NullableStringFieldUpdateOperationsInput | string | null
    medicacionDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    mejoriaCon?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarioRef?: NullableStringFieldUpdateOperationsInput | string | null
    nivelActividad?: NullableStringFieldUpdateOperationsInput | string | null
    tipoPaseos?: NullableStringFieldUpdateOperationsInput | string | null
    dondeDuerme?: NullableStringFieldUpdateOperationsInput | string | null
    escaleras?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    objetivos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntakeDataCreateManyInput = {
    id?: number
    patientId: number
    motivoConsulta?: string | null
    desdeCuando?: string | null
    inicioSintomas?: string | null
    momentosPeorMejor?: string | null
    sintomasObservados?: string | null
    dolorAlComer?: string | null
    lesionesPrevias?: string | null
    cirugiaPrevia?: string | null
    cirugiaDetalle?: string | null
    diagnosticoPrevio?: string | null
    medicacion?: string | null
    medicacionDetalle?: string | null
    fisioterapiaPrevia?: string | null
    fisioterapiaDetalle?: string | null
    mejoriaCon?: string | null
    veterinarioRef?: string | null
    nivelActividad?: string | null
    tipoPaseos?: string | null
    dondeDuerme?: string | null
    escaleras?: string | null
    observaciones?: string | null
    objetivos?: string | null
    createdAt?: Date | string
  }

  export type IntakeDataUpdateManyMutationInput = {
    motivoConsulta?: NullableStringFieldUpdateOperationsInput | string | null
    desdeCuando?: NullableStringFieldUpdateOperationsInput | string | null
    inicioSintomas?: NullableStringFieldUpdateOperationsInput | string | null
    momentosPeorMejor?: NullableStringFieldUpdateOperationsInput | string | null
    sintomasObservados?: NullableStringFieldUpdateOperationsInput | string | null
    dolorAlComer?: NullableStringFieldUpdateOperationsInput | string | null
    lesionesPrevias?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticoPrevio?: NullableStringFieldUpdateOperationsInput | string | null
    medicacion?: NullableStringFieldUpdateOperationsInput | string | null
    medicacionDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    mejoriaCon?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarioRef?: NullableStringFieldUpdateOperationsInput | string | null
    nivelActividad?: NullableStringFieldUpdateOperationsInput | string | null
    tipoPaseos?: NullableStringFieldUpdateOperationsInput | string | null
    dondeDuerme?: NullableStringFieldUpdateOperationsInput | string | null
    escaleras?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    objetivos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntakeDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    motivoConsulta?: NullableStringFieldUpdateOperationsInput | string | null
    desdeCuando?: NullableStringFieldUpdateOperationsInput | string | null
    inicioSintomas?: NullableStringFieldUpdateOperationsInput | string | null
    momentosPeorMejor?: NullableStringFieldUpdateOperationsInput | string | null
    sintomasObservados?: NullableStringFieldUpdateOperationsInput | string | null
    dolorAlComer?: NullableStringFieldUpdateOperationsInput | string | null
    lesionesPrevias?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticoPrevio?: NullableStringFieldUpdateOperationsInput | string | null
    medicacion?: NullableStringFieldUpdateOperationsInput | string | null
    medicacionDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    mejoriaCon?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarioRef?: NullableStringFieldUpdateOperationsInput | string | null
    nivelActividad?: NullableStringFieldUpdateOperationsInput | string | null
    tipoPaseos?: NullableStringFieldUpdateOperationsInput | string | null
    dondeDuerme?: NullableStringFieldUpdateOperationsInput | string | null
    escaleras?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    objetivos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    date: Date | string
    duration?: number
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    fisio: UserCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: number
    date: Date | string
    duration?: number
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: number
    fisioId: number
  }

  export type AppointmentUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    fisio?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: IntFieldUpdateOperationsInput | number
    fisioId?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentCreateManyInput = {
    id?: number
    date: Date | string
    duration?: number
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: number
    fisioId: number
  }

  export type AppointmentUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: IntFieldUpdateOperationsInput | number
    fisioId?: IntFieldUpdateOperationsInput | number
  }

  export type RehabRoutineCreateInput = {
    name: string
    description?: string | null
    videoUrl?: string | null
    duration?: number | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patientRoutines?: PatientRoutineCreateNestedManyWithoutRoutineInput
  }

  export type RehabRoutineUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    videoUrl?: string | null
    duration?: number | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patientRoutines?: PatientRoutineUncheckedCreateNestedManyWithoutRoutineInput
  }

  export type RehabRoutineUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientRoutines?: PatientRoutineUpdateManyWithoutRoutineNestedInput
  }

  export type RehabRoutineUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientRoutines?: PatientRoutineUncheckedUpdateManyWithoutRoutineNestedInput
  }

  export type RehabRoutineCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    videoUrl?: string | null
    duration?: number | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RehabRoutineUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RehabRoutineUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientRoutineCreateInput = {
    assignedAt?: Date | string
    notes?: string | null
    patient: PatientCreateNestedOneWithoutRehabRoutinesInput
    routine: RehabRoutineCreateNestedOneWithoutPatientRoutinesInput
  }

  export type PatientRoutineUncheckedCreateInput = {
    id?: number
    patientId: number
    routineId: number
    assignedAt?: Date | string
    notes?: string | null
  }

  export type PatientRoutineUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patient?: PatientUpdateOneRequiredWithoutRehabRoutinesNestedInput
    routine?: RehabRoutineUpdateOneRequiredWithoutPatientRoutinesNestedInput
  }

  export type PatientRoutineUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    routineId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientRoutineCreateManyInput = {
    id?: number
    patientId: number
    routineId: number
    assignedAt?: Date | string
    notes?: string | null
  }

  export type PatientRoutineUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientRoutineUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    routineId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlanCreateInput = {
    title: string
    type?: string
    content: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutPlansInput
    createdBy: UserCreateNestedOneWithoutPlansInput
  }

  export type PlanUncheckedCreateInput = {
    id?: number
    title: string
    type?: string
    content: string
    patientId: number
    createdById: number
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPlansNestedInput
    createdBy?: UserUpdateOneRequiredWithoutPlansNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCreateManyInput = {
    id?: number
    title: string
    type?: string
    content: string
    patientId: number
    createdById: number
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    body: string
    createdAt?: Date | string
    fromTutor?: boolean
    fisio?: UserCreateNestedOneWithoutMessagesInput
    tutor?: TutorCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: number
    body: string
    createdAt?: Date | string
    fisioId?: number | null
    tutorId?: number | null
    fromTutor?: boolean
  }

  export type MessageUpdateInput = {
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
    fisio?: UserUpdateOneWithoutMessagesNestedInput
    tutor?: TutorUpdateOneWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisioId?: NullableIntFieldUpdateOperationsInput | number | null
    tutorId?: NullableIntFieldUpdateOperationsInput | number | null
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageCreateManyInput = {
    id?: number
    body: string
    createdAt?: Date | string
    fisioId?: number | null
    tutorId?: number | null
    fromTutor?: boolean
  }

  export type MessageUpdateManyMutationInput = {
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisioId?: NullableIntFieldUpdateOperationsInput | number | null
    tutorId?: NullableIntFieldUpdateOperationsInput | number | null
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type PlanListRelationFilter = {
    every?: PlanWhereInput
    some?: PlanWhereInput
    none?: PlanWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PatientListRelationFilter = {
    every?: PatientWhereInput
    some?: PatientWhereInput
    none?: PatientWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PatientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TutorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    howFoundUs?: SortOrder
    portalEmail?: SortOrder
    portalPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TutorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TutorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    howFoundUs?: SortOrder
    portalEmail?: SortOrder
    portalPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TutorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    howFoundUs?: SortOrder
    portalEmail?: SortOrder
    portalPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TutorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TutorRelationFilter = {
    is?: TutorWhereInput
    isNot?: TutorWhereInput
  }

  export type IntakeDataNullableRelationFilter = {
    is?: IntakeDataWhereInput | null
    isNot?: IntakeDataWhereInput | null
  }

  export type PatientRoutineListRelationFilter = {
    every?: PatientRoutineWhereInput
    some?: PatientRoutineWhereInput
    none?: PatientRoutineWhereInput
  }

  export type PatientRoutineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    sex?: SortOrder
    neutered?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tutorId?: SortOrder
  }

  export type PatientAvgOrderByAggregateInput = {
    id?: SortOrder
    tutorId?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    sex?: SortOrder
    neutered?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tutorId?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    species?: SortOrder
    breed?: SortOrder
    birthDate?: SortOrder
    weight?: SortOrder
    sex?: SortOrder
    neutered?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tutorId?: SortOrder
  }

  export type PatientSumOrderByAggregateInput = {
    id?: SortOrder
    tutorId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PatientRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type IntakeDataCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    motivoConsulta?: SortOrder
    desdeCuando?: SortOrder
    inicioSintomas?: SortOrder
    momentosPeorMejor?: SortOrder
    sintomasObservados?: SortOrder
    dolorAlComer?: SortOrder
    lesionesPrevias?: SortOrder
    cirugiaPrevia?: SortOrder
    cirugiaDetalle?: SortOrder
    diagnosticoPrevio?: SortOrder
    medicacion?: SortOrder
    medicacionDetalle?: SortOrder
    fisioterapiaPrevia?: SortOrder
    fisioterapiaDetalle?: SortOrder
    mejoriaCon?: SortOrder
    veterinarioRef?: SortOrder
    nivelActividad?: SortOrder
    tipoPaseos?: SortOrder
    dondeDuerme?: SortOrder
    escaleras?: SortOrder
    observaciones?: SortOrder
    objetivos?: SortOrder
    createdAt?: SortOrder
  }

  export type IntakeDataAvgOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
  }

  export type IntakeDataMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    motivoConsulta?: SortOrder
    desdeCuando?: SortOrder
    inicioSintomas?: SortOrder
    momentosPeorMejor?: SortOrder
    sintomasObservados?: SortOrder
    dolorAlComer?: SortOrder
    lesionesPrevias?: SortOrder
    cirugiaPrevia?: SortOrder
    cirugiaDetalle?: SortOrder
    diagnosticoPrevio?: SortOrder
    medicacion?: SortOrder
    medicacionDetalle?: SortOrder
    fisioterapiaPrevia?: SortOrder
    fisioterapiaDetalle?: SortOrder
    mejoriaCon?: SortOrder
    veterinarioRef?: SortOrder
    nivelActividad?: SortOrder
    tipoPaseos?: SortOrder
    dondeDuerme?: SortOrder
    escaleras?: SortOrder
    observaciones?: SortOrder
    objetivos?: SortOrder
    createdAt?: SortOrder
  }

  export type IntakeDataMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    motivoConsulta?: SortOrder
    desdeCuando?: SortOrder
    inicioSintomas?: SortOrder
    momentosPeorMejor?: SortOrder
    sintomasObservados?: SortOrder
    dolorAlComer?: SortOrder
    lesionesPrevias?: SortOrder
    cirugiaPrevia?: SortOrder
    cirugiaDetalle?: SortOrder
    diagnosticoPrevio?: SortOrder
    medicacion?: SortOrder
    medicacionDetalle?: SortOrder
    fisioterapiaPrevia?: SortOrder
    fisioterapiaDetalle?: SortOrder
    mejoriaCon?: SortOrder
    veterinarioRef?: SortOrder
    nivelActividad?: SortOrder
    tipoPaseos?: SortOrder
    dondeDuerme?: SortOrder
    escaleras?: SortOrder
    observaciones?: SortOrder
    objetivos?: SortOrder
    createdAt?: SortOrder
  }

  export type IntakeDataSumOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    fisioId?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    patientId?: SortOrder
    fisioId?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    fisioId?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    fisioId?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    patientId?: SortOrder
    fisioId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type RehabRoutineCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    videoUrl?: SortOrder
    duration?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RehabRoutineAvgOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
  }

  export type RehabRoutineMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    videoUrl?: SortOrder
    duration?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RehabRoutineMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    videoUrl?: SortOrder
    duration?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RehabRoutineSumOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type RehabRoutineRelationFilter = {
    is?: RehabRoutineWhereInput
    isNot?: RehabRoutineWhereInput
  }

  export type PatientRoutinePatientIdRoutineIdCompoundUniqueInput = {
    patientId: number
    routineId: number
  }

  export type PatientRoutineCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    routineId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrder
  }

  export type PatientRoutineAvgOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    routineId?: SortOrder
  }

  export type PatientRoutineMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    routineId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrder
  }

  export type PatientRoutineMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    routineId?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrder
  }

  export type PatientRoutineSumOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    routineId?: SortOrder
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    content?: SortOrder
    patientId?: SortOrder
    createdById?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    createdById?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    content?: SortOrder
    patientId?: SortOrder
    createdById?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    content?: SortOrder
    patientId?: SortOrder
    createdById?: SortOrder
    pinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    createdById?: SortOrder
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TutorNullableRelationFilter = {
    is?: TutorWhereInput | null
    isNot?: TutorWhereInput | null
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    fisioId?: SortOrder
    tutorId?: SortOrder
    fromTutor?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    id?: SortOrder
    fisioId?: SortOrder
    tutorId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    fisioId?: SortOrder
    tutorId?: SortOrder
    fromTutor?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    fisioId?: SortOrder
    tutorId?: SortOrder
    fromTutor?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    id?: SortOrder
    fisioId?: SortOrder
    tutorId?: SortOrder
  }

  export type MessageCreateNestedManyWithoutFisioInput = {
    create?: XOR<MessageCreateWithoutFisioInput, MessageUncheckedCreateWithoutFisioInput> | MessageCreateWithoutFisioInput[] | MessageUncheckedCreateWithoutFisioInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutFisioInput | MessageCreateOrConnectWithoutFisioInput[]
    createMany?: MessageCreateManyFisioInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutFisioInput = {
    create?: XOR<AppointmentCreateWithoutFisioInput, AppointmentUncheckedCreateWithoutFisioInput> | AppointmentCreateWithoutFisioInput[] | AppointmentUncheckedCreateWithoutFisioInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutFisioInput | AppointmentCreateOrConnectWithoutFisioInput[]
    createMany?: AppointmentCreateManyFisioInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PlanCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PlanCreateWithoutCreatedByInput, PlanUncheckedCreateWithoutCreatedByInput> | PlanCreateWithoutCreatedByInput[] | PlanUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutCreatedByInput | PlanCreateOrConnectWithoutCreatedByInput[]
    createMany?: PlanCreateManyCreatedByInputEnvelope
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutFisioInput = {
    create?: XOR<MessageCreateWithoutFisioInput, MessageUncheckedCreateWithoutFisioInput> | MessageCreateWithoutFisioInput[] | MessageUncheckedCreateWithoutFisioInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutFisioInput | MessageCreateOrConnectWithoutFisioInput[]
    createMany?: MessageCreateManyFisioInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutFisioInput = {
    create?: XOR<AppointmentCreateWithoutFisioInput, AppointmentUncheckedCreateWithoutFisioInput> | AppointmentCreateWithoutFisioInput[] | AppointmentUncheckedCreateWithoutFisioInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutFisioInput | AppointmentCreateOrConnectWithoutFisioInput[]
    createMany?: AppointmentCreateManyFisioInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PlanUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PlanCreateWithoutCreatedByInput, PlanUncheckedCreateWithoutCreatedByInput> | PlanCreateWithoutCreatedByInput[] | PlanUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutCreatedByInput | PlanCreateOrConnectWithoutCreatedByInput[]
    createMany?: PlanCreateManyCreatedByInputEnvelope
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MessageUpdateManyWithoutFisioNestedInput = {
    create?: XOR<MessageCreateWithoutFisioInput, MessageUncheckedCreateWithoutFisioInput> | MessageCreateWithoutFisioInput[] | MessageUncheckedCreateWithoutFisioInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutFisioInput | MessageCreateOrConnectWithoutFisioInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutFisioInput | MessageUpsertWithWhereUniqueWithoutFisioInput[]
    createMany?: MessageCreateManyFisioInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutFisioInput | MessageUpdateWithWhereUniqueWithoutFisioInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutFisioInput | MessageUpdateManyWithWhereWithoutFisioInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutFisioNestedInput = {
    create?: XOR<AppointmentCreateWithoutFisioInput, AppointmentUncheckedCreateWithoutFisioInput> | AppointmentCreateWithoutFisioInput[] | AppointmentUncheckedCreateWithoutFisioInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutFisioInput | AppointmentCreateOrConnectWithoutFisioInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutFisioInput | AppointmentUpsertWithWhereUniqueWithoutFisioInput[]
    createMany?: AppointmentCreateManyFisioInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutFisioInput | AppointmentUpdateWithWhereUniqueWithoutFisioInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutFisioInput | AppointmentUpdateManyWithWhereWithoutFisioInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PlanUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PlanCreateWithoutCreatedByInput, PlanUncheckedCreateWithoutCreatedByInput> | PlanCreateWithoutCreatedByInput[] | PlanUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutCreatedByInput | PlanCreateOrConnectWithoutCreatedByInput[]
    upsert?: PlanUpsertWithWhereUniqueWithoutCreatedByInput | PlanUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PlanCreateManyCreatedByInputEnvelope
    set?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    disconnect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    delete?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    update?: PlanUpdateWithWhereUniqueWithoutCreatedByInput | PlanUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PlanUpdateManyWithWhereWithoutCreatedByInput | PlanUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PlanScalarWhereInput | PlanScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MessageUncheckedUpdateManyWithoutFisioNestedInput = {
    create?: XOR<MessageCreateWithoutFisioInput, MessageUncheckedCreateWithoutFisioInput> | MessageCreateWithoutFisioInput[] | MessageUncheckedCreateWithoutFisioInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutFisioInput | MessageCreateOrConnectWithoutFisioInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutFisioInput | MessageUpsertWithWhereUniqueWithoutFisioInput[]
    createMany?: MessageCreateManyFisioInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutFisioInput | MessageUpdateWithWhereUniqueWithoutFisioInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutFisioInput | MessageUpdateManyWithWhereWithoutFisioInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutFisioNestedInput = {
    create?: XOR<AppointmentCreateWithoutFisioInput, AppointmentUncheckedCreateWithoutFisioInput> | AppointmentCreateWithoutFisioInput[] | AppointmentUncheckedCreateWithoutFisioInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutFisioInput | AppointmentCreateOrConnectWithoutFisioInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutFisioInput | AppointmentUpsertWithWhereUniqueWithoutFisioInput[]
    createMany?: AppointmentCreateManyFisioInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutFisioInput | AppointmentUpdateWithWhereUniqueWithoutFisioInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutFisioInput | AppointmentUpdateManyWithWhereWithoutFisioInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PlanUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PlanCreateWithoutCreatedByInput, PlanUncheckedCreateWithoutCreatedByInput> | PlanCreateWithoutCreatedByInput[] | PlanUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutCreatedByInput | PlanCreateOrConnectWithoutCreatedByInput[]
    upsert?: PlanUpsertWithWhereUniqueWithoutCreatedByInput | PlanUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PlanCreateManyCreatedByInputEnvelope
    set?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    disconnect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    delete?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    update?: PlanUpdateWithWhereUniqueWithoutCreatedByInput | PlanUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PlanUpdateManyWithWhereWithoutCreatedByInput | PlanUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PlanScalarWhereInput | PlanScalarWhereInput[]
  }

  export type PatientCreateNestedManyWithoutTutorInput = {
    create?: XOR<PatientCreateWithoutTutorInput, PatientUncheckedCreateWithoutTutorInput> | PatientCreateWithoutTutorInput[] | PatientUncheckedCreateWithoutTutorInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutTutorInput | PatientCreateOrConnectWithoutTutorInput[]
    createMany?: PatientCreateManyTutorInputEnvelope
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutTutorInput = {
    create?: XOR<MessageCreateWithoutTutorInput, MessageUncheckedCreateWithoutTutorInput> | MessageCreateWithoutTutorInput[] | MessageUncheckedCreateWithoutTutorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTutorInput | MessageCreateOrConnectWithoutTutorInput[]
    createMany?: MessageCreateManyTutorInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type PatientUncheckedCreateNestedManyWithoutTutorInput = {
    create?: XOR<PatientCreateWithoutTutorInput, PatientUncheckedCreateWithoutTutorInput> | PatientCreateWithoutTutorInput[] | PatientUncheckedCreateWithoutTutorInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutTutorInput | PatientCreateOrConnectWithoutTutorInput[]
    createMany?: PatientCreateManyTutorInputEnvelope
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutTutorInput = {
    create?: XOR<MessageCreateWithoutTutorInput, MessageUncheckedCreateWithoutTutorInput> | MessageCreateWithoutTutorInput[] | MessageUncheckedCreateWithoutTutorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTutorInput | MessageCreateOrConnectWithoutTutorInput[]
    createMany?: MessageCreateManyTutorInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PatientUpdateManyWithoutTutorNestedInput = {
    create?: XOR<PatientCreateWithoutTutorInput, PatientUncheckedCreateWithoutTutorInput> | PatientCreateWithoutTutorInput[] | PatientUncheckedCreateWithoutTutorInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutTutorInput | PatientCreateOrConnectWithoutTutorInput[]
    upsert?: PatientUpsertWithWhereUniqueWithoutTutorInput | PatientUpsertWithWhereUniqueWithoutTutorInput[]
    createMany?: PatientCreateManyTutorInputEnvelope
    set?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    disconnect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    delete?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    update?: PatientUpdateWithWhereUniqueWithoutTutorInput | PatientUpdateWithWhereUniqueWithoutTutorInput[]
    updateMany?: PatientUpdateManyWithWhereWithoutTutorInput | PatientUpdateManyWithWhereWithoutTutorInput[]
    deleteMany?: PatientScalarWhereInput | PatientScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutTutorNestedInput = {
    create?: XOR<MessageCreateWithoutTutorInput, MessageUncheckedCreateWithoutTutorInput> | MessageCreateWithoutTutorInput[] | MessageUncheckedCreateWithoutTutorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTutorInput | MessageCreateOrConnectWithoutTutorInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutTutorInput | MessageUpsertWithWhereUniqueWithoutTutorInput[]
    createMany?: MessageCreateManyTutorInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutTutorInput | MessageUpdateWithWhereUniqueWithoutTutorInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutTutorInput | MessageUpdateManyWithWhereWithoutTutorInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type PatientUncheckedUpdateManyWithoutTutorNestedInput = {
    create?: XOR<PatientCreateWithoutTutorInput, PatientUncheckedCreateWithoutTutorInput> | PatientCreateWithoutTutorInput[] | PatientUncheckedCreateWithoutTutorInput[]
    connectOrCreate?: PatientCreateOrConnectWithoutTutorInput | PatientCreateOrConnectWithoutTutorInput[]
    upsert?: PatientUpsertWithWhereUniqueWithoutTutorInput | PatientUpsertWithWhereUniqueWithoutTutorInput[]
    createMany?: PatientCreateManyTutorInputEnvelope
    set?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    disconnect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    delete?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    connect?: PatientWhereUniqueInput | PatientWhereUniqueInput[]
    update?: PatientUpdateWithWhereUniqueWithoutTutorInput | PatientUpdateWithWhereUniqueWithoutTutorInput[]
    updateMany?: PatientUpdateManyWithWhereWithoutTutorInput | PatientUpdateManyWithWhereWithoutTutorInput[]
    deleteMany?: PatientScalarWhereInput | PatientScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutTutorNestedInput = {
    create?: XOR<MessageCreateWithoutTutorInput, MessageUncheckedCreateWithoutTutorInput> | MessageCreateWithoutTutorInput[] | MessageUncheckedCreateWithoutTutorInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTutorInput | MessageCreateOrConnectWithoutTutorInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutTutorInput | MessageUpsertWithWhereUniqueWithoutTutorInput[]
    createMany?: MessageCreateManyTutorInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutTutorInput | MessageUpdateWithWhereUniqueWithoutTutorInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutTutorInput | MessageUpdateManyWithWhereWithoutTutorInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TutorCreateNestedOneWithoutPatientsInput = {
    create?: XOR<TutorCreateWithoutPatientsInput, TutorUncheckedCreateWithoutPatientsInput>
    connectOrCreate?: TutorCreateOrConnectWithoutPatientsInput
    connect?: TutorWhereUniqueInput
  }

  export type IntakeDataCreateNestedOneWithoutPatientInput = {
    create?: XOR<IntakeDataCreateWithoutPatientInput, IntakeDataUncheckedCreateWithoutPatientInput>
    connectOrCreate?: IntakeDataCreateOrConnectWithoutPatientInput
    connect?: IntakeDataWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PatientRoutineCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientRoutineCreateWithoutPatientInput, PatientRoutineUncheckedCreateWithoutPatientInput> | PatientRoutineCreateWithoutPatientInput[] | PatientRoutineUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientRoutineCreateOrConnectWithoutPatientInput | PatientRoutineCreateOrConnectWithoutPatientInput[]
    createMany?: PatientRoutineCreateManyPatientInputEnvelope
    connect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
  }

  export type PlanCreateNestedManyWithoutPatientInput = {
    create?: XOR<PlanCreateWithoutPatientInput, PlanUncheckedCreateWithoutPatientInput> | PlanCreateWithoutPatientInput[] | PlanUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutPatientInput | PlanCreateOrConnectWithoutPatientInput[]
    createMany?: PlanCreateManyPatientInputEnvelope
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
  }

  export type IntakeDataUncheckedCreateNestedOneWithoutPatientInput = {
    create?: XOR<IntakeDataCreateWithoutPatientInput, IntakeDataUncheckedCreateWithoutPatientInput>
    connectOrCreate?: IntakeDataCreateOrConnectWithoutPatientInput
    connect?: IntakeDataWhereUniqueInput
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PatientRoutineUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientRoutineCreateWithoutPatientInput, PatientRoutineUncheckedCreateWithoutPatientInput> | PatientRoutineCreateWithoutPatientInput[] | PatientRoutineUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientRoutineCreateOrConnectWithoutPatientInput | PatientRoutineCreateOrConnectWithoutPatientInput[]
    createMany?: PatientRoutineCreateManyPatientInputEnvelope
    connect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
  }

  export type PlanUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PlanCreateWithoutPatientInput, PlanUncheckedCreateWithoutPatientInput> | PlanCreateWithoutPatientInput[] | PlanUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutPatientInput | PlanCreateOrConnectWithoutPatientInput[]
    createMany?: PlanCreateManyPatientInputEnvelope
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TutorUpdateOneRequiredWithoutPatientsNestedInput = {
    create?: XOR<TutorCreateWithoutPatientsInput, TutorUncheckedCreateWithoutPatientsInput>
    connectOrCreate?: TutorCreateOrConnectWithoutPatientsInput
    upsert?: TutorUpsertWithoutPatientsInput
    connect?: TutorWhereUniqueInput
    update?: XOR<XOR<TutorUpdateToOneWithWhereWithoutPatientsInput, TutorUpdateWithoutPatientsInput>, TutorUncheckedUpdateWithoutPatientsInput>
  }

  export type IntakeDataUpdateOneWithoutPatientNestedInput = {
    create?: XOR<IntakeDataCreateWithoutPatientInput, IntakeDataUncheckedCreateWithoutPatientInput>
    connectOrCreate?: IntakeDataCreateOrConnectWithoutPatientInput
    upsert?: IntakeDataUpsertWithoutPatientInput
    disconnect?: IntakeDataWhereInput | boolean
    delete?: IntakeDataWhereInput | boolean
    connect?: IntakeDataWhereUniqueInput
    update?: XOR<XOR<IntakeDataUpdateToOneWithWhereWithoutPatientInput, IntakeDataUpdateWithoutPatientInput>, IntakeDataUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PatientRoutineUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientRoutineCreateWithoutPatientInput, PatientRoutineUncheckedCreateWithoutPatientInput> | PatientRoutineCreateWithoutPatientInput[] | PatientRoutineUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientRoutineCreateOrConnectWithoutPatientInput | PatientRoutineCreateOrConnectWithoutPatientInput[]
    upsert?: PatientRoutineUpsertWithWhereUniqueWithoutPatientInput | PatientRoutineUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientRoutineCreateManyPatientInputEnvelope
    set?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    disconnect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    delete?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    connect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    update?: PatientRoutineUpdateWithWhereUniqueWithoutPatientInput | PatientRoutineUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientRoutineUpdateManyWithWhereWithoutPatientInput | PatientRoutineUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientRoutineScalarWhereInput | PatientRoutineScalarWhereInput[]
  }

  export type PlanUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PlanCreateWithoutPatientInput, PlanUncheckedCreateWithoutPatientInput> | PlanCreateWithoutPatientInput[] | PlanUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutPatientInput | PlanCreateOrConnectWithoutPatientInput[]
    upsert?: PlanUpsertWithWhereUniqueWithoutPatientInput | PlanUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PlanCreateManyPatientInputEnvelope
    set?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    disconnect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    delete?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    update?: PlanUpdateWithWhereUniqueWithoutPatientInput | PlanUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PlanUpdateManyWithWhereWithoutPatientInput | PlanUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PlanScalarWhereInput | PlanScalarWhereInput[]
  }

  export type IntakeDataUncheckedUpdateOneWithoutPatientNestedInput = {
    create?: XOR<IntakeDataCreateWithoutPatientInput, IntakeDataUncheckedCreateWithoutPatientInput>
    connectOrCreate?: IntakeDataCreateOrConnectWithoutPatientInput
    upsert?: IntakeDataUpsertWithoutPatientInput
    disconnect?: IntakeDataWhereInput | boolean
    delete?: IntakeDataWhereInput | boolean
    connect?: IntakeDataWhereUniqueInput
    update?: XOR<XOR<IntakeDataUpdateToOneWithWhereWithoutPatientInput, IntakeDataUpdateWithoutPatientInput>, IntakeDataUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PatientRoutineUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientRoutineCreateWithoutPatientInput, PatientRoutineUncheckedCreateWithoutPatientInput> | PatientRoutineCreateWithoutPatientInput[] | PatientRoutineUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientRoutineCreateOrConnectWithoutPatientInput | PatientRoutineCreateOrConnectWithoutPatientInput[]
    upsert?: PatientRoutineUpsertWithWhereUniqueWithoutPatientInput | PatientRoutineUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientRoutineCreateManyPatientInputEnvelope
    set?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    disconnect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    delete?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    connect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    update?: PatientRoutineUpdateWithWhereUniqueWithoutPatientInput | PatientRoutineUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientRoutineUpdateManyWithWhereWithoutPatientInput | PatientRoutineUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientRoutineScalarWhereInput | PatientRoutineScalarWhereInput[]
  }

  export type PlanUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PlanCreateWithoutPatientInput, PlanUncheckedCreateWithoutPatientInput> | PlanCreateWithoutPatientInput[] | PlanUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PlanCreateOrConnectWithoutPatientInput | PlanCreateOrConnectWithoutPatientInput[]
    upsert?: PlanUpsertWithWhereUniqueWithoutPatientInput | PlanUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PlanCreateManyPatientInputEnvelope
    set?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    disconnect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    delete?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    connect?: PlanWhereUniqueInput | PlanWhereUniqueInput[]
    update?: PlanUpdateWithWhereUniqueWithoutPatientInput | PlanUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PlanUpdateManyWithWhereWithoutPatientInput | PlanUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PlanScalarWhereInput | PlanScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutIntakeDataInput = {
    create?: XOR<PatientCreateWithoutIntakeDataInput, PatientUncheckedCreateWithoutIntakeDataInput>
    connectOrCreate?: PatientCreateOrConnectWithoutIntakeDataInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutIntakeDataNestedInput = {
    create?: XOR<PatientCreateWithoutIntakeDataInput, PatientUncheckedCreateWithoutIntakeDataInput>
    connectOrCreate?: PatientCreateOrConnectWithoutIntakeDataInput
    upsert?: PatientUpsertWithoutIntakeDataInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutIntakeDataInput, PatientUpdateWithoutIntakeDataInput>, PatientUncheckedUpdateWithoutIntakeDataInput>
  }

  export type PatientCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    upsert?: PatientUpsertWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutAppointmentsInput, PatientUpdateWithoutAppointmentsInput>, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    upsert?: UserUpsertWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppointmentsInput, UserUpdateWithoutAppointmentsInput>, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PatientRoutineCreateNestedManyWithoutRoutineInput = {
    create?: XOR<PatientRoutineCreateWithoutRoutineInput, PatientRoutineUncheckedCreateWithoutRoutineInput> | PatientRoutineCreateWithoutRoutineInput[] | PatientRoutineUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: PatientRoutineCreateOrConnectWithoutRoutineInput | PatientRoutineCreateOrConnectWithoutRoutineInput[]
    createMany?: PatientRoutineCreateManyRoutineInputEnvelope
    connect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
  }

  export type PatientRoutineUncheckedCreateNestedManyWithoutRoutineInput = {
    create?: XOR<PatientRoutineCreateWithoutRoutineInput, PatientRoutineUncheckedCreateWithoutRoutineInput> | PatientRoutineCreateWithoutRoutineInput[] | PatientRoutineUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: PatientRoutineCreateOrConnectWithoutRoutineInput | PatientRoutineCreateOrConnectWithoutRoutineInput[]
    createMany?: PatientRoutineCreateManyRoutineInputEnvelope
    connect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PatientRoutineUpdateManyWithoutRoutineNestedInput = {
    create?: XOR<PatientRoutineCreateWithoutRoutineInput, PatientRoutineUncheckedCreateWithoutRoutineInput> | PatientRoutineCreateWithoutRoutineInput[] | PatientRoutineUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: PatientRoutineCreateOrConnectWithoutRoutineInput | PatientRoutineCreateOrConnectWithoutRoutineInput[]
    upsert?: PatientRoutineUpsertWithWhereUniqueWithoutRoutineInput | PatientRoutineUpsertWithWhereUniqueWithoutRoutineInput[]
    createMany?: PatientRoutineCreateManyRoutineInputEnvelope
    set?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    disconnect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    delete?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    connect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    update?: PatientRoutineUpdateWithWhereUniqueWithoutRoutineInput | PatientRoutineUpdateWithWhereUniqueWithoutRoutineInput[]
    updateMany?: PatientRoutineUpdateManyWithWhereWithoutRoutineInput | PatientRoutineUpdateManyWithWhereWithoutRoutineInput[]
    deleteMany?: PatientRoutineScalarWhereInput | PatientRoutineScalarWhereInput[]
  }

  export type PatientRoutineUncheckedUpdateManyWithoutRoutineNestedInput = {
    create?: XOR<PatientRoutineCreateWithoutRoutineInput, PatientRoutineUncheckedCreateWithoutRoutineInput> | PatientRoutineCreateWithoutRoutineInput[] | PatientRoutineUncheckedCreateWithoutRoutineInput[]
    connectOrCreate?: PatientRoutineCreateOrConnectWithoutRoutineInput | PatientRoutineCreateOrConnectWithoutRoutineInput[]
    upsert?: PatientRoutineUpsertWithWhereUniqueWithoutRoutineInput | PatientRoutineUpsertWithWhereUniqueWithoutRoutineInput[]
    createMany?: PatientRoutineCreateManyRoutineInputEnvelope
    set?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    disconnect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    delete?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    connect?: PatientRoutineWhereUniqueInput | PatientRoutineWhereUniqueInput[]
    update?: PatientRoutineUpdateWithWhereUniqueWithoutRoutineInput | PatientRoutineUpdateWithWhereUniqueWithoutRoutineInput[]
    updateMany?: PatientRoutineUpdateManyWithWhereWithoutRoutineInput | PatientRoutineUpdateManyWithWhereWithoutRoutineInput[]
    deleteMany?: PatientRoutineScalarWhereInput | PatientRoutineScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutRehabRoutinesInput = {
    create?: XOR<PatientCreateWithoutRehabRoutinesInput, PatientUncheckedCreateWithoutRehabRoutinesInput>
    connectOrCreate?: PatientCreateOrConnectWithoutRehabRoutinesInput
    connect?: PatientWhereUniqueInput
  }

  export type RehabRoutineCreateNestedOneWithoutPatientRoutinesInput = {
    create?: XOR<RehabRoutineCreateWithoutPatientRoutinesInput, RehabRoutineUncheckedCreateWithoutPatientRoutinesInput>
    connectOrCreate?: RehabRoutineCreateOrConnectWithoutPatientRoutinesInput
    connect?: RehabRoutineWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutRehabRoutinesNestedInput = {
    create?: XOR<PatientCreateWithoutRehabRoutinesInput, PatientUncheckedCreateWithoutRehabRoutinesInput>
    connectOrCreate?: PatientCreateOrConnectWithoutRehabRoutinesInput
    upsert?: PatientUpsertWithoutRehabRoutinesInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutRehabRoutinesInput, PatientUpdateWithoutRehabRoutinesInput>, PatientUncheckedUpdateWithoutRehabRoutinesInput>
  }

  export type RehabRoutineUpdateOneRequiredWithoutPatientRoutinesNestedInput = {
    create?: XOR<RehabRoutineCreateWithoutPatientRoutinesInput, RehabRoutineUncheckedCreateWithoutPatientRoutinesInput>
    connectOrCreate?: RehabRoutineCreateOrConnectWithoutPatientRoutinesInput
    upsert?: RehabRoutineUpsertWithoutPatientRoutinesInput
    connect?: RehabRoutineWhereUniqueInput
    update?: XOR<XOR<RehabRoutineUpdateToOneWithWhereWithoutPatientRoutinesInput, RehabRoutineUpdateWithoutPatientRoutinesInput>, RehabRoutineUncheckedUpdateWithoutPatientRoutinesInput>
  }

  export type PatientCreateNestedOneWithoutPlansInput = {
    create?: XOR<PatientCreateWithoutPlansInput, PatientUncheckedCreateWithoutPlansInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPlansInput
    connect?: PatientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPlansInput = {
    create?: XOR<UserCreateWithoutPlansInput, UserUncheckedCreateWithoutPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlansInput
    connect?: UserWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutPlansNestedInput = {
    create?: XOR<PatientCreateWithoutPlansInput, PatientUncheckedCreateWithoutPlansInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPlansInput
    upsert?: PatientUpsertWithoutPlansInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutPlansInput, PatientUpdateWithoutPlansInput>, PatientUncheckedUpdateWithoutPlansInput>
  }

  export type UserUpdateOneRequiredWithoutPlansNestedInput = {
    create?: XOR<UserCreateWithoutPlansInput, UserUncheckedCreateWithoutPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlansInput
    upsert?: UserUpsertWithoutPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlansInput, UserUpdateWithoutPlansInput>, UserUncheckedUpdateWithoutPlansInput>
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type TutorCreateNestedOneWithoutMessagesInput = {
    create?: XOR<TutorCreateWithoutMessagesInput, TutorUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TutorCreateOrConnectWithoutMessagesInput
    connect?: TutorWhereUniqueInput
  }

  export type UserUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesInput, UserUpdateWithoutMessagesInput>, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type TutorUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<TutorCreateWithoutMessagesInput, TutorUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TutorCreateOrConnectWithoutMessagesInput
    upsert?: TutorUpsertWithoutMessagesInput
    disconnect?: TutorWhereInput | boolean
    delete?: TutorWhereInput | boolean
    connect?: TutorWhereUniqueInput
    update?: XOR<XOR<TutorUpdateToOneWithWhereWithoutMessagesInput, TutorUpdateWithoutMessagesInput>, TutorUncheckedUpdateWithoutMessagesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type MessageCreateWithoutFisioInput = {
    body: string
    createdAt?: Date | string
    fromTutor?: boolean
    tutor?: TutorCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutFisioInput = {
    id?: number
    body: string
    createdAt?: Date | string
    tutorId?: number | null
    fromTutor?: boolean
  }

  export type MessageCreateOrConnectWithoutFisioInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutFisioInput, MessageUncheckedCreateWithoutFisioInput>
  }

  export type MessageCreateManyFisioInputEnvelope = {
    data: MessageCreateManyFisioInput | MessageCreateManyFisioInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutFisioInput = {
    date: Date | string
    duration?: number
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutFisioInput = {
    id?: number
    date: Date | string
    duration?: number
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: number
  }

  export type AppointmentCreateOrConnectWithoutFisioInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutFisioInput, AppointmentUncheckedCreateWithoutFisioInput>
  }

  export type AppointmentCreateManyFisioInputEnvelope = {
    data: AppointmentCreateManyFisioInput | AppointmentCreateManyFisioInput[]
    skipDuplicates?: boolean
  }

  export type PlanCreateWithoutCreatedByInput = {
    title: string
    type?: string
    content: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutPlansInput
  }

  export type PlanUncheckedCreateWithoutCreatedByInput = {
    id?: number
    title: string
    type?: string
    content: string
    patientId: number
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanCreateOrConnectWithoutCreatedByInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutCreatedByInput, PlanUncheckedCreateWithoutCreatedByInput>
  }

  export type PlanCreateManyCreatedByInputEnvelope = {
    data: PlanCreateManyCreatedByInput | PlanCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type MessageUpsertWithWhereUniqueWithoutFisioInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutFisioInput, MessageUncheckedUpdateWithoutFisioInput>
    create: XOR<MessageCreateWithoutFisioInput, MessageUncheckedCreateWithoutFisioInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutFisioInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutFisioInput, MessageUncheckedUpdateWithoutFisioInput>
  }

  export type MessageUpdateManyWithWhereWithoutFisioInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutFisioInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: IntFilter<"Message"> | number
    body?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    fisioId?: IntNullableFilter<"Message"> | number | null
    tutorId?: IntNullableFilter<"Message"> | number | null
    fromTutor?: BoolFilter<"Message"> | boolean
  }

  export type AppointmentUpsertWithWhereUniqueWithoutFisioInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutFisioInput, AppointmentUncheckedUpdateWithoutFisioInput>
    create: XOR<AppointmentCreateWithoutFisioInput, AppointmentUncheckedCreateWithoutFisioInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutFisioInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutFisioInput, AppointmentUncheckedUpdateWithoutFisioInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutFisioInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutFisioInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: IntFilter<"Appointment"> | number
    date?: DateTimeFilter<"Appointment"> | Date | string
    duration?: IntFilter<"Appointment"> | number
    notes?: StringNullableFilter<"Appointment"> | string | null
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    patientId?: IntFilter<"Appointment"> | number
    fisioId?: IntFilter<"Appointment"> | number
  }

  export type PlanUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: PlanWhereUniqueInput
    update: XOR<PlanUpdateWithoutCreatedByInput, PlanUncheckedUpdateWithoutCreatedByInput>
    create: XOR<PlanCreateWithoutCreatedByInput, PlanUncheckedCreateWithoutCreatedByInput>
  }

  export type PlanUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: PlanWhereUniqueInput
    data: XOR<PlanUpdateWithoutCreatedByInput, PlanUncheckedUpdateWithoutCreatedByInput>
  }

  export type PlanUpdateManyWithWhereWithoutCreatedByInput = {
    where: PlanScalarWhereInput
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type PlanScalarWhereInput = {
    AND?: PlanScalarWhereInput | PlanScalarWhereInput[]
    OR?: PlanScalarWhereInput[]
    NOT?: PlanScalarWhereInput | PlanScalarWhereInput[]
    id?: IntFilter<"Plan"> | number
    title?: StringFilter<"Plan"> | string
    type?: StringFilter<"Plan"> | string
    content?: StringFilter<"Plan"> | string
    patientId?: IntFilter<"Plan"> | number
    createdById?: IntFilter<"Plan"> | number
    pinned?: BoolFilter<"Plan"> | boolean
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
  }

  export type PatientCreateWithoutTutorInput = {
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    intakeData?: IntakeDataCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    rehabRoutines?: PatientRoutineCreateNestedManyWithoutPatientInput
    plans?: PlanCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutTutorInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    intakeData?: IntakeDataUncheckedCreateNestedOneWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    rehabRoutines?: PatientRoutineUncheckedCreateNestedManyWithoutPatientInput
    plans?: PlanUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutTutorInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutTutorInput, PatientUncheckedCreateWithoutTutorInput>
  }

  export type PatientCreateManyTutorInputEnvelope = {
    data: PatientCreateManyTutorInput | PatientCreateManyTutorInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutTutorInput = {
    body: string
    createdAt?: Date | string
    fromTutor?: boolean
    fisio?: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutTutorInput = {
    id?: number
    body: string
    createdAt?: Date | string
    fisioId?: number | null
    fromTutor?: boolean
  }

  export type MessageCreateOrConnectWithoutTutorInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutTutorInput, MessageUncheckedCreateWithoutTutorInput>
  }

  export type MessageCreateManyTutorInputEnvelope = {
    data: MessageCreateManyTutorInput | MessageCreateManyTutorInput[]
    skipDuplicates?: boolean
  }

  export type PatientUpsertWithWhereUniqueWithoutTutorInput = {
    where: PatientWhereUniqueInput
    update: XOR<PatientUpdateWithoutTutorInput, PatientUncheckedUpdateWithoutTutorInput>
    create: XOR<PatientCreateWithoutTutorInput, PatientUncheckedCreateWithoutTutorInput>
  }

  export type PatientUpdateWithWhereUniqueWithoutTutorInput = {
    where: PatientWhereUniqueInput
    data: XOR<PatientUpdateWithoutTutorInput, PatientUncheckedUpdateWithoutTutorInput>
  }

  export type PatientUpdateManyWithWhereWithoutTutorInput = {
    where: PatientScalarWhereInput
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyWithoutTutorInput>
  }

  export type PatientScalarWhereInput = {
    AND?: PatientScalarWhereInput | PatientScalarWhereInput[]
    OR?: PatientScalarWhereInput[]
    NOT?: PatientScalarWhereInput | PatientScalarWhereInput[]
    id?: IntFilter<"Patient"> | number
    name?: StringFilter<"Patient"> | string
    species?: StringFilter<"Patient"> | string
    breed?: StringNullableFilter<"Patient"> | string | null
    birthDate?: StringNullableFilter<"Patient"> | string | null
    weight?: StringNullableFilter<"Patient"> | string | null
    sex?: StringNullableFilter<"Patient"> | string | null
    neutered?: StringNullableFilter<"Patient"> | string | null
    active?: BoolFilter<"Patient"> | boolean
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    tutorId?: IntFilter<"Patient"> | number
  }

  export type MessageUpsertWithWhereUniqueWithoutTutorInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutTutorInput, MessageUncheckedUpdateWithoutTutorInput>
    create: XOR<MessageCreateWithoutTutorInput, MessageUncheckedCreateWithoutTutorInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutTutorInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutTutorInput, MessageUncheckedUpdateWithoutTutorInput>
  }

  export type MessageUpdateManyWithWhereWithoutTutorInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutTutorInput>
  }

  export type TutorCreateWithoutPatientsInput = {
    name: string
    phone: string
    email?: string | null
    howFoundUs?: string | null
    portalEmail?: string | null
    portalPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutTutorInput
  }

  export type TutorUncheckedCreateWithoutPatientsInput = {
    id?: number
    name: string
    phone: string
    email?: string | null
    howFoundUs?: string | null
    portalEmail?: string | null
    portalPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutTutorInput
  }

  export type TutorCreateOrConnectWithoutPatientsInput = {
    where: TutorWhereUniqueInput
    create: XOR<TutorCreateWithoutPatientsInput, TutorUncheckedCreateWithoutPatientsInput>
  }

  export type IntakeDataCreateWithoutPatientInput = {
    motivoConsulta?: string | null
    desdeCuando?: string | null
    inicioSintomas?: string | null
    momentosPeorMejor?: string | null
    sintomasObservados?: string | null
    dolorAlComer?: string | null
    lesionesPrevias?: string | null
    cirugiaPrevia?: string | null
    cirugiaDetalle?: string | null
    diagnosticoPrevio?: string | null
    medicacion?: string | null
    medicacionDetalle?: string | null
    fisioterapiaPrevia?: string | null
    fisioterapiaDetalle?: string | null
    mejoriaCon?: string | null
    veterinarioRef?: string | null
    nivelActividad?: string | null
    tipoPaseos?: string | null
    dondeDuerme?: string | null
    escaleras?: string | null
    observaciones?: string | null
    objetivos?: string | null
    createdAt?: Date | string
  }

  export type IntakeDataUncheckedCreateWithoutPatientInput = {
    id?: number
    motivoConsulta?: string | null
    desdeCuando?: string | null
    inicioSintomas?: string | null
    momentosPeorMejor?: string | null
    sintomasObservados?: string | null
    dolorAlComer?: string | null
    lesionesPrevias?: string | null
    cirugiaPrevia?: string | null
    cirugiaDetalle?: string | null
    diagnosticoPrevio?: string | null
    medicacion?: string | null
    medicacionDetalle?: string | null
    fisioterapiaPrevia?: string | null
    fisioterapiaDetalle?: string | null
    mejoriaCon?: string | null
    veterinarioRef?: string | null
    nivelActividad?: string | null
    tipoPaseos?: string | null
    dondeDuerme?: string | null
    escaleras?: string | null
    observaciones?: string | null
    objetivos?: string | null
    createdAt?: Date | string
  }

  export type IntakeDataCreateOrConnectWithoutPatientInput = {
    where: IntakeDataWhereUniqueInput
    create: XOR<IntakeDataCreateWithoutPatientInput, IntakeDataUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateWithoutPatientInput = {
    date: Date | string
    duration?: number
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fisio: UserCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutPatientInput = {
    id?: number
    date: Date | string
    duration?: number
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fisioId: number
  }

  export type AppointmentCreateOrConnectWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateManyPatientInputEnvelope = {
    data: AppointmentCreateManyPatientInput | AppointmentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PatientRoutineCreateWithoutPatientInput = {
    assignedAt?: Date | string
    notes?: string | null
    routine: RehabRoutineCreateNestedOneWithoutPatientRoutinesInput
  }

  export type PatientRoutineUncheckedCreateWithoutPatientInput = {
    id?: number
    routineId: number
    assignedAt?: Date | string
    notes?: string | null
  }

  export type PatientRoutineCreateOrConnectWithoutPatientInput = {
    where: PatientRoutineWhereUniqueInput
    create: XOR<PatientRoutineCreateWithoutPatientInput, PatientRoutineUncheckedCreateWithoutPatientInput>
  }

  export type PatientRoutineCreateManyPatientInputEnvelope = {
    data: PatientRoutineCreateManyPatientInput | PatientRoutineCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PlanCreateWithoutPatientInput = {
    title: string
    type?: string
    content: string
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutPlansInput
  }

  export type PlanUncheckedCreateWithoutPatientInput = {
    id?: number
    title: string
    type?: string
    content: string
    createdById: number
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanCreateOrConnectWithoutPatientInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutPatientInput, PlanUncheckedCreateWithoutPatientInput>
  }

  export type PlanCreateManyPatientInputEnvelope = {
    data: PlanCreateManyPatientInput | PlanCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type TutorUpsertWithoutPatientsInput = {
    update: XOR<TutorUpdateWithoutPatientsInput, TutorUncheckedUpdateWithoutPatientsInput>
    create: XOR<TutorCreateWithoutPatientsInput, TutorUncheckedCreateWithoutPatientsInput>
    where?: TutorWhereInput
  }

  export type TutorUpdateToOneWithWhereWithoutPatientsInput = {
    where?: TutorWhereInput
    data: XOR<TutorUpdateWithoutPatientsInput, TutorUncheckedUpdateWithoutPatientsInput>
  }

  export type TutorUpdateWithoutPatientsInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    howFoundUs?: NullableStringFieldUpdateOperationsInput | string | null
    portalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    portalPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutTutorNestedInput
  }

  export type TutorUncheckedUpdateWithoutPatientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    howFoundUs?: NullableStringFieldUpdateOperationsInput | string | null
    portalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    portalPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutTutorNestedInput
  }

  export type IntakeDataUpsertWithoutPatientInput = {
    update: XOR<IntakeDataUpdateWithoutPatientInput, IntakeDataUncheckedUpdateWithoutPatientInput>
    create: XOR<IntakeDataCreateWithoutPatientInput, IntakeDataUncheckedCreateWithoutPatientInput>
    where?: IntakeDataWhereInput
  }

  export type IntakeDataUpdateToOneWithWhereWithoutPatientInput = {
    where?: IntakeDataWhereInput
    data: XOR<IntakeDataUpdateWithoutPatientInput, IntakeDataUncheckedUpdateWithoutPatientInput>
  }

  export type IntakeDataUpdateWithoutPatientInput = {
    motivoConsulta?: NullableStringFieldUpdateOperationsInput | string | null
    desdeCuando?: NullableStringFieldUpdateOperationsInput | string | null
    inicioSintomas?: NullableStringFieldUpdateOperationsInput | string | null
    momentosPeorMejor?: NullableStringFieldUpdateOperationsInput | string | null
    sintomasObservados?: NullableStringFieldUpdateOperationsInput | string | null
    dolorAlComer?: NullableStringFieldUpdateOperationsInput | string | null
    lesionesPrevias?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticoPrevio?: NullableStringFieldUpdateOperationsInput | string | null
    medicacion?: NullableStringFieldUpdateOperationsInput | string | null
    medicacionDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    mejoriaCon?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarioRef?: NullableStringFieldUpdateOperationsInput | string | null
    nivelActividad?: NullableStringFieldUpdateOperationsInput | string | null
    tipoPaseos?: NullableStringFieldUpdateOperationsInput | string | null
    dondeDuerme?: NullableStringFieldUpdateOperationsInput | string | null
    escaleras?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    objetivos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntakeDataUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    motivoConsulta?: NullableStringFieldUpdateOperationsInput | string | null
    desdeCuando?: NullableStringFieldUpdateOperationsInput | string | null
    inicioSintomas?: NullableStringFieldUpdateOperationsInput | string | null
    momentosPeorMejor?: NullableStringFieldUpdateOperationsInput | string | null
    sintomasObservados?: NullableStringFieldUpdateOperationsInput | string | null
    dolorAlComer?: NullableStringFieldUpdateOperationsInput | string | null
    lesionesPrevias?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    cirugiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticoPrevio?: NullableStringFieldUpdateOperationsInput | string | null
    medicacion?: NullableStringFieldUpdateOperationsInput | string | null
    medicacionDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaPrevia?: NullableStringFieldUpdateOperationsInput | string | null
    fisioterapiaDetalle?: NullableStringFieldUpdateOperationsInput | string | null
    mejoriaCon?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarioRef?: NullableStringFieldUpdateOperationsInput | string | null
    nivelActividad?: NullableStringFieldUpdateOperationsInput | string | null
    tipoPaseos?: NullableStringFieldUpdateOperationsInput | string | null
    dondeDuerme?: NullableStringFieldUpdateOperationsInput | string | null
    escaleras?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    objetivos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPatientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientRoutineUpsertWithWhereUniqueWithoutPatientInput = {
    where: PatientRoutineWhereUniqueInput
    update: XOR<PatientRoutineUpdateWithoutPatientInput, PatientRoutineUncheckedUpdateWithoutPatientInput>
    create: XOR<PatientRoutineCreateWithoutPatientInput, PatientRoutineUncheckedCreateWithoutPatientInput>
  }

  export type PatientRoutineUpdateWithWhereUniqueWithoutPatientInput = {
    where: PatientRoutineWhereUniqueInput
    data: XOR<PatientRoutineUpdateWithoutPatientInput, PatientRoutineUncheckedUpdateWithoutPatientInput>
  }

  export type PatientRoutineUpdateManyWithWhereWithoutPatientInput = {
    where: PatientRoutineScalarWhereInput
    data: XOR<PatientRoutineUpdateManyMutationInput, PatientRoutineUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientRoutineScalarWhereInput = {
    AND?: PatientRoutineScalarWhereInput | PatientRoutineScalarWhereInput[]
    OR?: PatientRoutineScalarWhereInput[]
    NOT?: PatientRoutineScalarWhereInput | PatientRoutineScalarWhereInput[]
    id?: IntFilter<"PatientRoutine"> | number
    patientId?: IntFilter<"PatientRoutine"> | number
    routineId?: IntFilter<"PatientRoutine"> | number
    assignedAt?: DateTimeFilter<"PatientRoutine"> | Date | string
    notes?: StringNullableFilter<"PatientRoutine"> | string | null
  }

  export type PlanUpsertWithWhereUniqueWithoutPatientInput = {
    where: PlanWhereUniqueInput
    update: XOR<PlanUpdateWithoutPatientInput, PlanUncheckedUpdateWithoutPatientInput>
    create: XOR<PlanCreateWithoutPatientInput, PlanUncheckedCreateWithoutPatientInput>
  }

  export type PlanUpdateWithWhereUniqueWithoutPatientInput = {
    where: PlanWhereUniqueInput
    data: XOR<PlanUpdateWithoutPatientInput, PlanUncheckedUpdateWithoutPatientInput>
  }

  export type PlanUpdateManyWithWhereWithoutPatientInput = {
    where: PlanScalarWhereInput
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientCreateWithoutIntakeDataInput = {
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutor: TutorCreateNestedOneWithoutPatientsInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    rehabRoutines?: PatientRoutineCreateNestedManyWithoutPatientInput
    plans?: PlanCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutIntakeDataInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutorId: number
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    rehabRoutines?: PatientRoutineUncheckedCreateNestedManyWithoutPatientInput
    plans?: PlanUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutIntakeDataInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutIntakeDataInput, PatientUncheckedCreateWithoutIntakeDataInput>
  }

  export type PatientUpsertWithoutIntakeDataInput = {
    update: XOR<PatientUpdateWithoutIntakeDataInput, PatientUncheckedUpdateWithoutIntakeDataInput>
    create: XOR<PatientCreateWithoutIntakeDataInput, PatientUncheckedCreateWithoutIntakeDataInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutIntakeDataInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutIntakeDataInput, PatientUncheckedUpdateWithoutIntakeDataInput>
  }

  export type PatientUpdateWithoutIntakeDataInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutor?: TutorUpdateOneRequiredWithoutPatientsNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUpdateManyWithoutPatientNestedInput
    plans?: PlanUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutIntakeDataInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorId?: IntFieldUpdateOperationsInput | number
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUncheckedUpdateManyWithoutPatientNestedInput
    plans?: PlanUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateWithoutAppointmentsInput = {
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutor: TutorCreateNestedOneWithoutPatientsInput
    intakeData?: IntakeDataCreateNestedOneWithoutPatientInput
    rehabRoutines?: PatientRoutineCreateNestedManyWithoutPatientInput
    plans?: PlanCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutAppointmentsInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutorId: number
    intakeData?: IntakeDataUncheckedCreateNestedOneWithoutPatientInput
    rehabRoutines?: PatientRoutineUncheckedCreateNestedManyWithoutPatientInput
    plans?: PlanUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutAppointmentsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
  }

  export type UserCreateWithoutAppointmentsInput = {
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutFisioInput
    plans?: PlanCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAppointmentsInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutFisioInput
    plans?: PlanUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
  }

  export type PatientUpsertWithoutAppointmentsInput = {
    update: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PatientUpdateWithoutAppointmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutor?: TutorUpdateOneRequiredWithoutPatientsNestedInput
    intakeData?: IntakeDataUpdateOneWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUpdateManyWithoutPatientNestedInput
    plans?: PlanUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutAppointmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorId?: IntFieldUpdateOperationsInput | number
    intakeData?: IntakeDataUncheckedUpdateOneWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUncheckedUpdateManyWithoutPatientNestedInput
    plans?: PlanUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserUpsertWithoutAppointmentsInput = {
    update: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserUpdateWithoutAppointmentsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutFisioNestedInput
    plans?: PlanUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAppointmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutFisioNestedInput
    plans?: PlanUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type PatientRoutineCreateWithoutRoutineInput = {
    assignedAt?: Date | string
    notes?: string | null
    patient: PatientCreateNestedOneWithoutRehabRoutinesInput
  }

  export type PatientRoutineUncheckedCreateWithoutRoutineInput = {
    id?: number
    patientId: number
    assignedAt?: Date | string
    notes?: string | null
  }

  export type PatientRoutineCreateOrConnectWithoutRoutineInput = {
    where: PatientRoutineWhereUniqueInput
    create: XOR<PatientRoutineCreateWithoutRoutineInput, PatientRoutineUncheckedCreateWithoutRoutineInput>
  }

  export type PatientRoutineCreateManyRoutineInputEnvelope = {
    data: PatientRoutineCreateManyRoutineInput | PatientRoutineCreateManyRoutineInput[]
    skipDuplicates?: boolean
  }

  export type PatientRoutineUpsertWithWhereUniqueWithoutRoutineInput = {
    where: PatientRoutineWhereUniqueInput
    update: XOR<PatientRoutineUpdateWithoutRoutineInput, PatientRoutineUncheckedUpdateWithoutRoutineInput>
    create: XOR<PatientRoutineCreateWithoutRoutineInput, PatientRoutineUncheckedCreateWithoutRoutineInput>
  }

  export type PatientRoutineUpdateWithWhereUniqueWithoutRoutineInput = {
    where: PatientRoutineWhereUniqueInput
    data: XOR<PatientRoutineUpdateWithoutRoutineInput, PatientRoutineUncheckedUpdateWithoutRoutineInput>
  }

  export type PatientRoutineUpdateManyWithWhereWithoutRoutineInput = {
    where: PatientRoutineScalarWhereInput
    data: XOR<PatientRoutineUpdateManyMutationInput, PatientRoutineUncheckedUpdateManyWithoutRoutineInput>
  }

  export type PatientCreateWithoutRehabRoutinesInput = {
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutor: TutorCreateNestedOneWithoutPatientsInput
    intakeData?: IntakeDataCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    plans?: PlanCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutRehabRoutinesInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutorId: number
    intakeData?: IntakeDataUncheckedCreateNestedOneWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    plans?: PlanUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutRehabRoutinesInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutRehabRoutinesInput, PatientUncheckedCreateWithoutRehabRoutinesInput>
  }

  export type RehabRoutineCreateWithoutPatientRoutinesInput = {
    name: string
    description?: string | null
    videoUrl?: string | null
    duration?: number | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RehabRoutineUncheckedCreateWithoutPatientRoutinesInput = {
    id?: number
    name: string
    description?: string | null
    videoUrl?: string | null
    duration?: number | null
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RehabRoutineCreateOrConnectWithoutPatientRoutinesInput = {
    where: RehabRoutineWhereUniqueInput
    create: XOR<RehabRoutineCreateWithoutPatientRoutinesInput, RehabRoutineUncheckedCreateWithoutPatientRoutinesInput>
  }

  export type PatientUpsertWithoutRehabRoutinesInput = {
    update: XOR<PatientUpdateWithoutRehabRoutinesInput, PatientUncheckedUpdateWithoutRehabRoutinesInput>
    create: XOR<PatientCreateWithoutRehabRoutinesInput, PatientUncheckedCreateWithoutRehabRoutinesInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutRehabRoutinesInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutRehabRoutinesInput, PatientUncheckedUpdateWithoutRehabRoutinesInput>
  }

  export type PatientUpdateWithoutRehabRoutinesInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutor?: TutorUpdateOneRequiredWithoutPatientsNestedInput
    intakeData?: IntakeDataUpdateOneWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    plans?: PlanUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutRehabRoutinesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorId?: IntFieldUpdateOperationsInput | number
    intakeData?: IntakeDataUncheckedUpdateOneWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    plans?: PlanUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type RehabRoutineUpsertWithoutPatientRoutinesInput = {
    update: XOR<RehabRoutineUpdateWithoutPatientRoutinesInput, RehabRoutineUncheckedUpdateWithoutPatientRoutinesInput>
    create: XOR<RehabRoutineCreateWithoutPatientRoutinesInput, RehabRoutineUncheckedCreateWithoutPatientRoutinesInput>
    where?: RehabRoutineWhereInput
  }

  export type RehabRoutineUpdateToOneWithWhereWithoutPatientRoutinesInput = {
    where?: RehabRoutineWhereInput
    data: XOR<RehabRoutineUpdateWithoutPatientRoutinesInput, RehabRoutineUncheckedUpdateWithoutPatientRoutinesInput>
  }

  export type RehabRoutineUpdateWithoutPatientRoutinesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RehabRoutineUncheckedUpdateWithoutPatientRoutinesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientCreateWithoutPlansInput = {
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutor: TutorCreateNestedOneWithoutPatientsInput
    intakeData?: IntakeDataCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    rehabRoutines?: PatientRoutineCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutPlansInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tutorId: number
    intakeData?: IntakeDataUncheckedCreateNestedOneWithoutPatientInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    rehabRoutines?: PatientRoutineUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutPlansInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutPlansInput, PatientUncheckedCreateWithoutPlansInput>
  }

  export type UserCreateWithoutPlansInput = {
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutFisioInput
    appointments?: AppointmentCreateNestedManyWithoutFisioInput
  }

  export type UserUncheckedCreateWithoutPlansInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutFisioInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutFisioInput
  }

  export type UserCreateOrConnectWithoutPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlansInput, UserUncheckedCreateWithoutPlansInput>
  }

  export type PatientUpsertWithoutPlansInput = {
    update: XOR<PatientUpdateWithoutPlansInput, PatientUncheckedUpdateWithoutPlansInput>
    create: XOR<PatientCreateWithoutPlansInput, PatientUncheckedCreateWithoutPlansInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutPlansInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutPlansInput, PatientUncheckedUpdateWithoutPlansInput>
  }

  export type PatientUpdateWithoutPlansInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutor?: TutorUpdateOneRequiredWithoutPatientsNestedInput
    intakeData?: IntakeDataUpdateOneWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutPlansInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorId?: IntFieldUpdateOperationsInput | number
    intakeData?: IntakeDataUncheckedUpdateOneWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserUpsertWithoutPlansInput = {
    update: XOR<UserUpdateWithoutPlansInput, UserUncheckedUpdateWithoutPlansInput>
    create: XOR<UserCreateWithoutPlansInput, UserUncheckedCreateWithoutPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlansInput, UserUncheckedUpdateWithoutPlansInput>
  }

  export type UserUpdateWithoutPlansInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutFisioNestedInput
    appointments?: AppointmentUpdateManyWithoutFisioNestedInput
  }

  export type UserUncheckedUpdateWithoutPlansInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutFisioNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutFisioNestedInput
  }

  export type UserCreateWithoutMessagesInput = {
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutFisioInput
    plans?: PlanCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutFisioInput
    plans?: PlanUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type TutorCreateWithoutMessagesInput = {
    name: string
    phone: string
    email?: string | null
    howFoundUs?: string | null
    portalEmail?: string | null
    portalPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patients?: PatientCreateNestedManyWithoutTutorInput
  }

  export type TutorUncheckedCreateWithoutMessagesInput = {
    id?: number
    name: string
    phone: string
    email?: string | null
    howFoundUs?: string | null
    portalEmail?: string | null
    portalPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patients?: PatientUncheckedCreateNestedManyWithoutTutorInput
  }

  export type TutorCreateOrConnectWithoutMessagesInput = {
    where: TutorWhereUniqueInput
    create: XOR<TutorCreateWithoutMessagesInput, TutorUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutFisioNestedInput
    plans?: PlanUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutFisioNestedInput
    plans?: PlanUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type TutorUpsertWithoutMessagesInput = {
    update: XOR<TutorUpdateWithoutMessagesInput, TutorUncheckedUpdateWithoutMessagesInput>
    create: XOR<TutorCreateWithoutMessagesInput, TutorUncheckedCreateWithoutMessagesInput>
    where?: TutorWhereInput
  }

  export type TutorUpdateToOneWithWhereWithoutMessagesInput = {
    where?: TutorWhereInput
    data: XOR<TutorUpdateWithoutMessagesInput, TutorUncheckedUpdateWithoutMessagesInput>
  }

  export type TutorUpdateWithoutMessagesInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    howFoundUs?: NullableStringFieldUpdateOperationsInput | string | null
    portalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    portalPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patients?: PatientUpdateManyWithoutTutorNestedInput
  }

  export type TutorUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    howFoundUs?: NullableStringFieldUpdateOperationsInput | string | null
    portalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    portalPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patients?: PatientUncheckedUpdateManyWithoutTutorNestedInput
  }

  export type MessageCreateManyFisioInput = {
    id?: number
    body: string
    createdAt?: Date | string
    tutorId?: number | null
    fromTutor?: boolean
  }

  export type AppointmentCreateManyFisioInput = {
    id?: number
    date: Date | string
    duration?: number
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: number
  }

  export type PlanCreateManyCreatedByInput = {
    id?: number
    title: string
    type?: string
    content: string
    patientId: number
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateWithoutFisioInput = {
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
    tutor?: TutorUpdateOneWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutFisioInput = {
    id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorId?: NullableIntFieldUpdateOperationsInput | number | null
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyWithoutFisioInput = {
    id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorId?: NullableIntFieldUpdateOperationsInput | number | null
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AppointmentUpdateWithoutFisioInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutFisioInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentUncheckedUpdateManyWithoutFisioInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: IntFieldUpdateOperationsInput | number
  }

  export type PlanUpdateWithoutCreatedByInput = {
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPlansNestedInput
  }

  export type PlanUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    patientId?: IntFieldUpdateOperationsInput | number
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientCreateManyTutorInput = {
    id?: number
    name: string
    species: string
    breed?: string | null
    birthDate?: string | null
    weight?: string | null
    sex?: string | null
    neutered?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyTutorInput = {
    id?: number
    body: string
    createdAt?: Date | string
    fisioId?: number | null
    fromTutor?: boolean
  }

  export type PatientUpdateWithoutTutorInput = {
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intakeData?: IntakeDataUpdateOneWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUpdateManyWithoutPatientNestedInput
    plans?: PlanUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutTutorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intakeData?: IntakeDataUncheckedUpdateOneWithoutPatientNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    rehabRoutines?: PatientRoutineUncheckedUpdateManyWithoutPatientNestedInput
    plans?: PlanUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateManyWithoutTutorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    species?: StringFieldUpdateOperationsInput | string
    breed?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    neutered?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutTutorInput = {
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
    fisio?: UserUpdateOneWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutTutorInput = {
    id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisioId?: NullableIntFieldUpdateOperationsInput | number | null
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyWithoutTutorInput = {
    id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisioId?: NullableIntFieldUpdateOperationsInput | number | null
    fromTutor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AppointmentCreateManyPatientInput = {
    id?: number
    date: Date | string
    duration?: number
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fisioId: number
  }

  export type PatientRoutineCreateManyPatientInput = {
    id?: number
    routineId: number
    assignedAt?: Date | string
    notes?: string | null
  }

  export type PlanCreateManyPatientInput = {
    id?: number
    title: string
    type?: string
    content: string
    createdById: number
    pinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateWithoutPatientInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisio?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisioId?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fisioId?: IntFieldUpdateOperationsInput | number
  }

  export type PatientRoutineUpdateWithoutPatientInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    routine?: RehabRoutineUpdateOneRequiredWithoutPatientRoutinesNestedInput
  }

  export type PatientRoutineUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    routineId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientRoutineUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    routineId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlanUpdateWithoutPatientInput = {
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutPlansNestedInput
  }

  export type PlanUncheckedUpdateWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdById?: IntFieldUpdateOperationsInput | number
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyWithoutPatientInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdById?: IntFieldUpdateOperationsInput | number
    pinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientRoutineCreateManyRoutineInput = {
    id?: number
    patientId: number
    assignedAt?: Date | string
    notes?: string | null
  }

  export type PatientRoutineUpdateWithoutRoutineInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patient?: PatientUpdateOneRequiredWithoutRehabRoutinesNestedInput
  }

  export type PatientRoutineUncheckedUpdateWithoutRoutineInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientRoutineUncheckedUpdateManyWithoutRoutineInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TutorCountOutputTypeDefaultArgs instead
     */
    export type TutorCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TutorCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientCountOutputTypeDefaultArgs instead
     */
    export type PatientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RehabRoutineCountOutputTypeDefaultArgs instead
     */
    export type RehabRoutineCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RehabRoutineCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TutorDefaultArgs instead
     */
    export type TutorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TutorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientDefaultArgs instead
     */
    export type PatientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IntakeDataDefaultArgs instead
     */
    export type IntakeDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = IntakeDataDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppointmentDefaultArgs instead
     */
    export type AppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppointmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RehabRoutineDefaultArgs instead
     */
    export type RehabRoutineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RehabRoutineDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientRoutineDefaultArgs instead
     */
    export type PatientRoutineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientRoutineDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlanDefaultArgs instead
     */
    export type PlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageDefaultArgs instead
     */
    export type MessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}