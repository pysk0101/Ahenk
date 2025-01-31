import { UserService } from "@/src/features/users/server/service";
import { NextRequest, NextResponse } from "next/server";
import { createResult } from "@/src/utils/returnFunctions";
import { registerSchema, loginSchema } from "@/src/features/users/validation";
import { auth } from "../useCases/auth";

export const AuthController = {
    signup: async (req: NextRequest): Promise<ResultResponse<null>> => {
        try {
            const data = await req.json();

            await registerSchema.validate(data);
            //e posta dogrulamsai
            const result = await auth.signup(data);

            if (!result.success || !result.data) {
                return NextResponse.json(createResult(false, null, result.message || "Signup failed"), { status: 400 });
            }

            const response = NextResponse.json(createResult(true, null), { status: 201 });
            console.log("token", result.data.token);
            response.cookies.set({
                name: "token",
                value: result.data.token,
                path: '/',
            });

            return response;
        } catch (error: any) {
            console.error("Signup Error:", error);
            if (error.name === 'ValidationError') {
                return NextResponse.json(createResult(false, null, "Invalid data"), { status: 400 });
            }
            return NextResponse.json(createResult(false, null, "Failed to create user"), { status: 500 });
        }
    },
    login: async (req: NextRequest): Promise<ResultResponse<null>> => {
        try {
            const data = await req.json();
            await loginSchema.validate(data);

            const result = await auth.login(data);

            if (!result.success || !result.data) {
                return NextResponse.json(createResult(false, null, result.message || "Login failed"), { status: 500 });
            }

            const response = NextResponse.json(createResult(true, null), { status: 200 });
            console.log("token", result.data.token);
            response.cookies.set({
                name: "token",
                value: result.data.token,
                path: '/',
            });
            return response;
        }
        catch (error: any) {
            console.error("Signup Error:", error);
            if (error.name === 'ValidationError') {
                return NextResponse.json(createResult(false, null, "Invalid data"), { status: 400 });
            }
            return NextResponse.json(createResult(false, null, "Failed to create user"), { status: 500 });
        }
    }
}