import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  async getUserById(userId: string) {
    const pattern = { cmd: 'get_user_by_id' };
    const payload = userId;
    return lastValueFrom(this.userClient.send(pattern, payload));
  }
}
