export const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#4533bf",
    primary25: "#ccc",
    primary50: "#261590",
    primary75: "#120758",
  },
});
export const customStyles = {
  singleValue: (provided, state) => ({
    ...provided,
    fontWeight: "500",
    color: "#120758",
  }),
  container: (provided, state) => ({
    ...provided,
    width: "70%",
    minWidth: "70%",
    color: "#120758",
    borderColor: "#120758",
    height: "40px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    color: "#120758",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontWeight: "500",
    color: "#1207588a",
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: "2px solid #120758",
    maxHeight: "220px",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#120758" : "#ccc",
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: "#120758",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#120758" : "#ccc",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "#120758",
    fontWeight: "500",
    width: "30%",
    maxWidth: "30%",
  }),
};
