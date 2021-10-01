import { 
  useEffect, 
  useRef 
} from "react";

interface DropdownProps {
  selectedDropdownValue: number;
  emailList: string[];
  onInsertEmailTag: (email: string) => void;
}

export const Dropdown = (props: DropdownProps) => {
  const { 
    selectedDropdownValue, 
    emailList, 
    onInsertEmailTag 
  } = props;
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectedDropdownValue !== null) {
      dropdownRef.
        current?.
        children[selectedDropdownValue]?.
        scrollIntoView?.();
    }
  }, [selectedDropdownValue]);

  return (
    <div className="dropdownWrapper">
      <ul className="dropdownContainer" ref={dropdownRef}>
        {
          emailList
            .map((
              emailEntry, 
              index
            ) => {
              const dropdownClass =
                index === selectedDropdownValue
                  ? "dropdownItem selectedDropdownItem"
                  : "dropdownItem";
              return (
                <li
                  className={dropdownClass}
                  key={emailEntry}
                  onClick={(e) => onInsertEmailTag(emailEntry)}
                >
                  {emailEntry}
                </li>
              );
            })
        }
      </ul>
    </div>
  );
};
