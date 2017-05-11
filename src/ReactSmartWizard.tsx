import * as React from "react";
import ReactSmartWizardStep, { ReactSmartWizardStepProps } from "./ReactSmartWizardStep";

export type Callback = (index: number) => void;

export interface ReactSmartWizardProps {
    selected?: number;
    cycleSteps: boolean;
    onStepChange?: Callback;
}

class ReactSmartWizard extends React.Component<ReactSmartWizardProps, any> {

    private cycleSteps: boolean;
    private _onStepChange: Callback;

    private steps: ReactSmartWizardStep[] | any = [];

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected || 0
        };
        this.cycleSteps = props.cycleSteps || false;
        
        if (props.onStepChange && "function" != typeof props.onStepChange) {
            throw new Error("Invalid onStepChange callback function");            
        }
        this._onStepChange = props.onStepChange;

        this.buildStepList(props.children);
    }
    
    private buildStepList(children) {
        this.steps = React.Children.map(children, (child: any) => {
            if (child.type === ReactSmartWizardStep) {
                return child;
            }
        });
    }
    
    private callChildBeforeStepChange(index) {
        let child = this.steps[this.state.selected];
        let proto = child.type.prototype;
        return proto.beforeStepChange.call(child);
    }
    
    private onStepChange(selected) {
        let fn = this._onStepChange;
        if ("function" == typeof this._onStepChange) {
            fn(selected + 1);
        }
    }

    private onPrevButtonClick() {
        let selected = this.state.selected;

        if (selected < 1) {
            // não pode diminuir mais :)
            return;
        }

        selected--;
        this.setState({
            selected: selected
        }, this.onStepChange.bind(this, selected));
    }

    private onNextButtonClick() {
        let selected = this.state.selected;
        if (!this.callChildBeforeStepChange(selected)) {
            return;
        }

        if (selected >= (this.steps.length - 1)) {
            if (this.props.cycleSteps) {
                selected = 0;
            } else {
                // não pode aumentar mais :)
                return;
            }
        } else {
            selected++;
        }

        this.setState({
            selected: selected
        }, this.onStepChange.bind(this, selected));
    }

    public nextStep() {
        this.onNextButtonClick();
    }

    public prevStep() {
        this.onPrevButtonClick();
    }

    render() {
        return (
            <div>
                <div>{this.steps[this.state.selected]}</div>
                <div>
                    <button onClick={this.onPrevButtonClick.bind(this)}>Prev</button>
                    <button onClick={this.onNextButtonClick.bind(this)}>Next</button>
                </div>
            </div>
        );
    }
}

export default ReactSmartWizard;
