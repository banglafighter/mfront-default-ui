import {UIActionSpec, UIAdapterData, UIComponentSpec} from "mfront-ui";
import {defaultToastAction, DefaultToastBox} from "./default-ui/default-toast-box";
import {DefaultButton} from "./default-ui/default-button";
import {DefaultSeparator} from "./default-ui/default-separator";
import {DefaultButtonGroup} from "./default-ui/default-button-group";


export const DefaultUIComponent: UIComponentSpec = {
    ToastBox: DefaultToastBox,
    Button: DefaultButton,
    Separator: DefaultSeparator,
    ButtonGroup: DefaultButtonGroup
}

export const DefaultUIAction: UIActionSpec = {
    toastAction: defaultToastAction
}

export const DefaultUIImplementation: UIAdapterData = {
    component: DefaultUIComponent,
    action: DefaultUIAction
}