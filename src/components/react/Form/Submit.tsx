import clsx from "clsx";

interface SubmitProps {
  text: string;
  status: "idle" | "loading" | "disabled";
}

const Submit = ({ text }: SubmitProps) => (
  <button
    type="submit"
    className={clsx("w-full h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50")}
  >
    {text}
  </button>
);

export default Submit
