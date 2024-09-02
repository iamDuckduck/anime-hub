declare namespace Express {
  export interface Request {
    user: { _id: string; _isAdmin: boolean };
  }
}
