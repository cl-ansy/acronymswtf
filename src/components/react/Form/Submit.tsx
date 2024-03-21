import Spinner from "@/components/react/Spinner.tsx";

interface SubmitProps {
  text: string;
  loading: boolean;
}

const Submit = ({ text, loading }: SubmitProps) => (
  <button
    type="submit"
    disabled={loading}
    className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded
      bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow
      transition-colors hover:bg-primary/90 focus-visible:outline-none
      focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none
      disabled:opacity-50">
    {loading ? <Spinner /> : text}
  </button>
);

export default Submit;
