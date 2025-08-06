const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`
      inline-flex items-center justify-center
      px-5 py-2.5 
      bg-gradient-to-r from-[#077A7D] to-[#7AE2CF]
      text-white font-semibold
      rounded-xl shadow-lg
      hover:from-[#065f60] hover:to-[#65c7b3]
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#077A7D]
      transition-all duration-300 ease-in-out
      ${className}
    `}
  >
    {children}
  </button>
);

export default Button;
