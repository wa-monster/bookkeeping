import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Response<T> {
  data: T
}



@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>>
{
  // intercept函数
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        status: 0,
        extra: {},
        message: 'success',
        success: true
      }))
    )
  }
}