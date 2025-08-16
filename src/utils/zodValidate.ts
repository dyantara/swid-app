// import { z } from "zod";

// export const zodValidate = (schema: any) => (values: any) => {
//     try {
//         schema.parse(values);
//         return {};
//     } catch (err: any) {
//         if (err instanceof z.ZodError) {
//             return err.formErrors?.fieldErrors ?? {};
//         }
//         return {};
//     }
// };
