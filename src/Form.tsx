import { useForm } from "react-hook-form";

function Form() {
  const methods = useForm({});

  return (
    <>
      name:{" "}
      <input
        className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
        type="text"
        name="name"
      />
      email:{" "}
      <input
        className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
        type="text"
        name="email"
      />
      <button onClick={() => console.log("data")} type="submit">
        Submit
      </button>
    </>
  );
}

export default Form;
