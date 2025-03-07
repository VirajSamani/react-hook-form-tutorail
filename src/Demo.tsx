import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is Required").min(2, "Name need to fill."),
  email: z.string().min(1, "Email is Required").email("Invalid Email"),
  contactInfo: z.array(z.object({ name: z.string(), mobile: z.string() })),
});

type myformTypes = z.infer<typeof schema>;

export default function DemoForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      contactInfo: [{ name: "Viraj", mobile: "12345" }],
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: myformTypes) => console.log(data);
  const contactInfo = watch("contactInfo");

  const { append, remove } = useFieldArray({
    name: "contactInfo",
    control,
  });

  const handleAdd = () => {
    append({ name: "", mobile: "" });
  }

  const handleRemove = (index: number) => {
    remove(index);
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      <br />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <br />
      <br />
      {contactInfo &&
        contactInfo.map((data, index) => (
          <>
            {index}
            <input {...register(`contactInfo.${index}.name`)} />
            <input {...register(`contactInfo.${index}.mobile`)} />
            <button onClick={() => handleRemove(index)}>Remove</button>
            <br />
          </>
        ))}
      <button onClick={handleAdd}>Add</button>
      <br />
      <input type="submit" />
    </form>
  );
}
