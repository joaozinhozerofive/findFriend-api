import { compare } from "bcryptjs";

export function comparePasswords(passwordHashed : string, password : string) {
     return compare(password, passwordHashed);
}