import React from 'react';

interface EmailTagProps {
  email: string;
  iconClassName: string;
  onDeleteEmailTag: (text: string) => void;
}

export const EmailTag: React.FC<EmailTagProps> = (props) => {
  const { 
    email, 
    iconClassName, 
    onDeleteEmailTag 
  } = props;
  return (
    <>
      <span className="emailTagText">{email}</span>
      <span className={iconClassName} onClick={() => onDeleteEmailTag(email)}></span>
    </>
  );
};
