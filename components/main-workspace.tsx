export function MainWorkspace({ children }: { children: React.ReactNode }) {
  return (
    // <div className="flex flex-1 min-h-0 flex-col md:flex-row md:justify-stretch justify-center md:items-stretch gap-8 mx-auto w-full">
    <div className="mx-auto flex w-full flex-1 min-h-0 flex-col gap-8 auto-rows-fr md:grid md:grid-rows-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)_minmax(0,2.5fr)]">
      {children}
    </div>
  );
}
