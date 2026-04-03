function FlameLogo({ size = 40, gradientId = "flameGradDefault" }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.2)}
      viewBox="0 0 40 48"
      fill="none"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="20" y1="48" x2="20" y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#c43500" />
          <stop offset="50%"  stopColor="#f06a00" />
          <stop offset="100%" stopColor="#ffb020" />
        </linearGradient>
      </defs>
      {/*
        fillRule="evenodd" punches the stripe subpaths as transparent holes
        through the flame, so the background shows through — cream in light
        mode, dark in dark mode — exactly like the reference logo.
      */}
      <path
        fillRule="evenodd"
        fill={`url(#${gradientId})`}
        d="
          M20 2C22 7 32 16 32 27C32 37 27 45 20 47C13 45 8 37 8 27C8 16 18 7 20 2Z
          M17 43C14 36 13 27 16 19C17 15 19 15 20 18C18 26 18 36 19 43Z
          M11 44C8 37 7 28 10 20C11 16 14 15 15 18C13 27 13 37 14 44Z
        "
      />
    </svg>
  );
}

export default FlameLogo;
