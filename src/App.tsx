import TextInput from "./components/TextInput";
import "./App.css";
import { Button } from "antd";
import { useState } from "react";
import useFormValidator from "./hooks/useFormValidator.ts";

import {
  fieldRequired,
  lowercased,
  validationCheck,
} from "./utils/validationFunctions.ts";
interface FormState {
  user: { username: string; password: string };
  id: number;
}
const App = () => {
  // const [validationResults, setValidationResults] = useState<any>({
  //   'user.username': { valid: true, errors: [] },
  // });
  const { validateFields, validationStatus } = useFormValidator({
    "user.username": (value: string) => {
      const results: { valid: boolean; errors: string[] } = {
        valid: true,
        errors: [],
      };
      [fieldRequired, lowercased].forEach((callback) => {
        const res = callback(value);
        results.valid = results.valid && res.valid;
        results.errors = results.errors.concat(res.errors);
      });

      return results;
    },
  });

  const [data, setData] = useState<FormState>({
    user: {
      username: "",
      password: "",
    },
    id: 1,
  });

  // const validations = {
  //   'user.username': {
  //     validation: (value: string) => {
  //       let results: { valid: boolean; errors: string[] } = {
  //         valid: true,
  //         errors: [],
  //       };
  //       [fieldRequired, lowercased].forEach((callback) => {
  //         const res = callback(value);
  //         results.valid = results.valid && res.valid;
  //         results.errors = results.errors.concat(res.errors);
  //       });

  //       return results;
  //     },
  //   },
  // };

  const handleSubmit = () => {
    // const validationResults = validationCheck(data, validations);
    // console.log(validationResults);
    validateFields({ "user.username": data.user.username });
    // setValidationResults(validationResults);
  };

  return (
    <div className="appContainer">
      <h1>Form Tester</h1>
      <TextInput
        label={"Username"}
        placeholder={"Enter username here"}
        value={data.user.username}
        onChange={(e) => {
          setData((prevState) => {
            return {
              ...prevState,
              user: { ...prevState.user, username: e.target.value },
            };
          });
        }}
        status={validationStatus["user.username"].valid ? "" : "error"}
      />
      <TextInput
        label={"Password"}
        placeholder={"Enter password here"}
        value={data.user.password}
        onChange={(e) =>
          setData((prevState) => ({
            ...prevState,
            user: { ...prevState.user, password: e.target.value },
          }))
        }
        type="password"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default App;
