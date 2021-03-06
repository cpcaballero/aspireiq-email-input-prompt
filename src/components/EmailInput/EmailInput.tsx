import { 
  useState, 
  useEffect,
  useCallback,
  KeyboardEvent, 
  ChangeEvent 
} from "react";
import * as Emailvalidator from "email-validator";
import { debounce } from "throttle-debounce";

import { Dropdown } from "./Dropdown";
import { EmailTag } from "./EmailTag";

import { emails } from "../../emails";
import loadgif from "../../assets/loading.gif";
import "./EmailInput.css";

const DEBOUNCE_TIME = 1000;

export const EmailInput = () => {
  const [userInput, setUserInput] = useState("");
  const [emailTags, setEmailTags] = useState<string[]>([]);
  const [emailList, setEmailList] = useState<string[]>([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const debounceFunc = useCallback( 
    debounce(DEBOUNCE_TIME, (userInput: string) => {
      const filteredEmails = emails.filter(
        (email) => 
          email.startsWith(userInput) && 
          !emailTags.includes(email)
      );
      setEmailList(filteredEmails);
      setLoading(false);
    }),
    [emailTags]
  );

  useEffect(() => {
    if (userInput !== "") {
      setLoading(true);
      debounceFunc(userInput);
    }
  }, [userInput]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setSelectedDropdownValue(-1);
  };

  const handleInsertEmailTag = (email: string) => {
    if (!emailTags.includes(email)) {
      setEmailTags(
        (prevState): string[] => [...emailTags, email]
      );
      setUserInput("");
    }
  };

  const handleDeleteEmailTag = (email: string) => {
    setEmailTags(emailTags.filter((tag) => tag !== email));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const currentInput = userInput.trim().toLowerCase();

    if ((e.key === "Tab" || e.key === "Enter") && userInput !== "") {
      e.preventDefault();
      if (selectedDropdownValue !== -1) {
        handleInsertEmailTag(emailList[selectedDropdownValue]);
      } else {
        handleInsertEmailTag(currentInput);
      }
    } else if (e.key === "Backspace" && userInput === "") {
      handleDeleteEmailTag(emailTags[emailTags.length - 1]);
    } else if (emailList.length > 0 && e.key === "ArrowDown") {
      if (selectedDropdownValue < emailList.length - 1) {
        setSelectedDropdownValue(
          (prevState) => prevState + 1
        );
      }
    } else if (emailList.length > 0 && e.key === "ArrowUp") {
      if (selectedDropdownValue > 0) {
        setSelectedDropdownValue(
          (prevState) => prevState - 1
        );
      }
    }
  };

  return (
    <>
      <div className="pageContainer">
        <div className="emailContainer">
          <ul className="emailTagContainer">
            {
              emailTags.map(
                (email) => (
                  <li
                    key={email}
                    className={
                      Emailvalidator.validate(email)
                        ? "emailTag"
                        : "emailTag invalid"
                    }
                  >
                    <EmailTag
                      key={email}
                      iconClassName={
                        Emailvalidator.validate(email) 
                          ? "icon close" 
                          : "icon alert"
                      }
                      email={email}
                      onDeleteEmailTag={handleDeleteEmailTag}
                    />
                  </li>
                )
              )
            }
            <li className="inputContainer">
              <input
                className="emailInput"
                value={userInput}
                placeholder={emailTags.length > 0 ? "" : "Enter recipients..."}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
              />
            </li>
          </ul>
          {loading && <img src={loadgif} className="loader" alt="loading gif" />}
        </div>
      </div>
      {
        userInput !== "" && 
        emailList.length > 0 && 
          (
            <Dropdown
              selectedDropdownValue={selectedDropdownValue}
              onInsertEmailTag={handleInsertEmailTag}
              emailList={emailList}
            />
          )
      }
    </>
  );
};
