export default function Layout({ children }) {
  return (
    <div data-theme={"dark"} className="min-h-screen bg-base-200">
      {children}
    </div>
  );
}
