import { Injectable } from '@nestjs/common';
import { AES, enc } from 'crypto-js';

@Injectable()
export class CryptoService {
  private key = process.env.SECRET_KEY ?? 'Sem chave definida';

  encrypt(value: string) {
    return AES.encrypt(value, this.key).toString();
  }

  decrypt(value: string) {
    const bytes = AES.decrypt(value, this.key);
    return bytes.toString(enc.Utf8);
  }
}
