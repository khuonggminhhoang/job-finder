export interface IJwtPayload {
  iss?: string; // issuer
  iat?: number; // issued-at time
  exp?: number; // expiration time
  jti?: number; // Unique Identifier for a one time use token
  sub: string; // subject
  uav?: number; // user auth version
}
