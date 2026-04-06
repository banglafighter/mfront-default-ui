import {UIActionSpec, UIAdapterData, UIComponentSpec} from "mfront-ui";
import {defaultToastAction, DefaultToastBox} from "./default-ui/default-toast-box";


export const DefaultUIComponent: UIComponentSpec = {
    ToastBox: DefaultToastBox
}

export const DefaultUIAction: UIActionSpec = {
    toastAction: defaultToastAction
}

export const DefaultUIImplementation: UIAdapterData = {
    component: DefaultUIComponent,
    action: DefaultUIAction
}