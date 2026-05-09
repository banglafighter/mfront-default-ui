import {UIActionSpec, UIAdapterData, UIComponentSpec} from "mfront-ui";
import {defaultToastAction, DefaultToastBox} from "./default-ui/default-toast-box";
import {DefaultButton} from "./default-ui/default-button";
import {DefaultSeparator} from "./default-ui/default-separator";
import {DefaultButtonGroup} from "./default-ui/default-button-group";
import {DefaultLoader} from "./default-ui/default-loader";
import {
    DefaultCard,
    DefaultCardAction,
    DefaultCardBody,
    DefaultCardFooter,
    DefaultCardHeader,
    DefaultCardSubTitle,
    DefaultCardTitle
} from "./default-ui/default-card";
import {DefaultGrid} from "./default-ui/default-grid";
import {DefaultGridItem} from "./default-ui/default-grid-item";
import {DefaultInputFrame} from "./default-ui/default-input-frame";
import {DefaultInput} from "./default-ui/default-input";
import {DefaultInputField} from "./default-ui/default-input-field";
import DefaultFieldGenerator from "./default-ui/default-field-generator";
import {DefaultTextarea} from "./default-ui/default-textarea";
import {DefaultFieldGroup} from "./default-ui/default-field-group";
import {DefaultSelectField} from "./default-ui/default-select-field";


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

    Grid: DefaultGrid,
    GridItem: DefaultGridItem,

    InputFrame: DefaultInputFrame,
    InputField: DefaultInputField,
    Input: DefaultInput,
    FieldGroup: DefaultFieldGroup,
    FieldGenerator: DefaultFieldGenerator,
    Textarea: DefaultTextarea,
    SelectField: DefaultSelectField,
}

export const DefaultUIAction: UIActionSpec = {
    toastAction: defaultToastAction
}

export const DefaultUIImplementation: UIAdapterData = {
    component: DefaultUIComponent,
    action: DefaultUIAction,
    customComponent: {},
    customAction: {}
}