import config from "config";
import jwt, { Secret } from "jsonwebtoken";
import { Lifecycle, scoped } from 'tsyringe';
import { TokenSignature } from '../../../core/domain/TokenSignature';

@scoped(Lifecycle.ResolutionScoped)
export class TokenSignatureImpl implements TokenSignature {

    key: string;
    expiration: string;

    constructor(
    ) {
        this.key = config.get('token_key');
        this.expiration = config.get('token_expiration');
    }

    sign(username: string, email: string): string {

        const { key, expiration } = this;

        return jwt.sign(
            { username, email },
            key as Secret,
            { expiresIn: expiration }
        );
    }

}