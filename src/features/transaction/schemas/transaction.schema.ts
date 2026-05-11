import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z
    .number({ error: "Vui lòng nhập số tiền" })
    .positive("Só tiền phải lớn hơn 0"),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  date: z.date({ error: "Vui lòng chọn ngày" }),
  note: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
