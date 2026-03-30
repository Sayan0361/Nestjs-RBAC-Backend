import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard, ThrottlerLimitDetail } from "@nestjs/throttler";

@Injectable()
export class PostsThrottler extends ThrottlerGuard {
    
    protected async getTracker(req: Record<string, any>): Promise<string> {
        const email = req.user?.email || 'anonymous';
        return `posts-${email}`;
    }

    // limit : 10 attempts
    protected getLimit() : Promise<number> {
        return Promise.resolve(10);
    }

    // window time of 1 minute
    protected getTtl() : Promise<number> {
        return Promise.resolve(60000);
    }

    //
    protected async throwThrottlingException(): Promise<void> {
        throw new ThrottlerException(
            `Too many requests. Please try again after 1 minute`
        );
    }
}
