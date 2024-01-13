const RightArrow = ({ ...props }) => (
  <svg viewBox="0 0 100 100" {...props}>
    <path
      d="M 10,50 L 60,100 L 65,95 L 20,50  L 65,5 L 60,0 Z"
      transform="translate(100, 100) rotate(180) "
    ></path>
  </svg>
);

export default RightArrow;
