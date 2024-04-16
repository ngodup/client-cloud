interface ButtonProps {
  onClickHandler: (value: any) => void;
  value: any;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ onClickHandler, value, title }) => {
  const handleClick = () => {
    onClickHandler(value);
  };

  return (
    <button onClick={handleClick} className="btns">
      {title}
    </button>
  );
};

export default Button;
