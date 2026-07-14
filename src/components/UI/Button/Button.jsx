import styles from "./Button.module.css";

export default function Button({
  children,
  isActive,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const variantClasses = {
    primary: styles.btnPrimary,
    secondary: styles.btnSecondary,
    text: styles.btnText,
    danger: styles.btnDanger,
  };

  const selectedVariantClass = variantClasses[variant] || styles.btnPrimary;

  const finalClass = [
    styles.btnBase,
    selectedVariantClass,
    isActive ? styles.active : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type={type} className={finalClass} {...props}>
      {children}
    </button>
  );
}
