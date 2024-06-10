

const APP_NAME = {
  USER:"user",
  PRODUCT:"product",
  BRIEF:"brief",
}

const USER_APP_PORT = process.env["USER_PORT"] ; 
const PRODUCT_APP_PORT = process.env["PRODUCT_PORT"] ; 
const BRIEF_APP_PORT  = process.env["BRIEF_PORT"] ;
const JWT_SECRET = process.env["JWT_SECRET"];

//email Configs 
const EMAIL = process.env['EMAIL'];
const PASSWORD = process.env['PASSWORD'];

enum userRoles {
  organization = 1,
  organizationUser = 2,
  client = 3,
  clientUser = 4,
  creator = 5,
  creatorUser = 6,
}

export {
  APP_NAME,
  USER_APP_PORT,
  PRODUCT_APP_PORT,
  BRIEF_APP_PORT,
  userRoles,
  JWT_SECRET,
  EMAIL,
  PASSWORD,
};