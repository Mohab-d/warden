import ArgonParser from "./parsers/ArgonParser";
import BcryptParser from "./parsers/BcryptParser";

// define parsers
const bcrypt = new BcryptParser();
const argon = new ArgonParser();

// chain parsers
bcrypt.setNextParser(argon);

const hashAlgorithmParser = bcrypt;

export default hashAlgorithmParser;
