import { Strategy as PassportStrategy } from "passport-strategy";
import { SAML, SamlConfig } from ".";
import { AuthenticateOptions, RequestWithUser, VerifyWithoutRequest, VerifyWithRequest } from "./types";
export declare abstract class AbstractStrategy extends PassportStrategy {
    static readonly newSamlProviderOnConstruct: boolean;
    name: string;
    _signonVerify: VerifyWithRequest | VerifyWithoutRequest;
    _logoutVerify: VerifyWithRequest | VerifyWithoutRequest;
    _saml: SAML | undefined;
    _passReqToCallback?: boolean;
    constructor(options: SamlConfig, signonVerify: VerifyWithRequest, logoutVerify: VerifyWithRequest);
    constructor(options: SamlConfig, signonVerify: VerifyWithoutRequest, logoutVerify: VerifyWithoutRequest);
    authenticate(req: RequestWithUser, options: AuthenticateOptions): void;
    logout(req: RequestWithUser, callback: (err: Error | null, url?: string | null) => void): void;
    protected _generateServiceProviderMetadata(decryptionCert: string | null, signingCert?: string | string[] | null): string;
    error(err: Error): void;
    redirect(url: string, status?: number): void;
    success(user: any, info?: any): void;
}
export declare class Strategy extends AbstractStrategy {
    static readonly newSamlProviderOnConstruct = true;
    generateServiceProviderMetadata(decryptionCert: string | null, signingCert?: string | string[] | null): string;
}
