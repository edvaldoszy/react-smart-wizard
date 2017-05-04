import * as React from "react";

export type Callback = () => void;

export interface ReactSmartWizardStepProps {
    title: string;
    onFinishLoad: Callback;
}

class ReactSmartWizardStep extends React.Component<ReactSmartWizardStepProps, any> {

    private title: string;
    private onFinishLoad: Callback;

    constructor(props) {
        super(props);

        this.title = props.title;
        this.state = {
            display: "node"
        };

        this.onFinishLoad = props.onFinishLoad || function() {}
    }

    componentDidMount() {
        this.onFinishLoad();
    }

    public getTitle() {
        return this.title;
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
