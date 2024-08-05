/* eslint-disable @typescript-eslint/naming-convention */
export const PORT = process.env.PORT ?? 2002;
export const SECRET_KEY = process.env.SECRET ?? 'MeangSomethingVeryDificult';

export enum COLLECTIONS {
	USERS = 'users',
}
