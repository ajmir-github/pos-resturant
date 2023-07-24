export default function Layout({ children }) {
  return (
    <div data-theme={"dark"} className="min-h-screen py-2">
      {children}
    </div>
  );
}
