export function MainWorkspace({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row justify-center md:items-center gap-8 mx-auto p-4">
      {children}
    </div>
  );
}
