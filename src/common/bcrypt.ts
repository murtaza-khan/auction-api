import * as bcrypt from 'bcrypt';

export async function passwordBcrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err: any, salt: any) => {
      bcrypt.hash(password, salt, (err: any, hash: any) => {
        resolve(hash);
      });
    });
  });
}
