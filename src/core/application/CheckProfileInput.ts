export class CheckProfileInput{
    constructor(
        public authenticatedUser:string,
        public profileUser:string
        ){}
}