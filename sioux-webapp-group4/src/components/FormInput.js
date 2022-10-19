import React, {useState} from "react";

export default function FormInput(props){
    
    const [newValue, setNewValue] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewValue([...newValue, value]);
        
        props.updateValue(name, newValue);
    }

    return(
        <>
            <p>{props.placeholder}</p>
            <input placeholder={props.placeholder} type={props.type}
                            name={props.inputName}
                            value={""}
                            onChange={handleChange} />
        </>
    )
}