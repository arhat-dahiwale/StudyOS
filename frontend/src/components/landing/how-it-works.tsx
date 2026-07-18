const steps = [
  {
    step: "01",
    title: "Create Subjects",
    description:
      "Organize your courses with custom colors and icons.",
  },
  {
    step: "02",
    title: "Manage Notes & Assignments",
    description:
      "Keep your notes and deadlines organized in one workspace.",
  },
  {
    step: "03",
    title: "Track Study Sessions",
    description:
      "Record study time and stay consistent every day.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold">
          How it works
        </h2>

        <p className="mt-4 text-muted-foreground">
          Three simple steps to organize your academic life.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.step}
            className="rounded-xl border p-8"
          >
            <span className="text-5xl font-bold text-primary">
              {step.step}
            </span>

            <h3 className="mt-6 text-2xl font-semibold">
              {step.title}
            </h3>

            <p className="mt-4 text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}