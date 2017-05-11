import * as React from "react";

export type Callback = () => void;

export interface ReactSmartWizardStepProps {
    title: string;
    beforeStepChange?: Callback;
}

class ReactSmartWizardStep extends React.Component<ReactSmartWizardStepProps, any> {

    private title: string;

    constructor(props) {
        super(props);
        this.title = props.title;
        
        if (props.beforeStepChange && "function" != typeof props.beforeStepChange) {
            throw new Error("Invalid beforeStepChange callback function");
        }
    }
    
    public beforeStepChange() {
        let fn = this.props.beforeStepChange;
        if ("function" == typeof fn) {
            return fn();
        }
        
        return true;
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.props.children}
            </div>
        );
    }
}

export default ReactSmartWizardStep;
