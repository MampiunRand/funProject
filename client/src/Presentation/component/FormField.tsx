import { TextField } from "@mui/material"
import './style.css';

interface formField {
    label : string,
    field ?: string,
}
const FormField=({label, field}:formField):JSX.Element=>{
    return (
        <div className="formFieldContainer">
            <div className="labelStyleInFormField">{label}:</div>
            <div>
            <TextField id="standard-basic" label={field} variant="standard"/>  
            </div>
        </div>
    )   
}
export default FormField