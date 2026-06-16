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
import {DefaultDropdown} from "./default-ui/default-dropdown";
import {DefaultSidebar} from "./default-ui/default-sidebar";
import {DefaultSidebarContent} from "./default-ui/default-sidebar-content";
import {DefaultSidebarProvider} from "./default-ui/default-sidebar-provider";
import {DefaultSidebarToggler} from "./default-ui/default-sidebar-toggler";
import {
    DefaultDialog,
    DefaultDialogBody,
    DefaultDialogFooter, DefaultDialogGenerator,
    DefaultDialogHeader, DefaultDialogSubTitle,
    DefaultDialogTitle
} from "./default-ui/default-dialog";
import {DefaultImage} from "./default-ui/default-image";
import {DefaultTab} from "./default-ui/default-tab";
import {
    DefaultTable,
    DefaultTBody,
    DefaultTD,
    DefaultTFoot,
    DefaultTH,
    DefaultTHead,
    DefaultTR
} from "./default-ui/default-table";
import {DefaultTableGenerator} from "./default-ui/default-table-generator";
import {DefaultPagination} from "./default-ui/default-pagination";
import {DefaultFileField} from "./default-ui/default-file-field";
import {DefaultCheckField} from "./default-ui/default-check-field";
import {DefaultPopover} from "./default-ui/default-popover";
import {DefaultCalendar} from "./default-ui/default-calendar";
import {DefaultBadge} from "./default-ui/default-badge";
import {DefaultDateTimeField} from "./default-ui/default-date-time-field";
import {DefaultAccordion} from "./default-ui/default-accordion";


export const DefaultUIComponent: UIComponentSpec = {
    Accordion: DefaultAccordion,
    ToastBox: DefaultToastBox,
    Button: DefaultButton,
    Separator: DefaultSeparator,
    ButtonGroup: DefaultButtonGroup,
    Badge: DefaultBadge,
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
    FileField: DefaultFileField,
    CheckField: DefaultCheckField,
    Dropdown: DefaultDropdown,
    Popover: DefaultPopover,

    Sidebar: DefaultSidebar,
    SidebarContent: DefaultSidebarContent,
    SidebarProvider: DefaultSidebarProvider,
    SidebarToggler: DefaultSidebarToggler,

    Dialog: DefaultDialog,
    DialogHeader: DefaultDialogHeader,
    DialogFooter: DefaultDialogFooter,
    DialogBody: DefaultDialogBody,
    DialogTitle: DefaultDialogTitle,
    DialogSubTitle: DefaultDialogSubTitle,
    DialogGenerator: DefaultDialogGenerator,

    Image: DefaultImage,
    Tab: DefaultTab,

    Table: DefaultTable,
    THead: DefaultTHead,
    TFoot: DefaultTFoot,
    TBody: DefaultTBody,
    TR: DefaultTR,
    TH: DefaultTH,
    TD: DefaultTD,
    TableGenerator: DefaultTableGenerator,
    Pagination: DefaultPagination,
    Calendar: DefaultCalendar,
    DateTimeField: DefaultDateTimeField,
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