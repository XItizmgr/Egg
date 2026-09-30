import { useState } from "react";

export default function Cursed() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setSending(true);
    setSent(false);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSent(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-(--bg-color) text-(--text-color)">
      <div className="w-full max-w-xl">
        <p className="text-xs uppercase tracking-[0.2rem] font-bold text-(--accent-blue) opacity-80">Halloween</p>

        <h1 className="font-serif text-4xl font-bold leading-tight text-(--accent-color) md:text-6xl">Cursed.</h1>

        <p className="mt-5 max-w-lg text-(--text-color) leading-7">Send someone a conversation that should not exist. They won't know who sent it.</p>

        <form onSubmit={handleSubmit} className="mt-10">
          <label htmlFor="email" className="block mb-3 text-sm text-(--highlight-text-color)">
            Their email
          </label>

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="xitiz@example.com"
            className="  w-full rounded-lg border border-(--border-color) bg-(--card-bg-color) text-(--highlight-text-color)  px-4 py-4 outline-none placeholder:text-(--light-brown)  transition focus:border-(--accent-blue) focus:ring-1  focus:ring-(--accent-blue) "
          />

          <button
            type="submit"
            disabled={sending}
            className="  mt-5  w-full  rounded-lg  bg-(--btn-bg-color)  px-5 py-4 font-medium  text-(--highlight-text-color)  transition  hover:bg-(--btn-hover-color) disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-0.98 "
          >
            {sending ? "Sending..." : "Send the anomaly"}
          </button>
        </form>

        {sent && (
          <div className=" mt-6 rounded-lg border  border-(--dead-green)  bg-(--secondary-bg-color) px-5   py-4  text-sm  text-(--highlight-text-color) ">
            It has been sent hehehe.
            <span className="block mt-1 text-(--text-color)">Something is waiting in their inbox.</span>
          </div>
        )}

        {error && <div className=" mt-6 rounded-lg border border-(--blood-red) bg-(--dark-red) px-5 py-4  text-sm   text-(--highlight-text-color) ">{error}</div>}

        <div className="mt-16 border-t border-(--border-color) pt-6">
          <p className="text-xs tracking-[0.3em] text-(--light-brown)">DON'T LOOK AWAY.</p>
        </div>
      </div>
    </main>
  );
}
