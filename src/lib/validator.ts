import { ZodObject } from "zod"

export const validate = <T>(payload: T, schema: ZodObject) => {
    const validatedPayload = schema.safeParse(payload)

    if (!validatedPayload.success) {
        return {
            success: false,
            errors: validatedPayload.error.flatten().fieldErrors,
            // errors: validatedPayload.error.issues.map(issue => {
            //     return {
            //         field: issue.path[0],
            //         message: issue.message,
            //     }
            // })
        }
    }

    return {
        success: true,
        data: validatedPayload.data,
    };
}