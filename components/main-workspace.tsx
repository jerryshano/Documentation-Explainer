export function MainWorkspace({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 min-h-0 flex-col md:flex-row md:justify-stretch justify-center md:items-stretch gap-8 mx-auto w-full">
      {children}
    </div>
  );
}
