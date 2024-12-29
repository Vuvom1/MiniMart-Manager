
import { Cookies } from 'react-cookie';
export class TokenUtil {
    private static cookies = new Cookies();

    public static getJwtToken(): string | undefined {
        console.log(this.cookies);
        return this.cookies.get('jwt');
    }
}

