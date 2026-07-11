export default function Button({ children, isActive, ...props }) {
  return (
    <button className={"btn-primary " + (isActive ? "active" : "")} {...props}>
      {children}
    </button>
  );
}
