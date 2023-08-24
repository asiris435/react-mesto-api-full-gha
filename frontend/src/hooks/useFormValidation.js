import { useCallback, useState } from "react";

function useFormValidation () {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isInputValid, setIsInputValid] = useState({});
    const [isValid, setIsValid] = useState(false);
    
    function handleChange (event) {
        const name = event.target.name;
        const value = event.target.value;
        const validationMessage = event.target.validationMessage;
        const valid = event.target.validity.valid;
        const form = event.target.form;
        
        setValues ((oldValues) => {
            return { ...oldValues, [name] : value };
        });

        setErrors ((oldErrors) => {
            return { ...oldErrors, [name] : validationMessage };
        });

        setIsInputValid ((oldIsInputValid) => {
            return { ...oldIsInputValid, [name] : valid };
        });

        setIsValid (form.checkValidity());
    }

    function reset (data={}) {
        setValues(data);
        setErrors({});
        setIsInputValid({});
        setIsValid(false);
    }

    const setValue = useCallback((name, value) => {
        setValues ((oldValues) => {
            return { ...oldValues, [name] : value };
        });
    }, []);

    return { values, errors, isInputValid, isValid, handleChange, reset, setValue };
}

export default useFormValidation;