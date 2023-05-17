import {userRouter} from "./user/user-router";


export const routerIndex = [
    {
        prefix: "/users",
        router: userRouter
    }
]