import { readdirSync, statSync } from "fs";
import { join } from "path";

const getDirectories = (path) =>
  readdirSync(path).filter((file) => statSync(join(path, file)).isDirectory());

export default getDirectories;