export type UserRole = 'ADMIN' | 'USER'

export class User {
  private _id: string
  private _name: string
  private _email: string
  private _password: string
  private _createdAt: Date
  private _updatedAt: Date
  private _role: UserRole

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this._id = id
    this._name = name
    this._email = email
    this._password = password
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this._role = role
  }

  isAdmin() {
    return this._role === 'ADMIN'
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get email() {
    return this._email
  }

  set email(email: string) {
    this._email = email
  }

  get password() {
    return this._password
  }

  set password(password: string) {
    this._password = password
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  get role() {
    return this._role
  }
}
