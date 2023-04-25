import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { instanceToPlain } from 'class-transformer';

export function Serialize(dto: any) {
    return UseInterceptors(new SerializationInterceptor(dto));
}

@Injectable()
export class SerializationInterceptor implements NestInterceptor {
    constructor(private readonly dto: any) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                if (!Array.isArray(data)) {
                    const dtoInstance = Object.assign(new this.dto(), data);
                    return instanceToPlain(dtoInstance);
                }
                return data.map(item=>{
                    const dtoInstance = Object.assign(new this.dto(), item);
                    return instanceToPlain(dtoInstance);
                })
            }),
        );
    }
}
