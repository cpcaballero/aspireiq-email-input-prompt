interface EmailTagProps {
  email: string;
  icon: string;
  onDeleteEmailTag: (text: string) => void;
}

export const EmailTag = (props: EmailTagProps) => {
  const { 
    email, 
    icon, 
    onDeleteEmailTag 
  } = props;
  return (
    <>
      <span className="emailTagText">{email}</span>
      <span className={icon} onClick={() => onDeleteEmailTag(email)}></span>
    </>
  );
};
