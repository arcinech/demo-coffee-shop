"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordOrEmailException = void 0;
const common_1 = require("@nestjs/common");
class UserPasswordOrEmailException extends common_1.ConflictException {
    constructor() {
        super('Password or email not correct!');
    }
}
exports.UserPasswordOrEmailException = UserPasswordOrEmailException;
//# sourceMappingURL=user-password-or-email-exception.js.map