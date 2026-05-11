import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    TransactionFormData,
    transactionSchema,
} from "../schemas/transaction.schema";

export function useTransaction() {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      amount: 0,
      categoryId: "",
      date: new Date(),
      note: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    try {
      console.log("data: ", data);
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  });

  return { form, onSubmit };
}
