import {WebFieldGroupProps} from "mmcore-ui";
import {DefaultFieldGroup} from "../default-ui/default-field-group";
import {type UINode, useRef} from "mfront";
import {Eye, EyeOff} from "lucide-react";
import {Button} from "mfront-ui";

export default function PasswordField({name, groupType, type, engine, ...props}: WebFieldGroupProps) {
    const togglePassword = () => {
        if (!engine) {
            return;
        }

        let fieldSpec = engine.getSpec<WebFieldGroupProps>(name)
        if (!fieldSpec) {
            return
        }

        if (fieldSpec.type === "text") {
            fieldSpec.type = "password"
        } else {
            fieldSpec.type = "text"
        }

        fieldSpec.endOrBottomItems = getPasswordIcon()
        engine.updateInputFieldSpec(fieldSpec, true)
    }

    const getPasswordIcon = () => {
        let passwordIcon: UINode =  <Eye/>
        if (type === "password") {
            passwordIcon =  <EyeOff/>
        }
        return [{itemType: "node", content: (<Button onClick={togglePassword} variant={"ghost"} size={"iconSm"}>{passwordIcon}</Button>)}]
    }

    return (<DefaultFieldGroup
        {...props}
        key={type}
        type={type}
        engine={engine}
        name={name}
        groupType={"text"}
        endOrBottomItems={getPasswordIcon()}
    />)
}