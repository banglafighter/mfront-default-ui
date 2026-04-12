import {UIActionSpec, UIAdapterData, UIComponentSpec} from "mfront-ui";
import {defaultToastAction, DefaultToastBox} from "./default-ui/default-toast-box";
import {DefaultButton} from "./default-ui/default-button";
import {DefaultSeparator} from "./default-ui/default-separator";
import {DefaultButtonGroup} from "./default-ui/default-button-group";
import {DefaultLoader} from "./default-ui/default-loader";
import {
    DefaultCard, DefaultCardAction,
    DefaultCardBody,
    DefaultCardFooter,
    DefaultCardHeader, DefaultCardSubTitle,
    DefaultCardTitle
} from "./default-ui/default-card";


export const DefaultUIComponent: UIComponentSpec = {
    ToastBox: DefaultToastBox,
    Button: DefaultButton,
    Separator: DefaultSeparator,
    ButtonGroup: DefaultButtonGroup,
    Loader: DefaultLoader,

    Card: DefaultCard,
    CardHeader: DefaultCardHeader,
    CardFooter: DefaultCardFooter,
    CardBody: DefaultCardBody,
    CardTitle: DefaultCardTitle,
    CardSubTitle: DefaultCardSubTitle,
    CardAction: DefaultCardAction,
}

export const DefaultUIAction: UIActionSpec = {
    toastAction: defaultToastAction
}

export const DefaultUIImplementation: UIAdapterData = {
    component: DefaultUIComponent,
    action: DefaultUIAction
}