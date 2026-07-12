export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 35"
      width="130"
      height="32"
    >
      <text
        x="0"
        y="24"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"
        fontSize="24"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="-0.3px"
      >
        In
        {/* Чистый, глубокий акцентный синий без дешевых градиентов */}
        <tspan fontWeight="400" fill="#2f80ed">
          Focus
        </tspan>
      </text>
    </svg>
  );
}
